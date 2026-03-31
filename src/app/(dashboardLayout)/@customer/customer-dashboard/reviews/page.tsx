"use client";

import { useEffect, useMemo, useState } from "react";
import "./reviews.css";
import { Review } from "@/types/reviews";
import { reviewService } from "@/services/review.service";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const result = await reviewService.getMyReviews();

      if (result.data) {
        setReviews(result.data);
      } else {
        console.error(result.error?.message);
      }

      setLoading(false);
    };

    fetchReviews();
  }, []);

  const hasReviews = useMemo(() => reviews.length > 0, [reviews]);

  if (loading) {
    return <div className="reviews-page-message">Loading reviews...</div>;
  }

  if (!hasReviews) {
    return <div className="reviews-page-message">No reviews found.</div>;
  }

  return (
    <div className="reviews-page">
      <div className="reviews-header">
        <p className="reviews-eyebrow">Customer Dashboard</p>
        <h1 className="reviews-title">My Reviews</h1>
        <p className="reviews-subtitle">{reviews.length} reviews found</p>
      </div>

      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-card-top">
              <div>
                <p className="review-meal-title">
                  {review.meal?.title || review.mealId}
                </p>
              </div>

              <div className="review-rating-badge">
                {review.rating}/5
              </div>
            </div>

            <div className="review-card-body">
              <p className="review-comment">
                {review.comment || "No comment added."}
              </p>
            </div>

            <div className="review-card-footer">
              <span>Created: {formatDate(review.createdAt)}</span>
              <span>{review.createdAt !== review.updatedAt ? `Updated: ${formatDate(review.updatedAt)}` : ""}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}