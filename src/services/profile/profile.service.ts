import { getToken } from "../cart/getToken";


type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: "ACTIVE" | "BLOCKED";
};

type GetProfileResponse = {
  data: UserProfile | null;
  error: { message: string } | null;
};

type UpdateProfilePayload = {
  name?: string;
  phone?: string;
  currentPassword?: string;
  newPassword?: string;
};

type UpdateProfileResponse = {
  data: UserProfile | null;
  error: { message: string } | null;
};

export const profileService = {
  getProfile: async (): Promise<GetProfileResponse> => {
    try {
      const token = await getToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`,
        {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch profile");

      const result = await res.json();

      return {
        data: result?.data || null,
        error: null,
      };
    } catch (err) {
      console.error("getProfile error:", err);
      return {
        data: null,
        error: { message: "Could not fetch profile" },
      };
    }
  },

  updateProfile: async (
    payload: UpdateProfilePayload
  ): Promise<UpdateProfileResponse> => {
    try {
      const token = await getToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/customer/profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Update failed");
      }

      return {
        data: result?.data || null,
        error: null,
      };
    } catch (err: any) {
      console.error("updateProfile error:", err);
      return {
        data: null,
        error: { message: err.message || "Could not update profile" },
      };
    }
  },
};