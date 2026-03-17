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
import { Category, Meal } from "@/types/mealsParams";

import "./meals.css";

type Props = {
  initialMeals: Meal[];
  categories: Category[];
  dietaryPreferences: string[];
};

export default function MealsPageClient({
  initialMeals,
  categories,
  dietaryPreferences,
}: Props) {
  const [meals, setMeals] = useState(initialMeals);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [sortValue, setSortValue] = useState("latest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedDietaryTags, setSelectedDietaryTags] = useState<string[]>([]);

  const getSortingFilterParams = (value: string): { sortBy: string; sortOrder: "asc" | "desc" } => {
    if (value && value === "price-low") {
      return { sortBy: "price", sortOrder: "asc" };
    }
    else if (value && value === "price-high") {
      return { sortBy: "price", sortOrder: "desc" };
    }
    else if (value && value === "price-low") {
      return { sortBy: "price", sortOrder: "asc" };
    }
    else {
      return { sortBy: "createdAt", sortOrder: "desc" };
    }
  };

  const fetchMealsData = async () => {
    try {
      setLoading(true);
      setError("");

      const { sortBy, sortOrder } = getSortingFilterParams(sortValue);
      const dietaryPreferencesString = selectedDietaryTags.join(",");

      const result = await mealService.getMeals({
        search,
        categoryId: selectedCategoryId,
        dietaryTags: dietaryPreferencesString,
        minPrice,
        maxPrice,
        sortBy,
        sortOrder,
      });

      if (result?.error) {
        setError(result.error.message || "Failed to fetched meals data");
        setMeals([]);
      } else {
        setMeals(result?.data || []);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong!!!");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = async () => { await fetchMealsData(); };

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
        search: "", categoryId: "", dietaryTags: "",
        minPrice: "", maxPrice: "",
        sortBy: "createdAt", sortOrder: "desc",
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

  const handleDietaryChange = (tag: string, checked: boolean) => {
    if (checked) {
      setSelectedDietaryTags((prev) => prev.includes(tag) ? prev : [...prev, tag]);
    } else {
      setSelectedDietaryTags((prev) => prev.filter((item) => item !== tag));
    }
  };

  const renderFilters = () => (
    <div className="filter-panel">

      <h3 className="filter-heading">Filters</h3>
      <p className="filter-sub">Narrow down by price, cuisine, and dietary needs</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>

        {/* PRICE RANGE */}
        <div>
          <div className="filter-section-label">Price Range</div>
          <div className="price-input-wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem" }}>
            <div>
              <Label htmlFor="min-price" className="mb-2 block">Min Price</Label>
              <Input
                id="min-price" type="number" placeholder="100"
                value={minPrice} onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="max-price" className="mb-2 block">Max Price</Label>
              <Input
                id="max-price" type="number" placeholder="1000"
                value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Separator className="filter-sep" />

        {/* CATEGORY */}
        <div>
          <div className="filter-section-label">Cuisine Types</div>
          <div style={{ display: "flex", flexDirection: "column", gap: ".65rem" }}>
            {categories.map((category) => (
              <div key={category.id} className="filter-check-row">
                <Checkbox
                  id={category.id}
                  checked={selectedCategoryId === category.id}
                  onCheckedChange={(checked) =>
                    setSelectedCategoryId(checked ? category.id : "")
                  }
                />
                <Label htmlFor={category.id} className="capitalize">
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="filter-sep" />

        {/* DIETARY */}
        <div>
          <div className="filter-section-label">Dietary Preferences</div>
          <div style={{ display: "flex", flexDirection: "column", gap: ".65rem" }}>
            {dietaryPreferences.map((item) => (
              <div key={item} className="filter-check-row">
                <Checkbox
                  id={item}
                  checked={selectedDietaryTags.includes(item)}
                  onCheckedChange={(checked) =>
                    handleDietaryChange(item, checked === true)
                  }
                />
                <Label htmlFor={item} className="capitalize">{item}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="filter-sep" />

        {/* ACTIONS */}
        <div style={{ display: "flex", gap: ".6rem" }}>
          <Button className="btn-apply" onClick={handleApplyFilters}>Apply</Button>
          <Button className="btn-reset" onClick={handleResetFilters}>Reset</Button>
        </div>
      </div>
    </div>
  );

  return (
    <main className="meals-root">

      {/* ── HERO ── */}
      <section className="meals-hero">
        <div className="hero-eyebrow">
          <span className="hero-dot" />
          Discover Meals
        </div>

        <h1 className="hero-title">
          Browse meals that match<br />
          <em>your craving.</em>
        </h1>

        <p className="hero-sub">
          Explore fresh dishes from trusted providers. Filter by price,
          cuisine, dietary preference, and find exactly what you want.
        </p>
      </section>

      {/* ── BODY ── */}
      <div className="meals-body">

        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:block">{renderFilters()}</aside>

        {/* MAIN CONTENT */}
        <div style={{ minWidth: 0 }}>

          {/* SEARCH + SORT BAR */}
          <div className="search-bar">
            <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem", alignItems: "center" }}>

                {/* Search */}
                <div className="search-input-wrap" style={{ flex: 1, minWidth: "200px" }}>
                  <Search />
                  <Input
                    placeholder="Search meals, cuisines, ingredients…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleApplyFilters(); }}
                  />
                </div>

                <div style={{ display: "flex", gap: ".6rem", alignItems: "center" }}>
                  {/* Sort */}
                  <Select value={sortValue} onValueChange={(v) => setSortValue(v)}>
                    <SelectTrigger className="sort-trigger">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        background: "var(--smoke)",
                        border: "1px solid var(--border-ember)",
                        borderRadius: "12px",
                        color: "var(--parch)",
                      }}
                    >
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="price-low">Price: Low → High</SelectItem>
                      <SelectItem value="price-high">Price: High → Low</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Mobile filter */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button className="btn-mobile-filter lg:hidden">
                        <SlidersHorizontal className="mr-2 size-4" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="mobile-sheet-inner w-[310px] overflow-y-auto p-5">
                      {renderFilters()}
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {/* Active filter chips */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: ".5rem" }}>
                {selectedCategoryId && (
                  <span className="active-chip">Category Selected</span>
                )}
                {(minPrice || maxPrice) && (
                  <span className="active-chip">
                    {minPrice || "0"} – {maxPrice || "∞"}
                  </span>
                )}
                {selectedDietaryTags.map((tag) => (
                  <span key={tag} className="active-chip">{tag}</span>
                ))}
                <span className="meals-count">{meals.length} meals found</span>
              </div>
            </div>
          </div>

          {/* SECTION HEADING */}
          <div className="section-head">
            <h2 className="section-title">Available Meals</h2>
            <p className="section-sub">Fresh dishes from verified home kitchens</p>
          </div>

          {/* STATUS */}
          {loading && <p className="status-loading">Loading meals…</p>}
          {error && <p className="status-error">{error}</p>}
          {!loading && !error && meals.length === 0 && (
            <p className="status-empty">No meals found.</p>
          )}

          {/* MEALS GRID */}
          <div className="meals-grid">
            {meals.map((mealItem) => (
              <MealCard key={mealItem.id} meal={mealItem} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}