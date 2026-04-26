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
import { removeFromWishlistApi } from "../Services/WishList/RemoveFromWishList";
import { addToWishlistApi } from "../Services/WishList/AddToWishList";
import { getWishlistApi } from "@/Services/WishList/GetWishList";
import { Product } from "@/Services/Products/getAllProducts";

interface WishlistContextType {
  wishlistIds: string[];
  wishlistItems: Product[];
  toggleWishlist: (product: Product) => Promise<void>;
  loading: boolean;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshWishlist = useCallback(async () => {
    setLoading(true);
    if (session?.accessToken) {
      try {
        const res = await getWishlistApi(session.accessToken);
        if (res.status === "success") {
          setWishlistItems(res.data);
          setWishlistIds(res.data.map((item) => item._id));
        }
      } catch {
        console.error("Failed to refresh wishlist");
      }
    } else {
      const local: Product[] = JSON.parse(
        localStorage.getItem("wishlist") || "[]",
      );
      setWishlistItems(local);
      setWishlistIds(local.map((item) => item._id));
    }
    setLoading(false);
  }, [session]);

  useEffect(() => {
    refreshWishlist();
  }, [refreshWishlist]);

  const toggleWishlist = async (product: Product) => {
    const productId = product._id;
    const token = session?.accessToken;
    const isExist = wishlistIds.includes(productId);

    if (isExist) {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
    } else {
      setWishlistIds((prev) => [...prev, productId]);
      setWishlistItems((prev) => [...prev, product]);
    }

    if (token) {
      try {
        if (isExist) {
          const res = await removeFromWishlistApi(productId, token);
          if (res.status !== "success") throw new Error();
          toast.success("Removed from Wishlist");
        } else {
          const res = await addToWishlistApi(productId, token);
          if (res.status !== "success") throw new Error();
          toast.success("Added to Wishlist ❤️");
        }
        await refreshWishlist();
      } catch {
        toast.error("Network error, try again");
        await refreshWishlist();
      }
    } else {
      const newItems = isExist
        ? wishlistItems.filter((item) => item._id !== productId)
        : [...wishlistItems, product];
      localStorage.setItem("wishlist", JSON.stringify(newItems));
      setWishlistItems(newItems);
      setWishlistIds(newItems.map((item) => item._id));
      toast.success(isExist ? "Removed from wishlist" : "Added to wishlist");
      refreshWishlist();
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistItems,
        toggleWishlist,
        loading,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
