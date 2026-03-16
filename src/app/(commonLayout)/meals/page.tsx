
import MealsPageClient from "@/components/modules/meals/MealsPage";
import { getCategories } from "@/services/categories/getCategories";
import { mealService } from "@/services/meals/meals.service";

export default async function MealsPage() {
  const [categories, dietaryPreferences, mealsResult] = await Promise.all([
    getCategories(),
    mealService.getDietaryPreferences(),
    mealService.getMeals({
      search: "",
      categoryId: "",
      dietaryTags: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      sortOrder: "desc",
    }),
  ]);

  return (
    <MealsPageClient
      initialMeals={mealsResult?.data || []}
      categories={categories || []}
      dietaryPreferences={dietaryPreferences || []}
    />
  );
}