"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";


import "./addMealForm.css";
import { providerService } from '../../../../services/provider/provider.service';
import { Category } from "@/types/mealsParams";


type MealData = {
  title: string;
  description: string;
  price: number;
  imageURL: string;
  isAvailable: boolean;
  categoryId: string;
  dietary_preferences: string[];
};

const parseDietaryPreferences = (value: string): string[] => {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

export default function AddMealForm() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageURL: "",
    isAvailable: true,
    category: "",
    dietaryInput: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoadingCategories(true);
        
        const res = await providerService.getAllCategories();
        const categoryList = Array.isArray(res) ? res : res || [];
        setCategories(categoryList);
      } catch (err) {
        console.error("Failed to load categories:", err);
        setError("Failed to load categories.");
      } finally {
        setIsLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  const dietaryPreview = useMemo(() => {
    return parseDietaryPreferences(formData.dietaryInput);
  }, [formData.dietaryInput]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvailabilityChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isAvailable: checked,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) return "Title is required.";
    if (!formData.description.trim()) return "Description is required.";
    if (!formData.price.trim()) return "Price is required.";
    if (Number.isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      return "Price must be a valid number greater than 0.";
    }
    if (!formData.imageURL.trim()) return "Image URL is required.";
    if (!formData.category) return "Category is required.";

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const payload: MealData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      imageURL: formData.imageURL.trim(),
      isAvailable: formData.isAvailable,
      categoryId: formData.category,
      dietary_preferences: parseDietaryPreferences(formData.dietaryInput),
    };

    try {
      setIsSubmitting(true);

      const result = await providerService.createMeal(payload);

      setSuccess("Meal added successfully.");

      setFormData({
        title: "",
        description: "",
        price: "",
        imageURL: "",
        isAvailable: true,
        category: "",
        dietaryInput: "",
      });

      router.push("/provider-dashboard/meals");
      router.refresh();
    } catch (err: any) {
      console.error("Failed to create meal:", err);
      setError(err?.message || "Failed to add meal.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={"page"}>
      <div className={"wrapper"}>
        <div className={"header"}>
          <p className={"kicker"}>Provider Dashboard</p>
          <h1 className={"title"}>Add New Meal</h1>
          <p className={"subtitle"}>
            Create a new meal for your menu with category, pricing, image, and
            dietary details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={"form"}>
          <div className={"grid"}>
            <div className={"field"}>
              <Label htmlFor="title" className={"label"}>
                Meal Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Ex: Grilled Chicken Bowl"
                value={formData.title}
                onChange={handleChange}
                className={"input"}
              />
            </div>

            <div className={"field"}>
              <Label htmlFor="price" className={"label"}>
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="Ex: 250"
                value={formData.price}
                onChange={handleChange}
                className={"input"}
              />
            </div>

            <div className={"field"}>
              <Label htmlFor="imageURL" className={"label"}>
                Image URL
              </Label>
              <Input
                id="imageURL"
                name="imageURL"
                placeholder="https://example.com/meal.jpg"
                value={formData.imageURL}
                onChange={handleChange}
                className={"input"}
              />
            </div>

            <div className={"field"}>
              <Label className={"label"}>Category</Label>
              <Select
                value={formData.category}
                onValueChange={handleCategoryChange}
                disabled={isLoadingCategories}
              >
                <SelectTrigger className={"selectTrigger"}>
                  <SelectValue
                    placeholder={
                      isLoadingCategories
                        ? "Loading categories..."
                        : "Select a category"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={`field} fullWidth`}>
              <Label htmlFor="description" className={'label'}>
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Write a short description about this meal..."
                value={formData.description}
                onChange={handleChange}
                className={"textarea"}
              />
            </div>

            <div className="field fullWidth">
              <Label htmlFor="dietaryInput" className={"label"}>
                Dietary Preferences
              </Label>
              <Input
                id="dietaryInput"
                name="dietaryInput"
                placeholder="halal, gluten_free, dairy_free"
                value={formData.dietaryInput}
                onChange={handleChange}
                className={"input"}
              />
              <p className={"helper"}>
                Use comma-separated values. Extra spaces will be removed
                automatically.
              </p>

              {dietaryPreview.length > 0 && (
                <div className={"tags"}>
                  {dietaryPreview.map((item) => (
                    <span key={item} className={"tag"}>
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="field switchField">
              <div className={"switchRow"}>
                <div>
                  <Label className={"label"}>Availability</Label>
                  <p className={"helper"}>
                    Set whether this meal is currently available for ordering.
                  </p>
                </div>
                <Switch
                  checked={formData.isAvailable}
                  onCheckedChange={handleAvailabilityChange}
                />
              </div>
            </div>
          </div>

          {error && <p className={"error"}>{error}</p>}
          {success && <p className={"success"}>{success}</p>}

          <div className={"actions"}>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/provider-dashboard/meals")}
              className={"secondaryButton"}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className={"primaryButton"}
            >
              {isSubmitting ? "Adding Meal..." : "Add Meal"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}