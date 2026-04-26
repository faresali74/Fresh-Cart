import { BASE_URL } from "../api";

interface RemoveFromWishlistResponse {
  status: string;
  message: string;
  data: string[]; // array of remaining product IDs
}

export const removeFromWishlistApi = async (
  productId: string,
  token: string,
): Promise<RemoveFromWishlistResponse> => {
  const res = await fetch(`${BASE_URL}/wishlist/${productId}`, {
    method: "DELETE",
    headers: { token },
  });

  const data: RemoveFromWishlistResponse = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to remove from wishlist");
  }

  return data;
};
