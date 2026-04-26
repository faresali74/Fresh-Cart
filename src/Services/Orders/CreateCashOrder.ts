import { BASE_URL } from "../api";
import { ShippingAddress } from "@/PaymentFactory/PaymentProcessor";

interface CashOrderResponse {
  status: string;
  message?: string;
  data: {
    _id: string;
    user: string;
    cartItems: {
      product: string;
      count: number;
      price: number;
      _id: string;
    }[];
    shippingAddress: ShippingAddress;
    totalOrderPrice: number;
    paymentMethodType: "cash" | "card";
    isPaid: boolean;
    isDelivered: boolean;
    createdAt: string;
  };
}

export async function createCashOrder(
  cartId: string,
  token: string,
  shippingAddress: ShippingAddress,
): Promise<CashOrderResponse> {
  const response = await fetch(`${BASE_URL}/orders/${cartId}`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shippingAddress }),
  });

  const data: CashOrderResponse = await response.json();

  if (data.status !== "success") {
    throw new Error(data.message || "Failed to place cash order");
  }

  return data;
}
