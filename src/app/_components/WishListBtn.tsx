"use client";
import { FiHeart } from "react-icons/fi";
import { useWishlist } from "@/context/WishlistContext";
import { Product } from "@/Services/Products/getAllProducts";

interface WishlistButtonProps {
  product: Product;
  variant?: "icon" | "full";
}

export default function WishlistButton({
  product,
  variant = "icon",
}: WishlistButtonProps) {
  const context = useWishlist();
  if (!context)
    throw new Error("useWishlist must be used within WishlistProvider");
  const { wishlistIds, toggleWishlist } = context;
  const isFav = wishlistIds.includes(product._id);

  const handleToggle = () => toggleWishlist(product);

  if (variant === "icon") {
    return (
      <button
        onClick={handleToggle}
        className={`w-9 h-9 rounded-full shadow-md flex items-center justify-center transition-all ${
          isFav
            ? "bg-white text-red-500"
            : "bg-white text-gray-600 hover:text-red-500 hover:bg-red-50"
        }`}
      >
        <FiHeart size={18} fill={isFav ? "red" : "none"} />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`w-full py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 border-2 h-13 ${
        isFav
          ? "border-red-200 text-red-600 bg-red-50"
          : "border-gray-200 text-gray-700 hover:border-emerald-300 hover:text-emerald-600"
      }`}
    >
      <FiHeart size={20} fill={isFav ? "red" : "none"} />
      {isFav ? "In Wishlist" : "Add to Wishlist"}
    </button>
  );
}
