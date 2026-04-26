import { BASE_URL } from "../api";

interface ClearCartResponse {
  message: string;
}

export const clearCartApi = async (
  token: string,
): Promise<ClearCartResponse> => {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: "DELETE",
    headers: { token },
  });
  return res.json();
};
