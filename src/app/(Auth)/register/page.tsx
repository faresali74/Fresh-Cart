"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaStar,
  FaTruckFast,
  FaShieldHalved,
  FaGoogle,
  FaFacebook,
} from "react-icons/fa6";
import Image from "next/image";
import authorImg from "../../../../public/review-author.png";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  RegisterFormData,
  RegisterSchema,
  defaultValues,
} from "@/schema/AuthSchema/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/Services/Auth/Signup";
import toast from "react-hot-toast";

// ✅ برا الـ component
function getStrength(password: string): {
  width: string;
  color: string;
  label: string;
} {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 25;
  if (/[^A-Za-z0-9]/.test(password)) strength += 25;

  if (strength === 0) return { width: "0%", color: "bg-gray-200", label: "" };
  if (strength <= 25)
    return { width: "25%", color: "bg-red-500", label: "Weak" };
  if (strength <= 50)
    return { width: "50%", color: "bg-orange-500", label: "Medium" };
  if (strength <= 75)
    return { width: "75%", color: "bg-yellow-500", label: "Strong" };
  return { width: "100%", color: "bg-green-500", label: "Very Strong" };
}

export default function RegisterPage() {
  const router = useRouter(); // ✅ router مش route
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues,
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  const { password: passwordValue, email: emailValue } = watch();
  const strengthInfo = getStrength(passwordValue ?? "");

  const onSubmit = async (values: RegisterFormData) => {
    setServerError(null);
    try {
      const data = await registerUser(values);
      toast.success("Account created successfully!");
      console.log("Registered user data:", data);
      router.push("/login");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Registration failed";
      setServerError(message);
      toast.error(message);
    }
  };

  return (
    <main className="py-10 bg-gray-50 min-h-screen flex items-center">
      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4">
        {/* Left Side */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to <span className="text-green-600">FreshCart</span>
          </h1>
          <p className="text-xl text-gray-600 mt-2 mb-4">
            Join thousands of happy customers who enjoy fresh groceries
            delivered right to their doorstep.
          </p>

          <ul className="space-y-6 my-8">
            <li className="flex items-start gap-4">
              <div className="size-12 shrink-0 bg-green-100 text-green-600 rounded-full flex justify-center items-center text-lg">
                <FaStar />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Premium Quality
                </h2>
                <p className="text-gray-600 text-sm">
                  Premium quality products sourced from trusted suppliers.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="size-12 shrink-0 bg-green-100 text-green-600 rounded-full flex justify-center items-center text-lg">
                <FaTruckFast />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Fast Delivery
                </h2>
                <p className="text-gray-600 text-sm">
                  Same-day delivery available in most areas
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="size-12 shrink-0 bg-green-100 text-green-600 rounded-full flex justify-center items-center text-lg">
                <FaShieldHalved />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Secure Shopping
                </h2>
                <p className="text-gray-600 text-sm">
                  Your data and payments are completely secure
                </p>
              </div>
            </li>
          </ul>

          {/* Testimonial */}
          <div className="bg-white shadow-sm p-6 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="size-12 rounded-full bg-gray-200 overflow-hidden">
                <Image
                  src={authorImg}
                  alt="Sarah Johnson"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                  priority
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">
                  Sarah Johnson
                </h3>
                <div className="flex text-yellow-400 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>
            <p className="italic text-[#4a5565] text-md font-medium leading-relaxed">
              &quot;FreshCart has transformed my shopping experience. The
              quality of the products is outstanding, and the delivery is always
              on time. Highly recommend!&quot;
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 px-8 py-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-[#364153] mb-2">
              Create Your Account
            </h2>
            <p className="text-[#364153] text-md font-medium">
              Start your fresh journey with us today
            </p>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4 mb-8">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-md text-gray-700">
              <FaGoogle className="text-red-500" /> Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-md text-gray-700">
              <FaFacebook className="text-blue-600" /> Facebook
            </button>
          </div>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center px-2">
              <div className="w-full border-t border-gray-200" />
            </div>
            <span className="relative px-4 bg-white text-gray-400 text-sm">
              or
            </span>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="space-y-1.5">
              <label
                className="text-sm font-semibold text-gray-700"
                htmlFor="name"
              >
                Name*
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all"
                placeholder="Ali"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label
                className="text-sm font-semibold text-gray-700"
                htmlFor="email"
              >
                Email*
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all"
                placeholder="ali@example.com"
                {...register("email", { onChange: () => setServerError(null) })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
              {serverError && emailValue !== "" && !errors.email && (
                <p className="text-red-600 text-xs mt-1 font-medium bg-red-50 p-2 rounded-lg border border-red-100">
                  {serverError}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                className="text-sm font-semibold text-gray-700"
                htmlFor="password"
              >
                Password*
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all"
                placeholder="create a strong password"
                {...register("password")}
              />
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strengthInfo.color}`}
                    style={{ width: strengthInfo.width }}
                  />
                </div>
                <span className="text-[10px] font-medium text-gray-400 min-w-15">
                  {strengthInfo.label}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label
                className="text-sm font-semibold text-gray-700"
                htmlFor="rePassword"
              >
                Confirm Password*
              </label>
              <input
                id="rePassword"
                type="password"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all"
                placeholder="confirm your password"
                {...register("rePassword")}
              />
              {errors.rePassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.rePassword.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label
                className="text-sm font-semibold text-gray-700"
                htmlFor="phone"
              >
                Phone Number*
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all"
                placeholder="+1 234 567 8900"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 py-2">
              <input
                type="checkbox"
                id="terms"
                className="size-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <Link href="/terms" className="text-green-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-green-600 hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                *
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-green-600/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating Account..." : "Create My Account"}
            </button>
          </form>

          <p className="border-t border-gray-100 pt-8 mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-green-600 font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
