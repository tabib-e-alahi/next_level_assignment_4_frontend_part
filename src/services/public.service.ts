

export const publicService = {
  getAllProviders: async function () {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/public/providers`, {
        cache: "force-cache",
        next: { revalidate: 60 }
      });

      if (!res.ok) throw new Error("Failed to fetch providers");

      const result = await res.json();
      return {
        data: result?.data || [],
        error: null,
      };
    } catch (err: any) {
      return {
        data: [],
        error: err,
      };
    }
  },
  getTotalOrdersCount: async function () {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/public/ordersCount`, {
        cache: "force-cache",
        next: { revalidate: 60 }
      });

      if (!res.ok) throw new Error("Failed to count order");

      const result = await res.json();

      return {
        data: result?.data || 0,
        error: null,
      };
    } catch (err: any) {
      return {
        data: [],
        error: err,
      };
    }
  },
};