import { useState } from "react";
import Icon from "@/components/ui/icon";
import { PRICING, CASES } from "./data";
import Tag from "./Tag";

export default function PricingCases() {
  const [activeCase, setActiveCase] = useState<number | null>(null);

  return (
    <>
      {/* ─── PRICING ─── */}
      <section id="pricing" className="py-24 md:py-32 bg-paper">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Tag>Прайс</Tag>
                <Tag variant="lime">B2B only</Tag>
              </div>
              <h2 className="font-cormorant text-5xl md:text-6xl text-graphite-900 leading-[0.95] tracking-tight">
                Прозрачные<br />
                <span className="italic">цены</span> для&nbsp;бизнеса
              </h2>
            </div>
            <p className="font-golos text-sm text-graphite-500 max-w-sm leading-relaxed">
              Стоимость указана для&nbsp;юрлиц и&nbsp;ИП. Итоговая цена зависит от&nbsp;объёма работы
              и&nbsp;согласовывается письменно — без скрытых платежей.
            </p>
          </div>

          <div className="grid md:grid-cols-2 border-l border-t border-graphite-900/15">
            {PRICING.map((p, idx) => {
              const subBlocks = "subBlocks" in p ? p.subBlocks : undefined;
              return (
                <div
                  key={p.title}
                  className="reveal bg-paper-50 border-r border-b border-graphite-900/15 p-8 md:p-10 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 border border-graphite-900 flex items-center justify-center bg-paper">
                        <Icon name={p.icon} size={20} className="text-graphite-900" />
                      </div>
                      <span className="font-golos text-xs text-graphite-400 tracking-widest">
                        0{idx + 1} / 0{PRICING.length}
                      </span>
                    </div>
                    {idx === 5 && <Tag variant="lime">Hot</Tag>}
                  </div>
                  <h3 className="font-cormorant text-3xl font-medium text-graphite-900 leading-tight">{p.title}</h3>
                  <p className="font-golos text-sm text-graphite-500 leading-relaxed mt-3">{p.desc}</p>

                  <ul className="mt-6 divide-y divide-graphite-900/10">
                    {p.items.map((item) => (
                      <li key={item.name} className="flex items-baseline justify-between gap-4 py-3.5">
                        <span className="font-golos text-sm text-graphite-800 leading-snug">{item.name}</span>
                        <span className="font-cormorant text-lg text-graphite-900 whitespace-nowrap font-medium">{item.price}</span>
                      </li>
                    ))}
                  </ul>

                  {subBlocks && (
                    <div className="mt-6 border-t border-graphite-900/15 pt-2">
                      {subBlocks.map((sb) => (
                        <details
                          key={sb.title}
                          className="group border-b border-graphite-900/10 last:border-b-0 py-4"
                        >
                          <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                            <div className="flex items-center gap-3">
                              <Icon name={sb.icon} size={16} className="text-graphite-700" />
                              <div>
                                <p className="font-cormorant text-xl text-graphite-900 leading-tight">
                                  {sb.title}
                                </p>
                                <p className="font-golos text-[11px] uppercase tracking-[0.15em] text-graphite-400 mt-1">
                                  {sb.tag} · показать тарифную сетку
                                </p>
                              </div>
                            </div>
                            <Icon
                              name="Plus"
                              size={16}
                              className="text-graphite-700 shrink-0 transition-transform duration-300 group-open:rotate-45"
                            />
                          </summary>

                          <div className="mt-5 animate-in fade-in slide-in-from-top-1 duration-300">
                            <p className="font-golos text-xs text-graphite-500 italic leading-relaxed mb-4">
                              {sb.hint}
                            </p>
                            {"itemsLabel" in sb && sb.itemsLabel && (
                              <p className="font-golos text-[11px] uppercase tracking-[0.15em] text-graphite-500 mb-2">
                                {sb.itemsLabel}
                              </p>
                            )}
                            <ul className="divide-y divide-graphite-900/10 border-t border-b border-graphite-900/10">
                              {sb.items.map((item) => (
                                <li
                                  key={item.name}
                                  className="flex items-baseline justify-between gap-4 py-2.5"
                                >
                                  <span className="font-golos text-[13px] text-graphite-700 leading-snug">
                                    {item.name}
                                  </span>
                                  <span className="font-cormorant text-base text-graphite-900 whitespace-nowrap font-medium tabular-nums">
                                    {item.price}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </details>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="reveal mt-12 bg-graphite-900 text-paper-50 px-8 md:px-12 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
            <div className="relative">
              <Tag variant="lime" className="mb-4">Custom</Tag>
              <p className="font-cormorant text-3xl md:text-4xl font-light leading-tight max-w-xl">
                Индивидуальный тариф под&nbsp;<span className="italic">ваш бизнес</span>
              </p>
              <p className="font-golos text-sm text-graphite-300 mt-3 max-w-lg">
                Если готовые пакеты не&nbsp;отражают специфику — подготовлю смету с&nbsp;учётом объёма,
                отраслевых особенностей и&nbsp;ожидаемой нагрузки.
              </p>
            </div>
            <a href="#contacts"
              className="relative shrink-0 inline-flex items-center justify-center gap-2 bg-lime text-graphite-900 font-golos text-sm font-medium px-7 py-4 hover:bg-paper-50 transition-all duration-300">
              Обсудить задачу
              <Icon name="ArrowUpRight" size={16} />
            </a>
          </div>

          <p className="reveal font-golos text-xs text-graphite-400 italic text-center mt-8 max-w-2xl mx-auto leading-relaxed">
            Цены ориентировочные, не&nbsp;являются публичной офертой. НДС не&nbsp;облагается
            (применяется УСН). Услуги физическим лицам обсуждаются отдельно.
          </p>
        </div>
      </section>

      {/* ─── CASES ─── */}
      <section id="cases" className="py-24 md:py-32 bg-paper-100 border-y border-graphite-900/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Tag>Практика</Tag>
                <Tag variant="lime">{CASES.length} кейсов</Tag>
                <Tag variant="outline">2024 — 2026</Tag>
              </div>
              <h2 className="font-cormorant text-5xl md:text-6xl text-graphite-900 leading-[0.95] tracking-tight">
                Кейсы<br />
                <span className="italic">с&nbsp;цифрами</span>
              </h2>
            </div>
            <p className="font-golos text-sm text-graphite-500 max-w-xs leading-relaxed">
              Каждый кейс — реальное дело с&nbsp;документально подтверждённым результатом.
            </p>
          </div>

          <div className="border-t border-graphite-900/15">
            {CASES.map((c, i) => (
              <div key={i} className="reveal border-b border-graphite-900/15 bg-paper-50 hover:bg-lime/10 transition-colors duration-300">
                <button
                  className="w-full text-left px-6 md:px-10 py-7 flex items-start justify-between gap-6 group"
                  onClick={() => setActiveCase(activeCase === i ? null : i)}
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <Tag variant="outline">{c.category}</Tag>
                      <Tag>{c.year}</Tag>
                      {c.caseNumber && (
                        <span className="font-golos text-xs text-graphite-400 tracking-wide ml-1">
                          Дело № {c.caseNumber}
                        </span>
                      )}
                    </div>
                    <h3 className="font-cormorant text-2xl md:text-3xl font-medium text-graphite-900 leading-tight">
                      {c.title}
                    </h3>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-2 text-right">
                    <span className="inline-flex items-center gap-1.5 bg-lime text-graphite-900 px-2.5 py-1 text-[10px] font-golos uppercase tracking-[0.15em] font-semibold border border-graphite-900">
                      <Icon name="Check" size={12} />
                      {c.result}
                    </span>
                    {c.amount && (
                      <span className="font-cormorant text-2xl md:text-3xl text-graphite-900 leading-none">{c.amount}</span>
                    )}
                    <Icon
                      name="ChevronDown"
                      size={18}
                      className={`text-graphite-700 mt-1 transition-transform duration-300 ${activeCase === i ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                {activeCase === i && (
                  <div className="px-6 md:px-10 pb-8 border-t border-graphite-900/10 bg-paper-50">
                    <p className="font-golos text-sm text-graphite-700 leading-relaxed mt-6 max-w-3xl">
                      {c.desc}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <a
                        href={c.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-graphite-900 text-paper-50 font-golos text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-lime hover:text-graphite-900 transition-all duration-300"
                      >
                        <Icon name={c.caseNumber ? "ExternalLink" : "FileText"} size={14} />
                        {c.caseNumber
                          ? (c.pdfUrl.includes("mos-gorsud.ru")
                              ? "Карточка дела на сайте суда"
                              : "Карточка дела на КАД.Арбитр")
                          : "Судебный акт (PDF)"}
                      </a>
                      <span className="font-golos text-xs text-graphite-400">
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

          <div className="reveal mt-10 text-center">
            <p className="font-golos text-xs text-graphite-400 italic">
              Показаны избранные кейсы. Детали изменены для&nbsp;соблюдения конфиденциальности.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}