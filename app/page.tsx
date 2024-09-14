import { FeatureSection } from "@/components/shared/FeatureSection";
import { Hero } from "@/components/shared/Hero";

export default function Home() {
  return (
    <div className="mx-4 md:mx-10">
      <Hero />
      <FeatureSection />
    </div>
  );
}
