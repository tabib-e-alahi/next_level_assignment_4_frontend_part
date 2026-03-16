import Hero from "@/components/modules/home/Hero";
import TopCategorySection from "@/components/modules/home/TopCategorySection";
import TopProvidersSection from "@/components/modules/home/TopProviderSection";
import WhyPlatera from "@/components/modules/home/WhyPlatera";

export default function HomePage() {
 
  return (
    <div>
      <Hero></Hero>
      <div className="max-w-7xl mx-auto">
        <TopCategorySection />
        <TopProvidersSection></TopProvidersSection>
        <WhyPlatera></WhyPlatera>
      </div>
    </div>
  );
}
