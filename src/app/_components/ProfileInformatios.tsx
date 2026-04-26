"use client";
import React, { useState } from "react";
import { FaUser, FaFloppyDisk } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { updateUserData } from "@/Services/user/updateInformations";

interface UpdateProfileBody {
  name: string;
  email: string;
  phone: string;
}

export default function ProfileInfoForm() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = session?.accessToken;
    if (!token) {
      toast.error("Session expired, please login again");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const body: UpdateProfileBody = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    };

    setIsLoading(true);
    try {
      const result = await updateUserData(body, token);
      if (result.message === "success") {
        toast.success("Profile updated successfully! 🎉");
      }
    } catch (error) {
      console.log("Error updating profile:", error);
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-gray-500 text-sm mt-1">
          Update your profile information and change your password
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Main Form */}
        <div className="p-6 sm:p-8 border-b border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
              <FaUser className="text-2xl" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Profile Information</h3>
              <p className="text-sm text-gray-500">
                Update your personal details
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                name="name"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                required
                type="text"
                defaultValue={session?.user?.name || ""}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                required
                type="email"
                defaultValue={session?.user?.email || ""}
              />
            </div>

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

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="animate-pulse">Saving...</span>
                ) : (
                  <>
                    <FaFloppyDisk className="text-lg" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Account Meta */}
        <div className="p-6 sm:p-8 bg-gray-50/50">
          <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
            Account Metadata
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">User ID</span>
              <span className="font-mono text-gray-700 font-medium">
                {session?.user?.email
                  ? `#${btoa(session.user.email).slice(0, 8)}`
                  : "_"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Role</span>
              <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700 font-bold text-xs uppercase">
                User
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
