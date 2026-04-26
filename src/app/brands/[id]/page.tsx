import React from "react";
import PageHeader from "../../_components/PageHeader";
import { FaTags } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../../_components/AddToCartBtn";
import { getBrandProducts } from "../../../Services/Brands/getBrandProducts";

export default async function SpecificBrandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const products = await getBrandProducts(id);

  const brandName =
    products.length > 0 ? products[0].brand.name : "Brand Products";

  return (
    <>
      <PageHeader
        title={brandName}
        description={`Discover our exclusive collection from ${brandName}`}
        breadcrumbSteps={[
          { name: "Brands", href: "/brands" },
          { name: brandName },
        ]}
        icon={<FaTags className="text-3xl" />}
        gradient="bg-gradient-to-br from-violet-600 via-violet-500 to-purple-400"
      />

      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.map((product: any) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <Link
                    href={`/product-details/${product._id}`}
                    className="block relative aspect-square bg-white"
                  >
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-[10px] font-bold text-violet-600 uppercase tracking-widest mb-1">
                      {product.category.name}
                    </span>
                    <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2 h-10 text-sm">
                      {product.title}
                    </h3>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                      <span className="text-base font-bold text-gray-900">
                        {product.price} <span className="text-[10px]">EGP</span>
                      </span>
                      {/* الزرار بتاعنا بوضعية الأيقونة */}
                      <AddToCartButton product={product} variant="icon" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTags className="text-gray-300 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No Products Found
              </h3>
              <p className="text-gray-500 mb-6">
                This brand doesn't have any products listed yet.
              </p>
              <Link
                href="/brands"
                className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                Back to Brands
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
