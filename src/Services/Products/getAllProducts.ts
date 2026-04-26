import { BASE_URL } from "../api";

// 1. الأجزاء الفرعية
export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string; // هنا الـ ID بتاع الـ Category
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  id: string;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images: string[];
  ratingsQuantity: number;
  ratingsAverage: number;
  sold: number;
  createdAt: string;
  updatedAt: string;

  category: Category;
  brand: Brand;
  subcategory: Subcategory[];
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const res = await response.json();

    return res.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}

export interface ProductQueryParams {
  keyword?: string;
  sort?: string;
  page?: number;
  limit?: number;
  "price[gte]"?: string;
  "price[lte]"?: string;
  category?: string[];
  brand?: string[];
}

export async function searchProducts(
  params: ProductQueryParams,
): Promise<Product[]> {
  try {
    const query = new URLSearchParams();

    if (params.keyword) query.append("keyword", params.keyword);
    if (params.sort) query.append("sort", params.sort);
    if (params.page) query.append("page", String(params.page));
    if (params.limit) query.append("limit", String(params.limit));
    if (params["price[gte]"]) query.append("price[gte]", params["price[gte]"]);
    if (params["price[lte]"]) query.append("price[lte]", params["price[lte]"]);
    params.category?.forEach((id) => query.append("category[in]", id));
    params.brand?.forEach((id) => query.append("brand", id));

    const response = await fetch(`${BASE_URL}/products?${query.toString()}`);

    if (!response.ok) throw new Error("Failed to fetch products");

    const res = await response.json();
    return res.data;
  } catch (err) {
    console.error("Error searching products:", err);
    return [];
  }
}
