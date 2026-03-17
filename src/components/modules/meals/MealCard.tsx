import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Heart, ShoppingBag, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type Review = {
  rating: number
}

type ReviewsCount = {
  reviews: number
}
type CategoryType = {
  name: string
}

type Meal = {
  id: string
  title: string
  description: string
  imageURL: string
  price: number
  category: CategoryType
  dietary_preferences: string[]
  isAvailable: boolean
  reviews: Review[]
  _count: ReviewsCount
}

export default function MealCard({ meal }: { meal: Meal }) {
  const reviewsCount = meal._count?.reviews || 0

  const avgRating =
    meal.reviews?.length > 0
      ? (
        meal.reviews.reduce((sum, rev) => sum + rev.rating, 0) /
        meal.reviews.length
      ).toFixed(1)
      : 0

  return (
    <article className={`group overflow-hidden rounded-[12px] bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)] ${!meal.isAvailable ? "opacity-30" : ""}`}>

      {/* IMAGE */}
      <Link href={`/meals/${meal.id}`} className="block">
        <div className="relative h-60 overflow-hidden bg-muted">
          <Image
            src={meal.imageURL}
            alt={meal.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

          {/* cuisine */}
          {meal.category.name && (
            <div className="absolute left-4 top-4">
              <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur capitalize">
                {meal.category.name.toLowerCase()}
              </span>
            </div>
          )}

          {/* wishlist */}
          <button className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition hover:bg-background">
            <Heart className="size-4" />
          </button>

          {/* rating badge */}
          {avgRating && (
            <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur">
              <Star className="size-3 fill-primary text-primary" />
              {avgRating}
              <span className="text-muted-foreground">
                ({reviewsCount})
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* CONTENT */}
      <div className="flex  flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {/* title */}
            <Link href={`/meals/${meal.id}`}>
              <Tooltip key={"top"}>
                <TooltipTrigger asChild>
                  <h3 className="line-clamp-1 text-xl font-semibold tracking-tight text-foreground transition group-hover:text-primary">
                    {meal.title}
                  </h3>
                </TooltipTrigger>
                <TooltipContent side={"top"}>
                  <p className="text-xl">{meal.title}</p>
                </TooltipContent>
              </Tooltip>
            </Link>

            {/* rating row */}
            {(
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="size-4 fill-primary text-primary" />
                <span className="font-medium text-foreground">
                  {avgRating}
                </span>
                <span>({reviewsCount} reviews)</span>
              </div>
            )}

            {/* description */}
            <p className="mt-3 line-clamp-2 text-sm leading-6 ">
              {meal.description}
            </p>
            {/* dietary hashtags */}
            {meal.dietary_preferences?.length > 0 && (
              <div className="my-2 flex flex-wrap gap-2 text-sm text-primary">
                {meal.dietary_preferences.slice(0, 3).map((tag) => (
                  <span key={tag} className="font-bold">
                    #{tag.toLowerCase().replace(/\s+/g, "")}
                  </span>
                ))}
              </div>
            )}
          </div>

          <Link
            href={`/meals/${meal.id}`}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground"
          >
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {/* PRICE + CTA */}
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