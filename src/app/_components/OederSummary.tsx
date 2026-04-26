import React from "react";
import Link from "next/link";
import { FiCheckCircle, FiUser } from "react-icons/fi";

interface OrderSummaryProps {
  subtotal: number;
  itemCount: number;
}

export default function OrderSummary({
  subtotal,
  itemCount,
}: OrderSummaryProps) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-4">
        <div className="bg-gray-900 p-5">
          <h2 className="text-white font-bold text-lg">Order Summary</h2>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal ({itemCount} items)</span>
            <span className="font-semibold">{subtotal} EGP</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">
              Calculated at checkout
            </span>
          </div>

          <hr className="border-gray-200" />

          <div className="flex justify-between text-lg font-bold">
            <span>Estimated Total</span>
            <span className="text-emerald-600">{subtotal} EGP</span>
          </div>

          <div className="pt-4 space-y-3">
            <Link
              href="/login?redirect=/cart"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3.5 rounded-xl font-semibold hover:bg-emerald-700 transition-all"
            >
              <FiUser /> Login to Checkout
            </Link>

            <p className="text-xs text-gray-400 text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/register?redirect=/cart"
                className="text-emerald-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Trust Badges */}
          <div className="pt-4 border-t border-gray-100 space-y-2">
            <p className="text-xs text-gray-500 flex items-center gap-2">
              <FiCheckCircle className="text-emerald-500" /> Your cart items
              will be saved
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-2">
              <FiCheckCircle className="text-emerald-500" /> Track your orders
              easily
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-2">
              <FiCheckCircle className="text-emerald-500" /> Access exclusive
              member deals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
