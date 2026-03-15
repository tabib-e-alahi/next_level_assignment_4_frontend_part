import Hero from "@/components/modules/home/Hero";
import TopCategorySection from "@/components/modules/home/TopCategorySection";
import TopProvidersSection from "@/components/modules/home/TopProviderSection";

export default async function HomePage() {
  
  return (
    <div>
      <Hero></Hero>
      <div className="max-w-7xl mx-auto">
        <TopCategorySection />
        <TopProvidersSection></TopProvidersSection>
      </div>
    </div>
  );
}
