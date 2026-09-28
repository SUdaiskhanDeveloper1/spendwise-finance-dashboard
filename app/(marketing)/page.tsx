import {
  CallToAction,
  FAQSection,
  Features,
  Hero,
  HowItWorks,
  MobileTeaser,
  PricingPreview,
  Testimonials,
  TrustBar,
} from '@/components/marketing/LandingSections';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Features />
      <HowItWorks />
      <MobileTeaser />
      <Testimonials />
      <PricingPreview />
      <FAQSection />
      <CallToAction />
    </>
  );
}
