import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import PrivacyPageHeader from "@/components/privacy/PrivacyPageHeader";
import PrivacySectionsPartOne from "@/components/privacy/PrivacySectionsPartOne";
import PrivacySectionsPartTwo from "@/components/privacy/PrivacySectionsPartTwo";
import PrivacySectionsPartThree from "@/components/privacy/PrivacySectionsPartThree";

const UPDATED = "25 августа 2026 г.";

export default function Privacy() {
  return (
    <main className="bg-paper min-h-screen">
      <PrivacyPageHeader updated={UPDATED} />

      <article className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <h1 className="font-cormorant text-4xl md:text-5xl text-graphite-900 leading-tight tracking-tight">
          Политика обработки персональных данных
        </h1>

        <div className="prose-policy mt-10 space-y-10 font-golos text-[15px] text-graphite-700 leading-relaxed">
          <PrivacySectionsPartOne />
          <PrivacySectionsPartTwo />
          <PrivacySectionsPartThree />
        </div>

        <div className="mt-16 pt-8 border-t border-graphite-900/15">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-golos text-sm uppercase tracking-[0.15em] text-graphite-900 hover:text-lime transition-colors"
          >
            <Icon name="ArrowLeft" size={16} />
            Вернуться на главную
          </Link>
        </div>
      </article>
    </main>
  );
}
