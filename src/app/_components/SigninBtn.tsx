import React from "react";
import Link from "next/link";
import { RiUserLine } from "react-icons/ri";

interface SigninBtnProps {
  variant?: "ghost" | "solid";
}

export default function SigninBtn({ variant = "solid" }: SigninBtnProps) {
  const ghostStyles =
    "text-[#6a7282] hover:text-[#16A34A] px-4 py-1 bg-transparent border-none shadow-none";

  const solidStyles =
    "bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full shadow-sm shadow-green-600/20";

  return (
    <Link
      href="/login"
      className={`flex items-center justify-center gap-2 font-medium text-sm transition-all duration-300 active:scale-95 ${
        variant === "ghost" ? ghostStyles : solidStyles
      }`}
    >
      <RiUserLine className={variant === "ghost" ? "text-lg" : "text-sm"} />
      <span>Sign In</span>
    </Link>
  );
}
