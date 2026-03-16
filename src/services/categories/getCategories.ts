import { Category, GetCategoriesResponse } from "@/types/category"


export const getCategories = async (limit?: number | undefined): Promise<Category[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/public/categories?limit=${limit}`,
      {
        next: { revalidate: 10 },
      }
    )

    if (!res.ok) {
      throw new Error("Failed to fetch categories")
    }

    const result: GetCategoriesResponse = await res.json()

    return result?.data || []
  } catch (error) {
    console.error("Category fetch error:", error)
    return []
  }
}