import { BASE_URL } from "../api";
import { Product } from "@/Services/Products/getAllProducts";

interface ProductsResponse {
  data: Product[];
}

export async function getBrandProducts(brandId: string): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/products?brand=${brandId}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const result: ProductsResponse = await res.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching brand products:", error);
    return [];
  }
}
