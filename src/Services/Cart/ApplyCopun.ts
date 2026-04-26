import { BASE_URL } from "../api";

interface ApplyCouponResponse {
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
    totalAfterDiscount: number;
  };
}

export const applyCouponApi = async (
  couponCode: string,
  token: string,
): Promise<ApplyCouponResponse> => {
  const res = await fetch(`${BASE_URL}/cart/applyCoupon`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ coupon: couponCode }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to apply coupon");
  }

  return res.json();
};
