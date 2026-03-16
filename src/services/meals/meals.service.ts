// import { apiFetch } from "../api.service";


// type GetMealsParams = {
//   search?: string;
//   categoryId?: string;
//   dietaryTag?: string;
//   minPrice?: string;
//   maxPrice?: string;
// };

// export const getMeals = async (params?: GetMealsParams) => {
//   const query = new URLSearchParams();

//   if (params?.search) query.append("search", params.search);
//   if (params?.categoryId) query.append("categoryId", params.categoryId);
//   if (params?.dietaryTag) query.append("dietaryTag", params.dietaryTag);
//   if (params?.minPrice) query.append("minPrice", params.minPrice);
//   if (params?.maxPrice) query.append("maxPrice", params.maxPrice);

//   const queryString = query.toString();

//   return apiFetch(`/meals${queryString ? `?${queryString}` : ""}`);
// };

//* No Dynamic and No { cache: no-store } : SSG -> Static Page
//* { cache: no-store } : SSR -> Dynamic Page
//* next: { revalidate: 10 } : ISR -> Mix between static and dynamic

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetMealsParams {
  search?: string;
  categoryId?: string;
  dietaryTags?: string[];
  minPrice?: string;
  maxPrice?: string;
}

export const mealService = {
  getDietaryPreferences: async function (){
    try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/public/dietaryPreferences`,
          {
            next: { revalidate: 60 },
          }
        )
    
        if (!res.ok) {
          throw new Error("Failed to fetch dietaryPreferences")
        }
    
        const result = await res.json()
    
        return result?.data || []
      } catch (error) {
        console.error("dietaryPreferences fetch error:", error)
        return []
      }
  },
  getMeals: async function (
    params?: GetMealsParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/public/meals`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(url.toString(), config);

      const data = await res.json();

      // This is an example
      //   if(data.success) {
      //     return
      //   }

      console.log(data);

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  // getBlogById: async function (id: string) {
  //   try {
  //     const res = await fetch(`${API_URL}/posts/${id}`);

  //     const data = await res.json();

  //     return { data: data, error: null };
  //   } catch (err) {
  //     return { data: null, error: { message: "Something Went Wrong" } };
  //   }
  // },
};
