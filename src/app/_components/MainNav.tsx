"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiChevronDown,
  FiMenu,
  FiX,
  FiHeadphones,
  FiArrowRight,
} from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import SigninBtn from "./SigninBtn";
import { useSession } from "next-auth/react";
import { useWishlist } from "@/context/WishlistContext";
import UserDropdown from "./LogedInUser";

export default function MainNav() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { wishlistIds = [] } = useWishlist() || {};
  const { itemCount, refreshCart } = useCart();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
    closeMenu();
  };

  useEffect(() => {
    window.addEventListener("cartUpdated", refreshCart);
    return () => {
      window.removeEventListener("cartUpdated", refreshCart);
    };
  }, [refreshCart]);

  return (
    <>
      <nav className="sticky top-0 w-full bg-white border-b border-gray-100 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-4 lg:gap-8">
            {/* Logo */}
            <Link href="/" className="shrink-0" onClick={closeMenu}>
              <Image
                src="/freshcart-logo.49f1b44d.svg"
                alt="FreshCart"
                width={160}
                height={31}
                className="h-6 lg:h-8 w-auto"
                priority
              />
            </Link>

            {/* Search Bar Desktop */}
            <form
              onSubmit={handleSearch}
              className="hidden lg:flex flex-1 max-w-2xl relative"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more..."
                className="w-full px-5 py-2.5 pr-12 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all text-sm"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-colors"
              >
                <FiSearch className="text-sm" />
              </button>
            </form>

            {/* Navigation Links Desktop */}
            <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-gray-700">
              <Link href="/" className="hover:text-green-600 transition-colors">
                Home
              </Link>
              <Link
                href="/products"
                className="hover:text-green-600 transition-colors"
              >
                Shop
              </Link>

              {/* Categories Dropdown */}
              <div className="relative group cursor-pointer py-2">
                <div className="flex items-center gap-1 group-hover:text-green-600 transition-colors">
                  <span>Categories</span>
                  <FiChevronDown className="text-[10px] transition-transform group-hover:rotate-180" />
                </div>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-52">
                  <div className="bg-white border border-gray-100 rounded-xl shadow-xl py-2 overflow-hidden">
                    {[
                      "Electronics",
                      "Women's Fashion",
                      "Men's Fashion",
                      "Beauty & Health",
                    ].map((cat) => (
                      <Link
                        key={cat}
                        href="/categories"
                        className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/brands"
                className="hover:text-green-600 transition-colors"
              >
                Brands
              </Link>

              {/* Support */}
              <Link
                href="/contacts"
                className="hidden lg:flex items-center gap-2 pr-4 mr-2 border-r border-gray-200 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <FiHeadphones />
                </div>
                <div className="text-[11px] leading-tight">
                  <div className="text-gray-400 font-medium tracking-tight">
                    Support
                  </div>
                  <div className="font-bold text-gray-800">24/7 Help</div>
                </div>
              </Link>
            </nav>

            {/* Action Icons */}
            <div className="flex items-center gap-2 lg:gap-4">
              <Link
                href="/wishlist"
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-green-600 relative transition-colors"
              >
                <FiHeart className="text-xl" />
                {wishlistIds.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-green-600 text-white text-[10px] flex items-center justify-center rounded-full animate-in fade-in zoom-in duration-300">
                    {wishlistIds.length > 99 ? "99+" : wishlistIds.length}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-green-600 relative transition-colors"
              >
                <FiShoppingCart className="text-xl" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-green-600 text-white text-[10px] flex items-center justify-center rounded-full animate-in fade-in zoom-in duration-300">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Link>

              <div className="hidden lg:block ml-2">
                {status === "authenticated" ? <UserDropdown /> : <SigninBtn />}
              </div>

              <button
                onClick={toggleMenu}
                className="lg:hidden w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
              >
                <FiMenu className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-100 shadow-2xl transition-transform duration-300 ease-in-out overflow-y-auto ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <Image
            src="/freshcart-logo.49f1b44d.svg"
            alt="FreshCart"
            width={140}
            height={30}
            className="h-7 w-auto"
          />
          <button
            onClick={closeMenu}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="p-4 border-b border-gray-100">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2.5 pr-10 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 text-sm"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center"
            >
              <FiSearch className="text-xs" />
            </button>
          </div>
        </form>

        {/* Nav Links */}
        <nav className="p-4 space-y-1">
          <MobileNavLink href="/" label="Home" onClick={closeMenu} />
          <MobileNavLink href="/products" label="Shop" onClick={closeMenu} />
          <MobileNavLink
            href="/categories"
            label="Categories"
            onClick={closeMenu}
          />
          <MobileNavLink href="/brands" label="Brands" onClick={closeMenu} />

          <div className="pt-4 border-t border-gray-100 mt-4 space-y-2">
            <Link
              href="/wishlist"
              onClick={closeMenu}
              className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-green-50 group"
            >
              <div className="flex items-center gap-3">
                <FiHeart className="text-red-500" />
                <span className="font-medium text-gray-700">
                  Wishlist ({wishlistIds.length})
                </span>
              </div>
              <FiArrowRight className="text-gray-300" />
            </Link>
            <Link
              href="/cart"
              onClick={closeMenu}
              className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-green-50 group"
            >
              <div className="flex items-center gap-3">
                <FiShoppingCart className="text-green-600" />
                <span className="font-medium text-gray-700">
                  Cart ({itemCount})
                </span>
              </div>
              <FiArrowRight className="text-gray-300" />
            </Link>
            <div className="pt-4 border-t border-gray-100 mt-4 px-2">
              {status === "authenticated" ? <UserDropdown /> : <SigninBtn />}
            </div>
          </div>
        </nav>
      </div>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-90 lg:hidden transition-opacity"
          onClick={closeMenu}
        />
      )}
    </>
  );
}

function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
    >
      {label}
    </Link>
  );
}
