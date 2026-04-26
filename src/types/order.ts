export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface ProductImage {
  _id: string;
  url: string;
}

export interface OrderProduct {
  _id: string;
  title: string;
  imageCover: string;
  images: string[];
  price: number;
}

export interface OrderItem {
  product: OrderProduct;
  count: number;
  _id: string;
  price: number;
}

export interface Order {
  _id: string;
  user: string;
  cartItems: OrderItem[];
  shippingAddress: ShippingAddress;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}
