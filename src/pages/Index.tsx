import HeaderHero from "@/components/landing/HeaderHero";
import AboutServices from "@/components/landing/AboutServices";
import PricingCases from "@/components/landing/PricingCases";
import Reviews from "@/components/landing/Reviews";
import ContactsFooter from "@/components/landing/ContactsFooter";
import useReveal from "@/hooks/useReveal";

export default function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-paper font-golos text-graphite-900">
      <HeaderHero />
      <AboutServices />
      <PricingCases />
      <Reviews />
      <ContactsFooter />
    </div>
  );
}