import HeaderHero from "@/components/landing/HeaderHero";
import AboutServices from "@/components/landing/AboutServices";
import PricingCases from "@/components/landing/PricingCases";
import ContactsFooter from "@/components/landing/ContactsFooter";

export default function Index() {
  return (
    <div className="min-h-screen bg-cream-100 font-golos">
      <HeaderHero />
      <AboutServices />
      <PricingCases />
      <ContactsFooter />
    </div>
  );
}
