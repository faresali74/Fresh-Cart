"use client";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa6";
import { Product } from "@/Services/Products/getAllProducts";
import AddToCartButton from "./AddToCartBtn";

interface WishlistTableProps {
  items: Product[];
  onRemove: (item: Product) => void;
}

export default function WishlistTable({ items, onRemove }: WishlistTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Table Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
        <div className="col-span-6">Product</div>
        <div className="col-span-2 text-center">Price</div>
        <div className="col-span-2 text-center">Status</div>
        <div className="col-span-2 text-center">Actions</div>
      </div>

      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors"
          >
            {/* Product Info */}
            <div className="md:col-span-6 flex items-center gap-4">
              <Link
                className="relative w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0"
                href={`/products/${item._id}`}
              >
                <Image
                  src={item.imageCover}
                  alt={item.title}
                  fill
                  className="object-contain p-2"
                  sizes="80px"
                />
              </Link>
              <div className="min-w-0">
                <Link
                  className="font-medium text-gray-900 hover:text-emerald-600 transition-colors line-clamp-2"
                  href={`/products/${item._id}`}
                >
                  {item.title}
                </Link>
                <p className="text-sm text-gray-400 mt-1">
                  {item.category?.name || "Category"}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="md:col-span-2 flex md:justify-center items-center gap-2">
              <span className="md:hidden text-sm text-gray-500">Price:</span>
              <span className="font-semibold text-gray-900">
                {item.price} EGP
              </span>
            </div>

            {/* Status */}
            <div className="md:col-span-2 flex md:justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                In Stock
              </span>
            </div>

            {/* Actions */}
            <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
              <AddToCartButton product={item} />
              <button
                onClick={() => onRemove(item)}
                className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all"
                title="Remove"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
