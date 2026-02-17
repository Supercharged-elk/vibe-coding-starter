import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { HeroSection } from '@/components/dashboard/HeroSection';
import { CallToActionSection } from '@/components/dashboard/CallToActionSection';
import { LatestNewsSection } from '@/components/dashboard/LatestNewsSection';
import { NewsHighlightsSection } from '@/components/dashboard/NewsHighlightsSection';
import { FeaturedProjectsSection } from '@/components/dashboard/FeaturedProjectsSection';
import { FooterSection } from '@/components/dashboard/FooterSection';

export default function DashboardPage() {
  return (
    <div className="flex w-full flex-col">
      <DashboardHeader />
      <HeroSection />
      <CallToActionSection />
      <LatestNewsSection />
      <NewsHighlightsSection />
      <FeaturedProjectsSection />
      <FooterSection />
    </div>
  );
}
