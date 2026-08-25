import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { toast } from "sonner";
import Icon from "@/components/ui/icon";
import { Calendar } from "@/components/ui/calendar";

const BOOKING_URL = "https://functions.poehali.dev/4cfae084-94d5-4717-b1c2-4acbae6a065f";

interface Booking {
  name: string;
  phone: string;
  email: string | null;
  date: string;
  time: string;
  message: string | null;
  status: "confirmed" | "cancelled";
}

export default function BookingManage() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [notFound, setNotFound] = useState(false);

  const [rescheduling, setRescheduling] = useState(false);
  const [newDate, setNewDate] = useState<Date | undefined>(undefined);
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [newTime, setNewTime] = useState<string | null>(null);
  const [working, setWorking] = useState(false);

  const loadBooking = useCallback(async () => {
    if (!token) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${BOOKING_URL}?token=${encodeURIComponent(token)}`);
      if (!res.ok) {
        setNotFound(true);
        return;
      }
      const data = await res.json();
      setBooking(data);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadBooking();
  }, [loadBooking]);

  const fetchSlots = useCallback(async (d: Date) => {
    setLoadingSlots(true);
    setNewTime(null);
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
    if (newDate) fetchSlots(newDate);
  }, [newDate, fetchSlots]);

  const handleCancel = async () => {
    if (!confirm("Точно отменить запись на консультацию?")) return;
    setWorking(true);
    try {
      const res = await fetch(`${BOOKING_URL}?token=${encodeURIComponent(token)}`, { method: "DELETE" });
      if (!res.ok) throw new Error("failed");
      toast.success("Запись отменена");
      loadBooking();
    } catch {
      toast.error("Не удалось отменить запись. Попробуйте ещё раз.");
    } finally {
      setWorking(false);
    }
  };

  const handleReschedule = async () => {
    if (!newDate || !newTime) return;
    setWorking(true);
    try {
      const res = await fetch(`${BOOKING_URL}?token=${encodeURIComponent(token)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: format(newDate, "yyyy-MM-dd"), time: newTime }),
      });
      if (res.status === 409) {
        toast.error("Это время уже заняли, выберите другое");
        fetchSlots(newDate);
        return;
      }
      if (!res.ok) throw new Error("failed");
      toast.success("Запись перенесена");
      setRescheduling(false);
      setNewDate(undefined);
      setNewTime(null);
      loadBooking();
    } catch {
      toast.error("Не удалось перенести запись. Попробуйте ещё раз.");
    } finally {
      setWorking(false);
    }
  };

  return (
    <main className="bg-paper min-h-screen flex items-center">
      <div className="max-w-xl mx-auto px-6 py-24 w-full">
        {loading ? (
          <p className="font-golos text-sm text-graphite-500 text-center">Загрузка...</p>
        ) : notFound || !booking ? (
          <div className="text-center">
            <h1 className="font-cormorant text-4xl text-graphite-900 leading-tight">
              Запись не найдена
            </h1>
            <p className="font-golos text-sm text-graphite-500 mt-4">
              Возможно, ссылка неверна или устарела.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 bg-graphite-900 text-paper-50 font-golos text-sm font-medium px-7 py-4 hover:bg-lime hover:text-graphite-900 transition-all duration-300"
            >
              <Icon name="ArrowLeft" size={16} />
              На главную
            </Link>
          </div>
        ) : (
          <div className="bg-paper-50 border border-graphite-900 p-8 md:p-10">
            <h1 className="font-cormorant text-3xl md:text-4xl text-graphite-900 leading-tight">
              {booking.status === "cancelled" ? "Запись отменена" : "Ваша запись на консультацию"}
            </h1>

            <div className="mt-6 space-y-2 font-golos text-sm text-graphite-700">
              <p><span className="text-graphite-400">Имя:</span> {booking.name}</p>
              <p><span className="text-graphite-400">Телефон:</span> {booking.phone}</p>
              <p>
                <span className="text-graphite-400">Дата и время:</span>{" "}
                {format(new Date(booking.date), "d MMMM yyyy", { locale: ru })}, {booking.time}
              </p>
              <p>
                <span className="text-graphite-400">Статус:</span>{" "}
                {booking.status === "cancelled" ? "отменена" : "подтверждена"}
              </p>
            </div>

            {booking.status === "confirmed" && !rescheduling && (
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={() => setRescheduling(true)}
                  className="inline-flex items-center justify-center gap-2 border border-graphite-900 text-graphite-900 font-golos text-sm font-medium px-6 py-4 hover:bg-graphite-900 hover:text-paper-50 transition-all duration-300"
                >
                  <Icon name="CalendarClock" size={16} />
                  Перенести
                </button>
                <button
                  onClick={handleCancel}
                  disabled={working}
                  className="inline-flex items-center justify-center gap-2 border border-graphite-900/30 text-graphite-500 font-golos text-sm font-medium px-6 py-4 hover:border-graphite-900 hover:text-graphite-900 transition-all duration-300 disabled:opacity-50"
                >
                  <Icon name="X" size={16} />
                  Отменить запись
                </button>
              </div>
            )}

            {booking.status === "confirmed" && rescheduling && (
              <div className="mt-8 pt-8 border-t border-graphite-900/15">
                <p className="font-golos text-[11px] text-graphite-500 uppercase tracking-[0.15em] mb-4">
                  Новая дата
                </p>
                <Calendar
                  mode="single"
                  locale={ru}
                  selected={newDate}
                  onSelect={setNewDate}
                  disabled={(d) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return d < today || d.getDay() === 0 || d.getDay() === 6;
                  }}
                  className="mx-auto"
                />

                {newDate && (
                  <div className="mt-6 pt-6 border-t border-graphite-900/15">
                    <p className="font-golos text-[11px] text-graphite-500 uppercase tracking-[0.15em] mb-4">
                      Новое время
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
                            onClick={() => setNewTime(s)}
                            className={`font-golos text-sm py-2.5 border transition-colors ${
                              newTime === s
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

                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <button
                    onClick={handleReschedule}
                    disabled={!newDate || !newTime || working}
                    className={`inline-flex items-center justify-center gap-2 font-golos text-sm font-medium px-6 py-4 transition-all duration-300 ${
                      newDate && newTime && !working
                        ? "bg-graphite-900 text-paper-50 hover:bg-lime hover:text-graphite-900 cursor-pointer"
                        : "bg-graphite-900/15 text-graphite-400 cursor-not-allowed"
                    }`}
                  >
                    {working ? "Сохраняем..." : "Подтвердить перенос"}
                  </button>
                  <button
                    onClick={() => {
                      setRescheduling(false);
                      setNewDate(undefined);
                      setNewTime(null);
                    }}
                    className="inline-flex items-center justify-center gap-2 border border-graphite-900/30 text-graphite-500 font-golos text-sm font-medium px-6 py-4 hover:border-graphite-900 hover:text-graphite-900 transition-all duration-300"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            )}

            <div className="mt-10 pt-6 border-t border-graphite-900/15">
              <Link
                to="/"
                className="inline-flex items-center gap-2 font-golos text-xs uppercase tracking-[0.15em] text-graphite-500 hover:text-graphite-900 transition-colors"
              >
                <Icon name="ArrowLeft" size={14} />
                На главную
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
