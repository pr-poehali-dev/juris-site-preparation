import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_LINKS, LAWYER_PHOTO } from "./data";
import Tag from "./Tag";

export default function HeaderHero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ─── NAVBAR ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-paper/85 backdrop-blur-md border-b border-graphite-900/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 font-golos text-sm font-semibold tracking-tight text-graphite-900">
            <span className="inline-block w-2 h-2 bg-lime border border-graphite-900" />
            Patimat&nbsp;Zakaryaeva
            <span className="text-graphite-400 font-normal hidden sm:inline">/ Law</span>
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}
                className="font-golos text-[13px] text-graphite-700 hover:text-graphite-900 transition-colors duration-200">
                {l.label}
              </a>
            ))}
            <a href="#contacts"
              className="ml-2 inline-flex items-center gap-2 bg-graphite-900 text-paper-50 text-[13px] font-medium px-4 py-2 hover:bg-lime hover:text-graphite-900 transition-all duration-300">
              Консультация
              <Icon name="ArrowUpRight" size={14} />
            </a>
          </nav>

          <button className="md:hidden text-graphite-900" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-paper border-t border-graphite-900/10 px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="font-golos text-sm text-graphite-800 hover:text-graphite-900 transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#contacts" onClick={() => setMenuOpen(false)}
              className="bg-graphite-900 text-paper-50 text-sm font-medium px-5 py-3 text-center">
              Консультация
            </a>
          </div>
        )}
      </header>

      {/* ─── HERO ─── */}
      <section id="hero" className="relative pt-28 pb-16 md:pt-32 md:pb-24 bg-paper overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-60 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="reveal d1 flex flex-wrap items-center gap-2 mb-10">
            <Tag variant="lime">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-graphite-900 animate-pulse" />
              Доступна для новых клиентов
            </Tag>
            <Tag variant="outline">B2B Law</Tag>
            <Tag>Москва · 2026</Tag>
          </div>

          <h1 className="reveal d2 display-headline text-graphite-900 text-[clamp(3.5rem,11vw,10rem)]">
            Право,<br />
            <span className="italic font-light">которое</span>
            <span className="relative inline-block ml-3">
              <span className="relative z-10 px-2">работает</span>
              <span className="absolute inset-x-0 bottom-2 h-3 md:h-5 bg-lime -z-0" />
            </span>
            <span className="text-graphite-400">.</span>
          </h1>

          <div className="reveal d3 mt-12 grid md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-7">
              <p className="font-golos text-base md:text-lg text-graphite-700 leading-relaxed max-w-xl">
                Юридическая практика, говорящая с&nbsp;бизнесом на&nbsp;одном языке.
                Более&nbsp;10 лет защищаю интересы компаний и&nbsp;предпринимателей
                в&nbsp;арбитражах, переговорах и&nbsp;структурировании сделок.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <a href="#contacts"
                  className="inline-flex items-center justify-center gap-2 bg-graphite-900 text-paper-50 font-golos text-sm font-medium px-7 py-4 hover:bg-lime hover:text-graphite-900 transition-all duration-300">
                  Получить консультацию
                  <Icon name="ArrowUpRight" size={16} />
                </a>
                <a href="#cases"
                  className="inline-flex items-center justify-center gap-2 border border-graphite-900 text-graphite-900 font-golos text-sm font-medium px-7 py-4 hover:bg-graphite-900 hover:text-paper-50 transition-all duration-300">
                  Судебная практика
                </a>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="relative">
                <img
                  src={LAWYER_PHOTO}
                  alt="Патимат Закарьяева, юрист"
                  className="w-full h-auto object-cover grayscale"
                />
                <div className="absolute top-3 left-3">
                  <Tag variant="dark">Founding Lawyer</Tag>
                </div>
                <div className="absolute bottom-3 right-3 bg-lime px-4 py-2 border border-graphite-900">
                  <p className="font-golos text-xs uppercase tracking-wider text-graphite-900 font-semibold">10+ лет практики</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal d4 mt-20 border-y border-graphite-900/15 bg-paper overflow-hidden">
          <div className="flex ticker-track whitespace-nowrap py-5">
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
                  "Real Estate",
                ].map((w) => (
                  <span key={`${dup}-${w}`} className="flex items-center font-cormorant text-3xl md:text-5xl text-graphite-900 px-8 italic">
                    {w}
                    <span className="inline-block w-2 h-2 bg-lime border border-graphite-900 mx-8" />
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
