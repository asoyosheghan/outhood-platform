import Seo from "@/components/ui/Seo";
import Hero from "@/components/sections/Hero";
import AboutSnapshot from "@/components/sections/AboutSnapshot";
import ImpactStatsSection from "@/components/sections/ImpactStatsSection";
import UpcomingEventsSection from "@/components/sections/UpcomingEventsSection";
import FeaturedRoadTrips from "@/components/sections/FeaturedRoadTrips";
import CommunityHighlights from "@/components/sections/CommunityHighlights";
import CharityProjects from "@/components/sections/CharityProjects";
import MembershipBenefits from "@/components/sections/MembershipBenefits";
import ResourcesTeaser from "@/components/sections/ResourcesTeaser";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Seo
        title="Outhood — Where Adventure Meets Impact"
        description="Africa's youth lifestyle and impact community. Join road trips, events, and a network turning unforgettable experiences into real change for children's homes across Kenya."
        path="/"
      />
      <Hero />
      <AboutSnapshot />
      <ImpactStatsSection />
      <UpcomingEventsSection />
      <FeaturedRoadTrips />
      <CommunityHighlights />
      <CharityProjects />
      <MembershipBenefits />
      <ResourcesTeaser />
      <TestimonialsSection />
      <NewsletterSection />
      <CTASection />
    </>
  );
}
