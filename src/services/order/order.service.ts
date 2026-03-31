import { Order } from "@/types/order";
import { getToken } from "../cart/getToken";

export const orderService = {
  createOrder: async (deliveryAddress: string) => {
    try {
      const token = await getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/orders`,
        {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deliveryAddress }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to place order.");
      }
      return data;
    } catch (error: any) {
      return {
        success: false,
        error: { message: error.message || "Order checkout failed!" },
      };
    }
  },

  getMyOrders: async function (): Promise<{
    data: Order[] | null;
    error: { message: string } | null;
  }> {
    try {
      const token = await getToken();

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders`, {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch orders");

      const result = await res.json();

      return {
        data: result?.data || null,
        error: null,
      };
    } catch (err) {
      console.error("getMyOrders error:", err);
      return {
        data: null,
        error: { message: "Could not fetch orders" },
      };
    }
  },

  getSingleOrder: async function (
    orderId: string
  ): Promise<{
    data: Order | null;
    error: { message: string } | null;
  }> {
    try {
      const token = await getToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/orders/${orderId}`,
        {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch order");

      const result = await res.json();

      return {
        data: result?.data || null,
        error: null,
      };
    } catch (err) {
      console.error("getSingleOrder error:", err);
      return {
        data: null,
        error: { message: "Could not fetch order" },
      };
    }
  },
}
