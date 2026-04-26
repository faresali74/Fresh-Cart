"use client";
import { getUserAddresses } from "@/Services/user/Adresses/GetUserAdressrs";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCity } from "react-icons/fa";
import {
  FiHome,
  FiBookmark,
  FiMapPin,
  FiPhone,
  FiPlus,
  FiInfo,
} from "react-icons/fi";

export default function ShippingAddressForm({
  selectedAddressId,
  setSelectedAddressId,
}: {
  selectedAddressId: string | null;
  setSelectedAddressId: (id: string | null) => void;
}) {
  const { data: session } = useSession();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // منطق التحقق هل المستخدم اختار عنوان جديد
  const isNewAddress = selectedAddressId === "new";

  useEffect(() => {
    const fetchAddresses = async () => {
      const token = session?.accessToken;
      if (!token) return;

      try {
        setIsLoading(true);
        const result = await getUserAddresses(token);
        if (result && result.data) {
          setAddresses(result.data);
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to load addresses");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, [session]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-linear-to-r from-emerald-600 to-emerald-700 px-6 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FiHome /> Shipping Address
        </h2>
        <p className="text-emerald-100 text-sm mt-1">
          Where should we deliver your order?
        </p>
      </div>

      <div className="p-6 space-y-5">
        {/* Saved Addresses Section */}
        <div className="pb-5 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <FiBookmark className="text-emerald-500" />
            <span className="font-semibold text-gray-800">Saved Addresses</span>
          </div>

          <div className="space-y-3">
            {isLoading ? (
              <p className="text-sm text-gray-400">Loading your addresses...</p>
            ) : (
              <>
                {addresses.map((address) => {
                  const isSelected = selectedAddressId === address._id;
                  return (
                    <button
                      key={address._id}
                      type="button"
                      onClick={() => setSelectedAddressId(address._id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 
                        ${isSelected ? "border-emerald-500 bg-emerald-50 shadow-sm" : "border-gray-200 hover:border-emerald-200"}`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors 
                          ${isSelected ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-500"}`}
                        >
                          <FiMapPin />
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-semibold ${isSelected ? "text-emerald-900" : "text-gray-900"}`}
                          >
                            {address.name || "Saved Address"}
                          </p>
                          <p className="text-sm text-gray-600 mt-0.5">
                            {address.details}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <FiPhone size={12} /> {address.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaCity size={12} /> {address.city}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}

                {/* New Address Option */}
                <button
                  type="button"
                  onClick={() => setSelectedAddressId("new")}
                  className={`w-full p-4 rounded-xl border-2 border-dashed text-left transition-all duration-200 
                    ${isNewAddress ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-emerald-200"}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${isNewAddress ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-500"}`}
                    >
                      <FiPlus />
                    </div>
                    <div>
                      <p
                        className={`font-semibold ${isNewAddress ? "text-emerald-700" : "text-gray-700"}`}
                      >
                        Use a different address
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Enter a new shipping address manually
                      </p>
                    </div>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <FiInfo className="text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm text-blue-800 font-medium">
              Delivery Information
            </p>
            <p className="text-xs text-blue-600 mt-0.5">
              Please ensure your address is accurate for smooth delivery
            </p>
          </div>
        </div>

        {/* Form Fields - Disabled if not New Address */}
        <div
          className={`space-y-4 transition-opacity ${!isNewAddress ? "opacity-50" : "opacity-100"}`}
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City *
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FaCity />
              </div>
              <input
                required={isNewAddress}
                disabled={!isNewAddress}
                className="w-full px-4 py-3.5 pl-12 border-2 rounded-xl focus:outline-none border-gray-200 focus:border-emerald-500 transition-all disabled:cursor-not-allowed"
                placeholder="e.g. Cairo"
                type="text"
                name="city"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Street Address *
            </label>
            <textarea
              required={isNewAddress}
              disabled={!isNewAddress}
              rows={3}
              className="w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none border-gray-200 focus:border-emerald-500 transition-all resize-none disabled:cursor-not-allowed"
              placeholder="Street name, building number..."
              name="details"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FiPhone />
              </div>
              <input
                required={isNewAddress}
                disabled={!isNewAddress}
                className="w-full px-4 py-3.5 pl-12 border-2 rounded-xl focus:outline-none border-gray-200 focus:border-emerald-500 transition-all disabled:cursor-not-allowed"
                placeholder="01xxxxxxxxx"
                type="tel"
                name="phone"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
