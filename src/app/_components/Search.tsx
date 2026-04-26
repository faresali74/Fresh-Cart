"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FaSliders,
  FaGripVertical,
  FaList,
  FaFilter,
  FaXmark,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { useCart } from "@/context/CartContext";
import { searchProducts } from "@/Services/Products/getAllProducts";
import { getCategories } from "@/Services/Category/AllCategory";
import { getBrands } from "@/Services/Brands/getAllBrands";
import ProductCard from "../_components/ProductCard";
import { Product } from "@/Services/Products/getAllProducts";

interface Category {
  _id: string;
  name: string;
}

interface Brand {
  _id: string;
  name: string;
}

const PRICE_PRESETS = [
  { label: "Under 500", max: 500 },
  { label: "Under 1K", max: 1000 },
  { label: "Under 5K", max: 5000 },
  { label: "Under 10K", max: 10000 },
];

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const { addToCart } = useCart();

  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState(query);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    getCategories().then(setCategories);
    getBrands().then(setBrands);
  }, []);

  const fetchResults = useCallback(async () => {
    setLoading(true);
    try {
      const data = await searchProducts({
        keyword: query || undefined,
        sort: sortBy || undefined,
        "price[gte]": minPrice || undefined,
        "price[lte]": maxPrice || undefined,
        category: selectedCategories.length ? selectedCategories : undefined,
        brand: selectedBrands.length ? selectedBrands : undefined,
      });
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [query, sortBy, minPrice, maxPrice, selectedCategories, selectedBrands]);

  useEffect(() => {
    setSearchInput(query);
    fetchResults();
  }, [query, fetchResults]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice("");
    setMaxPrice("");
    setSortBy("");
  };

  const toggleCategory = (id: string) =>
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );

  const toggleBrand = (id: string) =>
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id],
    );

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    !!minPrice ||
    !!maxPrice;

  const sidebarProps = {
    categories,
    brands,
    selectedCategories,
    selectedBrands,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    toggleCategory,
    toggleBrand,
    clearAllFilters,
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Top Search Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Search Results</span>
          </nav>

          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-lg"
              />
            </div>
          </form>

          <div className="mt-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Search Results for{" "}
              <span className="text-emerald-600">&quot;{query}&quot;</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {loading
                ? "Searching..."
                : `We found ${results.length} products for you`}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FilterSidebar {...sidebarProps} />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  <FaSliders /> Filters
                </button>

                <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "grid"
                        ? "bg-emerald-600 text-white"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <FaGripVertical />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "list"
                        ? "bg-emerald-600 text-white"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <FaList />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-white"
                >
                  <option value="">Relevance</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                  <option value="-ratingsAverage">Rating: High to Low</option>
                  <option value="title">Name: A to Z</option>
                  <option value="-title">Name: Z to A</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(hasActiveFilters || query) && (
              <div className="mb-6 flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <FaFilter className="text-xs" /> Active:
                </span>
                {query && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                    &quot;{query}&quot;
                    <button
                      onClick={() => router.push("/search")}
                      className="hover:text-red-500"
                    >
                      <FaXmark />
                    </button>
                  </span>
                )}
                {selectedCategories.map((id) => {
                  const cat = categories.find((c) => c._id === id);
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs"
                    >
                      {cat?.name}
                      <button
                        onClick={() => toggleCategory(id)}
                        className="hover:text-red-500"
                      >
                        <FaXmark />
                      </button>
                    </span>
                  );
                })}
                {selectedBrands.map((id) => {
                  const brand = brands.find((b) => b._id === id);
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs"
                    >
                      {brand?.name}
                      <button
                        onClick={() => toggleBrand(id)}
                        className="hover:text-red-500"
                      >
                        <FaXmark />
                      </button>
                    </span>
                  );
                })}
                {(maxPrice || minPrice) && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-100 text-orange-700 text-xs">
                    {minPrice || "0"} - {maxPrice || "∞"} EGP
                    <button
                      onClick={() => {
                        setMinPrice("");
                        setMaxPrice("");
                      }}
                      className="hover:text-red-500"
                    >
                      <FaXmark />
                    </button>
                  </span>
                )}
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-gray-500 hover:text-gray-700 underline ml-2"
                  >
                    Clear all
                  </button>
                )}
              </div>
            )}

            {/* Loading Skeleton */}
            {loading && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse"
                  >
                    <div className="w-full h-48 bg-gray-200 rounded-xl mb-3" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && results.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                  <FaMagnifyingGlass className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filters to find what you&apos;re
                  looking for.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {!loading && results.length > 0 && viewMode === "grid" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {results.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {/* List View */}
            {!loading && results.length > 0 && viewMode === "list" && (
              <div className="space-y-4">
                {results.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex gap-4 p-4"
                  >
                    <Link
                      href={`/products/${product._id}`}
                      className="relative w-28 h-28 bg-gray-50 rounded-xl shrink-0"
                    >
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        fill
                        className="object-contain p-2"
                      />
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <p className="text-xs text-emerald-600 font-medium mb-1">
                          {product.category?.name}
                        </p>
                        <Link href={`/products/${product._id}`}>
                          <h3 className="font-semibold text-gray-900 hover:text-emerald-600 transition-colors">
                            {product.title}
                          </h3>
                        </Link>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-gray-900">
                          {product.price} EGP
                        </span>
                        <button
                          onClick={() => addToCart(product)}
                          className="text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto lg:hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-lg">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <FaXmark />
              </button>
            </div>
            <FilterSidebar {...sidebarProps} />
          </div>
        </>
      )}
    </div>
  );
}

// ─── FilterSidebar ───────────────────────────────────────────────────────────

function FilterSidebar({
  categories,
  brands,
  selectedCategories,
  selectedBrands,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  toggleCategory,
  toggleBrand,
  clearAllFilters,
}: {
  categories: Category[];
  brands: Brand[];
  selectedCategories: string[];
  selectedBrands: string[];
  minPrice: string;
  maxPrice: string;
  setMinPrice: (v: string) => void;
  setMaxPrice: (v: string) => void;
  toggleCategory: (id: string) => void;
  toggleBrand: (id: string) => void;
  clearAllFilters: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24 space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2 max-h-52 overflow-y-auto">
          {categories.map((cat) => (
            <label
              key={cat._id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat._id)}
                onChange={() => toggleCategory(cat._id)}
                className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Price Range */}
      <div>
        <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Min (EGP)
            </label>
            <input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Max (EGP)
            </label>
            <input
              type="number"
              placeholder="No limit"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRICE_PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setMinPrice("");
                setMaxPrice(String(preset.max));
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                maxPrice === String(preset.max)
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Brands */}
      <div>
        <h3 className="font-bold text-gray-900 mb-4">Brands</h3>
        <div className="space-y-2 max-h-52 overflow-y-auto">
          {brands.map((brand) => (
            <label
              key={brand._id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand._id)}
                onChange={() => toggleBrand(brand._id)}
                className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                {brand.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      <button
        onClick={clearAllFilters}
        className="w-full py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
}
