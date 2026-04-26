import { clearCartApi } from "@/Services/Cart/ClearUserCart";
import { createCashOrder } from "@/Services/Orders/CreateCashOrder";
import { PaymentProcessor, ShippingAddress } from "./PaymentProcessor";

export class CashProcessor implements PaymentProcessor {
  async process(
    cartId: string,
    token: string,
    shippingAddress: ShippingAddress,
  ): Promise<string> {
    await createCashOrder(cartId, token, shippingAddress);
    await clearCartApi(token);
    return "/allorders";
  }
}
