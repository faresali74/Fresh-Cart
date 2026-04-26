import { CashProcessor } from "./CashProcessor";
import { OnlineProcessor } from "./OnlineProcessor";
import { PaymentProcessor } from "./PaymentProcessor";

export class PaymentFactory {
  static getProcessor(method: string): PaymentProcessor {
    if (method === "cash") return new CashProcessor();
    if (method === "online") return new OnlineProcessor();
    throw new Error("Invalid payment method");
  }
}
