"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  FaRegCircleUser,
  FaRegUser,
  FaBoxOpen,
  FaRegHeart,
  FaRegAddressBook,
  FaGear,
  FaRightFromBracket,
} from "react-icons/fa6";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="relative">
      {/* 1. Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
      >
        <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-600">
          <FaRegCircleUser className="text-xl" />
        </div>
        <span className="text-sm font-bold text-gray-700 hidden sm:inline-block">
          {session?.user?.name?.split(" ")[0] || "Account"}
        </span>
      </button>

      {/* 2. Dropdown Menu Card */}
      {isOpen && (
        <>
          {/* Close overlay when clicking outside */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="absolute right-0 top-full mt-3 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* User Info Header */}
            <div className="p-4 border-b border-gray-50 bg-gray-50/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white shadow-lg shadow-green-200">
                  <FaRegUser className="text-lg" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">
                    {session?.user?.name || "User Name"}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {session?.user?.email || "user@example.com"}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Links */}
            <div className="py-2">
              <DropdownLink
                href="/profile/addresses"
                icon={<FaRegUser />}
                label="My Profile"
              />
              <DropdownLink
                href="/allorders"
                icon={<FaBoxOpen />}
                label="My Orders"
              />
              <DropdownLink
                href="/wishlist"
                icon={<FaRegHeart />}
                label="My Wishlist"
              />
              <DropdownLink
                href="/profile/addresses"
                icon={<FaRegAddressBook />}
                label="Addresses"
              />
              <DropdownLink
                href="/profile/settings"
                icon={<FaGear />}
                label="Settings"
              />
            </div>

            {/* Logout Button */}
            <div className="border-t border-gray-50 py-2">
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left font-semibold"
              >
                <FaRightFromBracket className="w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Helper Component for Links
function DropdownLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
    >
      <span className="w-4 text-gray-400 group-hover:text-green-600">
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
