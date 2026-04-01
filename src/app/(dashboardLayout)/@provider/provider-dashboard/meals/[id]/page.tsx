"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "./meal-details.css";
import { providerService } from "@/services/provider/provider.service";
import { Meal } from "@/types/mealsParams";
import { Category } from "@/types/category";
import { toast } from "sonner";


export default function ProviderMealDetailsPage() {
  const params = useParams();
  const mealId = params.id as string;

  const [meal, setMeal] = useState<Meal | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [mealDelete, setMealDelete] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    imageURL: "",
    isAvailable: true,
    categoryId: "",
    dietary_preferences: "",
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const [mealResult, categoryResult] = await Promise.all([
        providerService.getSingleMeal(mealId),
        providerService.getAllCategories(),
      ]);

      if (mealResult.data) {
        const mealData = mealResult.data;
        setMeal(mealData);

        setForm({
          title: mealData.title || "",
          description: mealData.description || "",
          price: String(mealData.price ?? ""),
          imageURL: mealData.imageURL || "",
          isAvailable: mealData.isAvailable,
          categoryId: mealData.categoryId || "",
          dietary_preferences: mealData.dietary_preferences.join(", "),
        });
      }

      if (categoryResult) {
        setCategories(categoryResult);
      }

      setLoading(false);
    };

    loadData();
  }, [mealId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "isAvailable") {
      setForm((prev) => ({
        ...prev,
        isAvailable: value === "true",
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setMessage("");

    const dietaryPreferencesArray = form.dietary_preferences
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const result = await providerService.updateMeal(mealId, {
      title: form.title,
      description: form.description,
      price: Number(form.price),
      imageURL: form.imageURL,
      isAvailable: form.isAvailable,
      categoryId: form.categoryId,
      dietary_preferences: dietaryPreferencesArray,
    });

    setSaving(false);

    if (result.data) {
      setMeal(result.data);
      setMessage("Meal updated successfully.");
    } else {
      setMessage(result.error?.message || "Update failed.");
    }
  };

  const handleWantToDelete = async() =>{
    setMealDelete(true)
  }

  const handleDelete = async() =>{
    const result = await providerService.deleteMeal(mealId);
    if(result.success){
      toast.success("Meal deleted or marked as unavailable if has active order")
      setMealDelete(false)
    }else{
      toast.error(result.error?.message || "Failed to delete.")
    }
  }

  if (loading) {
    return <div className="provider-page-message">Loading meal...</div>;
  }

  if (!meal) {
    return <div className="provider-page-message">Meal not found.</div>;
  }

  return (
    <div className="meal-details-page">
      <div className="meal-details-header">
        <p className="meal-details-eyebrow">Provider Dashboard</p>
        <h1 className="meal-details-title">Meal Profile</h1>
        <p className="meal-details-subtitle">
          Review and update your meal information
        </p>
      </div>

      <div className="meal-details-card">
        <div className="meal-preview">
          <img
            src={form.imageURL}
            alt={form.title}
            className="meal-preview-image"
          />

          <div className="meal-preview-info">
            <p className="meal-preview-category">
              {meal.category?.name || "Category"}
            </p>
            <h2 className="meal-preview-title">{form.title}</h2>
            <p className="meal-preview-price">৳{form.price}</p>
          </div>
        </div>

        <div className="meal-form-grid">
          <div className="meal-form-field">
            <label>Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="meal-form-input"
            />
          </div>

          <div className="meal-form-field">
            <label>Price</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="meal-form-input"
            />
          </div>

          <div className="meal-form-field meal-form-field-full">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="meal-form-textarea"
              rows={4}
            />
          </div>

          <div className="meal-form-field meal-form-field-full">
            <label>Image URL</label>
            <input
              name="imageURL"
              value={form.imageURL}
              onChange={handleChange}
              className="meal-form-input"
            />
          </div>

          <div className="meal-form-field">
            <label>Category</label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="meal-form-select"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="meal-form-field">
            <label>Availability</label>
            <select
              name="isAvailable"
              value={String(form.isAvailable)}
              onChange={handleChange}
              className="meal-form-select"
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          </div>

          <div className="meal-form-field meal-form-field-full">
            <label>Dietary Preferences</label>
            <input
              name="dietary_preferences"
              value={form.dietary_preferences}
              onChange={handleChange}
              className="meal-form-input"
              placeholder="VEGETARIAN, HALAL, GLUTEN_FREE"
            />
          </div>
        </div>

        {message && <p className="meal-form-message">{message}</p>}

        <div className="meal-form-actions flex gap-4">
          
          <button
            type="button"
            onClick={handleWantToDelete}
            hidden={mealDelete}
            className="text-bold text-[#e8a030]"
          >
            Want to delete this meal? Click Here
          </button>
          <button
            type="button"
            hidden = {!mealDelete}
            onClick={handleDelete}
            className="meal-form-button"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="meal-form-button"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="meal-reviews-section">
          <div className="meal-reviews-head">
            <p className="meal-reviews-eyebrow">Customer Feedback</p>
            <h2 className="meal-reviews-title">Reviews Received</h2>
            <p className="meal-reviews-subtitle">
              {meal.reviews?.length || 0} reviews on this meal
            </p>
          </div>

          {meal.reviews && meal.reviews.length > 0 ? (
            <div className="meal-reviews-list">
              {meal.reviews.map((review) => (
                <div key={review.id} className="meal-review-card">
                  <div className="meal-review-top">
                    <div>
                      <p className="meal-review-user">
                        {review.customer?.name || "Customer"}
                      </p>
                      <p className="meal-review-date">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>

                    <div className="meal-review-rating-box">
                      {renderStars(review.rating)}
                      <span className="meal-review-rating-value">
                        {review.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div className="meal-review-body">
                    <p className="meal-review-comment">
                      {review.comment || "No written comment added."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="meal-reviews-empty">
              No reviews have been submitted for this meal yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


function renderStars(rating: number) {
  return (
    <div className="meal-review-stars">
      {[1, 2, 3, 4, 5].map((star) => {
        let fill = 0;

        if (rating >= star) fill = 100;
        else if (rating >= star - 0.5) fill = 50;

        return (
          <div key={star} className="meal-review-star-wrap">
            <div className="meal-review-star-bg">★</div>
            <div
              className="meal-review-star-fill"
              style={{ width: `${fill}%` }}
            >
              ★
            </div>
          </div>
        );
      })}
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