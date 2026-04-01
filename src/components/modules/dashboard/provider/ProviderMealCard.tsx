import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Heart, Star } from "lucide-react";
import "./providerMeal.css"
import { Meal } from "@/types/mealsParams";

export default function ProviderMealCard({ meal }: { meal: Meal }) {
  const router = useRouter();

  const reviewsCount = meal._count?.reviews || 0;

  const avgRating =
    meal.reviews?.length > 0
      ? (
          meal.reviews.reduce((sum, rev) => sum + rev.rating, 0) /
          meal.reviews.length
        ).toFixed(1)
      : null;

  return (
    <article className={`meal-card`}>
      {/* CLICK AREA */}
      <div
        className="card-image-wrap cursor-pointer"
        onClick={() =>
          router.push(`/provider-dashboard/meals/${meal.id}`)
        }
      >
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


        {/* ⭐ Rating */}
        {avgRating ? (
          <div className="card-rating">
            <Star size={10} style={{ color: "#e8a030", fill: "#e8a030" }} />
            <span>{avgRating}</span>
            <span className="card-rating-count">({reviewsCount})</span>
          </div>
        ) : (
          <div className="card-rating">
            <Star size={10} style={{ color: "#e8a030", fill: "#e8a030" }} />
            <span>(Not Rated Yet)</span>
          </div>
        )}

        <span className="card-arrow" aria-hidden="true">
          <ArrowUpRight size={13} />
        </span>
      </div>

      {/* BODY */}
      <div className="card-body">
        <h3
          className="card-title-link cursor-pointer"
          onClick={() =>
            router.push(`/provider-dashboard/meals/${meal.id}`)
          }
        >
          {meal.title}
        </h3>

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

          {/* 🔥 PROVIDER ACTION */}
          <button
            className="provider-edit-btn"
            onClick={() =>
              router.push(`/provider-dashboard/meals/${meal.id}`)
            }
          >
            Manage
          </button>
        </div>
      </div>
    </article>
  );
}