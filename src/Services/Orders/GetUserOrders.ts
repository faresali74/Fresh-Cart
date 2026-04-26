import { Order } from "../../types/order";
import { BASE_URL } from "../api";

export async function getUserOrders(
  userId: string,
  token: string,
): Promise<Order[]> {
  const response = await fetch(`${BASE_URL}/orders/user/${userId}`, {
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  const data: Order[] = await response.json();
  return data;
}
