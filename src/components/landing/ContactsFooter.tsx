import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_LINKS } from "./data";

export default function ContactsFooter() {
  const [agreeProcessing, setAgreeProcessing] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const canSubmit = agreeProcessing && agreePolicy;

  return (
    <>
      {/* ─── CTA BANNER ─── */}
      <div className="bg-ink py-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold/60 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-golos text-xs tracking-[0.3em] uppercase text-gold mb-4">Начнём работу</p>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-cream-100 leading-tight">
            Ваша ситуация требует<br />профессионального взгляда
          </h2>
          <p className="font-golos text-sm text-cream-200/50 mt-6 mb-10 max-w-lg mx-auto leading-relaxed">
            Первичная консультация — бесплатно. Разберём ситуацию, определим стратегию
            и&nbsp;оценим перспективы уже при первой встрече.
          </p>
          <a href="#contacts"
            className="inline-block bg-gold text-ink font-golos text-xs tracking-widest uppercase px-10 py-4 hover:bg-gold-light transition-all duration-300">
            Записаться на консультацию
          </a>
        </div>
      </div>

      {/* ─── CONTACTS ─── */}
      <section id="contacts" className="py-24 bg-cream-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <p className="font-golos text-xs tracking-[0.3em] uppercase text-gold mb-4">Связь</p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-ink">Контакты</h2>
            <div className="w-12 h-px bg-gold mt-4 mb-10" />
            <div className="space-y-6">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (999) 000-00-00" },
                { icon: "Mail", label: "Электронная почта", value: "info@example.ru" },
                { icon: "MapPin", label: "Адрес", value: "Москва, ул. Примерная, д.1, оф.100" },
                { icon: "Clock", label: "Часы работы", value: "Пн–Пт: 09:00 — 19:00" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0">
                    <Icon name={c.icon} size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-golos text-xs text-ink/40 tracking-wide uppercase mb-0.5">{c.label}</p>
                    <p className="font-golos text-sm text-ink font-medium">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-cream-100 p-8 border border-gold/15">
            <h3 className="font-cormorant text-2xl text-ink mb-6">Оставить заявку</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="font-golos text-xs text-ink/50 uppercase tracking-wide block mb-2">Имя</label>
                <input type="text" placeholder="Иван Петров"
                  className="w-full bg-cream-200 border border-gold/20 px-4 py-3 text-sm font-golos text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold/60 transition-colors" />
              </div>
              <div>
                <label className="font-golos text-xs text-ink/50 uppercase tracking-wide block mb-2">Телефон</label>
                <input type="tel" placeholder="+7 (___) ___-__-__"
                  className="w-full bg-cream-200 border border-gold/20 px-4 py-3 text-sm font-golos text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold/60 transition-colors" />
              </div>
              <div>
                <label className="font-golos text-xs text-ink/50 uppercase tracking-wide block mb-2">Опишите ситуацию</label>
                <textarea rows={4} placeholder="Краткое описание вашего вопроса..."
                  className="w-full bg-cream-200 border border-gold/20 px-4 py-3 text-sm font-golos text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold/60 transition-colors resize-none" />
              </div>
              <label className="flex items-start gap-3 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={agreeProcessing}
                  onChange={(e) => setAgreeProcessing(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-gold cursor-pointer shrink-0"
                />
                <span className="font-golos text-xs text-ink/60 leading-relaxed group-hover:text-ink transition-colors">
                  Я&nbsp;согласен с&nbsp;обработкой моих персональных данных
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={agreePolicy}
                  onChange={(e) => setAgreePolicy(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-gold cursor-pointer shrink-0"
                />
                <span className="font-golos text-xs text-ink/60 leading-relaxed group-hover:text-ink transition-colors">
                  Ознакомлен с&nbsp;
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-gold/50 hover:text-gold transition-colors"
                  >
                    политикой персональных данных
                  </a>
                </span>
              </label>
              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full font-golos text-xs tracking-widest uppercase py-4 transition-all duration-300 ${
                  canSubmit
                    ? "bg-ink text-cream-100 hover:bg-gold hover:text-ink cursor-pointer"
                    : "bg-ink/20 text-ink/40 cursor-not-allowed"
                }`}
              >
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-ink border-t border-gold/20 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-cormorant text-lg text-cream-200/60 tracking-widest uppercase">
            Патимат&nbsp;<span className="text-gold">Закарьяева</span>
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}
                className="font-golos text-xs tracking-widest uppercase text-cream-200/30 hover:text-gold transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <p className="font-golos text-xs text-cream-200/20">© 2024 ИП Закарьяева П.</p>
        </div>
      </footer>
    </>
  );
}
