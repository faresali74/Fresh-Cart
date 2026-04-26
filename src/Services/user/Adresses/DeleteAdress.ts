import { BASE_URL } from "@/Services/api";
import { Address } from "../Adresses/AddAdress";

interface DeleteAddressResponse {
  status: string;
  message: string;
  data: Address[];
}

export const deleteAddress = async (
  addressId: string,
  token: string,
): Promise<DeleteAddressResponse> => {
  const response = await fetch(`${BASE_URL}/addresses/${addressId}`, {
    method: "DELETE",
    headers: { token },
  });

  const data: DeleteAddressResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete address");
  }

  return data;
};
