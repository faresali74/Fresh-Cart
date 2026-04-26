import { Metadata } from "next";
import OrdersList from "../_components/OrdersList";

export const metadata: Metadata = {
  title: "FreshCart | My Orders",
  description: "Track and manage all your FreshCart orders in one place.",
};

export default function AllOrdersPage() {
  return <OrdersList />;
}
