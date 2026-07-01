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
  LayoutGrid, Clock, MapPin, Video, Phone, Users, AlertCircle, Timer
} from "lucide-react";
import ScreeningFlow from "@/components/diagnostic/ScreeningFlow";
import SessionHandshake from "@/components/SessionHandshake";

const ROSE = "#E11D48";
const NAVY = "#0F2B46";
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

function DiagnosisMockup() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = [
    { q: "Чи ви почуваєте тривогу або неспокій більше ніж зазвичай?", options: ["Ніколи", "Іноді", "Часто", "Постійно"] },
    { q: "Чи є у вас труднощі зі сном або нав'язливі спогади?", options: ["Ніколи", "Іноді", "Часто", "Постійно"] },
    { q: "Чи важко вам зосередитися або знаходити радість у звичних справах?", options: ["Не важко", "Іноді буває", "Часто", "Дуже важко"] },
    { q: "Чи уникаєте ви людей або місць, які пов'язані з травматичними подіями?", options: ["Ні", "Іноді", "Часто", "Постійно"] },
    { q: "Чи відчуваєте ви дратівливість, спалахи гніву або загострену пильність?", options: ["Ні", "Іноді", "Часто", "Постійно"] },
  ];

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 3;
  const severity = totalScore <= 4 ? "Мінімальний" : totalScore <= 9 ? "Помірний" : "Значний";
  const severityColor = totalScore <= 4 ? "text-green-600" : totalScore <= 9 ? "text-amber-600" : "text-red-600";

  const handleAnswer = (val: number) => {
    setAnswers(prev => [...prev, val]);
    setStep(s => s + 1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Stethoscope className="w-5 h-5" style={{ color: ROSE }} />
          Скринінг психологічного стану (демо)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {step <= questions.length ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              {questions.map((_, i) => (
                <div key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i < step - 1 ? ROSE : i === step - 1 ? "rgba(225,29,72,0.3)" : "#e2e8f0" }} />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Питання {step} з {questions.length}</p>
            <h3 className="text-base font-medium" style={{ color: NAVY }}>{questions[step - 1].q}</h3>
            <div className="space-y-2">
              {questions[step - 1].options.map((opt, i) => (
                <Button key={i} variant="outline" className="w-full justify-start text-left h-auto py-3 hover:border-rose-400 hover:bg-rose-50"
                  onClick={() => handleAnswer(i)}
                  data-testid={`option-q${step}-${i}`}
                >
                  <span className="w-6 h-6 rounded-full border-2 mr-3 flex-shrink-0 flex items-center justify-center text-xs font-bold" style={{ borderColor: ROSE, color: ROSE }}>
                    {["A", "B", "C", "D"][i]}
                  </span>
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="text-center py-4">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-3" style={{ color: ROSE }} />
              <h3 className="text-lg font-bold mb-1" style={{ color: NAVY }}>Скринінг завершено</h3>
              <p className={`text-xl font-bold ${severityColor}`}>{severity} рівень симптомів</p>
              <p className="text-xs text-muted-foreground mt-1">Загальний бал: {totalScore} / {maxScore}</p>
            </div>
            <div className="bg-slate-100 rounded-full h-3">
              <div className="h-3 rounded-full transition-all duration-700"
                style={{ width: `${(totalScore / maxScore) * 100}%`, background: totalScore <= 4 ? "#16a34a" : totalScore <= 9 ? "#d97706" : ROSE }}
              />
            </div>
            <div className="p-4 rounded-xl border bg-amber-50 border-amber-200">
              <div className="flex gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">Рекомендація</p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    {totalScore <= 4 ? "Ваш стан стабільний. Профілактична консультація з фахівцем може бути корисною." : totalScore <= 9 ? "Рекомендовано пройти консультацію з верифікованим психологом MHPSS." : "Рекомендовано термінова консультація з фахівцем у сфері психічного здоров'я."}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => { setStep(1); setAnswers([]); }}>Пройти знову</Button>
              <Button className="flex-1" style={{ background: ROSE, color: "white", border: "none" }}>
                <ChevronRight className="w-4 h-4 mr-2" /> Знайти фахівця
              </Button>
            </div>
            <p className="text-center text-xs text-muted-foreground">Цей скринінг не є медичним діагнозом. Для отримання діагнозу зверніться до сертифікованого фахівця.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

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
      <div className="flex gap-3">
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
                        <div className="flex gap-3">
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

function MySchedule() {
  const upcoming = MOCK_SESSIONS.filter(s => s.status === "upcoming");
  const completed = MOCK_SESSIONS.filter(s => s.status === "completed");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Проведено сеансів", val: 8, icon: CheckCircle2, color: "text-green-600" },
          { label: "Залишилось", val: 4, icon: Clock, color: "text-amber-600" },
          { label: "Покращення PHQ-9", val: "+34%", icon: TrendingUp, color: "text-blue-600" },
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

      {upcoming.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm mb-3" style={{ color: NAVY }}>Наступний сеанс</h3>
          {upcoming.map(s => (
            <Card key={s.id} className="border-rose-300 bg-rose-50/40">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CalendarDays className="w-4 h-4" style={{ color: ROSE }} />
                      <span className="font-semibold text-sm">{new Date(s.date).toLocaleDateString("uk-UA", { weekday: "long", day: "numeric", month: "long" })} · {s.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{s.provider} · Сеанс {s.session}/{s.total}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {s.type === "online" ? <Video className="w-3 h-3 text-blue-500" /> : <MapPin className="w-3 h-3 text-green-600" />}
                      <span className="text-xs text-muted-foreground capitalize">{s.type === "online" ? "Відеосеанс" : "Офлайн"}</span>
                    </div>
                  </div>
                  <Button size="sm" style={{ background: ROSE, color: "white", border: "none" }} data-testid="button-join-session">
                    <Video className="w-3.5 h-3.5 mr-1" /> Приєднатись
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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
                      <p className="text-xs font-medium">{new Date(s.date).toLocaleDateString("uk-UA", { day: "numeric", month: "long" })} · {s.time}</p>
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

function CostCalculator() {
  const [sessionCount, setSessionCount] = useState(12);
  const [sessionCost, setSessionCost] = useState(800);
  const [coFinancing, setCoFinancing] = useState(60);
  const totalCost = sessionCount * sessionCost;
  const covered = totalCost * (coFinancing / 100);
  const selfPay = totalCost - covered;

  const [creditAmount, setCreditAmount] = useState(5000);
  const [creditRate, setCreditRate] = useState(18);
  const [creditTerm, setCreditTerm] = useState(12);
  const monthlyPayment = (creditAmount * (creditRate / 100 / 12)) / (1 - Math.pow(1 + creditRate / 100 / 12, -creditTerm));
  const totalCreditCost = monthlyPayment * creditTerm;
  const savings = creditAmount * (creditRate / 100) * (creditTerm / 12) * 0.3;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Calculator className="w-5 h-5" style={{ color: ROSE }} />Кошторис сеансів</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Кількість сеансів", val: sessionCount, set: setSessionCount, min: 4, max: 40, step: 2, fmt: (v: number) => String(v) },
              { label: "Вартість сеансу (₴)", val: sessionCost, set: setSessionCost, min: 200, max: 2000, step: 100, fmt: (v: number) => `₴${v}` },
              { label: "Співфінансування (%)", val: coFinancing, set: setCoFinancing, min: 0, max: 100, step: 5, fmt: (v: number) => `${v}%` },
            ].map((item) => (
              <div key={item.label}>
                <label className="text-sm font-medium">{item.label}</label>
                <input type="range" min={item.min} max={item.max} step={item.step} value={item.val}
                  onChange={(e) => item.set(Number(e.target.value))} className="w-full" />
                <div className="text-sm font-mono">{item.fmt(item.val)}</div>
              </div>
            ))}
          </div>
          <div className="bg-rose-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm"><span>Загальна вартість:</span><span className="font-mono font-bold">₴{totalCost.toLocaleString()}</span></div>
            <div className="flex justify-between text-sm"><span>Покриває програма:</span><span className="font-mono text-green-600">–₴{covered.toLocaleString()}</span></div>
            <div className="flex justify-between text-sm font-bold" style={{ color: NAVY }}><span>Ваша частка:</span><span className="font-mono">₴{selfPay.toLocaleString()}</span></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="w-5 h-5" style={{ color: ROSE }} />Потенційна економія (психологічне здоров'я vs кредит)</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Сума кредиту (₴)", val: creditAmount, set: setCreditAmount, min: 1000, max: 100000, step: 1000, fmt: (v: number) => `₴${v.toLocaleString()}` },
              { label: "Ставка (%)", val: creditRate, set: setCreditRate, min: 5, max: 30, step: 1, fmt: (v: number) => `${v}%` },
              { label: "Термін (міс)", val: creditTerm, set: setCreditTerm, min: 6, max: 60, step: 6, fmt: (v: number) => `${v} міс` },
            ].map((item) => (
              <div key={item.label}>
                <label className="text-sm font-medium">{item.label}</label>
                <input type="range" min={item.min} max={item.max} step={item.step} value={item.val}
                  onChange={(e) => item.set(Number(e.target.value))} className="w-full" />
                <div className="text-sm font-mono">{item.fmt(item.val)}</div>
              </div>
            ))}
          </div>
          <div className="bg-rose-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm"><span>Місячний платіж:</span><span className="font-mono font-bold">₴{monthlyPayment.toFixed(0)}</span></div>
            <div className="flex justify-between text-sm"><span>Загальна переплата:</span><span className="font-mono">₴{totalCreditCost.toFixed(0)}</span></div>
            <div className="flex justify-between text-sm font-bold text-green-600"><span>Потенційна економія:</span><span className="font-mono">₴{savings.toFixed(0)}</span></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function P2PFundraising() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const link = "https://feelagain.me/support/benef-2847";

  const handleShare = () => {
    navigator.clipboard?.writeText(link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Посилання скопійовано", description: "Поділіться з друзями, родиною або в соцмережах." });
  };

  return (
    <div className="space-y-4">
      <Card className="border-rose-200 bg-gradient-to-br from-rose-50 to-white">
        <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Share2 className="w-5 h-5" style={{ color: ROSE }} />Мій курс реабілітації</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold" style={{ color: NAVY }}>₴4,800 з ₴6,400 зібрано</h3>
                <Badge className="bg-green-100 text-green-800">Активний</Badge>
              </div>
              <p className="text-xs text-muted-foreground">12 сеансів · 8 завершено · 4 залишилось</p>
            </div>
            <span className="text-2xl font-bold" style={{ color: ROSE }}>75%</span>
          </div>
          <div className="bg-slate-200 rounded-full h-3">
            <motion.div className="h-3 rounded-full" style={{ background: ROSE }} initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ duration: 1, ease: "easeOut" }} />
          </div>
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            {[{ label: "Донорів", val: "7" }, { label: "Сеансів залишилось", val: "4" }, { label: "Днів до дедлайну", val: "21" }].map(item => (
              <div key={item.label} className="bg-white rounded-lg p-2.5 border">
                <p className="font-bold text-sm" style={{ color: NAVY }}>{item.val}</p>
                <p className="text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Button className="flex-1" style={{ background: ROSE, color: "white", border: "none" }} onClick={handleShare} data-testid="button-share-p2p">
              {copied ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
              {copied ? "Скопійовано!" : "Поширити посилання"}
            </Button>
            <Button variant="outline" className="flex-1 border-rose-300 text-rose-700" data-testid="button-donate-p2p">
              <DollarSign className="w-4 h-4 mr-2" /> Зробити внесок
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="p-4 rounded-xl bg-slate-50 border text-sm">
        <h4 className="font-semibold mb-2" style={{ color: NAVY }}>Як працює P2P-збір?</h4>
        <ol className="space-y-1.5 text-xs text-muted-foreground list-decimal list-inside">
          <li>Фахівець створює проєкт і прив'язує вас як бенефіціара</li>
          <li>Система генерує унікальне посилання для збору</li>
          <li>Ви поширюєте посилання серед знайомих, у соцмережах</li>
          <li>Кошти надходять напряму на програму — без посередників</li>
          <li>Фахівець отримує оплату після верифікованого сеансу</li>
        </ol>
      </div>
    </div>
  );
}

const TABS = [
  { id: "programs", label: "Програми", icon: LayoutGrid },
  { id: "diagnosis", label: "Скринінг", icon: Stethoscope },
  { id: "providers", label: "Фахівці", icon: Users },
  { id: "schedule", label: "Мій графік", icon: CalendarDays },
  { id: "session", label: "Сеанс", icon: Timer },
  { id: "calculator", label: "Калькулятор", icon: Calculator },
  { id: "p2p", label: "P2P-збір", icon: Share2 },
];

export default function BeneficiaryCabinet() {
  const [activeTab, setActiveTab] = useState("programs");

  return (
    <div className="min-h-screen bg-slate-50">
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
        <div className="container">
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id ? "border-rose-500 text-rose-700" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                data-testid={`tab-${tab.id}`}
              >
                <tab.icon className="w-3.5 h-3.5" /> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-6">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
            {activeTab === "programs" && <ProgramBanners />}
            {activeTab === "diagnosis" && <ScreeningFlow />}
            {activeTab === "providers" && <ProviderCatalog />}
            {activeTab === "schedule" && <MySchedule />}
            {activeTab === "session" && (
              <SessionHandshake
                sessionNumber={9}
                totalSessions={12}
                providerName="Др. Олена Шевченко"
                role="beneficiary"
              />
            )}
            {activeTab === "calculator" && <CostCalculator />}
            {activeTab === "p2p" && <P2PFundraising />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
