"use client";

import { useState } from "react";
import { ShoppingBag, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cartService } from "@/services/cart/cart.service";

type Props = {
  mealId: string;
  quantity?: number;
  className?: string;
};

export default function AddToCartButton({
  mealId,
  quantity = 1,
}: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleAddToCart = async () => {
    if (status === "loading") {
      return;
    }

    setStatus("loading");

    const { success, error } = await cartService.addToCart(mealId, quantity);

    if (!success) {
      toast.error(error?.message || "Could not add to cart");
      setStatus("idle");
      return;
    }

    toast.success("Added to cart!", {
      action: {
        label: "View Cart",
        onClick: () => router.push("/cart"),
      },
    });

    setStatus("done");

    setTimeout(() => setStatus("idle"), 2000);
  };


  return (
    <Button
      onClick={handleAddToCart}
      disabled={status === "loading"}
      className="cta-btn"
    >
      {status === "loading" ? (
        <Loader2 size={15} className="mr-2 shrink-0 animate-spin" />
      ) : status === "done" ? (
        <Check size={15} className="mr-2 shrink-0" />
      ) : (
        <ShoppingBag size={15} className="mr-2 shrink-0" />
      )}
      {status === "loading"
        ? "Adding…"
        : status === "done"
          ? "Added to Cart!"
          : "Add to Cart"}
    </Button>
  );
}