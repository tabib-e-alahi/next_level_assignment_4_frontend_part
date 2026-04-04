import Hero from "@/components/modules/home/Hero";
import TopCategorySection from "@/components/modules/home/TopCategorySection";
import TopProvidersSection from "@/components/modules/home/TopProviderSection";
import WhyPlatera from "@/components/modules/home/WhyPlatera";

export default async function HomePage() {
  return (
    <div>
      <Hero></Hero>
      <div className="">
        <TopCategorySection />
        <TopProvidersSection></TopProvidersSection>
        <WhyPlatera></WhyPlatera>
      </div>
    </div>
  );
}
