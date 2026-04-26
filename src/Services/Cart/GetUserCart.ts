import { BASE_URL } from "../api";

export interface CartProduct {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  category: { name: string; _id: string } | string;
}

export interface CartItem {
  _id: string;
  product: CartProduct;
  count: number;
  price: number;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  totalCartPrice: number;
  totalAfterDiscount?: number;
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  data: CartData;
}

export const getCartApi = async (token: string): Promise<CartResponse> => {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: "GET",
    headers: { token },
  });
  return res.json();
};
