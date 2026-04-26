"use client";
import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import {
  addNewAddress,
  AddressPayload,
} from "@/Services/user/Adresses/AddAdress";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddAddressModal({ isOpen, onClose, onSuccess }: Props) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = session?.accessToken;

    if (!token) {
      toast.error("Please login first");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const body: AddressPayload = {
      name: formData.get("name") as string,
      details: formData.get("details") as string,
      phone: formData.get("phone") as string,
      city: formData.get("city") as string,
    };

    setIsLoading(true);
    try {
      const result = await addNewAddress(body, token);
      if (result.status === "success") {
        toast.success("Address added successfully! 🏠");
        onSuccess();
        onClose();
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to add address";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add New Address</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <FaXmark />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address Name
            </label>
            <input
              name="name"
              placeholder="e.g. Home, Office"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
              required
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Address Details
            </label>
            <textarea
              name="details"
              placeholder="Street, building, apartment..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                name="phone"
                placeholder="01xxxxxxxxx"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                required
                type="tel"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                name="city"
                placeholder="Cairo"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                required
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 px-6 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 shadow-lg shadow-green-600/25"
            >
              {isLoading ? "Saving..." : "Add Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
