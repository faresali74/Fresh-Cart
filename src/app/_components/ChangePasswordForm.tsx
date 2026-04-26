"use client";
import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa6";
import { useSession, signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { updateUserPassword } from "@/Services/Auth/UpdatePassword";

export default function ChangePasswordForm() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = session?.accessToken;
    if (!token) {
      toast.error("Session expired, please login again");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const body = {
      currentPassword: formData.get("currentPassword") as string,
      password: formData.get("password") as string,
      rePassword: formData.get("rePassword") as string,
    };

    if (body.password !== body.rePassword) {
      toast.error("New passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      const result = await updateUserPassword(body, token);

      if (result.message === "success") {
        toast.success("Password updated! Redirecting to login...");
        setTimeout(() => {
          signOut({ redirect: true, callbackUrl: "/login" }).catch(() => {
            window.location.href = "/login";
          });
        }, 1500);
      }
    } catch (error: unknown) {
      const err = error as { errors?: { msg: string }; message?: string };
      const errorMessage =
        err?.errors?.msg || err?.message || "Failed to update password";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
            <FaLock className="text-2xl" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Change Password</h3>
            <p className="text-sm text-gray-500">
              Update your account password
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                name="currentPassword"
                type={showCurrent ? "text" : "password"}
                placeholder="Enter your current password"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-600 transition-colors"
              >
                {showCurrent ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showNew ? "text" : "password"}
                placeholder="Enter your new password"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-600 transition-colors"
              >
                {showNew ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1 italic">
              Must be at least 6 characters
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                name="rePassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your new password"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-600 transition-colors"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-all shadow-lg shadow-amber-600/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="animate-pulse">Updating...</span>
              ) : (
                <>
                  <FaLock className="text-sm" />
                  Change Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
