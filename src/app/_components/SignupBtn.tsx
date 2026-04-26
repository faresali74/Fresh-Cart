import React from "react";
import Link from "next/link";
import { TiUserAdd } from "react-icons/ti";

export default function SignupBtn() {
  return (
    <>
      <Link
        href="/register"
        className="flex flex-row items-center font-medium text-[#6a7282] text-sm px-4 cursor-pointer transition-colors duration-300 group"
      >
        <TiUserAdd className="me-2 text-lg" />
        <span>Sign up</span>
      </Link>
    </>
  );
}
