"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import {
  FaGoogle,
  FaFacebook,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaTruck,
  FaShieldHalved,
  FaClock,
  FaUsers,
  FaStar,
} from "react-icons/fa6";

import img from "../../../../public/2e5810ff3e-e750761ebcd4ae5907db.png";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingToast = toast.loading("Logging you in...");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error, { id: loadingToast });
      } else {
        toast.success("Welcome back!", { id: loadingToast });
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred",
        { id: loadingToast },
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container py-16 mx-auto px-4" id="login-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {/* Left Side: Illustration & Info */}
        <div className="hidden lg:block">
          <div className="text-center space-y-6">
            <div className="relative w-full h-96">
              <Image
                src={img}
                alt="fresh vegetables"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover rounded-2xl shadow-lg"
                priority
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">
                FreshCart - Your One-Stop Shop
              </h2>
              <p className="text-lg text-gray-600">
                Join thousands of happy customers today
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <FaTruck className="text-green-600" /> Free Delivery
                </div>
                <div className="flex items-center gap-2">
                  <FaShieldHalved className="text-green-600" /> Secure Payment
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-green-600" /> 24/7 Support
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-50">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-green-600">
                  Fresh<span className="text-gray-800">Cart</span>
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome Back!
              </h1>
              <p className="text-gray-600">Sign in to continue shopping</p>
            </div>

            {/* Social Logins */}
            <div className="space-y-3 mb-6">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-100 rounded-xl hover:border-green-200 hover:bg-green-50 transition-all"
              >
                <FaGoogle className="text-red-500" />{" "}
                <span className="font-medium">Google</span>
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-100 rounded-xl hover:border-green-200 hover:bg-green-50 transition-all"
              >
                <FaFacebook className="text-blue-600" />{" "}
                <span className="font-medium">Facebook</span>
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400 font-medium uppercase text-xs">
                  Or email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    name="email"
                    required
                    className="w-full px-4 py-3 pl-12 border-2 border-gray-100 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all"
                    placeholder="name@example.com"
                    type="email"
                  />
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <Link
                    href="/forget-password"
                    className="text-sm text-green-600 hover:text-green-700 font-semibold"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    name="password"
                    required
                    className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-100 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                  />
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="remember"
                    className="size-4 text-green-600 accent-green-600 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-sm text-gray-600 font-medium">
                    Keep me signed in
                  </span>
                </label>
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-green-600 text-white py-3.5 px-4 rounded-xl hover:bg-green-700 transition-all font-bold text-lg shadow-lg disabled:opacity-70"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="text-center mt-8 pt-6 border-t border-gray-100">
              <p className="text-gray-600">
                New to FreshCart?{" "}
                <Link href="/register" className="text-green-600 font-bold">
                  Create account
                </Link>
              </p>
            </div>

            <div className="flex items-center justify-center space-x-6 mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              <div className="flex items-center gap-1">
                <FaLock /> SSL
              </div>
              <div className="flex items-center gap-1">
                <FaUsers /> 50K+
              </div>
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" /> 4.9
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
