"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiMinus,
  FiPlus,
  FiTrash,
  FiArrowLeft,
  FiShoppingCart,
} from "react-icons/fi";
import Swal from "sweetalert2";
import type { CartItem } from "@/context/CartContext";

interface CartItemsListProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, qty: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export default function CartItemsList({
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
}: CartItemsListProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleUpdateQty = async (id: string, newQty: number) => {
    if (newQty < 1) return;
    setUpdatingId(id);
    try {
      await updateQuantity(id, newQty);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemove = async (id: string) => {
    setUpdatingId(id);
    try {
      await removeFromCart(id);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleClearCart = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    });
    if (result.isConfirmed) {
      await clearCart();
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
        <FiShoppingCart size={50} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-bold">Your cart is empty</h2>
        <Link
          href="/"
          className="mt-4 inline-block bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cartItems.map((item) => {
        const isUpdating = updatingId === item._id;

        return (
          <div
            key={item._id}
            className={`bg-white rounded-2xl shadow-sm p-4 flex gap-4 border transition-all duration-300 ${
              isUpdating
                ? "border-emerald-200 opacity-70"
                : "border-gray-100 hover:border-emerald-100"
            }`}
          >
            <div className="w-24 h-24 relative shrink-0 bg-gray-50 rounded-lg overflow-hidden">
              {isUpdating && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-[1px]">
                  <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <Image
                src={item.imageCover}
                alt={item.title}
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900 truncate pr-4">
                  {item.title}
                </h3>
                <p className="font-bold text-gray-900 whitespace-nowrap">
                  {item.price} EGP
                </p>
              </div>

              <p className="text-sm text-emerald-600 font-medium mb-3">
                {typeof item.category === "object"
                  ? item.category?.name
                  : item.category}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200">
                  <button
                    disabled={isUpdating || item.quantity <= 1}
                    onClick={() => handleUpdateQty(item._id, item.quantity - 1)}
                    className="p-1.5 hover:text-red-500 disabled:text-gray-300 transition-colors"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="px-3 font-bold text-sm min-w-7.5 text-center">
                    {isUpdating ? "..." : item.quantity}
                  </span>
                  <button
                    disabled={isUpdating}
                    onClick={() => handleUpdateQty(item._id, item.quantity + 1)}
                    className="p-1.5 hover:text-emerald-600 disabled:text-gray-300 transition-colors"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>

                <button
                  disabled={isUpdating}
                  onClick={() => handleRemove(item._id)}
                  className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-all disabled:text-gray-300"
                >
                  <FiTrash size={18} />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex justify-between items-center mt-6 px-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-emerald-600 font-medium hover:gap-3 transition-all"
        >
          <FiArrowLeft /> Continue Shopping
        </Link>
        <button
          onClick={handleClearCart}
          className="text-red-500 text-sm font-medium hover:text-red-700 hover:underline transition-all"
        >
          Clear Shopping Cart
        </button>
      </div>
    </div>
  );
}
