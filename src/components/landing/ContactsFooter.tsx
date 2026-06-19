import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { NAV_LINKS } from "./data";
import Tag from "./Tag";

export default function ContactsFooter() {
  const [agreeProcessing, setAgreeProcessing] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const canSubmit = agreeProcessing && agreePolicy;

  return (
    <>
      {/* ─── CTA BANNER ─── */}
      <section className="bg-graphite-900 py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="reveal flex items-center gap-2 mb-8">
            <Tag variant="lime">Start</Tag>
            <span className="font-golos text-xs uppercase tracking-[0.2em] text-graphite-400">
              Первая консультация — бесплатно
            </span>
          </div>
          <h2 className="reveal d2 display-headline text-paper-50 text-[clamp(2.75rem,8vw,6.5rem)]">
            Готовы начать?<br />
            <span className="italic font-light text-graphite-400">Я&nbsp;тоже.</span>
          </h2>
          <p className="reveal d3 font-golos text-base text-graphite-300 mt-8 mb-10 max-w-xl leading-relaxed">
            Разберём вашу ситуацию, определим стратегию и&nbsp;оценим перспективы уже
            при&nbsp;первой встрече. Без воды, без скрытых платежей.
          </p>
          <a href="#contacts"
            className="reveal d4 inline-flex items-center gap-3 bg-lime text-graphite-900 font-golos text-sm font-semibold uppercase tracking-widest px-9 py-5 hover:bg-paper-50 transition-all duration-300">
            Записаться на консультацию
            <Icon name="ArrowUpRight" size={18} />
          </a>
        </div>
      </section>

      {/* ─── CONTACTS ─── */}
      <section id="contacts" className="py-24 md:py-32 bg-paper">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-5 reveal">
            <div className="flex items-center gap-2 mb-5">
              <Tag>Контакты</Tag>
              <Tag variant="outline">24/7 заявки</Tag>
            </div>
            <h2 className="font-cormorant text-5xl md:text-6xl text-graphite-900 leading-[0.95] tracking-tight">
              Свяжитесь<br />
              <span className="italic">напрямую</span>
            </h2>
            <p className="font-golos text-sm text-graphite-500 mt-6 max-w-xs">
              Отвечаю лично в&nbsp;рабочее время. Заявки с&nbsp;сайта обрабатываю в&nbsp;течение часа.
            </p>
            <div className="mt-10 space-y-3">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (999) 000-00-00" },
                { icon: "Mail", label: "Электронная почта", value: "info@example.ru" },
                { icon: "Clock", label: "Часы работы", value: "Пн–Пт: 09:00 — 19:00" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4 border-t border-graphite-900/15 pt-4">
                  <Icon name={c.icon} size={16} className="text-graphite-900 mt-1 shrink-0" />
                  <div>
                    <p className="font-golos text-[11px] uppercase tracking-[0.15em] text-graphite-400 mb-0.5">{c.label}</p>
                    <p className="font-golos text-sm text-graphite-900 font-medium">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 reveal d2">
            <div className="bg-paper-50 border border-graphite-900 p-8 md:p-10 relative">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="font-cormorant text-3xl md:text-4xl text-graphite-900 leading-tight">
                    Оставить <span className="italic">заявку</span>
                  </h3>
                  <p className="font-golos text-xs text-graphite-500 mt-2">Перезвоню в&nbsp;течение часа</p>
                </div>
                <Tag variant="lime">Free</Tag>
              </div>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="font-golos text-[11px] text-graphite-500 uppercase tracking-[0.15em] block mb-2">Имя</label>
                  <input type="text" placeholder="Иван Петров"
                    className="w-full bg-transparent border-0 border-b border-graphite-900/30 px-0 py-3 text-base font-golos text-graphite-900 placeholder:text-graphite-400 focus:outline-none focus:border-graphite-900 transition-colors" />
                </div>
                <div>
                  <label className="font-golos text-[11px] text-graphite-500 uppercase tracking-[0.15em] block mb-2">Телефон</label>
                  <input type="tel" placeholder="+7 (___) ___-__-__"
                    className="w-full bg-transparent border-0 border-b border-graphite-900/30 px-0 py-3 text-base font-golos text-graphite-900 placeholder:text-graphite-400 focus:outline-none focus:border-graphite-900 transition-colors" />
                </div>
                <div>
                  <label className="font-golos text-[11px] text-graphite-500 uppercase tracking-[0.15em] block mb-2">Опишите ситуацию</label>
                  <textarea rows={4} placeholder="Краткое описание вашего вопроса..."
                    className="w-full bg-transparent border-0 border-b border-graphite-900/30 px-0 py-3 text-base font-golos text-graphite-900 placeholder:text-graphite-400 focus:outline-none focus:border-graphite-900 transition-colors resize-none" />
                </div>
                <label className="flex items-start gap-3 cursor-pointer select-none group pt-2">
                  <input
                    type="checkbox"
                    checked={agreeProcessing}
                    onChange={(e) => setAgreeProcessing(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-lime cursor-pointer shrink-0"
                  />
                  <span className="font-golos text-xs text-graphite-700 leading-relaxed group-hover:text-graphite-900 transition-colors">
                    Я&nbsp;согласен с&nbsp;обработкой моих персональных данных
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer select-none group">
                  <input
                    type="checkbox"
                    checked={agreePolicy}
                    onChange={(e) => setAgreePolicy(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-lime cursor-pointer shrink-0"
                  />
                  <span className="font-golos text-xs text-graphite-700 leading-relaxed group-hover:text-graphite-900 transition-colors">
                    Ознакомлен с&nbsp;
                    <Link
                      to="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-graphite-900 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      политикой обработки персональных данных
                    </Link>
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`w-full inline-flex items-center justify-center gap-2 font-golos text-sm tracking-widest uppercase font-semibold py-5 transition-all duration-300 ${
                    canSubmit
                      ? "bg-graphite-900 text-paper-50 hover:bg-lime hover:text-graphite-900 cursor-pointer"
                      : "bg-graphite-900/15 text-graphite-400 cursor-not-allowed"
                  }`}
                >
                  Отправить заявку
                  {canSubmit && <Icon name="ArrowUpRight" size={16} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-graphite-900 text-paper-50 border-t border-graphite-900 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-lime border border-paper-50" />
              <p className="font-golos text-sm font-semibold tracking-tight">
                Patimat&nbsp;Zakaryaeva
                <span className="text-graphite-400 font-normal"> / Law</span>
              </p>
            </div>
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href}
                  className="font-golos text-xs uppercase tracking-[0.15em] text-graphite-300 hover:text-lime transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col md:items-end gap-1.5">
              <Link
                to="/privacy"
                className="font-golos text-xs uppercase tracking-[0.15em] text-graphite-300 hover:text-lime transition-colors"
              >
                Политика обработки персональных данных
              </Link>
              <p className="font-golos text-xs text-graphite-400">© 2026 ИП Закарьяева П.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}