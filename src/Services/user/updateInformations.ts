import { BASE_URL } from "../api";

interface UpdateUserPayload {
  name: string;
  email: string;
  phone: string;
}

interface UpdateUserResponse {
  message: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
  };
}

export const updateUserData = async (
  formData: UpdateUserPayload,
  token: string,
): Promise<UpdateUserResponse> => {
  const response = await fetch(`${BASE_URL}/users/updateMe/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.errors?.msg || data.message || "Failed to update profile",
    );
  }

  return data;
};
