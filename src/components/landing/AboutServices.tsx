import Icon from "@/components/ui/icon";
import { SERVICES } from "./data";

export default function AboutServices() {
  return (
    <>
      {/* ─── STATS BAR ─── */}
      <div className="bg-cream-200 border-y border-gold/20">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: "200+", label: "выигранных дел" },
            { num: "10+", label: "лет опыта" },
            { num: "98%", label: "удовлетворённых клиентов" },
            { num: "×3", label: "средний возврат к гонорару" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-cormorant text-4xl font-light text-ink">{s.num}</p>
              <p className="font-golos text-xs text-ink/50 tracking-wide mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 bg-cream-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t border-l border-gold/40" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b border-r border-gold/40" />
            <div className="bg-ink px-10 py-12">
              <p className="font-cormorant text-2xl text-cream-200/90 italic leading-relaxed">
                «Я&nbsp;убеждена, что хороший юрист — это не&nbsp;только знание законов,
                но&nbsp;и умение слышать клиента и&nbsp;находить решения там, где другие видят тупик.»
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-8 h-px bg-gold" />
                <p className="font-golos text-sm text-gold tracking-widest uppercase">Патимат Закарьяева</p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-golos text-xs tracking-[0.3em] uppercase text-gold mb-4">О&nbsp;практике</p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-ink leading-tight">
              Индивидуальный подход<br />к&nbsp;каждому делу
            </h2>
            <div className="w-12 h-px bg-gold mt-4 mb-8" />
            <div className="space-y-4 text-ink/70 text-sm leading-relaxed font-golos">
              <p>
                Я&nbsp;— практикующий юрист с&nbsp;10-летним опытом в&nbsp;сфере коммерческого права и
                арбитражных споров. Работаю как индивидуальный предприниматель, что позволяет мне
                уделять каждому клиенту максимум времени и&nbsp;внимания.
              </p>
              <p>
                Моя специализация — сложные корпоративные конфликты, защита активов бизнеса и
                взыскание задолженностей. За&nbsp;годы практики я&nbsp;выработала эффективные стратегии,
                позволяющие добиваться результата даже в&nbsp;непростых ситуациях.
              </p>
              <p>
                Каждое дело я&nbsp;веду лично: от&nbsp;первичной консультации до&nbsp;исполнения решения суда.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: "GraduationCap", text: "МГУ, юридический факультет" },
                { icon: "Award", text: "Членство в Адвокатской палате" },
                { icon: "MapPin", text: "Москва и вся Россия" },
                { icon: "Languages", text: "Русский и английский" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <Icon name={item.icon} size={16} className="text-gold mt-0.5 shrink-0" />
                  <span className="font-golos text-xs text-ink/60">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-24 bg-cream-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-golos text-xs tracking-[0.3em] uppercase text-gold mb-4">Направления работы</p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-ink">Услуги</h2>
            <div className="w-12 h-px bg-gold mt-4 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/20">
            {SERVICES.map((s) => (
              <div key={s.title}
                className="bg-cream-100 p-8 group hover:bg-ink transition-all duration-500 cursor-default">
                <Icon name={s.icon} size={28} className="text-gold mb-5 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-cormorant text-xl font-medium text-ink group-hover:text-cream-100 transition-colors duration-500 mb-3">
                  {s.title}
                </h3>
                <p className="font-golos text-sm text-ink/60 group-hover:text-cream-200/60 transition-colors duration-500 leading-relaxed">
                  {s.desc}
                </p>
                <div className="mt-6 w-0 h-px bg-gold group-hover:w-8 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
