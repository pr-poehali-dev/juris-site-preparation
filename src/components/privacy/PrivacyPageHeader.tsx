import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface PrivacyPageHeaderProps {
  updated: string;
}

export default function PrivacyPageHeader({ updated }: PrivacyPageHeaderProps) {
  return (
    <header className="bg-graphite-900 text-paper-50 py-10">
      <div className="max-w-3xl mx-auto px-6 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-golos text-xs uppercase tracking-[0.15em] text-graphite-300 hover:text-sky transition-colors"
        >
          <Icon name="ArrowLeft" size={16} />
          На главную
        </Link>
        <span className="font-golos text-xs uppercase tracking-[0.15em] text-graphite-400">
          Обновлено: {updated}
        </span>
      </div>
    </header>
  );
}
