import { BASE_URL } from "../api";

interface WishlistResponse {
  status: string;
  message: string;
  data: string[];
}

export const addToWishlistApi = async (
  productId: string,
  token: string,
): Promise<WishlistResponse> => {
  const res = await fetch(`${BASE_URL}/wishlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json", token },
    body: JSON.stringify({ productId }),
  });

  const data: WishlistResponse = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to add to wishlist");
  }

  return data;
};
