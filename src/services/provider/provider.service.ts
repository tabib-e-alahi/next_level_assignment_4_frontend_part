import { Category } from "@/types/mealsParams";
import { getToken } from "../cart/getToken";

export const providerService = {
  getMyMeals: async () => {
    try {
      const token = await getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/provider/menu/meals`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      );

      const result = await res.json();
      return { data: result?.data || [], error: null };
    } catch (err) {
      return { data: [], error: { message: "Failed to fetch meals" } };
    }
  },

  getSingleMeal: async (mealId: string) => {
    try {
      const token = await getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/provider/menu/meals/${mealId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      );

      const result = await res.json();
      return { data: result?.data || [], error: null };
    } catch (err) {
      return { data: [], error: { message: "Failed to fetch meals" } };
    }
  },

  createMeal: async (payload: any) => {
    try {
      const token = await getToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/provider/menu/meals`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (!res.ok) throw new Error(result?.message);

      return { data: result.data, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },

  updateMeal: async (id: string, payload: any) => {
    try {
      const token = await getToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/provider/menu/meals/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (!res.ok) throw new Error(result?.message);

      return { data: result.data, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },


  deleteMeal: async (id: string) => {
    try {
      const token = await getToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/provider/menu/meals/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      return { data: true, error: null };
    } catch {
      return { data: false, error: { message: "Delete failed" } };
    }
  },

  //! ----===---------- provider order services -----------------
  getOrders: async () => {
    try {
      const token = await getToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/provider/provider-orders/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      const result = await res.json();

      return { data: result?.data || [], error: null };
    } catch {
      return { data: [], error: { message: "Failed to fetch orders" } };
    }
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    try {
      const token = await getToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/provider/orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const result = await res.json();

      if (!res.ok) throw new Error(result?.message);

      return { data: result.data, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },


  //! ------- catgeories ------------
  getAllCategories: async (): Promise<Category[]> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/public/categories`,
        {
          next: { revalidate: 10 },
        }
      )

      if (!res.ok) {
        throw new Error("Failed to fetch categories")
      }

      const result = await res.json()

      return result?.data || []
    } catch (error) {
      console.error("Category fetch error:", error)
      return []
    }
  }
};