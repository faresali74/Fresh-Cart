import { Metadata } from "next";
import Checkout from "../_components/cheackout";

export const metadata: Metadata = {
  title: "FreshCart | Checkout",
  description: "Complete your order securely with multiple payment options.",
};

export default function CheckoutPage() {
  return <Checkout />;
}
