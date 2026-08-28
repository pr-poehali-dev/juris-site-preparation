import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function ThankYou() {
  return (
    <main className="bg-paper min-h-screen flex items-center">
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky mb-8">
          <Icon name="Check" size={28} className="text-graphite-900" />
        </div>
        <h1 className="font-display uppercase text-4xl md:text-5xl text-graphite-900 leading-tight tracking-tight">
          Заявка отправлена
        </h1>
        <p className="font-golos text-base text-graphite-500 mt-5 leading-relaxed">
          Спасибо за&nbsp;обращение! Я&nbsp;отвечаю лично и&nbsp;перезвоню
          в&nbsp;течение часа в&nbsp;рабочее время (Пн–Пт: 09:00 — 19:00).
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-2 bg-graphite-900 text-paper-50 font-golos text-sm font-medium px-7 py-4 hover:bg-sky hover:text-graphite-900 transition-all duration-300"
        >
          <Icon name="ArrowLeft" size={16} />
          Вернуться на главную
        </Link>
      </div>
    </main>
  );
}
