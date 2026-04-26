import { Metadata } from "next";
import CartContent from "../_components/CartContent";

export const metadata: Metadata = {
  title: "FreshCart | Shopping Cart",
  description: "Review your cart items and proceed to checkout.",
};

export default function CartPage() {
  return <CartContent />;
}
