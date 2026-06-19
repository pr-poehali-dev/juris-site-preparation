import Icon from "@/components/ui/icon";
import Tag from "./Tag";

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 md:py-32 bg-paper border-y border-graphite-900/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Tag>Отзывы</Tag>
              <Tag variant="lime">Trusted by 50+</Tag>
              <Tag variant="outline">B2B клиенты</Tag>
            </div>
            <h2 className="font-cormorant text-5xl md:text-6xl text-graphite-900 leading-[0.95] tracking-tight">
              Нас<br />
              <span className="italic">рекомендуют</span>
            </h2>
          </div>
          <p className="font-golos text-sm text-graphite-500 max-w-xs leading-relaxed">
            Реальные клиенты. Реальные результаты. Каждое слово — после
            завершённой работы и&nbsp;закрытого дела.
          </p>
        </div>

        {/* Big metric strip */}
        <div className="reveal d2 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-2 mb-16 border-y border-graphite-900/15 py-10">
          {[
            { num: "98%", label: "клиентов возвращаются" },
            { num: "4.9", label: "средний рейтинг" },
            { num: "50+", label: "компаний-клиентов" },
            { num: "10+", label: "лет на рынке" },
          ].map((s) => (
            <div key={s.label} className="md:border-r last:md:border-r-0 border-graphite-900/15 md:px-6">
              <p className="font-cormorant text-metric font-light text-graphite-900">{s.num}</p>
              <p className="font-golos text-xs uppercase tracking-[0.15em] text-graphite-500 mt-2">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal mt-16 flex flex-col md:flex-row items-center justify-between gap-6 bg-graphite-900 text-paper-50 px-8 md:px-12 py-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
          <div className="relative">
            <p className="font-cormorant text-2xl md:text-3xl font-light leading-tight">
              Хотите оставить отзыв или&nbsp;<span className="italic">проверить рекомендации</span>?
            </p>
            <p className="font-golos text-sm text-graphite-300 mt-2">
              Соединю с&nbsp;действующими клиентами по&nbsp;запросу.
            </p>
          </div>
          <a
            href="#contacts"
            className="relative shrink-0 inline-flex items-center gap-2 bg-lime text-graphite-900 font-golos text-sm font-medium px-7 py-4 hover:bg-paper-50 transition-all duration-300"
          >
            Связаться
            <Icon name="ArrowUpRight" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}