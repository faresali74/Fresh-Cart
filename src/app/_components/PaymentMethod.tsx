"use client";
import Image from "next/image";
import React from "react";
import {
  FaWallet,
  FaMoneyBill,
  FaCreditCard,
  FaCheck,
  FaShieldHalved,
} from "react-icons/fa6";
import visaImg from "../../../public/visa.png";
import mastercardImg from "../../../public/mastercard.png";
import amexImg from "../../../public/amex.png";

interface PaymentMethodProps {
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
}

export default function PaymentMethod({
  selectedMethod,
  setSelectedMethod,
}: PaymentMethodProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="bg-linear-to-r from-emerald-600 to-emerald-700 px-6 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FaWallet /> Payment Method
        </h2>
        <p className="text-emerald-100 text-sm mt-1">
          Choose how you&apos;d like to pay
        </p>
      </div>

      <div className="p-6 space-y-4">
        {/* Cash on Delivery */}
        <button
          type="button"
          onClick={() => setSelectedMethod("cash")}
          className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${
            selectedMethod === "cash"
              ? "border-emerald-500 bg-linear-to-r from-emerald-50 to-emerald-50/50 shadow-sm"
              : "border-gray-200 hover:border-emerald-200 hover:bg-gray-50"
          }`}
        >
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
              selectedMethod === "cash"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            <FaMoneyBill className="text-xl" />
          </div>
          <div className="flex-1 text-left">
            <h3
              className={`font-bold ${selectedMethod === "cash" ? "text-emerald-700" : "text-gray-900"}`}
            >
              Cash on Delivery
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Pay when your order arrives at your doorstep
            </p>
          </div>
          {selectedMethod === "cash" && (
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-emerald-600 text-white">
              <FaCheck className="text-xs" />
            </div>
          )}
        </button>

        {/* Pay Online */}
        <button
          type="button"
          onClick={() => setSelectedMethod("online")}
          className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${
            selectedMethod === "online"
              ? "border-emerald-500 bg-linear-to-r from-emerald-50 to-emerald-50/50 shadow-sm"
              : "border-gray-200 hover:border-emerald-200 hover:bg-gray-50"
          }`}
        >
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
              selectedMethod === "online"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            <FaCreditCard className="text-xl" />
          </div>
          <div className="flex-1 text-left">
            <h3
              className={`font-bold ${selectedMethod === "online" ? "text-emerald-700" : "text-gray-900"}`}
            >
              Pay Online
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Secure payment with Credit/Debit Card
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Image
                src={visaImg}
                alt="Visa"
                width={32}
                height={20}
                className="h-5 w-auto object-contain"
              />
              <Image
                src={mastercardImg}
                alt="Mastercard"
                width={32}
                height={20}
                className="h-5 w-auto object-contain"
              />
              <Image
                src={amexImg}
                alt="Amex"
                width={32}
                height={20}
                className="h-5 w-auto object-contain"
              />
            </div>
          </div>
          {selectedMethod === "online" && (
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-emerald-600 text-white">
              <FaCheck className="text-xs" />
            </div>
          )}
        </button>

        {/* Security Info */}
        <div className="flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <FaShieldHalved className="text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-800">
              Secure & Encrypted
            </p>
            <p className="text-xs text-green-600 mt-0.5">
              Your payment info is protected with 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
