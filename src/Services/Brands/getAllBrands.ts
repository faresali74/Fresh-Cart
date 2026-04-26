import { BASE_URL } from "../api";

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

interface BrandsResponse {
  data: Brand[];
}

export async function getBrands(): Promise<Brand[]> {
  try {
    const response = await fetch(`${BASE_URL}/brands`, {
      next: { revalidate: 86400 },
    });

    if (!response.ok) throw new Error("Failed to fetch Brands");

    const data: BrandsResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching Brands:", error);
    return [];
  }
}
