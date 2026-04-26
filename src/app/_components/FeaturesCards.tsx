import React from "react";
import { FaShieldHalved } from "react-icons/fa6";
import { FiRotateCcw } from "react-icons/fi";
import { MdLocalShipping } from "react-icons/md";
import { RiCustomerServiceFill } from "react-icons/ri";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  bgColor: string;
  iconColor: string;
}

const FeatureItem = ({
  icon,
  title,
  desc,
  bgColor,
  iconColor,
}: FeatureProps) => (
  <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
    <div
      className={`${bgColor} ${iconColor} w-12 h-12 rounded-full flex items-center justify-center shrink-0`}
    >
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  </div>
);

export default function FeaturesCards() {
  const featuresData = [
    {
      id: 1,
      title: "Free Shipping",
      desc: "On orders over 500 EGP",
      icon: <MdLocalShipping className="text-xl" />,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      id: 2,
      title: "Secure Payment",
      desc: "100% secure transactions",
      icon: <FaShieldHalved className="text-xl" />,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-500",
    },
    {
      id: 3,
      title: "Easy Returns",
      desc: "14-day return policy",
      icon: <FiRotateCcw className="text-xl" />,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      id: 4,
      title: "24/7 Support",
      desc: "Dedicated support team",
      icon: <RiCustomerServiceFill className="text-xl" />,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
    },
  ];

  return (
    <section className="py-8 bg-[#F9FAFB]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuresData.map((feature) => (
            <FeatureItem
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              desc={feature.desc}
              bgColor={feature.bgColor}
              iconColor={feature.iconColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
