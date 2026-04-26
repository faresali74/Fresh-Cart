import React from "react";
import Link from "next/link";
import { FiChevronRight, FiBox } from "react-icons/fi";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  breadcrumbSteps?: { name: string; href?: string }[];
  gradient?: string;
}

export default function PageHeader({
  title,
  description,
  icon = <FiBox className="text-3xl" />,
  breadcrumbSteps = [],
  gradient = "bg-linear-to-br from-emerald-600 via-emerald-500 to-teal-400",
}: PageHeaderProps) {
  return (
    <div className={`${gradient} text-white transition-all duration-500`}>
      <div className="container mx-auto px-4 py-10 sm:py-14">
        {/* Breadcrumbs Section */}
        <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <FiChevronRight className="text-white/40 text-xs" />

          {breadcrumbSteps.map((step, index) => (
            <React.Fragment key={index}>
              {step.href ? (
                <Link
                  href={step.href}
                  className="hover:text-white transition-colors"
                >
                  {step.name}
                </Link>
              ) : (
                <span className="text-white font-medium">{step.name}</span>
              )}
              {index < breadcrumbSteps.length - 1 && (
                <FiChevronRight className="text-white/40 text-xs" />
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Header Main Content */}
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl ring-1 ring-white/30 shrink-0">
            {icon}
          </div>

          <div className="space-y-1">
            <h1 className="text-4xl font-bold ">{title}</h1>
            {description && (
              <p className="text-white/80 font-medium ">{description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
