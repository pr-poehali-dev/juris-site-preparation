import { useState } from "react";
import Icon from "@/components/ui/icon";

const LAWYER_PHOTO = "https://cdn.poehali.dev/projects/e5492d44-434b-4106-a0da-3a1358d8bacc/files/2dcf0fce-7236-4025-b75f-865e4275a6f0.jpg";

const SERVICES = [
  {
    icon: "Briefcase",
    title: "Корпоративное право",
    desc: "Регистрация и реорганизация юридических лиц, разработка учредительных документов, корпоративные споры.",
  },
  {
    icon: "FileText",
    title: "Договорная работа",
    desc: "Разработка, анализ и сопровождение договоров любой сложности. Защита интересов при переговорах.",
  },
  {
    icon: "Scale",
    title: "Арбитражные споры",
    desc: "Представительство в арбитражных судах всех инстанций. Взыскание задолженностей, защита от исков.",
  },
  {
    icon: "Shield",
    title: "Защита активов",
    desc: "Структурирование бизнеса, минимизация правовых рисков, защита от рейдерских захватов.",
  },
  {
    icon: "Building2",
    title: "Недвижимость",
    desc: "Юридическое сопровождение сделок с коммерческой недвижимостью, аренда, споры с застройщиками.",
  },
  {
    icon: "Users",
    title: "Трудовые отношения",
    desc: "Разработка локальных актов, сопровождение трудовых споров, кадровый аудит.",
  },
];

const CASES = [
  {
    category: "Арбитражный спор",
    title: "Взыскание задолженности по договору поставки",
    amount: "18,4 млн ₽",
    result: "Победа",
    resultColor: "text-emerald-700",
    desc: "Представляла интересы производственной компании в споре с недобросовестным покупателем, уклонявшимся от оплаты товара. Суд полностью удовлетворил требования, включая неустойку.",
    pdfUrl: "#",
    year: "2023",
  },
  {
    category: "Корпоративный спор",
    title: "Оспаривание незаконного исключения участника из ООО",
    amount: "доля 40%",
    result: "Восстановление прав",
    resultColor: "text-emerald-700",
    desc: "Клиент был незаконно исключён из состава участников общества. В результате судебного разбирательства права на долю восстановлены в полном объёме.",
    pdfUrl: "#",
    year: "2023",
  },
  {
    category: "Защита от иска",
    title: "Отказ в удовлетворении требований на 52 млн ₽",
    amount: "52 млн ₽",
    result: "Отказ в иске",
    resultColor: "text-emerald-700",
    desc: "Контрагент предъявил заведомо завышенные требования по убыткам. Доказала их необоснованность — суд отказал в удовлетворении иска в полном объёме.",
    pdfUrl: "#",
    year: "2022",
  },
  {
    category: "Недвижимость",
    title: "Признание договора аренды недействительным",
    amount: "",
    result: "Договор расторгнут",
    resultColor: "text-emerald-700",
    desc: "Представляла арендодателя: добились расторжения договора аренды торгового помещения с арендатором, систематически нарушавшим условия и порядок оплаты.",
    pdfUrl: "#",
    year: "2022",
  },
];

