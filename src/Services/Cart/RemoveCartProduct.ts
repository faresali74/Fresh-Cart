import { BASE_URL } from "../api";
import { CartData } from "./GetUserCart";

interface RemoveFromCartResponse {
  status: string;
  numOfCartItems: number;
  data: CartData;
}

export const removeFromCartApi = async (
  productId: string,
  token: string,
): Promise<RemoveFromCartResponse> => {
  const res = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: "DELETE",
    headers: { token },
  });
  return res.json();
};
