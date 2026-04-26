"use client";

import React, { useState } from "react";
import { Product } from "@/Services/Products/getAllProducts";
import {
  Star,
  Minus,
  Plus,
  Share2,
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import WishlistButton from "./WishListBtn";
import AddToCartButton from "./AddToCartBtn";
import { FaBolt } from "react-icons/fa";

export default function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    if (quantity < product.quantity) setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <div className="lg:w-full">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1.5 rounded-full font-medium">
            {product?.category?.name || "Women's Fashion"}
          </span>
          <span className="bg-gray-100 text-gray-700 font-medium text-xs px-3 py-1.5 rounded-full">
            {product?.brand?.name || "Brand"}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-[#101828] mb-3 uppercase">
          {product?.title}
        </h1>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                fill={
                  i < Math.floor(product?.ratingsAverage || 0)
                    ? "currentColor"
                    : "none"
                }
                className={
                  i < Math.floor(product?.ratingsAverage || 0)
                    ? ""
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product?.ratingsAverage} ({product?.ratingsQuantity} reviews)
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-3 mb-6">
          <span className="text-3xl font-bold text-gray-900">
            {product?.price} EGP
          </span>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <span className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full bg-green-50 text-green-700">
            <span className="w-2 h-2 rounded-full  bg-green-500"></span>
            In Stock
          </span>
        </div>

        <div className="border-t border-gray-100 pt-5 mb-6">
          <p className="text-gray-600 text-[16px] font-medium">
            {product?.description}
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden text-[#364153]">
              <button
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="px-4 py-3  hover:bg-gray-100 transition disabled:opacity-30"
              >
                <Minus size={20} />
              </button>
              <input
                type="number"
                value={quantity}
                readOnly
                className="w-16 text-center border-0 focus:ring-0 text-lg font-medium"
              />
              <button
                onClick={handleIncrease}
                disabled={quantity >= product.quantity}
                className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition"
              >
                <Plus size={20} />
              </button>
            </div>
            <span className="text-sm text-gray-500">
              {product.quantity} available
            </span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Price:</span>
            <span className="text-2xl font-bold text-emerald-600">
              {(product.price * quantity).toFixed(2)} EGP
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col sm:flex-row gap-3 mb-6">
          <div className="w-1/2">
            <AddToCartButton product={product} />
          </div>
          <button className="w-1/2 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <FaBolt size={20} /> Buy Now
          </button>
        </div>

        <div className="flex items-center gap-3 w-full my-6">
          <div className="grow  ">
            <WishlistButton product={product} variant="full" />
          </div>

          <button className="border-2 border-gray-200 text-gray-700 p-3 rounded-xl hover:border-emerald-300 hover:text-emerald-600 transition flex items-center justify-center h-13 w-13">
            <Share2 size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm">
                Free Delivery
              </h4>
              <p className="text-xs text-gray-500">Orders over $50</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
              <RotateCcw size={20} />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm">
                30 Days Return
              </h4>
              <p className="text-xs text-gray-500">Money back</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm">
                Secure Payment
              </h4>
              <p className="text-xs text-gray-500">100% Protected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
