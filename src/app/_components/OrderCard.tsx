"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  FaBox,
  FaClock,
  FaTruck,
  FaMoneyBill,
  FaCreditCard,
  FaCalendarDays,
  FaLocationDot,
  FaHashtag,
  FaChevronDown,
} from "react-icons/fa6";
import { FaPhone, FaReceipt } from "react-icons/fa";
import { Order } from "@/types/order";

export default function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);

  const status = order.isDelivered
    ? "Delivered"
    : order.isPaid
      ? "On the way"
      : "Processing";

  const statusConfig = {
    Delivered: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      icon: <FaBox className="text-xs" />,
    },
    "On the way": {
      bg: "bg-blue-100",
      text: "text-blue-600",
      icon: <FaTruck className="text-xs" />,
    },
    Processing: {
      bg: "bg-amber-100",
      text: "text-amber-600",
      icon: <FaClock className="text-xs" />,
    },
  };

  const { bg, text, icon } = statusConfig[status];

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const firstProduct = order.cartItems[0];
  const extraCount = order.cartItems.length - 1;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="p-5 sm:p-6 flex gap-5">
        {/* Product Image */}
        <div className="relative shrink-0">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gray-50 border border-gray-100 p-2.5 overflow-hidden">
            <Image
              alt={firstProduct?.product?.title || "product"}
              className="object-contain"
              src={firstProduct?.product?.imageCover}
              fill
            />
          </div>
          {extraCount > 0 && (
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
              +{extraCount}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg mb-2 ${bg} ${text}`}
              >
                {icon}
                <span className="text-xs font-semibold">{status}</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-1">
                <FaHashtag className="text-xs text-gray-400" />
                {order._id.slice(-6).toUpperCase()}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100">
              {order.paymentMethodType === "cash" ? (
                <FaMoneyBill className="text-gray-600" />
              ) : (
                <FaCreditCard className="text-purple-600" />
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1.5">
              <FaCalendarDays className="text-xs text-gray-400" />
              {formattedDate}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1.5">
              <FaBox className="text-xs text-gray-400" />
              {order.cartItems.length} items
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1.5">
              <FaLocationDot className="text-xs text-gray-400" />
              {order.shippingAddress?.city || "N/A"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                {order.totalOrderPrice.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-gray-400 ml-1">
                EGP
              </span>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Details
              <FaChevronDown
                className={`text-xs transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50/50">
          <div className="p-5 sm:p-6">
            <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center">
                <FaReceipt className="text-xs text-emerald-600" />
              </div>
              Order Items
            </h4>
            <div className="space-y-3">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100"
                >
                  <div className="relative w-16 h-16 rounded-xl bg-gray-50 p-2 shrink-0">
                    <Image
                      alt={item.product.title}
                      className="object-contain"
                      src={item.product.imageCover}
                      fill
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {item.product.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-medium text-gray-700">
                        {item.count}
                      </span>{" "}
                      × {item.price} EGP
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-gray-900">
                      {item.price}
                    </p>
                    <p className="text-xs text-gray-400">EGP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-5 sm:px-6 pb-5 sm:pb-6 grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-gray-100">
              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FaLocationDot className="text-xs text-blue-600" />
                </div>
                Delivery Address
              </h4>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">
                  {order.shippingAddress?.city || "N/A"}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {order.shippingAddress?.details || "N/A"}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2 pt-1">
                  <FaPhone className="text-xs text-gray-400" />
                  {order.shippingAddress?.phone || "N/A"}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-100 border border-blue-200">
              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-blue-500 flex items-center justify-center">
                  <FaTruck className="text-xs text-white" />
                </div>
                Order Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    {order.totalOrderPrice.toLocaleString()} EGP
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <hr className="border-gray-200/50 my-2" />
                <div className="flex justify-between pt-1">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-lg text-gray-900">
                    {order.totalOrderPrice.toLocaleString()} EGP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
