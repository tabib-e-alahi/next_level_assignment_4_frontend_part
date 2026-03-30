import { Cart, CartItem } from "@/types/cart";
import { getToken } from "./getToken";


export const cartService = {
  getMyCart: async function (): Promise<{
    data: Cart | null;
    error: { message: string } | null;
  }> {
    try {
      const token = await getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart`, {
        cache: "no-store",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch cart");

      const result = await res.json();
      return { data: result?.data || null, error: null };
    } catch (err) {
      console.error("getMyCart error:", err);
      return { data: null, error: { message: "Could not fetch cart data" } };
    }
  },

  addToCart: async function (
    mealId: string,
    quantity: number = 1
  ): Promise<{ success: boolean; error: { message: string } | null }> {
    try {
      const token = await getToken()
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mealId, quantity }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Failed to add item to cart");
      }

      return { success: true, error: null };
    } catch (err: any) {
      console.error("addToCart error:", err);
      return {
        success: false,
        error: { message: err.message || "Could not add item to cart" },
      };
    }
  },

  updateItemQuantity: async function (
    itemId: string,
    quantity: number
  ): Promise<{ data: CartItem | null; error: { message: string } | null }> {
    try {
      const token = await getToken()
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/cart/items/${itemId}`,
        {
          method: "PATCH",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity }),
        }
      );

      if (!res.ok) throw new Error("Failed to update item");

      const result = await res.json();
      return { data: result?.data || null, error: null };
    } catch (err) {
      console.error("updateItemQuantity error:", err);
      return { data: null, error: { message: "Could not update item" } };
    }
  },

  removeItem: async function (
    itemId: string
  ): Promise<{ success: boolean; error: { message: string } | null }> {
    try {
      const token = await getToken()
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/cart/items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to remove item");

      return { success: true, error: null };
    } catch (err) {
      console.error("removeItem error:", err);
      return { success: false, error: { message: "Could not remove item" } };
    }
  },

  clearCart: async function (): Promise<{
    success: boolean;
    error: { message: string } | null;
  }> {
    try {
      const token = await getToken()
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to clear cart");

      return { success: true, error: null };
    } catch (err) {
      console.error("clearCart error:", err);
      return { success: false, error: { message: "Could not clear cart" } };
    }
  },
};