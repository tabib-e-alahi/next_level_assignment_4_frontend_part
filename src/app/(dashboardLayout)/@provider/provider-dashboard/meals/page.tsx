"use client";

import { useEffect, useState } from "react";
import "./meals.css";
import { Meal } from "@/types/mealsParams";
import { providerService } from "@/services/provider/provider.service";
import ProviderMealCard from "@/components/modules/dashboard/provider/ProviderMealCard";
import LoadingPage from "@/components/modules/loading/LoadingCompo";


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
    return <LoadingPage></LoadingPage>
  }

  return (
    <div className="provider-page meals-root">
      <div className="provider-header">
        <p className="provider-eyebrow">Provider Dashboard</p>
        <h1 className="provider-title">Menu Ledger</h1>
      </div>

      <div className="meals-grid">
        {meals.map((meal) => (
          <ProviderMealCard key={meal.id} meal={meal}></ProviderMealCard>
        ))}
      </div>
    </div>
  );
}