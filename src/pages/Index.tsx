import HeaderHero from "@/components/landing/HeaderHero";
import AboutServices from "@/components/landing/AboutServices";
import PricingCases from "@/components/landing/PricingCases";
import BookingSection from "@/components/landing/BookingSection";
import ContactsFooter from "@/components/landing/ContactsFooter";
import useReveal from "@/hooks/useReveal";

export default function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-paper font-golos text-graphite-900">
      <HeaderHero />
      <AboutServices />
      <PricingCases />
      <BookingSection />
      <ContactsFooter />
    </div>
  );
}