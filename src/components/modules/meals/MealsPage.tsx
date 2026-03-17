"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import MealCard from "@/components/modules/meals/MealCard";
import { mealService } from "@/services/meals/meals.service";

type Category = {
  id: string
  name: string
};

type Review = {
  rating: number
};
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

type Props = {
  initialMeals: Meal[]
  categories: Category[]
  dietaryPreferences: string[]
};

export default function MealsPageClient({
  initialMeals,
  categories,
  dietaryPreferences,
}: Props) {
  // =========================
  // MAIN DATA
  // =========================
  const [meals, setMeals] = useState(initialMeals);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // SEARCH
  // =========================
  const [search, setSearch] = useState("");

  // =========================
  // SORT UI STATE
  // latest | price-low | price-high | popular
  // =========================
  const [sortValue, setSortValue] = useState("latest");

  // =========================
  // FILTER STATES
  // =========================
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedDietaryTags, setSelectedDietaryTags] = useState<string[]>([]);

  // =========================
  // MAP SORT UI -> BACKEND PARAMS
  // =========================
  const getSortParams = (value: string): { sortBy: string; sortOrder: "asc" | "desc" } => {
    if (value && value === "price-low") {
      return { sortBy: "price", sortOrder: "asc" };
    }
    else if (value && value === "price-high") {
      return { sortBy: "price", sortOrder: "desc" };
    }
    else if (value && value === "price-low") { return { sortBy: "price", sortOrder: "asc" }; }
    else { return { sortBy: "createdAt", sortOrder: "desc" }; }
  };

  // =========================
  // FETCH MEALS
  // =========================
  const fetchMeals = async () => {
    try {
      setLoading(true);
      setError("");

      const { sortBy, sortOrder } = getSortParams(sortValue);

      const dietaryTagsString = selectedDietaryTags.join(",");

      const result = await mealService.getMeals({
        search,
        categoryId: selectedCategoryId,
        dietaryTags: dietaryTagsString,
        minPrice,
        maxPrice,
        sortBy,
        sortOrder,
      });

      if (result?.error) {
        setError(result.error.message || "Failed to fetch meals");
        setMeals([]);
      } else {
        setMeals(result?.data || []);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // APPLY
  // =========================
  const handleApplyFilters = async () => {
    await fetchMeals();
  };

  // =========================
  // RESET
  // =========================
  const handleResetFilters = async () => {
    setSearch("");
    setSortValue("latest");
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategoryId("");
    setSelectedDietaryTags([]);

    try {
      setLoading(true);
      setError("");

      const result = await mealService.getMeals({
        search: "",
        categoryId: "",
        dietaryTags: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "createdAt",
        sortOrder: "desc",
      });

      if (result?.error) {
        setError(result.error.message || "Failed to fetch meals");
        setMeals([]);
      } else {
        setMeals(result?.data || []);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to reset meals");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DIETARY TAG TOGGLE
  // =========================
  const handleDietaryChange = (tag: string, checked: boolean) => {
    if (checked) {
      setSelectedDietaryTags((prev) => {
        if (prev.includes(tag)) return prev;
        return [...prev, tag];
      });
    } else {
      setSelectedDietaryTags((prev) => prev.filter((item) => item !== tag));
    }
  };
  // =========================
  // COMMON FILTER UI
  // =========================
  const renderFilters = () => (
    <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="text-lg font-semibold tracking-tight">Filters</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Narrow down meals by price, category, and dietary needs
        </p>
      </div>

      <div className="space-y-6">
        {/* PRICE RANGE */}
        <div>
          <Label className="text-sm font-medium">Price Range</Label>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <Label
                htmlFor="min-price"
                className="mb-2 block text-xs text-muted-foreground"
              >
                Min Price
              </Label>
              <Input
                id="min-price"
                type="number"
                placeholder="100"
                className="rounded-2xl"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>

            <div>
              <Label
                htmlFor="max-price"
                className="mb-2 block text-xs text-muted-foreground"
              >
                Max Price
              </Label>
              <Input
                id="max-price"
                type="number"
                placeholder="1000"
                className="rounded-2xl"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* CATEGORY */}
        <div>
          <Label className="text-[14px] font-bold">Cuisine Types</Label>
          <div className="mt-3 space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center gap-3">
                <Checkbox
                  id={category.id}
                  checked={selectedCategoryId === category.id}
                  onCheckedChange={(checked) =>
                    setSelectedCategoryId(checked ? category.id : "")
                  }
                />
                <Label
                  htmlFor={category.id}
                  className="cursor-pointer font-medium capitalize"
                >
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* DIETARY */}
        <div>
          <Label className="text-[14px] font-bold">Dietary Preferences</Label>
          <div className="mt-3 space-y-3">
            {dietaryPreferences.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Checkbox
                  id={item}
                  checked={selectedDietaryTags.includes(item)}
                  onCheckedChange={(checked) =>
                    handleDietaryChange(item, checked === true)
                  }
                />
                <Label
                  htmlFor={item}
                  className="cursor-pointer font-medium capitalize"
                >
                  {item}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* ACTIONS */}
        <div className="flex gap-3">
          <Button className="flex-1 rounded-2xl" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
          <Button
            variant="outline"
            className="flex-1 rounded-2xl"
            onClick={handleResetFilters}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <main className="max-w-7xl mx-auto min-h-screen">
      {/* HERO SECTION */}
      <section className="border-b border-border/60">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Discover Meals
            </span>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Browse meals that match your craving
            </h1>

            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
              Explore fresh dishes from trusted providers. Filter by price,
              cuisine, dietary preference, and search exactly what you want.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden lg:block">{renderFilters()}</aside>

          <div className="min-w-0">
            {/* SEARCH + SORT + MOBILE FILTER */}
            <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-border/60 bg-card/70 p-4 shadow-sm backdrop-blur sm:p-5">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
                {/* SEARCH */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search meals, cuisines, or ingredients..."
                    className="h-11 rounded-2xl border-border/60 bg-background pl-10"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleApplyFilters();
                      }
                    }}
                  />
                </div>

                <div className="flex gap-3">
                  {/* SORT */}
                  <Select
                    value={sortValue}
                    onValueChange={(value) => setSortValue(value)}
                  >
                    <SelectTrigger className="h-11 w-full min-w-[160px] rounded-2xl border-border/60 bg-background">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* MOBILE FILTER */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-11 rounded-2xl lg:hidden"
                      >
                        <SlidersHorizontal className="mr-2 size-4" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="left"
                      className="w-[320px] overflow-y-auto p-0"
                    >
                      <div className="p-5">{renderFilters()}</div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {/* ACTIVE FILTER TAGS */}
              <div className="flex flex-wrap items-center gap-2">
                {selectedCategoryId && (
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Category Selected
                  </span>
                )}

                {(minPrice || maxPrice) && (
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {minPrice || "0"} - {maxPrice || "∞"}
                  </span>
                )}

                {selectedDietaryTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}

                <span className="text-xs text-muted-foreground">
                  {meals.length} meals found
                </span>
              </div>
            </div>

            {/* SECTION HEADING */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  Available Meals
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Clean, modern food cards ready for your API integration
                </p>
              </div>
            </div>

            {/* STATUS */}
            {loading && (
              <p className="mb-4 text-sm text-muted-foreground">
                Loading meals...
              </p>
            )}

            {error && (
              <p className="mb-4 text-sm text-red-500">{error}</p>
            )}

            {!loading && !error && meals.length === 0 && (
              <p className="mb-4 text-sm text-muted-foreground">
                No meals found.
              </p>
            )}

            {/* MEALS GRID */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {meals.map((mealItem) => (
                <MealCard key={mealItem.id} meal={mealItem} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}