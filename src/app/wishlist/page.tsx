import { Metadata } from "next";
import WishlistContent from "../_components/WishlistContent";

export const metadata: Metadata = {
  title: "FreshCart | My Wishlist",
  description: "View and manage your saved products on FreshCart.",
};

export default function WishlistPage() {
  return <WishlistContent />;
}
