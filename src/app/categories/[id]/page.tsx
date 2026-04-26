import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineFolderOpen,
  HiOutlineArrowLeft,
  HiStar,
} from "react-icons/hi2";
import { getProductsByCategory } from "@/Services/Products/getProductByCategory";
import PageHeader from "@/app/_components/PageHeader";
import AddToCartButton from "@/app/_components/AddToCartBtn";

export interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage: number;
  category: {
    name: string;
  };
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const products = await getProductsByCategory(id);
  const categoryName =
    products?.length > 0 ? products[0].category.name : "Category";
  return { title: `FreshCart | ${categoryName}` };
}

export default async function CategoryProductsPage({ params }: PageProps) {
  const { id } = await params; // فك الـ Promise
  const products = await getProductsByCategory(id);
  const categoryName =
    products?.length > 0 ? products[0].category.name : "Category";

  return (
    <main className="pb-20">
      <PageHeader
        title={categoryName}
        description={
          products?.length > 0
            ? `Explore the best deals in ${categoryName}`
            : "No products available in this category"
        }
        breadcrumbSteps={[
          { name: "Categories", href: "/categories" },
          { name: categoryName },
        ]}
      />

      <div className="container mx-auto px-4 mt-10">
        {products && products.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <p className="text-gray-500 font-medium">
                Showing{" "}
                <span className="text-gray-900 font-bold">
                  {products.length}
                </span>{" "}
                products
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.map((product: Product) => (
                <div
                  key={product._id}
                  className="group bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-52 w-full mb-4 overflow-hidden rounded-xl bg-gray-50">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 20vw"
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    <h3 className="font-bold text-gray-800 line-clamp-2 mb-2 h-12 leading-tight group-hover:text-emerald-600 transition-colors">
                      {product.title}
                    </h3>

                    <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                      <div>
                        <span className="block text-lg font-extrabold text-gray-900">
                          {product.price}{" "}
                          <span className="text-xs font-normal">EGP</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <HiStar className="text-yellow-500" />
                        <span className="text-xs font-bold text-yellow-700">
                          {product.ratingsAverage}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <AddToCartButton product={product} />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-6 group w-fit"
            >
              <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Categories</span>
            </Link>

            <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
              <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-5">
                <HiOutlineFolderOpen className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No Subcategories Found
              </h3>
              <p className="text-gray-500 mb-6 max-w-xs mx-auto">
                This category doesn&apos;t have any subcategories yet.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
              >
                Explore All Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
