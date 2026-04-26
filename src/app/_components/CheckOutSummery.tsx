"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaSpinner } from "react-icons/fa";
import {
  FaBagShopping,
  FaBox,
  FaTriangleExclamation,
  FaTruck,
  FaShieldHalved,
} from "react-icons/fa6";
import { CartResponse } from "@/Services/Cart/GetUserCart";

export default function ChceckoutOrderSummary({
  cartData,
  loading,
  paymentLoading,
}: {
  cartData: CartResponse | null;
  loading: boolean;
  paymentLoading: boolean;
}) {
  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (!cartData || cartData.numOfCartItems === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
        <FaTriangleExclamation className="text-orange-500 text-5xl mx-auto mb-4" />
        <h3 className="text-lg font-bold">Your cart is empty</h3>
        <Link
          href="/products"
          className="block mt-4 bg-emerald-600 text-white py-3 rounded-xl"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const subtotal = cartData?.data?.totalCartPrice ?? 0;
  const shipping = 50;
  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-4">
      {/* Header */}
      <div className="bg-linear-to-r from-emerald-600 to-emerald-700 px-6 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FaBagShopping /> Order Summary
        </h2>
        <p className="text-emerald-100 text-sm mt-1">
          {cartData?.numOfCartItems} item
          {cartData?.numOfCartItems !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="p-5">
        {/* Items List */}
        <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
          {cartData?.data?.products?.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0 relative">
                <Image
                  src={item.product.imageCover}
                  alt={item.product.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.product.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {item.count} × {item.price} EGP
                </p>
              </div>
              <p className="text-sm font-bold text-gray-900 shrink-0">
                {item.price}
              </p>
            </div>
          ))}
        </div>

        <hr className="border-gray-100 my-4" />

        {/* Price Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium">{subtotal} EGP</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span className="flex items-center gap-2">
              <FaTruck className="text-gray-400" /> Shipping
            </span>
            <span className="font-medium">{shipping} EGP</span>
          </div>
          <hr className="border-gray-100" />
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-emerald-600">
                {total}
              </span>
              <span className="text-sm text-gray-500 ml-1">EGP</span>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          type="submit"
          form="checkout-form"
          disabled={paymentLoading}
          className="w-full mt-6 bg-linear-to-r from-emerald-600 to-emerald-700 
                     text-white py-4 rounded-xl font-bold 
                     hover:from-emerald-700 hover:to-emerald-800 
                     transition-all disabled:opacity-70 disabled:cursor-not-allowed 
                     flex items-center justify-center gap-2 
                     shadow-lg shadow-emerald-600/20 active:scale-[0.98]"
        >
          {paymentLoading ? (
            <FaSpinner className="animate-spin h-5 w-5 text-white" />
          ) : (
            <FaBox />
          )}
          <span>{paymentLoading ? "Processing..." : "Place Order"}</span>
        </button>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaShieldHalved className="text-green-500" />
            <span>Secure</span>
          </div>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaTruck className="text-blue-500" />
            <span>Fast Delivery</span>
          </div>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaBox className="text-orange-500" />
            <span>Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
}
