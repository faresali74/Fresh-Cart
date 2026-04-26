"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaBox, FaBagShopping, FaTriangleExclamation } from "react-icons/fa6";
import { Order } from "@/types/order";
import { getUserOrders } from "@/Services/Orders/GetUserOrders";
import OrderCard from "./OrderCard";

export default function OrdersList() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session?.accessToken || !session?.user?.id) {
        setLoading(false);
        return;
      }
      try {
        const data = await getUserOrders(session.user.id, session.accessToken);
        setOrders(data);
      } catch (err) {
        console.error("fetch error:", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-emerald-600 transition">
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">My Orders</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <FaBox className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                My Orders
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                {loading
                  ? "Loading..."
                  : `Track and manage your ${orders.length} order${orders.length !== 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-emerald-50 transition-all text-sm"
          >
            <FaBagShopping /> Continue Shopping
          </Link>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse"
            >
              <div className="flex gap-5">
                <div className="w-24 h-24 rounded-2xl bg-gray-200" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <FaTriangleExclamation className="text-orange-500 text-5xl mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
            <FaBox className="text-4xl text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            No orders yet
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            Start shopping to see your orders here
          </p>
          <Link
            href="/products"
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
          >
            Browse Products
          </Link>
        </div>
      )}

      {/* Orders List */}
      {!loading && !error && orders.length > 0 && (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