const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "О мне", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Кейсы", href: "#cases" },
  { label: "Контакты", href: "#contacts" },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCase, setActiveCase] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-cream-100 font-golos">

      {/* ─── NAVBAR ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream-100/90 backdrop-blur-sm border-b border-gold/20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="font-cormorant text-xl font-semibold tracking-widest text-ink uppercase">
            Анна&nbsp;<span className="text-gold">Морозова</span>
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
              <img src={LAWYER_PHOTO} alt="Анна Морозова, юрист"
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
                <p className="font-golos text-sm text-gold tracking-widest uppercase">Анна Морозова</p>
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

      {/* ─── CASES ─── */}
      <section id="cases" className="py-24 bg-cream-100">
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
                        <Icon name="FileText" size={14} />
                        Судебный акт (PDF)
                      </a>
                      <span className="font-golos text-xs text-ink/30">
                        Документ размещён в открытом доступе
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

      {/* ─── CTA BANNER ─── */}
      <div className="bg-ink py-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold/60 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-golos text-xs tracking-[0.3em] uppercase text-gold mb-4">Начнём работу</p>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-cream-100 leading-tight">
            Ваша ситуация требует<br />профессионального взгляда
          </h2>
          <p className="font-golos text-sm text-cream-200/50 mt-6 mb-10 max-w-lg mx-auto leading-relaxed">
            Первичная консультация — бесплатно. Разберём ситуацию, определим стратегию
            и&nbsp;оценим перспективы уже при первой встрече.
          </p>
          <a href="#contacts"
            className="inline-block bg-gold text-ink font-golos text-xs tracking-widest uppercase px-10 py-4 hover:bg-gold-light transition-all duration-300">
            Записаться на консультацию
          </a>
        </div>
      </div>

      {/* ─── CONTACTS ─── */}
      <section id="contacts" className="py-24 bg-cream-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <p className="font-golos text-xs tracking-[0.3em] uppercase text-gold mb-4">Связь</p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-ink">Контакты</h2>
            <div className="w-12 h-px bg-gold mt-4 mb-10" />
            <div className="space-y-6">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (999) 000-00-00" },
                { icon: "Mail", label: "Электронная почта", value: "info@example.ru" },
                { icon: "MapPin", label: "Адрес", value: "Москва, ул. Примерная, д.1, оф.100" },
                { icon: "Clock", label: "Часы работы", value: "Пн–Пт: 09:00 — 19:00" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0">
                    <Icon name={c.icon} size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-golos text-xs text-ink/40 tracking-wide uppercase mb-0.5">{c.label}</p>
                    <p className="font-golos text-sm text-ink font-medium">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-cream-100 p-8 border border-gold/15">
            <h3 className="font-cormorant text-2xl text-ink mb-6">Оставить заявку</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="font-golos text-xs text-ink/50 uppercase tracking-wide block mb-2">Имя</label>
                <input type="text" placeholder="Иван Петров"
                  className="w-full bg-cream-200 border border-gold/20 px-4 py-3 text-sm font-golos text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold/60 transition-colors" />
              </div>
              <div>
                <label className="font-golos text-xs text-ink/50 uppercase tracking-wide block mb-2">Телефон</label>
                <input type="tel" placeholder="+7 (___) ___-__-__"
                  className="w-full bg-cream-200 border border-gold/20 px-4 py-3 text-sm font-golos text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold/60 transition-colors" />
              </div>
              <div>
                <label className="font-golos text-xs text-ink/50 uppercase tracking-wide block mb-2">Опишите ситуацию</label>
                <textarea rows={4} placeholder="Краткое описание вашего вопроса..."
                  className="w-full bg-cream-200 border border-gold/20 px-4 py-3 text-sm font-golos text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold/60 transition-colors resize-none" />
              </div>
              <button type="submit"
                className="w-full bg-ink text-cream-100 font-golos text-xs tracking-widest uppercase py-4 hover:bg-gold hover:text-ink transition-all duration-300">
                Отправить заявку
              </button>
              <p className="font-golos text-xs text-ink/30 text-center leading-relaxed">
                Нажимая кнопку, вы&nbsp;соглашаетесь с&nbsp;обработкой персональных данных
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-ink border-t border-gold/20 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-cormorant text-lg text-cream-200/60 tracking-widest uppercase">
            Анна&nbsp;<span className="text-gold">Морозова</span>
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}
                className="font-golos text-xs tracking-widest uppercase text-cream-200/30 hover:text-gold transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <p className="font-golos text-xs text-cream-200/20">© 2024 ИП Морозова А.В.</p>
        </div>
      </footer>
    </div>
  );
}