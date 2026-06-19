import Icon from "@/components/ui/icon";
import { SERVICES } from "./data";
import Tag from "./Tag";

const STATS = [
  { num: "200+", label: "выигранных дел", note: "С 2014 года" },
  { num: "10+", label: "лет практики", note: "Lead Lawyer" },
  { num: "98%", label: "клиентов рекомендуют", note: "NPS-индекс" },
  { num: "×3", label: "средний возврат к гонорару", note: "ROI клиента" },
];

export default function AboutServices() {
  return (
    <>
      {/* ─── STATS BAR ─── */}
      <section className="bg-graphite-900 text-paper-50 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="reveal flex flex-wrap items-center gap-2 mb-12">
            <Tag variant="lime">Цифры</Tag>
            <span className="font-golos text-xs uppercase tracking-[0.2em] text-graphite-400">
              Результат, измеримый в&nbsp;деньгах и&nbsp;решениях
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            {STATS.map((s, i) => (
              <div key={s.label} className={`reveal d${(i % 4) + 1} border-t border-paper-50/20 pt-6`}>
                <p className="font-cormorant text-metric font-light text-paper-50">
                  {s.num}
                </p>
                <p className="font-golos text-sm text-paper-50 mt-3 leading-snug">{s.label}</p>
                <p className="font-golos text-[11px] uppercase tracking-[0.15em] text-graphite-400 mt-2">
                  {s.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 md:py-32 bg-paper">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="md:col-span-5 reveal">
            <div className="border border-graphite-900 bg-paper-100 p-8 md:p-10">
              <Icon name="Quote" size={24} className="text-lime mb-6" />
              <p className="font-cormorant text-2xl md:text-3xl text-graphite-900 leading-snug italic font-light">
                «Хороший юрист — это не&nbsp;только знание законов, но&nbsp;и&nbsp;умение слышать клиента
                и&nbsp;находить решения там, где другие видят тупик.»
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="inline-block w-2 h-2 bg-lime border border-graphite-900" />
                <p className="font-golos text-xs uppercase tracking-[0.2em] text-graphite-700 font-semibold">
                  Патимат Закарьяева
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 reveal d2">
            <div className="flex items-center gap-2 mb-5">
              <Tag>О практике</Tag>
              <Tag variant="outline">Independent</Tag>
            </div>
            <h2 className="font-cormorant text-5xl md:text-6xl text-graphite-900 leading-[0.95] tracking-tight">
              Практика<br />
              <span className="italic">с&nbsp;вниманием</span> к&nbsp;деталям
            </h2>
            <div className="mt-8 space-y-5 text-graphite-700 text-base leading-relaxed font-golos max-w-xl">
              <p>
                Я&nbsp;— практикующий юрист с&nbsp;10-летним опытом в&nbsp;сфере коммерческого права
                и&nbsp;арбитражных споров. Работаю как индивидуальный предприниматель, что позволяет
                уделять каждому клиенту максимум времени и&nbsp;внимания.
              </p>
              <p>
                Специализация — сложные корпоративные конфликты, защита активов бизнеса и&nbsp;взыскание
                задолженностей. Каждое дело веду лично: от&nbsp;первичной консультации до&nbsp;исполнения
                решения суда.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4">
              {[
                { icon: "GraduationCap", text: "МГУ, юридический факультет" },
                { icon: "Award", text: "Адвокатская палата" },
                { icon: "MapPin", text: "Москва · вся Россия" },
                { icon: "Languages", text: "Русский · английский" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 border-t border-graphite-900/15 pt-3">
                  <Icon name={item.icon} size={16} className="text-graphite-900 mt-0.5 shrink-0" />
                  <span className="font-golos text-sm text-graphite-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-24 md:py-32 bg-paper-100 border-y border-graphite-900/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Tag>Направления</Tag>
                <Tag variant="lime">06 практик</Tag>
              </div>
              <h2 className="font-cormorant text-5xl md:text-6xl text-graphite-900 leading-[0.95] tracking-tight">
                Услуги<br />
                <span className="italic">для&nbsp;бизнеса</span>
              </h2>
            </div>
            <p className="font-golos text-sm text-graphite-500 max-w-xs leading-relaxed">
              Полный цикл сопровождения — от&nbsp;стартапа до&nbsp;холдинга. Каждое направление
              ведёт&nbsp;Lead Lawyer без посредников.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-graphite-900/15">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className="reveal group relative bg-paper-50 border-r border-b border-graphite-900/15 p-8 md:p-10 hover:bg-lime transition-all duration-500 cursor-default"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="font-golos text-xs text-graphite-400 tracking-widest">
                    0{i + 1} / 0{SERVICES.length}
                  </span>
                  <Icon
                    name={s.icon}
                    size={26}
                    className="text-graphite-900 group-hover:rotate-12 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-cormorant text-2xl md:text-3xl font-medium text-graphite-900 mb-4 leading-tight">
                  {s.title}
                </h3>
                <p className="font-golos text-sm text-graphite-700 leading-relaxed">
                  {s.desc}
                </p>
                <div className="mt-8 flex items-center gap-2 text-graphite-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-golos text-xs uppercase tracking-widest font-semibold">Подробнее</span>
                  <Icon name="ArrowUpRight" size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}