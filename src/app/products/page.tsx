import React from "react";
import PageHeader from "../_components/PageHeader";
import Products from "../_components/Products";

export default function AllProducts() {
  return (
    <>
      <PageHeader
        title="All Products"
        description="Explore our complete product collection"
        breadcrumbSteps={[{ name: "All Products" }]}
      />
      <Products />
    </>
  );
}
