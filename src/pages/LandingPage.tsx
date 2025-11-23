import HeroSection from "../shared/components/sections/HeroSection";
import StorySection from "../shared/components/sections/StorySection";
import VisionMissionSection from "../shared/components/sections/VisionMissionSection";
import CollectionSection from "../shared/components/sections/CollectionSection";
import ReviewSection from "../shared/components/sections/ReviewSection";
import FormSection from "../shared/components/sections/FormSection";

export default function LandingPage() {
  return (
    <main className="w-full bg-[#991B1B] text-[#F8F6EF]">
      <HeroSection />
      <StorySection />
      <VisionMissionSection />
      <CollectionSection />
      <ReviewSection />
      <FormSection />
    </main>
  );
}
