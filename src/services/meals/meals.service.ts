interface GetMealsParams {
  search?: string
  categoryId?: string
  dietaryTags?: string
  minPrice?: string
  maxPrice?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export const mealService = {
  getDietaryPreferences: async function () {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/public/dietaryPreferences`,
        {
          next: { revalidate: 60 },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch dietaryPreferences");
      }

      const result = await res.json();
      return result?.data || [];
    } catch (error) {
      console.error("dietaryPreferences fetch error:", error);
      return [];
    }
  },

  getMeals: async function (params?: GetMealsParams) {
    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/public/meals`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const res = await fetch(url.toString(), {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch meals");
      }

      const data = await res.json();

      return {
        data: data?.data || [],
        error: null,
      };
    } catch (err) {
      console.error("getMeals error:", err);
      return {
        data: [],
        error: { message: "Something Went Wrong" },
      };
    }
  },
};