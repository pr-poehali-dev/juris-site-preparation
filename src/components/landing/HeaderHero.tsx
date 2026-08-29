import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_LINKS, LAWYER_PHOTO, CASES } from "./data";
import Tag from "./Tag";

export default function HeaderHero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ─── NAVBAR ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-paper/90 backdrop-blur-md border-b border-graphite-900/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5 font-display uppercase text-base font-bold tracking-tight text-graphite-900">
            <span className="inline-flex items-center justify-center w-7 h-7 bg-bordo text-white text-[11px] font-bold">PZ</span>
            Закарьяева
            <span className="text-bordo font-medium hidden sm:inline">/ Law</span>
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}
                className="font-golos text-[13px] font-medium text-graphite-700 hover:text-bordo transition-colors duration-200">
                {l.label}
              </a>
            ))}
            <a href="#booking"
              className="ml-2 inline-flex items-center gap-2 bg-bordo text-white text-[13px] font-semibold px-4 py-2 hover:bg-graphite-900 transition-all duration-300">
              Консультация
              <Icon name="ArrowUpRight" size={14} />
            </a>
          </nav>

          <button className="md:hidden text-bordo" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-paper border-t border-graphite-900/10 px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="font-golos text-sm font-medium text-graphite-800 hover:text-bordo transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#booking" onClick={() => setMenuOpen(false)}
              className="bg-bordo text-white text-sm font-semibold px-5 py-3 text-center">
              Консультация
            </a>
          </div>
        )}
      </header>

      {/* ─── HERO ─── */}
      <section id="hero" className="relative pt-24 md:pt-28 bg-paper overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="bg-bordo relative overflow-hidden px-6 sm:px-10 md:px-14 py-12 md:py-16">
            <div className="absolute inset-0 bg-bordo-grain opacity-70 pointer-events-none" />

            <div className="relative grid md:grid-cols-12 gap-10 md:gap-12 items-center">
              <div className="md:col-span-7">
                <div className="reveal d1 flex flex-wrap items-center gap-2 mb-8">
                  <span className="inline-flex items-center gap-2 bg-sky text-graphite-900 px-3 py-1.5 text-[10px] font-golos font-bold uppercase tracking-[0.18em]">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-bordo animate-pulse" />
                    Беру новые дела
                  </span>
                  <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-golos font-bold uppercase tracking-[0.18em] text-white border border-white/40">
                    Бизнес · Арбитраж
                  </span>
                </div>

                <h1 className="reveal d2 display-headline text-white text-[clamp(2.75rem,8.5vw,6.5rem)]">
                  Спорить<br />
                  <span className="text-sky">выгоднее,</span><br />
                  чем терпеть
                </h1>

                <p className="reveal d3 font-golos text-base md:text-lg text-white/80 leading-relaxed max-w-lg mt-8">
                  Юрист для бизнеса, который считает деньги. Веду арбитражи, взыскиваю
                  долги и&nbsp;закрываю корпоративные конфликты — быстро и&nbsp;по&nbsp;делу.
                </p>

                <div className="reveal d4 flex flex-col sm:flex-row gap-3 mt-9">
                  <a href="#booking"
                    className="inline-flex items-center justify-center gap-2 bg-sky text-graphite-900 font-golos text-sm font-bold uppercase tracking-wider px-7 py-4 hover:bg-white transition-all duration-300">
                    Записаться
                    <Icon name="ArrowUpRight" size={16} />
                  </a>
                  <a href="#cases"
                    className="inline-flex items-center justify-center gap-2 border border-white/50 text-white font-golos text-sm font-bold uppercase tracking-wider px-7 py-4 hover:bg-white hover:text-bordo transition-all duration-300">
                    Смотреть кейсы
                  </a>
                </div>
              </div>

              <div className="reveal d3 md:col-span-5">
                <div className="relative">
                  <img
                    src={LAWYER_PHOTO}
                    alt="Патимат Закарьяева, юрист"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-sky px-5 py-3 flex items-baseline justify-between gap-3">
                    <p className="font-display uppercase text-lg font-bold text-graphite-900 leading-none">10+ лет</p>
                    <p className="font-golos text-[10px] uppercase tracking-[0.18em] text-graphite-800 font-bold">практики</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* metrics strip */}
          <div className="reveal grid grid-cols-2 md:grid-cols-4 border-l border-t border-graphite-900/15 mt-0">
            {[
              { v: "10+ лет", l: "юридической практики" },
              { v: `${CASES.length} дел`, l: "с карточками в открытом доступе" },
              { v: "× 10", l: "максимальное снижение неустойки" },
              { v: "1 час", l: "ответ на заявку" },
            ].map((m) => (
              <div key={m.l} className="bg-paper-50 border-r border-b border-graphite-900/15 px-6 py-7">
                <p className="font-display uppercase text-3xl md:text-4xl font-bold text-bordo leading-none">{m.v}</p>
                <p className="font-golos text-[11px] uppercase tracking-[0.15em] text-graphite-500 font-semibold mt-2">{m.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ticker */}
        <div className="reveal mt-16 bg-graphite-900 overflow-hidden">
          <div className="flex ticker-track whitespace-nowrap py-4">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex items-center shrink-0">
                {[
                  "Арбитраж",
                  "Корпоративное право",
                  "M&A",
                  "Защита активов",
                  "Договорная работа",
                  "Трудовые споры",
                  "Налоги",
                  "Недвижимость",
                ].map((w) => (
                  <span key={`${dup}-${w}`} className="flex items-center font-display uppercase text-2xl md:text-4xl font-bold text-white px-7">
                    {w}
                    <span className="inline-block w-2 h-2 bg-sky mx-7" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}