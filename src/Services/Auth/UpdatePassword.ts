import { BASE_URL } from "../api";

export interface UpdatePasswordPayload {
  currentPassword: string;
  password: string;
  rePassword: string;
}

interface UpdatePasswordResponse {
  message: string;
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const updateUserPassword = async (
  formData: UpdatePasswordPayload,
  token: string,
): Promise<UpdatePasswordResponse> => {
  const response = await fetch(`${BASE_URL}/users/changeMyPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data.errors
      ? data
      : new Error(data.message || "Failed to update password");
  }

  return data;
};
