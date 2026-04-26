"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLocationDot, FaGear, FaChevronRight } from "react-icons/fa6";

const sidebarLinks = [
  {
    href: "/profile/addresses",
    label: "My Addresses",
    icon: <FaLocationDot />,
  },
  { href: "/profile/settings", label: "Settings", icon: <FaGear /> },
];

export function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">My Account</h2>
        </div>
        <ul className="p-2 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                    }`}
                  >
                    {link.icon}
                  </div>
                  <span className="font-medium flex-1">{link.label}</span>
                  <FaChevronRight
                    className={`text-xs transition-transform ${isActive ? "text-green-500" : "text-gray-400"}`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
