import { getCategories } from "../../Services/Category/AllCategory";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";

export default async function CategorySection() {
  const categories = await getCategories();

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        {/* --- Header Section --- */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
          <div className="flex items-center gap-3 my-8">
            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Shop By <span className="text-emerald-600">Category</span>
            </h2>
          </div>

          <Link
            href="/categories"
            className="text-emerald-600 self-end sm:self-auto hover:text-emerald-700 font-medium flex items-center group transition-colors"
          >
            View All Categories
            <HiOutlineArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* --- Grid Section --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories?.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition group cursor-pointer border border-gray-50"
            >
              {/* Image Container */}
              <div className="h-24 w-24 overflow-hidden  rounded-full flex items-center justify-center mx-auto mb-3  transition-colors relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover p-1 rounded-full"
                  sizes="96px"
                />
              </div>

              {/* Title */}
              <h3 className="font-medium text-gray-800 transition-colors text-[16px] md:text-base">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
