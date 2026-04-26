"use client";
import React from "react";
import { FaGift, FaPhoneAlt } from "react-icons/fa";
import { MdLocalShipping, MdOutlineEmail } from "react-icons/md";
import SigninBtn from "./SigninBtn";
import SignupBtn from "./SignupBtn";
import { useSession } from "next-auth/react";
import SignOut from "./SignOutBtn";

export default function TopNav() {
  const { data: session, status } = useSession();

  return (
    <div className="w-full border-b border-gray-100 lg:block hidden bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center h-10 gap-4">
          {/* Left Side: Features */}
          <div className="flex items-center gap-6">
            <div className="flex items-center text-[#6a7282] font-medium text-[13px] transition-colors hover:text-[#16A34A]">
              <MdLocalShipping className="text-[#16A34A] text-base me-2" />
              <span>Free Shipping on Orders 500 EGP</span>
            </div>
            <div className="flex items-center text-[#6a7282] font-medium text-[13px] transition-colors hover:text-[#16A34A]">
              <FaGift className="text-[#16A34A] text-sm me-2" />
              <span>New Arrivals Daily</span>
            </div>
          </div>

          {/* Right Side: Contact & Auth */}
          <div className="flex items-center h-full">
            {/* Phone Link */}
            <a
              href="tel:+18001234567"
              className="flex items-center text-[#6a7282] font-medium text-[13px] px-4 hover:text-[#16A34A] transition-colors h-full border-r border-gray-200"
            >
              <FaPhoneAlt className="me-2 text-[10px]" />
              <span>+1 (800) 123-4567</span>
            </a>

            {/* Email Link */}
            <a
              href="mailto:support@freshcart.com"
              className="flex items-center text-[#6a7282] font-medium text-[13px] px-4 hover:text-[#16A34A] transition-colors h-full border-r border-gray-200"
            >
              <MdOutlineEmail className="me-2 text-base" />
              <span>support@freshcart.com</span>
            </a>

            {/* Auth Buttons */}
            <div className="flex items-center h-full gap-2 ps-4">
              <div className="flex items-center h-full gap-2 ps-4">
                {status === "authenticated" ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-gray-700">
                      Hi,{" "}
                      <span className="text-[#16A34A]">
                        {session?.user?.name?.split(" ")[0]}
                      </span>
                    </span>
                    <SignOut variant="ghost" />
                  </div>
                ) : status === "loading" ? (
                  <div className="w-20 h-4 bg-gray-100 animate-pulse rounded"></div>
                ) : (
                  <>
                    <SigninBtn variant="ghost" />
                    <div className="h-4 w-px bg-gray-200 mx-1"></div>
                    <SignupBtn />
                  </>
                )}
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
