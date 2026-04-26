import { RegisterFormData } from "@/schema/AuthSchema/RegisterSchema";
import { BASE_URL } from "../api";

interface AuthResponse {
  message: string;
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const registerUser = async (
  userData: RegisterFormData,
): Promise<AuthResponse> => {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data: AuthResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
