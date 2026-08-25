import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { toast } from "sonner";
import Icon from "@/components/ui/icon";
import { Calendar } from "@/components/ui/calendar";
import Tag from "./Tag";

const BOOKING_URL = "https://functions.poehali.dev/4cfae084-94d5-4717-b1c2-4acbae6a065f";

export default function BookingSection() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchSlots = useCallback(async (d: Date) => {
    setLoadingSlots(true);
    setTime(null);
    try {
      const dateStr = format(d, "yyyy-MM-dd");
      const res = await fetch(`${BOOKING_URL}?date=${dateStr}`);
      const data = await res.json();
      setSlots(data.slots || []);
    } catch {
      setSlots([]);
      toast.error("Не удалось загрузить свободное время");
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (date) fetchSlots(date);
  }, [date, fetchSlots]);

  const canSubmit = date && time && name.trim() && phone.trim() && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !date || !time) return;
    setSubmitting(true);
    try {
      const res = await fetch(BOOKING_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          message,
          date: format(date, "yyyy-MM-dd"),
          time,
        }),
      });
      if (res.status === 409) {
        toast.error("Это время уже заняли, выберите другое");
        fetchSlots(date);
        return;
      }
      if (!res.ok) throw new Error("request failed");
      setName("");
      setPhone("");
      setMessage("");
      setTime(null);
      navigate("/thank-you");
    } catch {
      toast.error("Не удалось записаться. Попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-24 md:py-32 bg-paper-100 border-y border-graphite-900/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Tag>Запись</Tag>
              <Tag variant="lime">Онлайн</Tag>
            </div>
            <h2 className="font-cormorant text-5xl md:text-6xl text-graphite-900 leading-[0.95] tracking-tight">
              Записаться<br />
              <span className="italic">на консультацию</span>
            </h2>
          </div>
          <p className="font-golos text-sm text-graphite-500 max-w-xs leading-relaxed">
            Выберите удобные дату и&nbsp;время — я&nbsp;подтвержу запись лично.
          </p>
        </div>

        <div className="reveal d2 grid md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-6 bg-paper-50 border border-graphite-900 p-6 md:p-8">
            <p className="font-golos text-[11px] text-graphite-500 uppercase tracking-[0.15em] mb-4">
              1. Выберите дату
            </p>
            <Calendar
              mode="single"
              locale={ru}
              selected={date}
              onSelect={setDate}
              disabled={(d) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return d < today || d.getDay() === 0 || d.getDay() === 6;
              }}
              className="mx-auto"
            />

            {date && (
              <div className="mt-6 pt-6 border-t border-graphite-900/15">
                <p className="font-golos text-[11px] text-graphite-500 uppercase tracking-[0.15em] mb-4">
                  2. Выберите время
                </p>
                {loadingSlots ? (
                  <p className="font-golos text-sm text-graphite-400">Загрузка...</p>
                ) : slots.length === 0 ? (
                  <p className="font-golos text-sm text-graphite-400">
                    На эту дату свободного времени нет, выберите другой день.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {slots.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setTime(s)}
                        className={`font-golos text-sm py-2.5 border transition-colors ${
                          time === s
                            ? "bg-graphite-900 text-paper-50 border-graphite-900"
                            : "bg-transparent text-graphite-900 border-graphite-900/30 hover:border-graphite-900"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="md:col-span-6">
            <div className="bg-paper-50 border border-graphite-900 p-6 md:p-8 h-full">
              <p className="font-golos text-[11px] text-graphite-500 uppercase tracking-[0.15em] mb-4">
                3. Ваши данные
              </p>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="font-golos text-[11px] text-graphite-500 uppercase tracking-[0.15em] block mb-2">Имя</label>
                  <input type="text" placeholder="Иван Петров" required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-graphite-900/30 px-0 py-3 text-base font-golos text-graphite-900 placeholder:text-graphite-400 focus:outline-none focus:border-graphite-900 transition-colors" />
                </div>
                <div>
                  <label className="font-golos text-[11px] text-graphite-500 uppercase tracking-[0.15em] block mb-2">Телефон</label>
                  <input type="tel" placeholder="+7 (___) ___-__-__" required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-graphite-900/30 px-0 py-3 text-base font-golos text-graphite-900 placeholder:text-graphite-400 focus:outline-none focus:border-graphite-900 transition-colors" />
                </div>
                <div>
                  <label className="font-golos text-[11px] text-graphite-500 uppercase tracking-[0.15em] block mb-2">Опишите ситуацию</label>
                  <textarea rows={3} placeholder="Краткое описание вашего вопроса..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-graphite-900/30 px-0 py-3 text-base font-golos text-graphite-900 placeholder:text-graphite-400 focus:outline-none focus:border-graphite-900 transition-colors resize-none" />
                </div>

                {date && time && (
                  <div className="flex items-center gap-2 bg-lime/20 border border-lime px-4 py-3">
                    <Icon name="CalendarCheck" size={16} className="text-graphite-900 shrink-0" />
                    <p className="font-golos text-xs text-graphite-900">
                      {format(date, "d MMMM yyyy", { locale: ru })}, {time}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`w-full inline-flex items-center justify-center gap-2 font-golos text-sm tracking-widest uppercase font-semibold py-5 transition-all duration-300 ${
                    canSubmit
                      ? "bg-graphite-900 text-paper-50 hover:bg-lime hover:text-graphite-900 cursor-pointer"
                      : "bg-graphite-900/15 text-graphite-400 cursor-not-allowed"
                  }`}
                >
                  {submitting ? "Записываем..." : "Записаться"}
                  {canSubmit && <Icon name="ArrowUpRight" size={16} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
