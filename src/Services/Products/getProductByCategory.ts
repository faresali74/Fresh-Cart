import { BASE_URL } from "../api";
import { Product } from "./getAllProducts";

export async function getProductsByCategory(
  categoryId: string,
): Promise<Product[]> {
  const response = await fetch(
    `${BASE_URL}/products?category[in]=${categoryId}`,
  );
  const data = await response.json();
  return data.data;
}
