"use client";
import { useState, useEffect } from "react";
import { FiPlus, FiCheck } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/context/CartContext";
import { Product } from "@/Services/Products/getAllProducts";
import { FaCartShopping } from "react-icons/fa6";

interface AddToCartProps {
  product: Product;
  variant?: "icon" | "full";
}

export default function AddToCartButton({
  product,
  variant = "full",
}: AddToCartProps) {
  const { cartItems, addToCart } = useCart();
  const [isInCart, setIsInCart] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const exists = cartItems.some((item: CartItem) => item._id === product._id);
    setIsInCart(exists);
  }, [cartItems, product._id]);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    try {
      await addToCart(product);
    } finally {
      setIsAdding(false);
    }
  };

  const isDisabled = isAdding || isInCart;

  if (variant === "icon") {
    return (
      <button
        onClick={handleAddToCart}
        disabled={isDisabled}
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-sm ${
          isDisabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
            : "bg-emerald-600 text-white shadow-emerald-200 hover:bg-emerald-700 active:scale-90"
        }`}
      >
        {isInCart ? (
          <FiCheck size={18} strokeWidth={3} />
        ) : isAdding ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <FiPlus size={20} strokeWidth={3} />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isDisabled}
      className={`flex-1 w-full md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
        isDisabled
          ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
          : "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 shadow-sm shadow-emerald-200"
      }`}
    >
      {isInCart ? (
        <FiCheck size={16} strokeWidth={3} />
      ) : isAdding ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <FaCartShopping className="w-4 h-4" />
      )}
      <span className="md:hidden lg:inline">
        {isInCart ? "In Cart" : isAdding ? "Adding..." : "Add to Cart"}
      </span>
    </button>
  );
}
