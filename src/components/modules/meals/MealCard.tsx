// src/components/meals/meal-card.tsx
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Heart, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"

type Meal = {
  id: string
  title: string
  description: string
  image: string
  price: number
  cuisine: string
  dietary: string
}

export default function MealCard({ meal }: { meal: Meal }) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
      <Link href={`/meals/${meal.id}`} className="block">
        <div className="relative h-56 overflow-hidden bg-muted">
          <Image
            src={meal.image}
            alt={meal.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

          <div className="absolute left-4 top-4 flex gap-2">
            <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
              {meal.cuisine}
            </span>
            <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground">
              {meal.dietary}
            </span>
          </div>

          <button className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition hover:bg-background">
            <Heart className="size-4" />
          </button>
        </div>
      </Link>

      <div className="flex min-h-[220px] flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link href={`/meals/${meal.id}`}>
              <h3 className="line-clamp-1 text-xl font-semibold tracking-tight text-foreground transition group-hover:text-primary">
                {meal.title}
              </h3>
            </Link>

            <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
              {meal.description}
            </p>
          </div>

          <Link
            href={`/meals/${meal.id}`}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground"
          >
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-auto pt-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Starting from</p>
              <p className="text-2xl font-semibold tracking-tight text-foreground">
                ৳{meal.price}
              </p>
            </div>
          </div>

          <Button className="w-full rounded-2xl">
            <ShoppingBag className="mr-2 size-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  )
}