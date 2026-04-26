"use client";
import React from "react";
import Link from "next/link";
import { FiArrowRight, FiBox } from "react-icons/fi";

export default function EmptyCart() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 w-full py-7">
      <div className="max-w-md text-center">
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center mx-auto">
            <FiBox className="w-16 h-16 text-gray-300" />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-200/50 rounded-full blur-md"></div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Looks like you haven&apos;t added anything to your cart yet.
          <br />
          Start exploring our amazing products!
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-emerald-600 text-white py-3.5 px-8 rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-[0.98]"
        >
          Start Shopping
          <FiArrowRight className="text-sm" />
        </Link>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-400 mb-4 uppercase tracking-wider font-medium">
            Popular Categories
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Electronics", "Fashion", "Home", "Beauty"].map((category) => (
              <Link
                key={category}
                href={`/categories`}
                className="px-5 py-2 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-600 text-gray-600 rounded-full text-sm font-medium transition-all border border-transparent hover:border-emerald-100"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
