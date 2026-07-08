import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { FundingProgram } from "@shared/schema";
import {
  ArrowLeft, Heart, Calculator, Stethoscope, Share2,
  CheckCircle2, DollarSign, TrendingUp, CalendarDays,
  Search, Star, BadgeCheck, ChevronRight, RefreshCw,
  LayoutGrid, Clock, MapPin, Video, Phone, Users, AlertCircle, Timer,
  Wallet, Settings, FileText, Bell, Globe, Shield, UserCircle
} from "lucide-react";
import ScreeningFlow from "@/components/diagnostic/ScreeningFlow";
import SessionHandshake from "@/components/SessionHandshake";

const ROSE = "#E11D48";
const NAVY = "#0F2B46";
const GOLD = "#D4A017";
const BENEFICIARY_ID = 2;

const MOCK_PROVIDERS = [
  { id: 1, name: "Др. Олена Шевченко", spec: "EMDR · PTSD · Тривожні розлади", rating: 4.9, cases: 47, certified: true, location: "Київ / Дистанційно", format: ["online", "offline"], lang: ["uk", "en"], priceMin: 800, priceMax: 1200 },
  { id: 2, name: "Др. Максим Коваль", spec: "CBT · Депресія · Ветеранська психологія", rating: 4.7, cases: 38, certified: true, location: "Харків", format: ["online"], lang: ["uk"], priceMin: 600, priceMax: 900 },
  { id: 3, name: "Др. Світлана Петренко", spec: "Гештальт · Сімейна терапія · ВПО", rating: 4.6, cases: 32, certified: false, location: "Львів / Дистанційно", format: ["online", "offline"], lang: ["uk"], priceMin: 700, priceMax: 1000 },
  { id: 4, name: "Др. Андрій Бондаренко", spec: "Психотравма · Криза · Групова терапія", rating: 4.8, cases: 55, certified: true, location: "Одеса", format: ["offline"], lang: ["uk", "ru"], priceMin: 500, priceMax: 800 },
];

const MOCK_SESSIONS = [
  { id: 1, provider: "Др. Олена Шевченко", date: "2026-07-07", time: "10:00", type: "online", status: "upcoming", session: 9, total: 12 },
  { id: 2, provider: "Др. Олена Шевченко", date: "2026-06-30", time: "10:00", type: "online", status: "completed", session: 8, total: 12 },
  { id: 3, provider: "Др. Олена Шевченко", date: "2026-06-23", time: "10:00", type: "online", status: "completed", session: 7, total: 12 },
  { id: 4, provider: "Др. Олена Шевченко", date: "2026-06-16", time: "10:00", type: "online", status: "completed", session: 6, total: 12 },
];

const MOCK_PHQ_PROGRESS = [
  { session: 1, phq9: 18, gad7: 15, date: "2026-04-07" },
  { session: 3, phq9: 15, gad7: 13, date: "2026-04-28" },
  { session: 5, phq9: 12, gad7: 10, date: "2026-05-19" },
  { session: 7, phq9: 9, gad7: 8, date: "2026-06-09" },
  { session: 8, phq9: 7, gad7: 6, date: "2026-06-23" },
];

const MOCK_PAYMENTS = [
  { id: 1, date: "2026-06-23", desc: "Сеанс #8 — Др. Шевченко", total: 1000, personal: 300, program: 700, status: "paid" },
  { id: 2, date: "2026-06-16", desc: "Сеанс #7 — Др. Шевченко", total: 1000, personal: 300, program: 700, status: "paid" },
  { id: 3, date: "2026-07-07", desc: "Сеанс #9 — Др. Шевченко", total: 1000, personal: 300, program: 700, status: "upcoming" },
];

