import Hero from "@/components/modules/home/Hero";
import TopCategorySection from "@/components/modules/home/TopCategorySection";
import { getCategories } from "@/services/categories/getCategories";

import Image from "next/image";

export default async function HomePage() {
  const categories = await getCategories()
  return (
    <div>
      <Hero></Hero>
      <div className="max-w-7xl mx-auto">
        <TopCategorySection categories={categories} />
      </div>
    </div>
  );
}
