import { createOnlineOrder } from "@/Services/Orders/CreateOnlineOrder";
import { PaymentProcessor, ShippingAddress } from "./PaymentProcessor";

export class OnlineProcessor implements PaymentProcessor {
  async process(
    cartId: string,
    token: string,
    shippingAddress: ShippingAddress,
  ): Promise<string> {
    return createOnlineOrder(cartId, token, shippingAddress);
  }
}
