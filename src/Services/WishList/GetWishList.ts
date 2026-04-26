import { BASE_URL } from "../api";
import { Product } from "@/Services/Products/getAllProducts";

interface GetWishlistResponse {
  status: string;
  count: number;
  data: Product[];
}

export const getWishlistApi = async (
  token: string,
): Promise<GetWishlistResponse> => {
  const res = await fetch(`${BASE_URL}/wishlist`, {
    method: "GET",
    headers: { token },
  });

  const data: GetWishlistResponse = await res.json();

  if (!res.ok) {
    throw new Error(data.status || "Failed to fetch wishlist");
  }

  return data;
};
