import { BASE_URL } from "@/Services/api";

export interface AddressPayload {
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

interface AddAddressResponse {
  status: string;
  message: string;
  data: Address[];
}

export const addNewAddress = async (
  formData: AddressPayload,
  token: string,
): Promise<AddAddressResponse> => {
  const response = await fetch(`${BASE_URL}/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify(formData),
  });

  const data: AddAddressResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add address");
  }

  return data;
};
