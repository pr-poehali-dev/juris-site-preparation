import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_LINKS, LAWYER_PHOTO } from "./data";

export default function HeaderHero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ─── NAVBAR ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream-100/90 backdrop-blur-sm border-b border-gold/20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="font-cormorant text-xl font-semibold tracking-widest text-ink uppercase">
            Патимат&nbsp;<span className="text-gold">Закарьяева</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}
                className="font-golos text-xs tracking-widest uppercase text-ink/60 hover:text-gold transition-colors duration-300">
                {l.label}
              </a>
            ))}
            <a href="#contacts"
              className="ml-4 bg-ink text-cream-100 text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-gold hover:text-ink transition-all duration-300">
              Консультация
            </a>
          </nav>

          <button className="md:hidden text-ink" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-cream-100 border-t border-gold/20 px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="font-golos text-sm tracking-widest uppercase text-ink/70 hover:text-gold transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#contacts" onClick={() => setMenuOpen(false)}
              className="bg-ink text-cream-100 text-xs tracking-widest uppercase px-5 py-3 text-center hover:bg-gold hover:text-ink transition-all duration-300">
              Консультация
            </a>
          </div>
        )}
      </header>

      {/* ─── HERO ─── */}
      <section id="hero" className="relative min-h-screen flex items-center bg-ink overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A96E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold to-transparent opacity-60" />

        <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center pt-24 pb-16">
          <div>
            <p className="anim-fade-up d1 font-golos text-xs tracking-[0.3em] uppercase text-gold mb-6">
              Юридические услуги для бизнеса
            </p>
            <h1 className="anim-fade-up d2 font-cormorant text-5xl md:text-6xl lg:text-7xl font-light text-cream-100 leading-tight">
              Право на&nbsp;вашей<br />
              <em className="text-gold not-italic">стороне</em>
            </h1>
            <div className="gold-line-anim mt-6 mb-8" />
            <p className="anim-fade-up d3 font-golos text-base text-cream-200/70 leading-relaxed max-w-md">
              Индивидуальная юридическая практика с&nbsp;фокусом на&nbsp;результат.
              Более&nbsp;10 лет защиты интересов предпринимателей в&nbsp;судах и&nbsp;переговорах.
            </p>
            <div className="anim-fade-up d4 flex flex-col sm:flex-row gap-4 mt-10">
              <a href="#contacts"
                className="bg-gold text-ink font-golos text-xs tracking-widest uppercase px-8 py-4 text-center hover:bg-gold-light transition-all duration-300">
                Получить консультацию
              </a>
              <a href="#cases"
                className="border border-cream-200/30 text-cream-200/80 font-golos text-xs tracking-widest uppercase px-8 py-4 text-center hover:border-gold hover:text-gold transition-all duration-300">
                Смотреть кейсы
              </a>
            </div>
          </div>

          <div className="anim-fade-in relative">
            <div className="relative mx-auto max-w-sm md:max-w-full">
              <div className="absolute -inset-3 border border-gold/30" />
              <div className="absolute -inset-6 border border-gold/10" />
              <img src={LAWYER_PHOTO} alt="Патимат Закарьяева, юрист"
                className="w-full h-auto object-cover"
                style={{ filter: 'grayscale(30%) contrast(1.05) brightness(0.92)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-4 right-4 bg-gold px-5 py-3">
              <p className="font-cormorant text-3xl font-semibold text-ink">10+</p>
              <p className="font-golos text-xs uppercase tracking-wider text-ink/80">лет практики</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-200/30">
          <span className="font-golos text-xs tracking-widest uppercase">Прокрутите</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>
    </>
  );
}
