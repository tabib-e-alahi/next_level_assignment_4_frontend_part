"use client";

import { useEffect, useState } from "react";
import "./meals.css";
import { Meal } from "@/types/mealsParams";
import { providerService } from "@/services/provider/provider.service";
import ProviderMealCard from "@/components/modules/dashboard/provider/ProviderMealCard";


export default function ProviderMealsPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMeals = async () => {
      setLoading(true);
      const result = await providerService.getMyMeals();

      if (result.data) {
        setMeals(result.data);
      }

      setLoading(false);
    };

    loadMeals();
  }, []);

  if (loading) {
    return <div className="provider-page-message">Loading meals...</div>;
  }
console.log(meals);
  return (
    <div className="provider-page meals-root">
      <div className="provider-header">
        <p className="provider-eyebrow">Provider Dashboard</p>
        <h1 className="provider-title">Menu Ledger</h1>
      </div>

      <div className="meals-grid">
        {meals.map((meal) => (
          // <div key={meal.id} className="provider-meal-card">
          //   <img
          //     src={meal.imageURL}
          //     alt={meal.title}
          //     className="provider-meal-image"
          //   />

          //   <div className="provider-meal-content">
          //     <p className="provider-meal-category">{meal.category.name}</p>
          //     <h3 className="provider-meal-title">{meal.title}</h3>
          //     <p className="provider-meal-description">{meal.description}</p>

          //     <div className="provider-meal-meta">
          //       <span>৳{meal.price}</span>
          //       <span>{meal.isAvailable ? "Available" : "Unavailable"}</span>
          //     </div>

          //     <button
          //       className="provider-action-btn"
          //       onClick={() =>
          //         router.push(`/provider-dashboard/meals/${meal.id}`)
          //       }
          //     >
          //       View Details
          //     </button>
          //   </div>
          // </div>
          <ProviderMealCard key={meal.id} meal={meal}></ProviderMealCard>
        ))}
      </div>
    </div>
  );
}