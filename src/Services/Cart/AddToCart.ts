import { BASE_URL } from "../api";

interface AddToCartResponse {
  status: string;
  numOfCartItems: number;
  data: {
    _id: string;
    cartOwner: string;
    products: {
      product: string;
      count: number;
      price: number;
      _id: string;
    }[];
    totalCartPrice: number;
  };
}

export const addToCartApi = async (
  productId: string,
  token: string,
): Promise<AddToCartResponse> => {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json", token },
    body: JSON.stringify({ productId }),
  });
  return res.json();
};
