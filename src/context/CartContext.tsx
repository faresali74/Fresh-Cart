"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import {
  getCartApi,
  CartItem as CartItemResponse,
} from "@/Services/Cart/GetUserCart";
import { addToCartApi } from "@/Services/Cart/AddToCart";
import { updateCartQuantityApi } from "@/Services/Cart/UpdateCartQuantity";
import { removeFromCartApi } from "@/Services/Cart/RemoveCartProduct";
import { clearCartApi } from "@/Services/Cart/ClearUserCart";
import { Product } from "@/Services/Products/getAllProducts";

export interface CartItem {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  category: { name: string; _id?: string } | string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  itemCount: number;
  cartTotal: number;
  loading: boolean;
  addToCart: (product: Product) => Promise<void>;
  updateQuantity: (id: string, newQty: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  refreshCart: () => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const itemCount = cartItems.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0,
  );

  const cartTotal = cartItems.reduce((sum, item) => {
    return sum + (Number(item.price) || 0) * (Number(item.quantity) || 0);
  }, 0);

  const refreshCart = useCallback(async () => {
    if (!session?.accessToken) {
      const local = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(Array.isArray(local) ? local : []);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await getCartApi(session.accessToken);
      if (res?.status === "success" && res.data) {
        const formattedItems: CartItem[] = res.data.products.map(
          (p: CartItemResponse) => ({
            ...p.product,
            price: p.price,
            quantity: p.count,
            _id: p.product._id,
          }),
        );
        setCartItems(formattedItems);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error("Server Error:", err);
    } finally {
      setLoading(false);
    }
  }, [session?.accessToken]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const dispatchCartUpdate = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  const addToCart = async (product: Product) => {
    const token = session?.accessToken;
    try {
      if (token) {
        const res = await addToCartApi(product._id, token);
        if (res.status === "success") {
          toast.success("Product added successfully");
          await refreshCart();
        }
      } else {
        const localCart: CartItem[] = JSON.parse(
          localStorage.getItem("cart") || "[]",
        );
        const exists = localCart.find((item) => item._id === product._id);
        if (exists) {
          exists.quantity += 1;
        } else {
          localCart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(localCart));
        setCartItems([...localCart]);
        toast.success("Added to local cart");
      }
    } catch {
      toast.error("Failed to add to cart");
    }
    dispatchCartUpdate();
  };

  const updateQuantity = async (productId: string, newQty: number) => {
    if (newQty < 1) return removeFromCart(productId);
    const token = session?.accessToken;
    try {
      if (token) {
        await updateCartQuantityApi(productId, newQty, token);
      } else {
        const local = cartItems.map((item) =>
          item._id === productId ? { ...item, quantity: newQty } : item,
        );
        localStorage.setItem("cart", JSON.stringify(local));
        setCartItems(local);
      }
      await refreshCart();
    } catch {
      toast.error("Update failed");
    }
    dispatchCartUpdate();
  };

  const removeFromCart = async (productId: string) => {
    const token = session?.accessToken;
    try {
      if (token) {
        await removeFromCartApi(productId, token);
      } else {
        const local = cartItems.filter((item) => item._id !== productId);
        localStorage.setItem("cart", JSON.stringify(local));
        setCartItems(local);
      }
      toast.success("Removed from cart");
      await refreshCart();
    } catch {
      toast.error("Remove failed");
    }
    dispatchCartUpdate();
  };

  // ✅ الـ Swal اتنقل للـ UI — هنا بس بنعمل clear بدون confirmation
  const clearCart = async () => {
    const token = session?.accessToken;
    try {
      if (token) {
        const res = await clearCartApi(token);
        if (res.message === "success") {
          setCartItems([]);
          toast.success("Cart cleared successfully");
        } else {
          toast.error(res.message || "Failed to clear cart");
        }
      } else {
        localStorage.removeItem("cart");
        setCartItems([]);
        toast.success("Cart cleared");
      }
    } catch (err) {
      console.error("Error in clearCart:", err);
      toast.error("An error occurred while clearing the cart");
    }
    dispatchCartUpdate();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        itemCount,
        cartTotal,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        refreshCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
