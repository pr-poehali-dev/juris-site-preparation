import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { toast } from "sonner";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ADMIN_URL = "https://functions.poehali.dev/b7ebc4ae-4681-4380-9fd7-8e794a73b743";

interface ContactRequest {
  id: number;
  name: string;
  phone: string;
  message: string | null;
  status: "new" | "in_progress" | "closed";
  created_at: string;
}

interface Booking {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  date: string;
  time: string;
  message: string | null;
  status: "confirmed" | "cancelled";
  created_at: string;
}

const STATUS_LABELS: Record<string, string> = {
  new: "Новая",
  in_progress: "В работе",
  closed: "Закрыта",
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-sky text-graphite-900",
  in_progress: "bg-graphite-300 text-graphite-900",
  closed: "bg-graphite-900 text-paper-50",
};

export default function Admin() {
  const [password, setPassword] = useState(() => sessionStorage.getItem("admin_pw") || "");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");

  const load = useCallback(async (pw: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(ADMIN_URL, {
        headers: { "X-Admin-Password": pw },
      });
      if (res.status === 401) {
        setAuthed(false);
        setError("Неверный пароль");
        sessionStorage.removeItem("admin_pw");
        return;
      }
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      setRequests(data.requests || []);
      setBookings(data.bookings || []);
      setAuthed(true);
      sessionStorage.setItem("admin_pw", pw);
    } catch {
      setError("Не удалось загрузить данные");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (password) load(password);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    load(password);
  };

  const handleStatusChange = async (id: number, status: string) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: status as ContactRequest["status"] } : r)));
    try {
      const res = await fetch(ADMIN_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "X-Admin-Password": password },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("failed");
      toast.success("Статус обновлён");
    } catch {
      toast.error("Не удалось обновить статус");
      load(password);
    }
  };

  const filteredRequests = requests.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.toLowerCase().includes(search.toLowerCase())
  );

  const filteredBookings = bookings.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.toLowerCase().includes(search.toLowerCase())
  );

  if (!authed) {
    return (
      <main className="bg-paper min-h-screen flex items-center">
        <div className="max-w-sm mx-auto px-6 w-full">
          <h1 className="font-display uppercase text-3xl text-graphite-900 leading-tight text-center mb-8">
            Панель заявок
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-graphite-900/30"
            />
            {error && <p className="font-golos text-sm text-bordo">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-graphite-900 text-paper-50 font-golos text-sm font-medium px-7 py-4 hover:bg-sky hover:text-graphite-900 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Проверка..." : "Войти"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-paper min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h1 className="font-display uppercase text-3xl md:text-4xl text-graphite-900 leading-tight">
            Заявки
          </h1>
          <div className="relative w-full sm:w-64">
            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-graphite-400"
            />
            <Input
              placeholder="Поиск по имени, телефону"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 border-graphite-900/30"
            />
          </div>
        </div>

        <Tabs defaultValue="requests">
          <TabsList>
            <TabsTrigger value="requests">
              Заявки с формы ({filteredRequests.length})
            </TabsTrigger>
            <TabsTrigger value="bookings">
              Записи на консультацию ({filteredBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            <div className="border border-graphite-900/15 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата</TableHead>
                    <TableHead>Имя</TableHead>
                    <TableHead>Телефон</TableHead>
                    <TableHead>Сообщение</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-graphite-400 py-8">
                        Заявок пока нет
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRequests.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="whitespace-nowrap text-graphite-500">
                          {format(new Date(r.created_at), "d MMM yyyy, HH:mm", { locale: ru })}
                        </TableCell>
                        <TableCell className="font-medium">{r.name}</TableCell>
                        <TableCell>
                          <a href={`tel:${r.phone}`} className="hover:text-sky-dark">
                            {r.phone}
                          </a>
                        </TableCell>
                        <TableCell className="max-w-xs truncate text-graphite-500">
                          {r.message || "—"}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={r.status}
                            onValueChange={(v) => handleStatusChange(r.id, v)}
                          >
                            <SelectTrigger className="w-36 h-8 border-graphite-900/30">
                              <SelectValue>
                                <Badge className={STATUS_COLORS[r.status]}>
                                  {STATUS_LABELS[r.status]}
                                </Badge>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">Новая</SelectItem>
                              <SelectItem value="in_progress">В работе</SelectItem>
                              <SelectItem value="closed">Закрыта</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <div className="border border-graphite-900/15 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата записи</TableHead>
                    <TableHead>Имя</TableHead>
                    <TableHead>Телефон</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-graphite-400 py-8">
                        Записей пока нет
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings.map((b) => (
                      <TableRow key={b.id}>
                        <TableCell className="whitespace-nowrap text-graphite-500">
                          {format(new Date(b.date), "d MMM yyyy", { locale: ru })}, {b.time}
                        </TableCell>
                        <TableCell className="font-medium">{b.name}</TableCell>
                        <TableCell>
                          <a href={`tel:${b.phone}`} className="hover:text-sky-dark">
                            {b.phone}
                          </a>
                        </TableCell>
                        <TableCell className="text-graphite-500">{b.email || "—"}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              b.status === "confirmed"
                                ? "bg-sky text-graphite-900"
                                : "bg-graphite-300 text-graphite-900"
                            }
                          >
                            {b.status === "confirmed" ? "Подтверждена" : "Отменена"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
