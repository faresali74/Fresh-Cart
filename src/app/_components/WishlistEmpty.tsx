import Link from "next/link";
import { FaHeart } from "react-icons/fa6";

export default function WishlistEmpty() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50">
      <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaHeart className="text-4xl text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven&apos;t added any products yet.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-all"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
