import { BASE_URL } from "../api";
import { CartData } from "./GetUserCart";

interface UpdateCartQuantityResponse {
  status: string;
  numOfCartItems: number;
  data: CartData;
}

export const updateCartQuantityApi = async (
  productId: string,
  count: number,
  token: string,
): Promise<UpdateCartQuantityResponse> => {
  const res = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ count }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to update cart quantity");
  }

  return res.json();
};