// ─── ProgramBanners ────────────────────────────────────────────────────────────
function ProgramBanners() {
  const { toast } = useToast();
  const { data: programs = [], isLoading } = useQuery<FundingProgram[]>({
    queryKey: ["/api/programs"],
  });

  const enroll = useMutation({
    mutationFn: (programId: number) =>
      apiRequest("POST", "/api/enrollments", { programId, userId: BENEFICIARY_ID, userRole: "beneficiary" }),
    onSuccess: () => {
      toast({ title: "Заявку подано!", description: "Ваш запит на участь у програмі надіслано. Очікуйте підтвердження." });
      queryClient.invalidateQueries({ queryKey: ["/api/enrollments"] });
    },
    onError: () => toast({ title: "Помилка", description: "Не вдалося подати заявку.", variant: "destructive" }),
  });

  if (isLoading) return <div className="text-center py-12 text-muted-foreground">Завантаження програм...</div>;

  if (!programs.length) return (
    <div className="text-center py-16">
      <LayoutGrid className="w-12 h-12 mx-auto mb-4 text-slate-300" />
      <p className="text-muted-foreground font-medium">Активних програм поки немає</p>
      <p className="text-xs text-muted-foreground mt-2 max-w-sm mx-auto">Коли донори запустять програми фінансування — ви побачите їх тут і зможете подати заявку на безкоштовну допомогу.</p>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
        <h3 className="font-semibold text-sm" style={{ color: NAVY }}>Що таке програми фінансування?</h3>
        <p className="text-xs text-muted-foreground mt-1">Донори (організації та компанії) виділяють кошти на психологічну допомогу. Запишіться на програму — і отримайте доступ до верифікованих фахівців за мінімальною або нульовою доплатою.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {programs.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <Card className="h-full border-rose-200 bg-gradient-to-br from-rose-50 to-white">
              <CardContent className="pt-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-base" style={{ color: NAVY }}>{p.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.description}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 shrink-0 ml-2">Відкрита</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="bg-white rounded-lg p-2.5 border">
                    <p className="text-xs text-muted-foreground">Макс. сеанс</p>
                    <p className="font-bold">₴{p.maxSessionCost}</p>
                  </div>
                  <div className="bg-white rounded-lg p-2.5 border">
                    <p className="text-xs text-muted-foreground">Критерії</p>
                    <p className="font-bold text-xs">{p.beneficiaryEligibility?.slice(0, 1).join(", ") || "ВПО, ветерани"}</p>
                  </div>
                </div>
                <Button
                  className="w-full"
                  style={{ background: ROSE, color: "white", border: "none" }}
                  onClick={() => enroll.mutate(p.id)}
                  disabled={enroll.isPending}
                  data-testid={`button-enroll-${p.id}`}
                >
                  {enroll.isPending ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />}
                  Подати заявку
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── ProviderCatalog ───────────────────────────────────────────────────────────
function ProviderCatalog() {
  const [search, setSearch] = useState("");
  const [formatFilter, setFormatFilter] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { toast } = useToast();

  const filtered = MOCK_PROVIDERS.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !search || p.name.toLowerCase().includes(q) || p.spec.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
    const matchFormat = !formatFilter || p.format.includes(formatFilter);
    return matchSearch && matchFormat;
  });

  const handleBook = (providerId: number, providerName: string) => {
    toast({ title: `Запит надіслано`, description: `Ваш запит на консультацію до ${providerName} отримано. Фахівець зв'яжеться з вами протягом 24 годин.` });
    setSelectedId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Пошук за ім'ям, спеціалізацією, містом..." className="pl-9"
            value={search} onChange={e => setSearch(e.target.value)} data-testid="input-provider-search" />
        </div>
        <div className="flex gap-2">
          {[null, "online", "offline"].map((f) => (
            <Button key={String(f)} size="sm" variant={formatFilter === f ? "default" : "outline"}
              onClick={() => setFormatFilter(f)}
              style={formatFilter === f ? { background: ROSE, color: "white", border: "none" } : {}}
              data-testid={`filter-${f ?? "all"}`}
            >
              {f === null ? "Всі" : f === "online" ? <><Video className="w-3.5 h-3.5 mr-1" />Онлайн</> : <><MapPin className="w-3.5 h-3.5 mr-1" />Офлайн</>}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card className={`transition-all ${selectedId === p.id ? "border-rose-400 shadow-md" : ""}`}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-bold text-sm" style={{ color: NAVY }}>{p.name}</span>
                      {p.certified && <Badge className="bg-teal-100 text-teal-800 text-[10px]"><BadgeCheck className="w-3 h-3 mr-0.5" />mhGAP</Badge>}
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="text-xs font-bold text-amber-700">{p.rating}</span>
                        <span className="text-xs text-muted-foreground">({p.cases})</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{p.spec}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location}</span>
                      {p.format.includes("online") && <span className="flex items-center gap-1"><Video className="w-3 h-3 text-blue-500" />Онлайн</span>}
                      {p.format.includes("offline") && <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-green-600" />Офлайн</span>}
                      <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />₴{p.priceMin}–{p.priceMax}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4 shrink-0">
                    <Button size="sm" variant="outline" className="text-xs h-7 border-rose-300 text-rose-700"
                      onClick={() => setSelectedId(selectedId === p.id ? null : p.id)}
                      data-testid={`button-view-provider-${p.id}`}
                    >
                      {selectedId === p.id ? "Сховати" : "Деталі"}
                    </Button>
                  </div>
                </div>

                <AnimatePresence>
                  {selectedId === p.id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex gap-3 flex-wrap">
                          <Button size="sm" style={{ background: ROSE, color: "white", border: "none" }}
                            onClick={() => handleBook(p.id, p.name)}
                            data-testid={`button-book-provider-${p.id}`}
                          >
                            <Phone className="w-3.5 h-3.5 mr-1" /> Записатися на консультацію
                          </Button>
                          <Button size="sm" variant="outline">
                            <Heart className="w-3.5 h-3.5 mr-1" /> Зберегти
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Search className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p>За вашим запитом нічого не знайдено.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tab: Дашборд ──────────────────────────────────────────────────────────────
function DashboardTab() {
  const currentSession = 8;
  const totalSessions = 12;
  const progressPct = Math.round((currentSession / totalSessions) * 100);
  const phqIntake = 18;
  const phqCurrent = 7;
  const gad7Intake = 15;
  const gad7Current = 6;
  const phqImprove = Math.round(((phqIntake - phqCurrent) / phqIntake) * 100);
  const gad7Improve = Math.round(((gad7Intake - gad7Current) / gad7Intake) * 100);

  // Next session countdown (static: 2026-07-07)
  const nextSessionDate = "2026-07-07";
  const nextSessionLabel = new Date(nextSessionDate).toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="space-y-5">
      {/* Active program card */}
      <Card className="border-rose-200 bg-gradient-to-br from-rose-50 to-white overflow-hidden">
        <CardContent className="pt-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <Badge className="bg-green-100 text-green-800 mb-2">Активна програма</Badge>
              <h2 className="text-lg font-bold" style={{ color: NAVY }}>Психологічна реабілітація</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Др. Олена Шевченко · EMDR · Тривожні розлади</p>
            </div>
            <div className="text-right shrink-0 ml-4">
              <p className="text-3xl font-extrabold" style={{ color: ROSE }}>{currentSession}/{totalSessions}</p>
              <p className="text-xs text-muted-foreground">Сеанс</p>
            </div>
          </div>
          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span>Прогрес курсу</span><span>{progressPct}%</span>
          </div>
          <div className="bg-slate-200 rounded-full h-3 mb-4">
            <motion.div className="h-3 rounded-full" style={{ background: ROSE }}
              initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} transition={{ duration: 0.9, ease: "easeOut" }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            {[
              { label: "Залишилось сеансів", val: totalSessions - currentSession, color: "text-amber-600" },
              { label: "Наступний сеанс", val: "07 лип", color: "text-blue-600" },
              { label: "Завершено", val: `${currentSession} сеансів`, color: "text-green-600" },
            ].map(item => (
              <div key={item.label} className="bg-white rounded-lg p-3 border">
                <p className={`font-bold text-base ${item.color}`}>{item.val}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* PHQ-9 & GAD-7 progress */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">PHQ-9 Депресія</p>
                <p className="text-2xl font-extrabold" style={{ color: NAVY }}>{phqCurrent} <span className="text-sm font-normal text-muted-foreground">/ 27</span></p>
              </div>
              <Badge className="bg-green-100 text-green-800 text-xs">−{phqImprove}%</Badge>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground"><span>Початок (сеанс 1)</span><span>{phqIntake}</span></div>
              <div className="bg-slate-200 rounded-full h-2">
                <div className="h-2 rounded-full bg-red-400" style={{ width: `${(phqIntake / 27) * 100}%` }} />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground"><span>Зараз (сеанс 8)</span><span>{phqCurrent}</span></div>
              <div className="bg-slate-200 rounded-full h-2">
                <motion.div className="h-2 rounded-full" style={{ background: "#16a34a" }}
                  initial={{ width: 0 }} animate={{ width: `${(phqCurrent / 27) * 100}%` }} transition={{ duration: 0.8, delay: 0.1 }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">GAD-7 Тривога</p>
                <p className="text-2xl font-extrabold" style={{ color: NAVY }}>{gad7Current} <span className="text-sm font-normal text-muted-foreground">/ 21</span></p>
              </div>
              <Badge className="bg-green-100 text-green-800 text-xs">−{gad7Improve}%</Badge>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground"><span>Початок (сеанс 1)</span><span>{gad7Intake}</span></div>
              <div className="bg-slate-200 rounded-full h-2">
                <div className="h-2 rounded-full bg-orange-400" style={{ width: `${(gad7Intake / 21) * 100}%` }} />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground"><span>Зараз (сеанс 8)</span><span>{gad7Current}</span></div>
              <div className="bg-slate-200 rounded-full h-2">
                <motion.div className="h-2 rounded-full" style={{ background: "#16a34a" }}
                  initial={{ width: 0 }} animate={{ width: `${(gad7Current / 21) * 100}%` }} transition={{ duration: 0.8, delay: 0.2 }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next session countdown */}
      <Card className="border-blue-200 bg-blue-50/40">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <CalendarDays className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm" style={{ color: NAVY }}>Наступний сеанс — Сеанс #9</p>
              <p className="text-xs text-muted-foreground">{nextSessionLabel} · 10:00 · Відеосеанс</p>
            </div>
            <Button size="sm" style={{ background: ROSE, color: "white", border: "none" }}>
              <Video className="w-3.5 h-3.5 mr-1" /> Приєднатись
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Сеансів проведено", val: "8", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
          { label: "Покращення PHQ-9", val: "+61%", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Ескроу-баланс", val: "₴2 100", icon: Wallet, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Днів у програмі", val: "77", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
        ].map(item => (
          <Card key={item.label}>
            <CardContent className="pt-4 pb-4 text-center">
              <div className={`w-9 h-9 rounded-full ${item.bg} flex items-center justify-center mx-auto mb-2`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <p className={`text-xl font-bold ${item.color}`}>{item.val}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: Запис (Appointments) ─────────────────────────────────────────────────
function AppointmentsTab() {
  const { toast } = useToast();
  const upcoming = MOCK_SESSIONS.filter(s => s.status === "upcoming");
  const completed = MOCK_SESSIONS.filter(s => s.status === "completed");

  const handleAction = (action: string, session: number) => {
    toast({ title: `${action} сеанс #${session}`, description: "Ваш запит опрацьовується. Очікуйте підтвердження." });
  };

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Проведено сеансів", val: 8, icon: CheckCircle2, color: "text-green-600" },
          { label: "Залишилось", val: 4, icon: Clock, color: "text-amber-600" },
          { label: "Покращення PHQ-9", val: "+61%", icon: TrendingUp, color: "text-blue-600" },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="pt-4 pb-4 text-center">
              <item.icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
              <p className={`text-xl font-bold ${item.color}`}>{item.val}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Book new session */}
      <Card className="border-dashed border-2 border-rose-200 bg-rose-50/30">
        <CardContent className="pt-5 pb-5 text-center">
          <CalendarDays className="w-8 h-8 mx-auto mb-2" style={{ color: ROSE }} />
          <p className="font-semibold text-sm mb-1" style={{ color: NAVY }}>Записатись на новий сеанс</p>
          <p className="text-xs text-muted-foreground mb-3">Виберіть зручний час з Др. Олена Шевченко</p>
          <Button size="sm" style={{ background: ROSE, color: "white", border: "none" }}
            onClick={() => handleAction("Запис на", 9)}
            data-testid="button-book-new-session"
          >
            <CalendarDays className="w-3.5 h-3.5 mr-1.5" /> Записатись
          </Button>
        </CardContent>
      </Card>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm mb-3" style={{ color: NAVY }}>Наступний сеанс</h3>
          {upcoming.map(s => (
            <Card key={s.id} className="border-rose-300 bg-rose-50/40">
              <CardContent className="pt-4 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CalendarDays className="w-4 h-4" style={{ color: ROSE }} />
                      <span className="font-semibold text-sm">
                        {new Date(s.date).toLocaleDateString("uk-UA", { weekday: "long", day: "numeric", month: "long" })} · {s.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{s.provider} · Сеанс {s.session}/{s.total}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {s.type === "online" ? <Video className="w-3 h-3 text-blue-500" /> : <MapPin className="w-3 h-3 text-green-600" />}
                      <span className="text-xs text-muted-foreground">{s.type === "online" ? "Відеосеанс" : "Офлайн"}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" style={{ background: ROSE, color: "white", border: "none" }} data-testid="button-join-session">
                      <Video className="w-3.5 h-3.5 mr-1" /> Приєднатись
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs border-slate-300"
                      onClick={() => handleAction("Перенесення сеансу", s.session)}
                      data-testid={`button-reschedule-${s.id}`}
                    >
                      Перенести
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs border-red-200 text-red-600"
                      onClick={() => handleAction("Скасування сеансу", s.session)}
                      data-testid={`button-cancel-${s.id}`}
                    >
                      Скасувати
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* SessionHandshake demo */}
      <div>
        <h3 className="font-semibold text-sm mb-3" style={{ color: NAVY }}>Підтвердження сеансу</h3>
        <SessionHandshake
          sessionNumber={9}
          totalSessions={12}
          providerName="Др. Олена Шевченко"
          role="beneficiary"
        />
      </div>

      {/* Completed history */}
      <div>
        <h3 className="font-semibold text-sm mb-3" style={{ color: NAVY }}>Історія сеансів</h3>
        <div className="space-y-2">
          {completed.map(s => (
            <Card key={s.id} className="bg-slate-50/60">
              <CardContent className="pt-3 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <div>
                      <p className="text-xs font-medium">
                        {new Date(s.date).toLocaleDateString("uk-UA", { day: "numeric", month: "long" })} · {s.time}
                      </p>
                      <p className="text-xs text-muted-foreground">Сеанс {s.session}/{s.total}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-[10px]">Завершено</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Терапевти ────────────────────────────────────────────────────────────
function TherapistsTab() {
  const [search, setSearch] = useState("");
  const [specFilter, setSpecFilter] = useState<string | null>(null);
  const { toast } = useToast();

  const SPECS = ["EMDR", "CBT", "Гештальт", "Психотравма"];

  const filtered = MOCK_PROVIDERS.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !search || p.name.toLowerCase().includes(q) || p.spec.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
    const matchSpec = !specFilter || p.spec.includes(specFilter);
    return matchSearch && matchSpec;
  });

  const handleBook = (name: string) => {
    toast({ title: "Запит надіслано", description: `Ваш запит до ${name} отримано. Фахівець зв'яжеться протягом 24 год.` });
  };

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(i => (
          <Star key={i} className={`w-3.5 h-3.5 ${i <= full ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
        ))}
        <span className="text-xs font-bold text-amber-700 ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Search + specialty filter */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Пошук за ім'ям, спеціалізацією, містом..." className="pl-9"
            value={search} onChange={e => setSearch(e.target.value)} data-testid="input-therapist-search" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant={specFilter === null ? "default" : "outline"}
            style={specFilter === null ? { background: NAVY, color: "white", border: "none" } : {}}
            onClick={() => setSpecFilter(null)}>Всі</Button>
          {SPECS.map(s => (
            <Button key={s} size="sm" variant={specFilter === s ? "default" : "outline"}
              style={specFilter === s ? { background: ROSE, color: "white", border: "none" } : {}}
              onClick={() => setSpecFilter(specFilter === s ? null : s)}
              data-testid={`spec-filter-${s}`}
            >{s}</Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-lg"
                    style={{ background: `linear-gradient(135deg, ${ROSE}, ${NAVY})` }}>
                    {p.name.split(" ")[1]?.[0] ?? "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-sm" style={{ color: NAVY }}>{p.name}</span>
                      {p.certified && <Badge className="bg-teal-100 text-teal-800 text-[10px]"><BadgeCheck className="w-3 h-3 mr-0.5" />mhGAP</Badge>}
                    </div>
                    {renderStars(p.rating)}
                    <p className="text-xs text-muted-foreground mt-0.5">({p.cases} клієнтів)</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{p.spec}</p>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location}</span>
                  {p.format.includes("online") && <span className="flex items-center gap-1 text-blue-600"><Video className="w-3 h-3" />Онлайн</span>}
                  {p.format.includes("offline") && <span className="flex items-center gap-1 text-green-600"><MapPin className="w-3 h-3" />Офлайн</span>}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold" style={{ color: GOLD }}>₴{p.priceMin}–{p.priceMax}</span>
                  <Button size="sm" style={{ background: ROSE, color: "white", border: "none" }}
                    onClick={() => handleBook(p.name)}
                    data-testid={`button-book-therapist-${p.id}`}
                  >
                    <CalendarDays className="w-3.5 h-3.5 mr-1" /> Записатись
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 text-center py-12 text-muted-foreground">
            <Search className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p>За вашим запитом нічого не знайдено.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tab: Платежі ──────────────────────────────────────────────────────────────
function PaymentsTab() {
  const escrowBalance = 2100;
  const escrowTotal = 3000;
  const escrowPct = Math.round((escrowBalance / escrowTotal) * 100);

  return (
    <div className="space-y-5">
      {/* Escrow balance card */}
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-white">
        <CardContent className="pt-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Ескроу-баланс</p>
              <p className="text-3xl font-extrabold" style={{ color: NAVY }}>₴{escrowBalance.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-0.5">з ₴{escrowTotal.toLocaleString()} залоченого</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <Wallet className="w-6 h-6" style={{ color: GOLD }} />
            </div>
          </div>
          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span>Використано</span><span>{escrowPct}%</span>
          </div>
          <div className="bg-amber-100 rounded-full h-2.5">
            <motion.div className="h-2.5 rounded-full" style={{ background: GOLD }}
              initial={{ width: 0 }} animate={{ width: `${escrowPct}%` }} transition={{ duration: 0.8 }} />
          </div>
        </CardContent>
      </Card>

      {/* 70/30 split visualization */}
      <Card>
        <CardHeader><CardTitle className="text-sm flex items-center gap-2"><TrendingUp className="w-4 h-4" style={{ color: ROSE }} />Розподіл фінансування (70% / 30%)</CardTitle></CardHeader>
        <CardContent>
          <div className="flex rounded-full overflow-hidden h-6 mb-3">
            <motion.div className="flex items-center justify-center text-white text-xs font-bold"
              style={{ background: ROSE }}
              initial={{ width: 0 }} animate={{ width: "70%" }} transition={{ duration: 0.9 }}>
              70% Програма
            </motion.div>
            <motion.div className="flex items-center justify-center text-white text-xs font-bold"
              style={{ background: NAVY }}
              initial={{ width: 0 }} animate={{ width: "30%" }} transition={{ duration: 0.9, delay: 0.1 }}>
              30% Ви
            </motion.div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-rose-50 rounded-lg p-3 border border-rose-200">
              <p className="text-xs text-muted-foreground">Покриває програма</p>
              <p className="font-bold text-rose-700">₴700 / сеанс</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 border">
              <p className="text-xs text-muted-foreground">Ваша частка</p>
              <p className="font-bold" style={{ color: NAVY }}>₴300 / сеанс</p>
            </div>
          </div>
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700 flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 shrink-0" />
              <span>P2P-збір: залучіть ще ₴900 від спільноти та знизьте свою частку до 0%</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Payment history table */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Історія платежів</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">Дата</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">Опис</th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground">Разом</th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground">Ваша частка</th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground">Програма</th>
                  <th className="text-center px-4 py-2.5 text-xs font-semibold text-muted-foreground">Статус</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_PAYMENTS.map((pay, i) => (
                  <motion.tr key={pay.id} className="border-b last:border-0 hover:bg-slate-50/60"
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{pay.date}</td>
                    <td className="px-4 py-3 text-xs font-medium whitespace-nowrap">{pay.desc}</td>
                    <td className="px-4 py-3 text-xs text-right font-mono font-bold">₴{pay.total.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-right font-mono" style={{ color: NAVY }}>₴{pay.personal}</td>
                    <td className="px-4 py-3 text-xs text-right font-mono text-green-700">₴{pay.program}</td>
                    <td className="px-4 py-3 text-center">
                      {pay.status === "paid"
                        ? <Badge className="bg-green-100 text-green-800 text-[10px]">Оплачено</Badge>
                        : <Badge className="bg-amber-100 text-amber-800 text-[10px]">Очікується</Badge>}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* P2P co-financing link */}
      <Card className="border-rose-200 bg-rose-50/40">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-3">
            <Share2 className="w-8 h-8 p-1.5 rounded-full bg-rose-100 shrink-0" style={{ color: ROSE }} />
            <div className="flex-1">
              <p className="font-semibold text-sm" style={{ color: NAVY }}>P2P-співфінансування</p>
              <p className="text-xs text-muted-foreground">Поділіться посиланням — і друзі зможуть допомогти покрити ваші сеанси</p>
            </div>
            <Button size="sm" variant="outline" className="border-rose-300 text-rose-700 shrink-0" data-testid="button-p2p-link">
              Поділитись
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tab: Звіти ────────────────────────────────────────────────────────────────
function ReportsTab() {
  const first = MOCK_PHQ_PROGRESS[0];
  const last = MOCK_PHQ_PROGRESS[MOCK_PHQ_PROGRESS.length - 1];
  const phqDrop = first.phq9 - last.phq9;
  const gad7Drop = first.gad7 - last.gad7;
  const phqPct = Math.round((phqDrop / first.phq9) * 100);
  const gad7Pct = Math.round((gad7Drop / first.gad7) * 100);
  const completionPct = Math.round((8 / 12) * 100);

  return (
    <div className="space-y-5">
      {/* Completion summary */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardContent className="pt-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Завершення курсу</p>
              <p className="text-3xl font-extrabold" style={{ color: NAVY }}>{completionPct}%</p>
              <p className="text-xs text-muted-foreground mt-0.5">8 з 12 сеансів завершено</p>
            </div>
            <FileText className="w-10 h-10 p-2 rounded-full bg-blue-100 text-blue-600" />
          </div>
          <div className="bg-blue-100 rounded-full h-2.5">
            <motion.div className="h-2.5 rounded-full bg-blue-500"
              initial={{ width: 0 }} animate={{ width: `${completionPct}%` }} transition={{ duration: 0.8 }} />
          </div>
        </CardContent>
      </Card>

      {/* PHQ-9/GAD-7 improvement summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">PHQ-9 Покращення</p>
            <p className="text-4xl font-extrabold" style={{ color: ROSE }}>−{phqPct}%</p>
            <p className="text-xs text-muted-foreground mt-1">{first.phq9} → {last.phq9} балів</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">GAD-7 Покращення</p>
            <p className="text-4xl font-extrabold text-blue-600">−{gad7Pct}%</p>
            <p className="text-xs text-muted-foreground mt-1">{first.gad7} → {last.gad7} балів</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress table */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Динаміка PHQ-9 та GAD-7 по сеансах</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">Сеанс</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">Дата</th>
                  <th className="text-center px-4 py-2.5 text-xs font-semibold text-muted-foreground">PHQ-9</th>
                  <th className="text-center px-4 py-2.5 text-xs font-semibold text-muted-foreground">GAD-7</th>
                  <th className="text-center px-4 py-2.5 text-xs font-semibold text-muted-foreground">Тяжкість</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_PHQ_PROGRESS.map((row, i) => {
                  const severity = row.phq9 >= 15 ? "Тяжка" : row.phq9 >= 10 ? "Помірна" : row.phq9 >= 5 ? "Легка" : "Мінімальна";
                  const badgeColor = row.phq9 >= 15 ? "bg-red-100 text-red-800" : row.phq9 >= 10 ? "bg-orange-100 text-orange-800" : row.phq9 >= 5 ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800";
                  return (
                    <motion.tr key={row.session} className="border-b last:border-0 hover:bg-slate-50/60"
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                      <td className="px-4 py-3 text-xs font-bold" style={{ color: NAVY }}>#{row.session}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{row.date}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-mono font-bold text-sm" style={{ color: row.phq9 >= 10 ? ROSE : "#16a34a" }}>{row.phq9}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-mono font-bold text-sm text-blue-600">{row.gad7}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge className={`text-[10px] ${badgeColor}`}>{severity}</Badge>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Clinical summary */}
      <Card className="border-green-200 bg-green-50/30">
        <CardHeader><CardTitle className="text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />Клінічна динаміка</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Пацієнт демонструє стабільну позитивну динаміку з сеансу 1 по сеанс 8. Рівень депресивної симптоматики (PHQ-9) знизився з <strong className="text-foreground">18 до 7 балів</strong> (−{phqPct}%), перейшовши з категорії «тяжка депресія» до «легкої симптоматики».</p>
          <p>Тривожний синдром (GAD-7) скоротився з <strong className="text-foreground">15 до 6 балів</strong> (−{gad7Pct}%), що відповідає переходу з «тяжкої» до «легкої» тривоги за клінічними критеріями DSM-5.</p>
          <p className="text-xs italic">Звіт згенеровано автоматично. Для офіційного висновку зверніться до вашого терапевта.</p>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tab: Налаштування ─────────────────────────────────────────────────────────
function SettingsTab() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [lang, setLang] = useState<"UA" | "EN">("UA");
  const [anonymity, setAnonymity] = useState<"full" | "partial" | "none">("partial");
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: "Налаштування збережено", description: "Ваші уподобання оновлено." });
  };

  return (
    <div className="space-y-5 max-w-xl">
      {/* Profile */}
      <Card>
        <CardHeader><CardTitle className="text-sm flex items-center gap-2"><UserCircle className="w-4 h-4" style={{ color: ROSE }} />Профіль</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "Ім'я та прізвище", value: "Олексій Мартиненко" },
            { label: "Email", value: "oleksiy@example.com" },
            { label: "Телефон", value: "+380 50 123 45 67" },
            { label: "Тип бенефіціара", value: "ВПО · Ветеран" },
          ].map(field => (
            <div key={field.label}>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{field.label}</label>
              <div className="mt-1 px-3 py-2 bg-slate-50 rounded-lg border text-sm font-medium" style={{ color: NAVY }}>
                {field.value}
              </div>
            </div>
          ))}
          <p className="text-xs text-muted-foreground">Для зміни даних зверніться до адміністратора платформи.</p>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Bell className="w-4 h-4" style={{ color: ROSE }} />Сповіщення</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Email-сповіщення", desc: "Нагадування про сеанси, підтвердження оплати", val: emailNotif, set: setEmailNotif },
            { label: "SMS-сповіщення", desc: "Термінові нагадування за 24 год до сеансу", val: smsNotif, set: setSmsNotif },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <button
                onClick={() => item.set(!item.val)}
                className={`relative inline-flex h-6 w-11 rounded-full transition-colors focus:outline-none ${item.val ? "bg-rose-500" : "bg-slate-200"}`}
                data-testid={`toggle-${item.label}`}
              >
                <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform mt-0.5 ${item.val ? "translate-x-5 ml-0.5" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Language */}
      <Card>
        <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Globe className="w-4 h-4" style={{ color: ROSE }} />Мова інтерфейсу</CardTitle></CardHeader>
        <CardContent>
          <div className="flex gap-3">
            {(["UA", "EN"] as const).map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`flex-1 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all ${lang === l ? "border-rose-500 text-rose-700 bg-rose-50" : "border-slate-200 text-muted-foreground hover:border-rose-200"}`}
                data-testid={`lang-${l}`}
              >
                {l === "UA" ? "🇺🇦 Українська" : "🇬🇧 English"}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">Зміна мови буде застосована після перезавантаження сторінки.</p>
        </CardContent>
      </Card>

      {/* Anonymity */}
      <Card>
        <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Shield className="w-4 h-4" style={{ color: ROSE }} />Рівень анонімності</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {[
            { val: "none" as const, label: "Відкритий профіль", desc: "Ваше ім'я та фото видно фахівцям і донорам" },
            { val: "partial" as const, label: "Часткова анонімність", desc: "Тільки ім'я без прізвища та фото" },
            { val: "full" as const, label: "Повна анонімність", desc: "Тільки псевдонім, жодних особистих даних" },
          ].map(opt => (
            <button key={opt.val} onClick={() => setAnonymity(opt.val)}
              className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${anonymity === opt.val ? "border-rose-500 bg-rose-50" : "border-slate-200 hover:border-rose-200"}`}
              data-testid={`anonymity-${opt.val}`}
            >
              <p className={`text-sm font-semibold ${anonymity === opt.val ? "text-rose-700" : ""}`}>{opt.label}</p>
              <p className="text-xs text-muted-foreground">{opt.desc}</p>
            </button>
          ))}
        </CardContent>
      </Card>

      <Button className="w-full" style={{ background: ROSE, color: "white", border: "none" }}
        onClick={handleSave} data-testid="button-save-settings">
        Зберегти налаштування
      </Button>
    </div>
  );
}

// ─── Tabs definition ───────────────────────────────────────────────────────────
const TABS = [
  { id: "dashboard", label: "Дашборд", icon: LayoutGrid },
  { id: "appointments", label: "Запис", icon: CalendarDays },
  { id: "therapists", label: "Терапевти", icon: Stethoscope },
  { id: "payments", label: "Платежі", icon: Wallet },
  { id: "reports", label: "Звіти", icon: FileText },
  { id: "settings", label: "Налаштування", icon: Settings },
];

// ─── Main export ───────────────────────────────────────────────────────────────
export default function BeneficiaryCabinet() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-white shadow-sm">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/portal">
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                <ArrowLeft className="w-4 h-4" /> Портал
              </Button>
            </Link>
            <div className="h-5 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(225,29,72,0.1)" }}>
                <Heart className="w-4 h-4" style={{ color: ROSE }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: NAVY }}>Кабінет бенефіціара</p>
                <p className="text-xs text-muted-foreground">Клієнт · Пацієнт · Демо-режим</p>
              </div>
            </div>
          </div>
          <Badge className="bg-rose-100 text-rose-800 text-xs">Демо-режим</Badge>
        </div>

        {/* Tab bar */}
        <div className="container">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-rose-500 text-rose-700"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`tab-${tab.id}`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="container py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {activeTab === "dashboard" && <DashboardTab />}
            {activeTab === "appointments" && <AppointmentsTab />}
            {activeTab === "therapists" && <TherapistsTab />}
            {activeTab === "payments" && <PaymentsTab />}
            {activeTab === "reports" && <ReportsTab />}
            {activeTab === "settings" && <SettingsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
