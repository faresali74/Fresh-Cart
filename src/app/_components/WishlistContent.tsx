"use client";
import { useWishlist } from "@/context/WishlistContext";
import { Product } from "@/Services/Products/getAllProducts";
import Link from "next/link";
import WishlistHeader from "./WishlistHeader";
import WishlistTable from "./WishlistTable";
import WishlistEmpty from "./WishlistEmpty";

export default function WishlistContent() {
  const context = useWishlist();
  if (!context)
    throw new Error("useWishlist must be used within WishlistProvider");

  const { wishlistItems, loading: isLoading, toggleWishlist } = context;

  const handleRemove = (item: Product) => toggleWishlist(item);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (wishlistItems.length === 0) return <WishlistEmpty />;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <WishlistHeader count={wishlistItems.length} />
      <div className="container mx-auto px-4 py-8">
        <WishlistTable items={wishlistItems} onRemove={handleRemove} />
        <div className="mt-8">
          <Link
            href="/products"
            className="text-gray-500 hover:text-emerald-600 text-sm font-medium transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
