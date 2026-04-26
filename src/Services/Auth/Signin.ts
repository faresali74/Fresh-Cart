import { BASE_URL } from "../api";

export async function loginUser(credentials: {
  email?: string;
  password?: string;
}) {
  const res = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to login");
  }

  return data;
}
