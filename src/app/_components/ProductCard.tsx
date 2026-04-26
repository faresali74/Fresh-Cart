"use client";
import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FiEye } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import WishlistButton from "./WishListBtn";
import AddToCartButton from "./AddToCartBtn";
import { Product } from "@/Services/Products/getAllProducts";

export default function ProductCard({ product }: { product: Product }) {
  const discountPercentage = product.priceAfterDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount) / product.price) * 100,
      )
    : null;

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      <div className="relative aspect-square overflow-hidden bg-white p-4">
        {product.priceAfterDiscount && (
          <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm animate-pulse">
            -{discountPercentage}%
          </div>
        )}
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          priority={false}
        />
        {/* Floating Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="absolute top-8 mt-2 right-0 z-10">
            <WishlistButton product={product} />
          </div>
          <Link
            href={`/products/${product._id}`}
            className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
          >
            <FiEye size={18} />
          </Link>
        </div>
      </div>

      <div className="p-4">
        <div className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider mb-1">
          {product.category.name}
        </div>

        <Link href={`/products/${product._id}`}>
          <h3
            className="text-sm font-bold text-gray-800 mb-2 line-clamp-1 hover:text-emerald-600 cursor-pointer"
            title={product.title}
          >
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) =>
              i < Math.floor(product.ratingsAverage) ? (
                <AiFillStar key={i} size={14} />
              ) : (
                <AiOutlineStar key={i} size={14} className="text-gray-300" />
              ),
            )}
          </div>
          <span className="text-xs text-gray-400 font-medium">
            ({product.ratingsAverage})
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            {product.priceAfterDiscount ? (
              <>
                <span className="text-lg font-bold text-gray-900 leading-none">
                  {product.priceAfterDiscount} EGP
                </span>
                <span className="text-xs text-gray-400 line-through mt-1">
                  {product.price} EGP
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {product.price} EGP
              </span>
            )}
          </div>
          <AddToCartButton product={product} variant="icon" />
        </div>
      </div>
    </div>
  );
}
