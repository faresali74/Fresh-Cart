import { BASE_URL } from "../api";
import { ShippingAddress } from "@/PaymentFactory/PaymentProcessor";

interface OnlineOrderResponse {
  status: string;
  message?: string;
  session: {
    url: string;
    id: string;
  };
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function createOnlineOrder(
  cartId: string,
  token: string,
  shippingAddress: ShippingAddress,
): Promise<string> {
  const response = await fetch(
    `${BASE_URL}/orders/checkout-session/${cartId}?url=${APP_URL}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress }),
    },
  );

  const data: OnlineOrderResponse = await response.json();

  if (data.status !== "success") {
    throw new Error(data.message || "Failed to get payment session");
  }

  return data.session.url;
}
