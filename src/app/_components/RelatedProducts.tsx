"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { getAllProducts } from "@/Services/Products/getAllProducts";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import {
  FaArrowLeft,
  FaArrowRight,
  FaEye,
  FaPlus,
  FaStar,
} from "react-icons/fa";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { FaArrowsRotate } from "react-icons/fa6";

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  category: { name: string; _id: string };
  ratingsAverage: number;
}

interface Props {
  categoryId: string;
  currentProductId: string;
}

export default function RelatedProducts({
  categoryId,
  currentProductId,
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      if (!categoryId) return;

      try {
        setIsLoading(true);

        const allProducts = await getAllProducts();

        if (allProducts && Array.isArray(allProducts)) {
          const filtered = allProducts.filter(
            (item: Product) =>
              item.category?._id === categoryId &&
              item._id !== currentProductId,
          );
          setProducts(filtered);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getProducts();
  }, [categoryId, currentProductId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        <span className="ml-3 text-emerald-600 font-medium">
          Loading Similar Products...
        </span>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <section id="similar-products" className="py-12 border-t border-gray-100">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8 px-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">
              You May Also <span className="text-emerald-600">Like</span>
            </h2>
          </div>

          <div className="flex space-x-2">
            <button className="prev-btn h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-emerald-100 hover:text-emerald-600 transition">
              <FaArrowRight size={16} className="rotate-180" />
              <span className="sr-only">Previous</span>
            </button>

            <button className="next-btn h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-emerald-100 hover:text-emerald-600 transition">
              <FaArrowLeft size={16} className="rotate-180" />

              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            480: { slidesPerView: 1.5 },
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 4.5 },
          }}
          className="pb-4"
        >
          {products.map((item) => (
            <SwiperSlide key={item._id}>
              <div
                id="product-card"
                className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300"
              >
                <div className="relative w-full h-60 bg-white p-4 overflow-hidden flex items-center justify-center">
                  <Image
                    src={item.imageCover}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-4"
                    priority={false}
                  />

                  <div className="absolute top-3 right-3 flex flex-col space-y-2 z-10">
                    <button
                      className="bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm text-gray-600 hover:text-red-500"
                      title="Add to wishlist"
                    >
                      <CiHeart />
                    </button>

                    <button className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-emerald-600 shadow-sm">
                      <FaArrowsRotate />
                    </button>

                    <Link
                      href={`/products/${item._id}`}
                      className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-emerald-600 shadow-sm"
                    >
                      <FaEye />{" "}
                    </Link>
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">
                    {item.category.name}
                  </div>
                  <h3
                    className="font-medium mb-1 cursor-pointer"
                    title={item.title}
                  >
                    <Link
                      href={`/products/${item._id}`}
                      className="line-clamp-2 text-gray-800 hover:text-emerald-600"
                    >
                      {item.title}
                    </Link>
                  </h3>

                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(item.ratingsAverage) ? "text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {item.ratingsAverage}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-800">
                        {item.price} EGP
                      </span>
                    </div>
                    <button className="h-10 w-10 rounded-full flex items-center justify-center transition bg-emerald-600 text-white hover:bg-emerald-700">
                      <FaPlus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
