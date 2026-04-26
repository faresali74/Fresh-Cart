import React from "react";
import Link from "next/link";
import {
  FaBagShopping,
  FaTruck,
  FaTag,
  FaLock,
  FaShieldHalved,
} from "react-icons/fa6";
import { FiTruck } from "react-icons/fi";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
  freeShippingThreshold?: number;
}

export default function OrderSummary({
  subtotal = 0,
  total = 0,
  itemCount = 0,
  freeShippingThreshold = 500,
}: OrderSummaryProps) {
  const freeShippingProgress = Math.min(
    (subtotal / freeShippingThreshold) * 100,
    100,
  );
  const remainingForFreeShipping = Math.max(
    freeShippingThreshold - subtotal,
    0,
  );

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24 shadow-sm">
        {/* Header */}
        <div className="bg-linear-to-r from-[#16A24A] to-[#15803D] px-6 py-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FaBagShopping /> Order Summary
          </h2>
          <p className="text-[#dcfce7] text-sm mt-1">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="p-6 space-y-5">
          {/* Free Shipping Progress */}
          <div className="p-6 space-y-5">
            {remainingForFreeShipping > 0 ? (
              <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100/50">
                <div className="flex items-center gap-2 mb-3">
                  <FaTruck className="text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Add{" "}
                    <span className="font-bold text-orange-600">
                      {remainingForFreeShipping} EGP
                    </span>{" "}
                    for free shipping
                  </span>
                </div>
                <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${freeShippingProgress}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-center gap-3 border border-green-100/50 animate-in fade-in zoom-in duration-500">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0 shadow-sm">
                  <FiTruck className="text-green-600 text-xl" />
                </div>

                <div>
                  <p className="font-semibold text-green-700 leading-tight">
                    Free Shipping!
                  </p>
                  <p className="text-sm text-green-600">
                    You qualify for free delivery
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Pricing Details */}
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">{subtotal} EGP</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span
                className={`font-medium  ${remainingForFreeShipping > 0 ? "text-gray-600" : "text-[#00a63e]"}`}
              >
                {remainingForFreeShipping > 0 ? `50 EGP` : "FREE"}
              </span>
            </div>

            <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-900 font-semibold">Total</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">
                    {total}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">EGP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Promo Code Button */}
          <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50/50 transition-all">
            <FaTag />
            <span className="text-sm font-medium">Apply Promo Code</span>
          </button>

          {/* Checkout Button */}
          <Link
            href="/checkout"
            className="w-full bg-linear-to-r from-[#16A24A] to-[#15803D] text-white py-4 px-6 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
          >
            <FaLock />
            <span>Secure Checkout</span>
          </Link>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <FaShieldHalved className="text-green-500" />
              <span>Secure Payment</span>
            </div>
            <div className="w-px h-4 bg-gray-200"></div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <FaTruck className="text-blue-500" />
              <span>Fast Delivery</span>
            </div>
          </div>

          {/* Continue Shopping */}
          <Link
            href="/"
            className="block text-center text-[#15803d] hover:text-[#15803D] text-sm font-medium py-2"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
