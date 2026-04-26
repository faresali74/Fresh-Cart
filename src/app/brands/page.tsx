import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { FaTags } from "react-icons/fa";
import { Metadata } from "next";
import PageHeader from "../_components/PageHeader";
import { getBrands } from "../../Services/Brands/getAllBrands";

export const metadata: Metadata = {
  title: "FreshCart | Top Brands",
  description: "Browse products by your favorite brands",
};

export default async function BrandsPage() {
  const brandsData = await getBrands();

  return (
    <>
      <PageHeader
        title="Top Brands"
        description="Shop from your favorite international brands"
        breadcrumbSteps={[{ name: "Brands" }]}
        icon={<FaTags className="text-3xl" />}
        gradient="bg-gradient-to-br from-violet-600 via-violet-500 to-purple-400"
      />

      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          {brandsData.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-500 font-medium">
                No brands available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {brandsData.map((brand) => (
                <Link
                  key={brand._id}
                  href={`/brands/${brand._id}`}
                  className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1 block"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 p-4 flex items-center justify-center relative">
                    <Image
                      alt={brand.name}
                      src={brand.image}
                      fill
                      sizes="(max-width: 768px) 50vw, 15vw"
                      className="object-contain group-hover:scale-110 transition-transform duration-500 p-2"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-center text-sm group-hover:text-violet-600 transition-colors truncate">
                    {brand.name}
                  </h3>
                  <div className="flex justify-center mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] text-violet-600 flex items-center gap-1 font-bold uppercase tracking-wider">
                      View Products
                      <FiArrowRight size={10} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
