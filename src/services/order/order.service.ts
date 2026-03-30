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
  }
}
