import { CreateReviewPayload, CreateReviewResponse, GetMyReviewsResponse } from "@/types/reviews";
import { getToken } from "./cart/getToken";

export const reviewService = {
  getMyReviews: async function (): Promise<GetMyReviewsResponse> {
    try {
      const token = await getToken();

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`, {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch reviews");

      const result = await res.json();

      return {
        data: result?.data || null,
        error: null,
      };
    } catch (err) {
      console.error("getMyReviews error:", err);
      return {
        data: null,
        error: { message: "Could not fetch reviews" },
      };
    }
  },

  createReview: async function (
    payload: CreateReviewPayload
  ): Promise<CreateReviewResponse> {
    try {
      const token = await getToken();

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Failed to create review");
      }

      return {
        data: result?.data || null,
        error: null,
      };
    } catch (err: any) {
      console.error("createReview error:", err);
      return {
        data: null,
        error: { message: err.message || "Could not create review" },
      };
    }
  },
};