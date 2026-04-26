export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface PaymentProcessor {
  process(
    cartId: string,
    token: string,
    shippingAddress: ShippingAddress,
  ): Promise<string>;
}
