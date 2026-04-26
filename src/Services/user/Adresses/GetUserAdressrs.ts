import { BASE_URL } from "@/Services/api";
import { Address } from "./AddAdress";

interface GetAddressesResponse {
  status: string;
  data: Address[];
}

export const getUserAddresses = async (
  token: string,
): Promise<GetAddressesResponse> => {
  const response = await fetch(`${BASE_URL}/addresses`, {
    method: "GET",
    headers: { token },
  });

  const data: GetAddressesResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.status || "Failed to fetch addresses");
  }

  return data;
};
