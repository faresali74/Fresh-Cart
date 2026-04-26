"use client";

import React, { useState } from "react";
import {
  Box,
  Star,
  Truck,
  Check,
  MessageSquare,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { Product } from "@/Services/Products/getAllProducts";

export default function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState("details");

  const tabs = [
    { id: "details", label: "Product Details", icon: <Box size={18} /> },
    {
      id: "reviews",
      label: `Reviews (${product?.ratingsQuantity || 0})`,
      icon: <Star size={18} />,
    },
    { id: "shipping", label: "Shipping & Returns", icon: <Truck size={18} /> },
  ];

  const ratingsStats = [
    { stars: 5, percentage: 60 },
    { stars: 4, percentage: 25 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 5 },
    { stars: 1, percentage: 5 },
  ];

  return (
    <section id="product-details-tabs" className="py-8 w-full">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          {/* Tabs Header */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${
                    activeTab === tab.id
                      ? "text-emerald-600 border-emerald-600 bg-emerald-50/50"
                      : "text-gray-600 border-transparent hover:text-emerald-600 hover:bg-gray-50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* 1. Product Details Tab */}
            {activeTab === "details" && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    About this Product
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product?.description}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Product Information
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Category</span>
                        <span className="text-gray-900 font-medium">
                          {product?.category?.name}
                        </span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Brand</span>
                        <span className="text-gray-900 font-medium">
                          {product?.brand?.name}
                        </span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span className="text-gray-500">Items Sold</span>
                        <span className="text-gray-900 font-medium">
                          {product?.sold}+ sold
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Premium Quality",
                        "100% Authentic",
                        "Quality Tested",
                      ].map((f, i) => (
                        <li
                          key={i}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <Check size={16} className="text-emerald-600 mr-2" />{" "}
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                  <div className="text-center md:border-r md:pr-10 border-gray-200">
                    <div className="text-6xl font-bold text-gray-900 mb-2">
                      {product?.ratingsAverage || 0}
                    </div>
                    <div className="flex justify-center text-yellow-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          fill={
                            i < Math.floor(product?.ratingsAverage || 0)
                              ? "currentColor"
                              : "none"
                          }
                          className={
                            i < Math.floor(product?.ratingsAverage || 0)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">
                      Based on {product?.ratingsQuantity || 0} reviews
                    </p>
                  </div>
                  <div className="flex-1 w-full space-y-3">
                    {ratingsStats.map((stat) => (
                      <div key={stat.stars} className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 w-12 font-medium">
                          {stat.stars} star
                        </span>
                        <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full transition-all duration-700"
                            style={{ width: `${stat.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500 w-10 text-right">
                          {stat.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-8 text-center">
                  <MessageSquare
                    className="mx-auto text-gray-300 mb-3"
                    size={40}
                  />
                  <p className="text-gray-500">
                    Customer reviews will be displayed here.
                  </p>
                  <button className="mt-4 text-emerald-600 font-semibold">
                    Write a Review
                  </button>
                </div>
              </div>
            )}

            {/* 3. Shipping & Returns Tab (New Design Integrated) */}
            {activeTab === "shipping" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Shipping Info Card */}
                  <div className="bg-linear-to-br from-emerald-50 to-emerald-100 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 bg-emerald-600 text-white rounded-full flex items-center justify-center">
                        <Truck size={24} />
                      </div>
                      <h4 className="font-semibold text-gray-900">
                        Shipping Information
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      {[
                        "Free shipping on orders over 500 EGP",
                        "Standard delivery: 3-5 business days",
                        "Express delivery available",
                        "Track your order in real-time",
                      ].map((text, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <Check
                            size={16}
                            className="text-emerald-600 mt-0.5 shrink-0"
                          />
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Returns Card */}
                  <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center">
                        <RotateCcw size={24} />
                      </div>
                      <h4 className="font-semibold text-gray-900">
                        Returns & Refunds
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      {[
                        "14-day hassle-free returns",
                        "Full refund or exchange available",
                        "Free return on defective items",
                        "Easy online return process",
                      ].map((text, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <Check
                            size={16}
                            className="text-green-600 mt-0.5 shrink-0"
                          />
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Buyer Protection */}
                <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4">
                  <div className="h-14 w-14 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center shrink-0">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Buyer Protection Guarantee
                    </h4>
                    <p className="text-sm text-gray-600">
                      Get a full refund if your order doesn&apos;t arrive or
                      isn&apos;t as described. We ensure your shopping
                      experience is safe and secure.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
