import { BASE_URL } from "../api";
import { Product } from "./getAllProducts";

interface ProductResponse {
  data: Product;
}

export async function getSpecificProduct(productId: string): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${productId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }

  const result: ProductResponse = await response.json();
  return result.data;
}
