import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Heart, ShoppingBag, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Meal } from "@/types/mealsParams"

export default function MealCard({ meal }: { meal: Meal }) {
  const reviewsCount = meal._count?.reviews || 0

  const avgRating =
    meal.reviews?.length > 0
      ? (
        meal.reviews.reduce((sum, rev) => sum + rev.rating, 0) /
        meal.reviews.length
      ).toFixed(1)
      : null

  return (
    <article className={`meal-card ${!meal.isAvailable ? "unavailable" : ""}`}>
      <Link href={`/meals/${meal.id}`} className="block" tabIndex={-1}>
        <div className="card-image-wrap">
          <Image
            src={meal.imageURL}
            alt={meal.title}
            fill
            className="object-cover"
          />
          <div className="card-img-veil" />

          {meal.category.name && (
            <span className="card-category">
              {meal.category.name.toLowerCase()}
            </span>
          )}

          <button
            type="button"
            className="card-wishlist"
            aria-label="Save to wishlist"
          >
            <Heart size={14} />
          </button>


          {
            avgRating ? <div className="card-rating">
              <Star size={10} style={{ color: "#e8a030", fill: "#e8a030" }} />
              <span>{avgRating}</span>
              <span className="card-rating-count">({reviewsCount})</span>
            </div> : 
            <div className="card-rating">
              <Star size={10} style={{ color: "#e8a030", fill: "#e8a030" }} />
              <span>(Not Rated Yet)</span>
              {/* <span className="card-rating-count">({reviewsCount})</span> */}
            </div>
          }


          <span className="card-arrow" aria-hidden="true">
            <ArrowUpRight size={13} />
          </span>
        </div>
      </Link>

      <div className="card-body">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/meals/${meal.id}`} className="card-title-link">
              {meal.title}
            </Link>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            style={{
              background: "#2e2825",
              border: "1px solid rgba(200,80,10,.3)",
              color: "#f5f0e8",
              fontSize: ".8rem",
            }}
          >
            {meal.title}
          </TooltipContent>
        </Tooltip>


        {/* <div className="card-meta">
            <Star className="card-meta-star" />
            <span className="card-meta-score">{avgRating}</span>
            <span>({reviewsCount} reviews)</span>
          </div>
        */}

        <p className="card-desc">{meal.description}</p>

        {meal.dietary_preferences?.length > 0 && (
          <div className="card-tags space-x-1">
            {meal.dietary_preferences.slice(0, 3).map((tag) => (
              <span key={tag} className="card-tag">
                #{tag.toLowerCase().replace(/\s+/g, "")}
              </span>
            ))}
          </div>
        )}

        <div className="card-footer">
          <div>
            <p className="card-price-lbl">From</p>
            <p className="card-price">
              <span className="card-currency">৳</span>
              {meal.price}
            </p>
          </div>

          <Button type="button" className="card-cta">
            <ShoppingBag size={13} />
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  )
}