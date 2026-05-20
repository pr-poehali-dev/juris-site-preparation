import { useState } from "react";
import Icon from "@/components/ui/icon";
import { PRICING, CASES } from "./data";

export default function PricingCases() {
  const [activeCase, setActiveCase] = useState<number | null>(null);

  return (
    <>
      {/* ─── PRICING ─── */}
      <section id="pricing" className="py-24 bg-cream-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <p className="font-golos text-xs tracking-[0.3em] uppercase text-gold mb-4">Услуги для бизнеса</p>
              <h2 className="font-cormorant text-4xl md:text-5xl font-light text-ink">Прайс-лист</h2>
              <div className="w-12 h-px bg-gold mt-4" />
            </div>
            <p className="font-golos text-sm text-ink/50 max-w-sm leading-relaxed">
              Стоимость указана для&nbsp;юридических лиц и&nbsp;индивидуальных предпринимателей.
              Итоговая цена зависит от&nbsp;объёма работы и&nbsp;согласовывается письменно.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-gold/20">
            {PRICING.map((p) => (
              <div key={p.title} className="bg-cream-100 p-8 flex flex-col">
                <div className="flex items-start gap-4 mb-5">
                  <div className="shrink-0 w-12 h-12 border border-gold/40 flex items-center justify-center">
                    <Icon name={p.icon} size={20} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-cormorant text-2xl font-medium text-ink leading-tight">{p.title}</h3>
                    <p className="font-golos text-xs text-ink/50 leading-relaxed mt-2">{p.desc}</p>
                  </div>
                </div>
                <ul className="mt-4 divide-y divide-gold/15">
                  {p.items.map((item) => (
                    <li key={item.name} className="flex items-baseline justify-between gap-4 py-3">
                      <span className="font-golos text-sm text-ink/75 leading-snug">{item.name}</span>
                      <span className="font-cormorant text-lg text-ink whitespace-nowrap">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 border border-gold/25 bg-cream-200/60 px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-golos text-xs tracking-[0.3em] uppercase text-gold mb-2">Нужен индивидуальный расчёт?</p>
              <p className="font-cormorant text-2xl text-ink font-light leading-snug">
                Подготовлю смету под&nbsp;вашу задачу после&nbsp;бесплатной консультации.
              </p>
            </div>
            <a href="#contacts"
              className="shrink-0 bg-ink text-cream-100 font-golos text-xs tracking-widest uppercase px-8 py-4 hover:bg-gold hover:text-ink transition-all duration-300 text-center">
              Обсудить задачу
            </a>
          </div>

          <p className="font-golos text-sm text-ink/60 text-center mt-10 max-w-2xl mx-auto leading-relaxed">
            Если ни&nbsp;один из&nbsp;готовых тарифов не&nbsp;отражает специфику вашего бизнеса —
            на&nbsp;основании конкретных задач я&nbsp;подготовлю <span className="text-ink">индивидуальный тариф</span>,
            учитывающий объём работы, отраслевые особенности и&nbsp;ожидаемую нагрузку.
          </p>
          <p className="font-golos text-xs text-ink/40 italic text-center mt-4 max-w-2xl mx-auto leading-relaxed">
            Цены ориентировочные, не&nbsp;являются публичной офертой. НДС не&nbsp;облагается
            (применяется УСН). Услуги физическим лицам обсуждаются отдельно.
          </p>
        </div>
      </section>

      {/* ─── CASES ─── */}
      <section id="cases" className="py-24 bg-cream-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <p className="font-golos text-xs tracking-[0.3em] uppercase text-gold mb-4">Судебная практика</p>
              <h2 className="font-cormorant text-4xl md:text-5xl font-light text-ink">Кейсы</h2>
              <div className="w-12 h-px bg-gold mt-4" />
            </div>
            <p className="font-golos text-sm text-ink/50 max-w-xs leading-relaxed">
              Каждый кейс — реальное дело с&nbsp;документально подтверждённым результатом.
            </p>
          </div>

          <div className="space-y-4">
            {CASES.map((c, i) => (
              <div key={i}
                className="border border-gold/20 hover:border-gold/50 transition-all duration-300 overflow-hidden">
                <button
                  className="w-full text-left px-8 py-6 flex items-start justify-between gap-6 group bg-cream-100 hover:bg-cream-200/50 transition-colors"
                  onClick={() => setActiveCase(activeCase === i ? null : i)}
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-2">
                      <span className="font-golos text-xs tracking-widest uppercase text-gold">{c.category}</span>
                      <span className="font-golos text-xs text-ink/30">{c.year}</span>
                      {c.caseNumber && (
                        <span className="font-golos text-xs text-ink/40 tracking-wider border-l border-gold/30 pl-4">
                          Дело № {c.caseNumber}
                        </span>
                      )}
                    </div>
                    <h3 className="font-cormorant text-xl md:text-2xl font-medium text-ink group-hover:text-ink/80 transition-colors duration-300">
                      {c.title}
                    </h3>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-2">
                    <span className={`font-golos text-xs tracking-wide font-medium ${c.resultColor}`}>
                      ✓ {c.result}
                    </span>
                    {c.amount && (
                      <span className="font-cormorant text-lg text-ink/40">{c.amount}</span>
                    )}
                    <Icon
                      name="ChevronDown"
                      size={16}
                      className={`text-gold/60 transition-transform duration-300 ${activeCase === i ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                {activeCase === i && (
                  <div className="px-8 pb-8 border-t border-gold/15 bg-cream-100">
                    <p className="font-golos text-sm text-ink/65 leading-relaxed mt-6 max-w-3xl">
                      {c.desc}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <a
                        href={c.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-ink/20 text-ink font-golos text-xs tracking-widest uppercase px-5 py-2.5 hover:border-gold hover:text-gold transition-all duration-300"
                      >
                        <Icon name={c.caseNumber ? "ExternalLink" : "FileText"} size={14} />
                        {c.caseNumber
                          ? (c.pdfUrl.includes("mos-gorsud.ru")
                              ? "Карточка дела на сайте суда"
                              : "Карточка дела на КАД.Арбитр")
                          : "Судебный акт (PDF)"}
                      </a>
                      <span className="font-golos text-xs text-ink/30">
                        {c.caseNumber
                          ? (c.pdfUrl.includes("mos-gorsud.ru")
                              ? "Открытые данные судов общей юрисдикции"
                              : "Открытые данные арбитражных судов РФ")
                          : "Документ размещён в открытом доступе"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="font-golos text-sm text-ink/40 italic">
              Показаны избранные кейсы. Детали изменены для&nbsp;соблюдения конфиденциальности.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
