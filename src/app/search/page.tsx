import { Metadata } from "next";
import { Suspense } from "react";
import Search from "../_components/Search";

export const metadata: Metadata = {
  title: "FreshCart | Search Products",
  description: "Search and filter thousands of products on FreshCart.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <Search />
    </Suspense>
  );
}
