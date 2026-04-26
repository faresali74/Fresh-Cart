import Link from "next/link";
import React from "react";
import { HiOutlineArrowRight } from "react-icons/hi2";

interface BannerProps {
  badgeIcon: string;
  badgeText: string;
  title: string;
  desc: string;
  discount: string;
  code: string;
  link: string;
  btnText: string;
  gradientClass: string;
  btnColor: string;
}

const BannerCard = ({
  badgeIcon,
  badgeText,
  title,
  desc,
  discount,
  code,
  link,
  btnText,
  gradientClass,
  btnColor,
}: BannerProps) => (
  <div
    className={`relative overflow-hidden rounded-2xl bg-linear-to-br ${gradientClass} p-8 text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
  >
    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

    <div className="relative z-10">
      <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4 backdrop-blur-sm">
        <span>{badgeIcon}</span>
        <span>{badgeText}</span>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-2">{title}</h3>
      <p className="text-white/80 mb-4 text-sm md:text-base">{desc}</p>

      <div className="flex items-center gap-4 mb-6">
        <div className="text-3xl font-bold">{discount}</div>
        <div className="text-sm text-white/70 bg-black/10 px-3 py-1 rounded-lg border border-white/10">
          Use code: <span className="font-bold text-white ml-1">{code}</span>
        </div>
      </div>

      <Link
        href={link}
        className={`inline-flex items-center gap-2 bg-white ${btnColor} px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all active:scale-95 group`}
      >
        {btnText}
        <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  </div>
);

export default function PromoBanners() {
  const banners = [
    {
      id: 1,
      badgeIcon: "🔥",
      badgeText: "Deal of the Day",
      title: "Fresh Organic Fruits",
      desc: "Get up to 40% off on selected organic fruits",
      discount: "40% OFF",
      code: "ORGANIC40",
      link: "/products",
      btnText: "Shop Now",
      gradientClass: "from-emerald-500 to-emerald-700",
      btnColor: "text-emerald-600",
    },
    {
      id: 2,
      badgeIcon: "✨",
      badgeText: "New Arrivals",
      title: "Exotic Vegetables",
      desc: "Discover our latest collection of premium vegetables",
      discount: "25% OFF",
      code: "FRESH25",
      link: "/products?sort=newest",
      btnText: "Explore Now",
      gradientClass: "from-orange-400 to-rose-500",
      btnColor: "text-orange-500",
    },
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <BannerCard key={banner.id} {...banner} />
          ))}
        </div>
      </div>
    </section>
  );
}
