import { BASE_URL } from "../api";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
export async function getCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories`, {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();
    return data.data as Category[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
