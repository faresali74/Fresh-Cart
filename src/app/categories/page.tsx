import React from "react";
import PageHeader from "../_components/PageHeader";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { getCategories } from "../../Services/Category/AllCategory";
import Image from "next/image";

export default async function CategoriesPage() {
  const categoriesData = await getCategories();

  return (
    <>
      <section className=" bg-gray-50">
        <PageHeader
          title="All categories"
          description="Browse our wide range of product categories"
          breadcrumbSteps={[{ name: "Categories" }]}
        />
        <div className="container mx-auto px-4 py-8 ">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categoriesData.map((category) => (
              <Link
                key={category._id}
                href={`/categories/${category._id}`}
                className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1 block"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4 relative">
                  <Image
                    alt={category.name}
                    src={category.image}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <h3 className="font-bold text-gray-900 text-center group-hover:text-emerald-600 transition-colors">
                  {category.name}
                </h3>

                <div className="flex justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                    View Subcategories
                    <FiArrowRight className="text-[10px]" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
