import { Category, UpdateCategory, UserStatus } from "@/types/admin";
import { getToken } from "../cart/getToken";

export const adminService = {
  getAllUsers: async function () {
    try {
      const token = await getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store"
      });
      if (!res.ok) throw new Error("Failed to fetch users");

      const result = await res.json();

      return {
        data: result?.data || [],
        error: null,
      };
    } catch (err:any) {
      console.error("getAllUsers error:", err.message);
      return {
        data: [],
        error: err,
      };
    }
  },

  updateUserStatus: async function (
    userId: string,
    status: UserStatus
  ) {
    try {
      const token = await getToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/update-status/users/${userId}`,
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
      if (!res.ok) {
        throw new Error(result?.error || "Failed to update user status");
      }

      return {
        data: result?.data || null,
        error: null,
      };
    } catch (err: any) {
      console.error("updateUserStatus error:", err);
      return {
        data: null,
        error: { message: err.message || "Failed to update user status" },
      };
    }
  },

  getAllOrders: async function () {
    try {
      const token = await getToken();

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch orders");

      const result = await res.json();
console.log(result.data);
      return {
        data: result?.data || [],
        error: null,
      };
    } catch (err) {
      console.error("getAllOrders error:", err);
      return {
        data: [],
        error: { message: "Failed to fetch orders" },
      };
    }
  },

  getAllCategories: async function () {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/public/categories`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch categories");

      const result = await res.json();

      return {
        data: result?.data || [],
        error: null,
      };
    } catch (err) {
      console.error("getAllCategories error:", err);
      return {
        data: [],
        error: { message: "Failed to fetch categories" },
      };
    }
  },

  createCategory: async function (payload: Category) {
    try {
      const token = await getToken();

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/categories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Failed to create category");
      }

      return {
        data: result?.data || null,
        error: null,
      };
    } catch (err: any) {
      console.error("createCategory error:", err);
      return {
        data: null,
        error: { message: err.message || "Failed to create category" },
      };
    }
  },

  updateCategory: async function (
    categoryId: string,
    payload: UpdateCategory
  ) {
    try {
      const token = await getToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/categories/${categoryId}`,
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

      if (!res.ok) {
        throw new Error(result?.message || "Failed to update category");
      }

      return {
        data: result?.data || null,
        error: null,
      };
    } catch (err: any) {
      console.error("updateCategory error:", err);
      return {
        data: null,
        error: { message: err.message || "Failed to update category" },
      };
    }
  },

  deleteCategory: async function (
    categoryId: string
  ): Promise<{
    success: boolean;
    error: { message: string } | null;
  }> {
    try {
      const token = await getToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/categories/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const result = await res.json().catch(() => null);
        throw new Error(result?.message || "Failed to delete category");
      }

      return {
        success: true,
        error: null,
      };
    } catch (err: any) {
      console.error("deleteCategory error:", err);
      return {
        success: false,
        error: { message: err.message || "Failed to delete category" },
      };
    }
  },
};