"use client"

import { useState } from "react"
import { ShoppingBag, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"


type Props = {
  mealId: string
  isAvailable?: boolean
}

export default function AddToCartButton({ mealId, isAvailable = true }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleAddToCart = async () => {
    try {
      console.log("From cart: ", mealId);
      // setLoading(true)

      // const user = await getUser()

      // if (!user) {
      //   router.push("/login")
      //   return
      // }

      // if (user.role !== "CUSTOMER") {
      //   alert("Only customers can add meals to cart.")
      //   return
      // }

      // const res = await cartService.addToCart({
      //   mealId,
      //   quantity: 1,
      // })

      // if (!res?.success) {
      //   alert(res?.message || "Failed to add to cart")
      //   return
      // }

      // alert("Meal added to cart successfully.")
      // router.refresh()
    } catch (error) {
      console.error(error)
      alert("Something went wrong while adding to cart.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      className="cta-btn"
      onClick={handleAddToCart}
      disabled={!isAvailable || loading}
    >
      {loading ? (
        <Loader2 size={15} className="mr-2 animate-spin" />
      ) : (
        <ShoppingBag size={15} className="mr-2 flex-shrink-0" />
      )}
      {loading ? "Adding..." : "Add to Cart"}
    </Button>
  )
}