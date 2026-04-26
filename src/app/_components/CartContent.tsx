"use client";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import CartItemsList from "../_components/CartItemList";
import EmptyCart from "../_components/EmptyCart";
import OrderSummaryLogedIn from "../_components/CheckoutLogedIn";
import OrderSummary from "./OederSummary";

export default function CartContent() {
  const { data: session } = useSession();
  const {
    cartItems,
    itemCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const shipping = 50;
  const finalTotal = (Number(cartTotal) || 0) + shipping;
  const isLoggedIn = session?.accessToken;

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FiShoppingCart className="text-emerald-600" /> Shopping Cart
          </h1>
          <p className="text-gray-500 mt-2">
            You have{" "}
            <span className="font-semibold text-emerald-600">
              {itemCount} items
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartItemsList
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          </div>

          <div>
            {isLoggedIn ? (
              <OrderSummaryLogedIn
                subtotal={cartTotal}
                itemCount={itemCount}
                total={finalTotal}
                shipping={shipping}
              />
            ) : (
              <OrderSummary subtotal={cartTotal} itemCount={itemCount} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
