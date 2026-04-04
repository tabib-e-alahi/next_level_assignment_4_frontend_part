import { Provider } from "@/types/provider"


export const getProviders = async (limit?: number | undefined): Promise<Provider[]> => {
      try {
            const res = await fetch(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/public/providers?limit=${limit}`,
                  {
                        next: { revalidate: 10 },
                  }
            )

            if (!res.ok) {
                  throw new Error("Failed to fetch providers")
            }

            const result = await res.json()
            return result?.data || []
      } catch (error) {
            console.error("Failed to fetch providers:", error)
            return []
      }
}