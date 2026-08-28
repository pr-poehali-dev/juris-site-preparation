import Icon from "@/components/ui/icon";
import { SERVICES } from "./data";
import Tag from "./Tag";

export default function AboutServices() {
  return (
    <>
      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 md:py-32 bg-paper">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="md:col-span-5 reveal">
            <div className="bg-graphite-900 p-8 md:p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-bordo-grain opacity-50 pointer-events-none" />
              <div className="relative">
                <span className="font-display uppercase text-6xl font-bold text-sky leading-none block mb-4">«</span>
                <p className="font-display uppercase text-2xl md:text-3xl text-white leading-[1.15] font-medium">
                  Хороший юрист — это не&nbsp;только знание законов,
                  но&nbsp;и&nbsp;умение находить решение там,
                  где другие видят тупик
                </p>
                <div className="mt-8 flex items-center gap-3 pt-6 border-t border-white/20">
                  <span className="inline-block w-2 h-2 bg-sky" />
                  <p className="font-golos text-xs uppercase tracking-[0.2em] text-white/70 font-bold">
                    Патимат Закарьяева
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 reveal d2">
            <div className="flex items-center gap-2 mb-6">
              <Tag variant="bordo">О практике</Tag>
              <Tag variant="outline">Independent</Tag>
            </div>
            <h2 className="font-display uppercase text-4xl md:text-5xl lg:text-6xl text-graphite-900 leading-[0.95] font-bold">
              Практика<br />
              <span className="text-bordo">без воды</span> и&nbsp;лишних слов
            </h2>
            <div className="mt-8 space-y-5 text-graphite-700 text-base leading-relaxed font-golos max-w-xl">
              <p>
                Я&nbsp;— практикующий юрист с&nbsp;10-летним опытом в&nbsp;коммерческом праве
                и&nbsp;арбитражных спорах. Работаю как индивидуальный предприниматель, поэтому
                каждому клиенту достаётся максимум времени и&nbsp;внимания.
              </p>
              <p>
                Специализация — сложные корпоративные конфликты, защита активов бизнеса
                и&nbsp;взыскание задолженностей. Каждое дело веду лично: от&nbsp;первой консультации
                до&nbsp;исполнения решения суда.
              </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-3 gap-px bg-graphite-900/15 border border-graphite-900/15">
              {[
                { icon: "Zap", t: "Быстро", d: "Ответ в течение часа" },
                { icon: "Wallet", t: "Прозрачно", d: "Цена фиксируется письменно" },
                { icon: "Target", t: "По делу", d: "Только рабочая стратегия" },
              ].map((f) => (
                <div key={f.t} className="bg-paper-50 p-5">
                  <Icon name={f.icon} size={20} className="text-bordo mb-3" />
                  <p className="font-display uppercase text-lg font-bold text-graphite-900 leading-none">{f.t}</p>
                  <p className="font-golos text-xs text-graphite-500 mt-2 leading-relaxed">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-24 md:py-32 bg-paper-100 border-y border-graphite-900/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Tag variant="bordo">Направления</Tag>
                <Tag variant="sky">0{SERVICES.length} практик</Tag>
              </div>
              <h2 className="font-display uppercase text-4xl md:text-5xl lg:text-6xl text-graphite-900 leading-[0.95] font-bold">
                Услуги<br />
                <span className="text-bordo">для бизнеса</span>
              </h2>
            </div>
            <p className="font-golos text-sm text-graphite-500 max-w-xs leading-relaxed">
              Беру задачи целиком — от&nbsp;первичного анализа до&nbsp;результата в&nbsp;суде.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-graphite-900/15">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className="reveal group relative bg-paper-50 border-r border-b border-graphite-900/15 p-8 md:p-10 hover:bg-bordo transition-all duration-400 cursor-default"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="font-golos text-xs font-bold text-graphite-400 tracking-widest group-hover:text-white/60 transition-colors">
                    0{i + 1} / 0{SERVICES.length}
                  </span>
                  <Icon
                    name={s.icon}
                    size={26}
                    className="text-bordo group-hover:text-sky transition-colors duration-300"
                  />
                </div>
                <h3 className="font-display uppercase text-2xl md:text-3xl font-bold text-graphite-900 mb-4 leading-[1.05] group-hover:text-white transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="font-golos text-sm text-graphite-700 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  {s.desc}
                </p>
                <div className="mt-8 flex items-center gap-2 text-sky opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-golos text-xs uppercase tracking-widest font-bold">Обсудить</span>
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

