"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getCartApi, CartResponse } from "@/Services/Cart/GetUserCart";
import { getUserAddresses } from "@/Services/user/Adresses/GetUserAdressrs";
import ShippingAddressForm from "../_components/ShppingAdressForm";
import PaymentMethod from "../_components/PaymentMethod";
import ChceckoutOrderSummary from "../_components/CheckOutSummery";
import Swal from "sweetalert2";
import { PaymentFactory } from "@/PaymentFactory/PaymentFactory";
import { useCart } from "@/context/CartContext";
import { ShippingAddress } from "@/PaymentFactory/PaymentProcessor";

interface Address {
  _id: string;
  details: string;
  phone: string;
  city: string;
}

export default function Checkout() {
  const { data: session } = useSession();
  const { refreshCart } = useCart();
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [selectedMethod, setSelectedMethod] = useState("cash");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      if (!session?.accessToken) {
        setLoading(false);
        return;
      }
      try {
        const data = await getCartApi(session.accessToken);
        setCartData(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAddresses = async () => {
      if (!session?.accessToken) return;
      try {
        const res = await getUserAddresses(session.accessToken);
        setAddresses(res?.data || []);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchCart();
    fetchAddresses();
  }, [session]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = session?.accessToken;

    if (!selectedAddressId) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please select an address!",
      });
      return;
    }

    if (!token) {
      Swal.fire({ icon: "error", text: "Session expired!" });
      return;
    }

    let shippingAddress: ShippingAddress; // ✅ typed

    if (selectedAddressId === "new") {
      const formData = new FormData(e.target as HTMLFormElement);
      shippingAddress = {
        details: formData.get("details") as string,
        phone: formData.get("phone") as string,
        city: formData.get("city") as string,
      };
    } else {
      const address = addresses.find((a) => a._id === selectedAddressId);
      if (!address) {
        Swal.fire({ icon: "error", text: "Selected address not found!" });
        return;
      }
      shippingAddress = {
        details: address.details,
        phone: address.phone,
        city: address.city,
      };
    }

    setPaymentLoading(true);
    try {
      const processor = PaymentFactory.getProcessor(selectedMethod);
      const result = await processor.process(
        cartData?.data?._id || "",
        token,
        shippingAddress,
      );

      await refreshCart();

      if (selectedMethod === "online") {
        window.location.href = result;
      } else {
        router.push(result);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", text: "Something went wrong!" });
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <form
        id="checkout-form"
        onSubmit={handlePlaceOrder}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-6">
          <ShippingAddressForm
            selectedAddressId={selectedAddressId}
            setSelectedAddressId={setSelectedAddressId}
          />
          <PaymentMethod
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
          />
        </div>
        <div className="lg:col-span-1">
          <ChceckoutOrderSummary
            cartData={cartData}
            loading={loading}
            paymentLoading={paymentLoading}
          />
        </div>
      </form>
    </div>
  );
}
