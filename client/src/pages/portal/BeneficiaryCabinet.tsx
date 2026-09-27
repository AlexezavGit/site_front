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
  Wallet, Settings, FileText, Bell, Globe, Shield, UserCircle,
  Lock, AlertTriangle, Activity, BarChart2, ClipboardList,
  ChevronDown, ChevronUp, Info, Zap, Award, Layers
} from "lucide-react";
import ScreeningFlow from "@/components/diagnostic/ScreeningFlow";
import SessionHandshake from "@/components/SessionHandshake";

const ROSE = "#E11D48";
const NAVY = "#0F2B46";
const GOLD = "#D4A017";
const BENEFICIARY_ID = 2;

// ─── Canonical Data Constants ─────────────────────────────────────────────────
const TOTAL_NEED = 9_600_000;
const SPECIALIZED_CASES = 3_900_000;
const VPO_NO_HELP_PCT = 74;

// ─── Extended Provider Data ────────────────────────────────────────────────────
const MOCK_PROVIDERS = [
  {
    id: 1,
    name: "Др. Олена Шевченко",
    spec: "EMDR · PTSD · Тривожні розлади",
    tags: ["EMDR", "PCL-5", "PHQ-9"],
    rating: 4.9,
    cases: 47,
    sessions: 284,
    certified: true,
    emdr: true,
    vr: false,
    location: "Київ / Дистанційно",
    format: ["online", "offline"],
    lang: ["uk", "en"],
    level: "L2",
    priceEur: 55,
    priceUah: 1000,
    slots: ["2026-07-14 10:00", "2026-07-16 11:00", "2026-07-21 10:00"],
    certBadges: ["EMDR Certified (Geha Clalit)", "SBT Verified", "mhGAP"],
  },
  {
    id: 2,
    name: "Др. Максим Коваль",
    spec: "CBT · Депресія · Ветеранська психологія",
    tags: ["CBT", "PHQ-9", "GAD-7"],
    rating: 4.7,
    cases: 38,
    sessions: 196,
    certified: true,
    emdr: false,
    vr: true,
    location: "Харків",
    format: ["online"],
    lang: ["uk"],
    level: "L1",
    priceEur: 35,
    priceUah: 640,
    slots: ["2026-07-15 09:00", "2026-07-17 14:00"],
    certBadges: ["VR Bravemind Certified", "SBT Verified"],
  },
  {
    id: 3,
    name: "Др. Світлана Петренко",
    spec: "Гештальт · Сімейна терапія · ВПО",
    tags: ["Гештальт", "PHQ-9"],
    rating: 4.6,
    cases: 32,
    sessions: 158,
    certified: false,
    emdr: false,
    vr: false,
    location: "Львів / Дистанційно",
    format: ["online", "offline"],
    lang: ["uk"],
    level: "L1",
    priceEur: 35,
    priceUah: 640,
    slots: ["2026-07-14 15:00", "2026-07-18 10:00"],
    certBadges: ["mhGAP"],
  },
  {
    id: 4,
    name: "Др. Андрій Бондаренко",
    spec: "Психотравма · Криза · Групова терапія",
    tags: ["PCL-5", "PHQ-9", "EMDR"],
    rating: 4.8,
    cases: 55,
    sessions: 341,
    certified: true,
    emdr: true,
    vr: false,
    location: "Одеса",
    format: ["offline"],
    lang: ["uk"],
    level: "L3",
    priceEur: 85,
    priceUah: 1550,
    slots: ["2026-07-19 11:00"],
    certBadges: ["EMDR Certified (Geha Clalit)", "SBT Verified", "mhGAP"],
  },
];

// ─── Session Log ──────────────────────────────────────────────────────────────
const SESSION_LOG = [
  { num: 1,  date: "2026-04-07", type: "Первинна діагностика", phq9: 18, gad7: 15, pcl5: 52, status: "completed" },
  { num: 2,  date: "2026-04-14", type: "EMDR — Фаза 1–2",     phq9: 17, gad7: 14, pcl5: 50, status: "completed" },
  { num: 3,  date: "2026-04-28", type: "EMDR — Фаза 3",       phq9: 15, gad7: 13, pcl5: 46, status: "completed" },
  { num: 4,  date: "2026-05-05", type: "EMDR — Фаза 3–4",     phq9: 14, gad7: 12, pcl5: 43, status: "completed" },
  { num: 5,  date: "2026-05-19", type: "EMDR — Фаза 4",       phq9: 12, gad7: 10, pcl5: 39, status: "completed" },
  { num: 6,  date: "2026-06-02", type: "EMDR — Фаза 5",       phq9: 11, gad7: 9,  pcl5: 36, status: "completed" },
  { num: 7,  date: "2026-06-16", type: "EMDR — Фаза 6",       phq9: 9,  gad7: 8,  pcl5: 32, status: "completed" },
  { num: 8,  date: "2026-06-30", type: "EMDR — Фаза 7",       phq9: 7,  gad7: 6,  pcl5: 28, status: "completed" },
  { num: 9,  date: "2026-07-09", type: "EMDR — Фаза 8",       phq9: null, gad7: null, pcl5: null, status: "upcoming" },
];

const MOCK_PHQ_PROGRESS = [
  { session: 1, phq9: 18, gad7: 15, date: "2026-04-07" },
  { session: 3, phq9: 15, gad7: 13, date: "2026-04-28" },
  { session: 5, phq9: 12, gad7: 10, date: "2026-05-19" },
  { session: 7, phq9: 9,  gad7: 8,  date: "2026-06-16" },
  { session: 8, phq9: 7,  gad7: 6,  date: "2026-06-30" },
];

const MOCK_PAYMENTS = [
  { id: 1,  date: "2026-04-07", desc: "Сеанс #1 — Др. Шевченко",  total: 1000, personal: 300, program: 700, status: "paid" },
  { id: 2,  date: "2026-04-14", desc: "Сеанс #2 — Др. Шевченко",  total: 1000, personal: 300, program: 700, status: "paid" },
  { id: 3,  date: "2026-04-28", desc: "Сеанс #3 — Др. Шевченко",  total: 1000, personal: 300, program: 700, status: "paid" },
  { id: 4,  date: "2026-05-05", desc: "Сеанс #4 — Др. Шевченко",  total: 1000, personal: 300, program: 700, status: "paid" },
  { id: 5,  date: "2026-05-19", desc: "Сеанс #5 — Др. Шевченко",  total: 1000, personal: 300, program: 700, status: "paid" },
  { id: 6,  date: "2026-06-02", desc: "Сеанс #6 — Др. Шевченко",  total: 1000, personal: 300, program: 700, status: "paid" },
  { id: 7,  date: "2026-06-16", desc: "Сеанс #7 — Др. Шевченко",  total: 1000, personal: 300, program: 700, status: "paid" },
  { id: 8,  date: "2026-06-30", desc: "Сеанс #8 — Др. Шевченко",  total: 1000, personal: 300, program: 700, status: "paid" },
  { id: 9,  date: "2026-07-09", desc: "Сеанс #9 — Др. Шевченко",  total: 1000, personal: 300, program: 700, status: "upcoming" },
];

// ─── Journey Steps ─────────────────────────────────────────────────────────────
const JOURNEY_STEPS = [
  { id: 1, label: "Контакт",    en: "Contact",   date: "2026-04-05", done: true  },
  { id: 2, label: "Діагностика", en: "Diagnosis", date: "2026-04-07", done: true  },
  { id: 3, label: "Підбір",     en: "Matching",  date: "2026-04-08", done: true  },
  { id: 4, label: "Терапія",    en: "Therapy",   date: "2026-04-14", done: false, active: true },
  { id: 5, label: "Моніторинг", en: "Follow-up", date: null,         done: false },
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

// ─── Journey Tracker ───────────────────────────────────────────────────────────
function JourneyTracker({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="relative">
      <div className="flex items-start justify-between gap-1">
        {JOURNEY_STEPS.map((step, i) => (
          <div key={step.id} className="flex-1 flex flex-col items-center relative">
            {i < JOURNEY_STEPS.length - 1 && (
              <div className={`absolute top-4 left-1/2 w-full h-0.5 ${step.done ? "bg-rose-400" : "bg-slate-200"}`} style={{ zIndex: 0 }} />
            )}
            <div
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                step.done
                  ? "bg-rose-500 border-rose-500 text-white"
                  : (step as any).active
                  ? "bg-white border-rose-500 text-rose-600 shadow-md shadow-rose-200"
                  : "bg-white border-slate-300 text-slate-400"
              }`}
            >
              {step.done ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{step.id}</span>}
            </div>
            <p className={`text-[10px] font-medium mt-1.5 text-center ${(step as any).active ? "text-rose-700 font-bold" : step.done ? "text-slate-600" : "text-slate-400"}`}>
              {step.label}
            </p>
            {detailed && step.date && (
              <p className="text-[9px] text-muted-foreground text-center">{step.date}</p>
            )}
            {detailed && (step as any).active && (
              <Badge className="mt-1 text-[9px] bg-rose-100 text-rose-700 px-1">Зараз</Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: ДАШБОРД ──────────────────────────────────────────────────────────────
function DashboardTab() {
  const currentSession = 8;
  const totalSessions = 12;
  const progressPct = Math.round((currentSession / totalSessions) * 100);
  const phqIntake = 18;
  const phqCurrent = 7;
  const gad7Intake = 15;
  const gad7Current = 6;
  const daysInProgram = 94;
  const phqImprove = Math.round(((phqIntake - phqCurrent) / phqIntake) * 100);
  const gad7Improve = Math.round(((gad7Intake - gad7Current) / gad7Intake) * 100);

  return (
    <div className="space-y-5">
      {/* Headline + stigma-breaking copy */}
      <div className="rounded-2xl p-5 bg-gradient-to-br from-rose-600 to-rose-800 text-white">
        <h1 className="text-xl font-extrabold mb-1">Ментальний добробут — стрижень відновлення</h1>
        <p className="text-sm text-rose-100 leading-relaxed">
          Отримайте фахову підтримку з гідністю — без черг, без стигми, без зайвих паперів.
        </p>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "PHQ-9 бал", val: `${phqIntake}→${phqCurrent}`, sub: "тенденція ↓", icon: Activity, color: "text-green-600", bg: "bg-green-50" },
          { label: "Сеансів пройдено", val: `${currentSession}/${totalSessions}`, sub: "67% курсу", icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Днів у програмі", val: String(daysInProgram), sub: "з 07.04.2026", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Покриття фондом", val: "70%", sub: "₴700 / сеанс", icon: Wallet, color: "text-amber-600", bg: "bg-amber-50" },
        ].map(item => (
          <Card key={item.label}>
            <CardContent className="pt-4 pb-4 text-center">
              <div className={`w-9 h-9 rounded-full ${item.bg} flex items-center justify-center mx-auto mb-2`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <p className={`text-lg font-bold ${item.color}`}>{item.val}</p>
              <p className="text-[10px] text-muted-foreground">{item.label}</p>
              <p className="text-[10px] text-muted-foreground">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 5-step journey tracker */}
      <Card>
        <CardContent className="pt-4 pb-5">
          <p className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: NAVY }}>Ваш маршрут реабілітації</p>
          <JourneyTracker />
        </CardContent>
      </Card>

      {/* Active program card */}
      <Card className="border-rose-200 bg-gradient-to-br from-rose-50 to-white overflow-hidden">
        <CardContent className="pt-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <Badge className="bg-green-100 text-green-800 mb-2">Активна програма</Badge>
              <h2 className="text-lg font-bold" style={{ color: NAVY }}>Психологічна реабілітація · EMDR</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Др. Олена Шевченко · EMDR-8-12 · WHO first-line PTSD</p>
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
        </CardContent>
      </Card>

      {/* PHQ-9 & GAD-7 progress chart (static bars) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <BarChart2 className="w-4 h-4" style={{ color: ROSE }} />
            Динаміка PHQ-9 та GAD-7 по сеансах
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {MOCK_PHQ_PROGRESS.map((row, i) => (
              <div key={row.session} className="grid grid-cols-[3rem_1fr_1fr_3rem] items-center gap-2">
                <span className="text-xs text-muted-foreground text-right">#{row.session}</span>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-muted-foreground w-14">PHQ-9</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-2">
                      <motion.div className="h-2 rounded-full"
                        style={{ background: ROSE }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(row.phq9 / 27) * 100}%` }}
                        transition={{ duration: 0.6, delay: i * 0.08 }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-muted-foreground w-14">GAD-7</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-2">
                      <motion.div className="h-2 rounded-full bg-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(row.gad7 / 21) * 100}%` }}
                        transition={{ duration: 0.6, delay: i * 0.08 + 0.03 }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground text-right">{row.date.slice(5)}</div>
                <div className="text-xs font-bold text-right" style={{ color: row.phq9 <= 9 ? "#16a34a" : ROSE }}>{row.phq9}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-3 h-2 rounded-full inline-block" style={{ background: ROSE }}></span>PHQ-9 (депресія)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-2 rounded-full bg-blue-500 inline-block"></span>GAD-7 (тривога)</span>
          </div>
        </CardContent>
      </Card>

      {/* "Ви не самі" blurred stats */}
      <Card className="overflow-hidden border-slate-200">
        <CardContent className="pt-5">
          <p className="font-bold text-base mb-1" style={{ color: NAVY }}>Ви не самі</p>
          <p className="text-xs text-muted-foreground mb-4">Масштаб потреби в Україні (WHO SIMH 2024)</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: "9,6 млн", label: "потребують психологічної допомоги", color: "text-rose-700" },
              { val: "3,9 млн", label: "потребують спеціалізованої підтримки", color: "text-amber-700" },
              { val: `${VPO_NO_HELP_PCT}%`, label: "ВПО не отримують допомоги", color: "text-blue-700" },
            ].map(item => (
              <div key={item.label} className="relative rounded-xl bg-slate-50 border p-3 text-center overflow-hidden">
                <div className="blur-[2px] select-none">
                  <p className={`text-2xl font-extrabold ${item.color}`}>{item.val}</p>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className={`text-2xl font-extrabold ${item.color}`}>{item.val}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 px-1 leading-tight text-center">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next session card */}
      <Card className="border-blue-200 bg-blue-50/40">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <CalendarDays className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm" style={{ color: NAVY }}>Наступний сеанс — Сеанс #9</p>
              <p className="text-xs text-muted-foreground">09 липня 2026 · 10:00 · Відеосеанс · EMDR Фаза 8</p>
            </div>
            <Button size="sm" style={{ background: ROSE, color: "white", border: "none" }}>
              <Video className="w-3.5 h-3.5 mr-1" /> Приєднатись
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Crisis contact — always visible */}
      <div className="p-3 rounded-xl border-2 border-red-300 bg-red-50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
          <div>
            <p className="text-sm font-bold text-red-800">Лінія психологічної допомоги: 7525</p>
            <p className="text-xs text-red-600">Цілодобово · Безкоштовно</p>
          </div>
        </div>
        <Badge className="bg-red-600 text-white text-[10px] shrink-0">&lt;5хв SLA</Badge>
      </div>
    </div>
  );
}

// ─── Tab: ДІАГНОСТИКА ──────────────────────────────────────────────────────────
const PCL5_SAMPLE = [
  "Повторювані, мимовільні та нав'язливі спогади про стресову подію",
  "Сильний психологічний стрес при нагадуванні про стресову подію",
  "Уникання зовнішніх нагадувань (людей, місць, розмов, діяльності, об'єктів)",
];
const PHQ9_SAMPLE = [
  "Відсутність інтересу або задоволення від справ, які зазвичай подобались",
  "Відчуття пригніченості, безнадії або туги",
  "Труднощі із засипанням, переривчастий або надмірний сон",
];
const GAD7_SAMPLE = [
  "Відчуття нервозності, тривоги або знаходження на межі нервового зриву",
  "Нездатність припинити або контролювати хвилювання",
  "Роздратованість або дратівливість",
];

type InstrumentId = "pcl5" | "phq9" | "gad7";

interface MiniQuizState {
  answers: number[];
  step: number;
  done: boolean;
  score: number;
}

function DiagnosticsTab() {
  const [expanded, setExpanded] = useState<InstrumentId | null>(null);
  const [quiz, setQuiz] = useState<Record<InstrumentId, MiniQuizState>>({
    pcl5: { answers: [], step: 0, done: false, score: 0 },
    phq9: { answers: [], step: 0, done: false, score: 0 },
    gad7: { answers: [], step: 0, done: false, score: 0 },
  });
  const [showScreening, setShowScreening] = useState(false);

  const LAST_RESULTS = {
    pcl5: { score: 28, label: "Субпорогово", color: "bg-amber-100 text-amber-800", date: "2026-04-07" },
    phq9: { score: 7,  label: "Легка",       color: "bg-yellow-100 text-yellow-800", date: "2026-06-30" },
    gad7: { score: 6,  label: "Легка",       color: "bg-yellow-100 text-yellow-800", date: "2026-06-30" },
  };

  const instruments = [
    {
      id: "pcl5" as InstrumentId,
      name: "PCL-5",
      fullName: "PTSD Checklist for DSM-5",
      measures: "Симптоми ПТСР",
      questions: 17,
      maxScore: 68,
      options: 5,
      optLabels: ["Зовсім ні", "Трохи", "Помірно", "Досить сильно", "Надзвичайно"],
      thresholds: [
        { label: "Субпорогово", range: "<33", color: "text-amber-700" },
        { label: "Ймовірний ПТСР", range: "33–49", color: "text-orange-700" },
        { label: "Тяжкий ПТСР", range: "50+", color: "text-red-700" },
      ],
      sampleQs: PCL5_SAMPLE,
      icon: Shield,
      iconColor: "bg-indigo-500",
    },
    {
      id: "phq9" as InstrumentId,
      name: "PHQ-9",
      fullName: "Patient Health Questionnaire-9",
      measures: "Симптоми депресії",
      questions: 9,
      maxScore: 27,
      options: 4,
      optLabels: ["Жодного разу", "Кілька днів", "Більше половини днів", "Майже щодня"],
      thresholds: [
        { label: "Немає", range: "0–4", color: "text-green-700" },
        { label: "Легка", range: "5–9", color: "text-yellow-700" },
        { label: "Помірна", range: "10–14", color: "text-orange-700" },
        { label: "Тяжка", range: "15–19", color: "text-red-700" },
        { label: "Дуже тяжка", range: "20–27", color: "text-red-900" },
      ],
      sampleQs: PHQ9_SAMPLE,
      icon: Activity,
      iconColor: "bg-blue-500",
    },
    {
      id: "gad7" as InstrumentId,
      name: "GAD-7",
      fullName: "Generalized Anxiety Disorder-7",
      measures: "Симптоми тривоги",
      questions: 7,
      maxScore: 21,
      options: 4,
      optLabels: ["Жодного разу", "Кілька днів", "Більше половини днів", "Майже щодня"],
      thresholds: [
        { label: "Немає", range: "0–4", color: "text-green-700" },
        { label: "Легка", range: "5–9", color: "text-yellow-700" },
        { label: "Помірна", range: "10–14", color: "text-orange-700" },
        { label: "Тяжка", range: "15–21", color: "text-red-700" },
      ],
      sampleQs: GAD7_SAMPLE,
      icon: Heart,
      iconColor: "bg-emerald-500",
    },
  ];

  const handleQuizAnswer = (id: InstrumentId, val: number, totalQs: number) => {
    const current = quiz[id];
    const newAnswers = [...current.answers, val];
    const newStep = current.step + 1;
    if (newStep >= totalQs) {
      const score = newAnswers.reduce((a, b) => a + b, 0);
      setQuiz(q => ({ ...q, [id]: { answers: newAnswers, step: newStep, done: true, score } }));
    } else {
      setQuiz(q => ({ ...q, [id]: { ...current, answers: newAnswers, step: newStep } }));
    }
  };

  const resetQuiz = (id: InstrumentId) => {
    setQuiz(q => ({ ...q, [id]: { answers: [], step: 0, done: false, score: 0 } }));
  };

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200">
        <p className="text-sm font-semibold" style={{ color: NAVY }}>Стандартизовані діагностичні інструменти</p>
        <p className="text-xs text-muted-foreground mt-1">Останнє повне обстеження: <strong>07.04.2026</strong> · Протокол EMDR-8-12 затверджено</p>
      </div>

      {instruments.map(instr => {
        const last = LAST_RESULTS[instr.id];
        const isOpen = expanded === instr.id;
        const q = quiz[instr.id];
        const InstrIcon = instr.icon;

        return (
          <Card key={instr.id} className={isOpen ? "border-indigo-300 shadow-md" : ""}>
            <CardContent className="pt-4 pb-4">
              {/* Header */}
              <button
                className="w-full flex items-center justify-between"
                onClick={() => setExpanded(isOpen ? null : instr.id)}
                data-testid={`expand-${instr.id}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${instr.iconColor}`}>
                    <InstrIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm" style={{ color: NAVY }}>{instr.name}</span>
                      <Badge className={`text-[10px] ${last.color}`}>{last.label}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{instr.fullName} · {instr.measures} · {instr.questions} питань</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xl font-extrabold" style={{ color: NAVY }}>{last.score}<span className="text-xs font-normal text-muted-foreground">/{instr.maxScore}</span></p>
                    <p className="text-[10px] text-muted-foreground">{last.date}</p>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </div>
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mt-4 pt-4 border-t space-y-4">
                      {/* Thresholds */}
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Порогові значення</p>
                        <div className="flex flex-wrap gap-2">
                          {instr.thresholds.map(t => (
                            <span key={t.range} className={`text-xs font-medium px-2 py-1 rounded-full bg-slate-100 ${t.color}`}>
                              {t.range} — {t.label}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Mini inline quiz */}
                      {!q.done ? (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-semibold" style={{ color: NAVY }}>
                              Пройти повторно — питання {q.step + 1} з {instr.sampleQs.length} (3 зразкових)
                            </p>
                            {q.step > 0 && (
                              <button className="text-xs text-muted-foreground hover:text-slate-600" onClick={() => resetQuiz(instr.id)}>↺ Скинути</button>
                            )}
                          </div>
                          <div className="bg-slate-50 rounded-lg p-3 border mb-3">
                            <p className="text-sm text-slate-800 leading-relaxed">
                              <span className="text-muted-foreground mr-1">{q.step + 1}.</span>
                              {instr.sampleQs[q.step]}
                            </p>
                          </div>
                          <div className="space-y-1.5">
                            {instr.optLabels.slice(0, instr.options).map((opt, vi) => (
                              <button
                                key={vi}
                                onClick={() => handleQuizAnswer(instr.id, vi, instr.sampleQs.length)}
                                className="w-full text-left px-3 py-2 rounded-lg border bg-white hover:border-indigo-400 hover:bg-indigo-50 transition-all text-xs flex items-center gap-2"
                                data-testid={`quiz-${instr.id}-q${q.step}-opt${vi}`}
                              >
                                <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-500 shrink-0">{vi}</span>
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-xl p-4 bg-green-50 border border-green-200">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold text-sm text-green-800">Результат (3 питання)</p>
                            <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => resetQuiz(instr.id)}>
                              <RefreshCw className="w-3 h-3 mr-1" /> Знову
                            </Button>
                          </div>
                          <p className="text-3xl font-extrabold text-green-700">{q.score} <span className="text-sm font-normal text-green-600">балів (з {(instr.options - 1) * 3})</span></p>
                          <p className="text-xs text-muted-foreground mt-1">Результат за 3 репрезентативними питаннями. Повне обстеження — у вашого терапевта.</p>
                        </div>
                      )}

                      <Button size="sm" variant="outline" className="w-full border-indigo-300 text-indigo-700"
                        onClick={() => { resetQuiz(instr.id); }}
                        data-testid={`btn-retest-${instr.id}`}
                      >
                        <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Пройти повторно
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        );
      })}

      {/* Full screening flow */}
      <Card className="border-dashed border-2 border-indigo-200 bg-indigo-50/30">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm" style={{ color: NAVY }}>Повний стандартизований скринінг</p>
              <p className="text-xs text-muted-foreground">PHQ-9 + GAD-7 + PCL-5 · ≈10 хв · AI-тріаж</p>
            </div>
            <Button size="sm" style={{ background: "#6366f1", color: "white", border: "none" }}
              onClick={() => setShowScreening(!showScreening)}
              data-testid="btn-full-screening"
            >
              {showScreening ? "Сховати" : "Розпочати"}
            </Button>
          </div>
          <AnimatePresence>
            {showScreening && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4">
                <ScreeningFlow />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tab: ТЕРАПЕВТИ ────────────────────────────────────────────────────────────
function TherapistsTab() {
  const [search, setSearch] = useState("");
  const [emdrFilter, setEmdrFilter] = useState(false);
  const [vrFilter, setVrFilter] = useState(false);
  const [formatFilter, setFormatFilter] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { toast } = useToast();

  const filtered = MOCK_PROVIDERS.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !search || p.name.toLowerCase().includes(q) || p.spec.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
    const matchEmdr = !emdrFilter || p.emdr;
    const matchVr = !vrFilter || p.vr;
    const matchFormat = !formatFilter || p.format.includes(formatFilter);
    return matchSearch && matchEmdr && matchVr && matchFormat;
  });

  const handleBook = (name: string) => {
    toast({ title: "Запит надіслано", description: `Ваш запит до ${name} отримано. Фахівець зв'яжеться протягом 24 год.` });
    setSelectedId(null);
  };

  const LEVEL_COLORS: Record<string, string> = {
    L0: "bg-slate-100 text-slate-700",
    L1: "bg-blue-100 text-blue-700",
    L2: "bg-purple-100 text-purple-700",
    L3: "bg-amber-100 text-amber-800",
  };
  const LEVEL_EUR: Record<string, number> = { L0: 18, L1: 35, L2: 55, L3: 85 };

  return (
    <div className="space-y-4">
      {/* Recommended route card */}
      <Card className="border-2 border-rose-300 bg-gradient-to-br from-rose-50 to-white">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-lg"
              style={{ background: `linear-gradient(135deg, ${ROSE}, ${NAVY})` }}>
              О
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <Badge className="bg-rose-100 text-rose-700 text-[10px]">★ Рекомендований маршрут</Badge>
                <Badge className="bg-green-100 text-green-800 text-[10px]">Сеанс 8 з 12</Badge>
              </div>
              <p className="font-bold text-sm" style={{ color: NAVY }}>Др. Олена Шевченко</p>
              <p className="text-xs text-muted-foreground">EMDR протокол · 70% покриття фондом · L2 — €55/год</p>
              <div className="flex gap-1 mt-2 flex-wrap">
                <Badge className="bg-indigo-100 text-indigo-700 text-[10px]">EMDR Certified (Geha Clalit)</Badge>
                <Badge className="bg-teal-100 text-teal-700 text-[10px]">SBT Verified</Badge>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-2xl font-extrabold" style={{ color: ROSE }}>8/12</p>
              <p className="text-[10px] text-muted-foreground">сеансів</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Пошук за ім'ям, спеціалізацією, містом..." className="pl-9"
            value={search} onChange={e => setSearch(e.target.value)} data-testid="input-therapist-search" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant={emdrFilter ? "default" : "outline"}
            style={emdrFilter ? { background: ROSE, color: "white", border: "none" } : {}}
            onClick={() => setEmdrFilter(!emdrFilter)}
            data-testid="filter-emdr"
          >
            <Shield className="w-3.5 h-3.5 mr-1" /> EMDR
          </Button>
          <Button size="sm" variant={vrFilter ? "default" : "outline"}
            style={vrFilter ? { background: NAVY, color: "white", border: "none" } : {}}
            onClick={() => setVrFilter(!vrFilter)}
            data-testid="filter-vr"
          >
            <Zap className="w-3.5 h-3.5 mr-1" /> VR Bravemind
          </Button>
          {[null, "online", "offline"].map(f => (
            <Button key={String(f)} size="sm" variant={formatFilter === f ? "default" : "outline"}
              onClick={() => setFormatFilter(f)}
              style={formatFilter === f ? { background: "#64748b", color: "white", border: "none" } : {}}
              data-testid={`filter-format-${f ?? "all"}`}
            >
              {f === null ? "Всі формати" : f === "online" ? <><Video className="w-3.5 h-3.5 mr-1" />Онлайн</> : <><MapPin className="w-3.5 h-3.5 mr-1" />Офлайн</>}
            </Button>
          ))}
        </div>
      </div>

      {/* Provider cards */}
      <div className="space-y-3">
        {filtered.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card className={`transition-all ${selectedId === p.id ? "border-rose-400 shadow-md" : ""} ${p.id === 1 ? "border-rose-200" : ""}`}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white font-bold"
                      style={{ background: `linear-gradient(135deg, ${ROSE}, ${NAVY})` }}>
                      {p.name.split(" ")[1]?.[0] ?? "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="font-bold text-sm" style={{ color: NAVY }}>{p.name}</span>
                        {p.emdr && <Badge className="bg-indigo-100 text-indigo-700 text-[10px]">EMDR</Badge>}
                        {p.vr && <Badge className="bg-cyan-100 text-cyan-700 text-[10px]">VR</Badge>}
                        <Badge className={`text-[10px] ${LEVEL_COLORS[p.level]}`}>{p.level} €{LEVEL_EUR[p.level]}/год</Badge>
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-amber-700">{p.rating}</span>
                        <span className="text-xs text-muted-foreground">({p.sessions} сеансів)</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{p.spec}</p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {p.tags.map(t => (
                          <span key={t} className="text-[10px] bg-slate-100 text-slate-600 rounded px-1.5 py-0.5">{t}</span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-1.5">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location}</span>
                        {p.format.includes("online") && <span className="flex items-center gap-1 text-blue-600"><Video className="w-3 h-3" />Онлайн</span>}
                        {p.format.includes("offline") && <span className="flex items-center gap-1 text-green-600"><MapPin className="w-3 h-3" />Офлайн</span>}
                      </div>
                    </div>
                  </div>
                  <div className="ml-3 shrink-0">
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
                      <div className="mt-4 pt-4 border-t space-y-3">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-1">Сертифікати</p>
                          <div className="flex flex-wrap gap-1">
                            {p.certBadges.map(b => (
                              <Badge key={b} className="bg-teal-100 text-teal-800 text-[10px]">
                                <BadgeCheck className="w-3 h-3 mr-0.5" />{b}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-1">Найближчі вікна</p>
                          <div className="flex flex-wrap gap-1.5">
                            {p.slots.map(s => (
                              <span key={s} className="text-[11px] bg-green-50 border border-green-200 text-green-700 rounded px-2 py-1">{s}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Button size="sm" style={{ background: ROSE, color: "white", border: "none" }}
                            onClick={() => handleBook(p.name)}
                            data-testid={`button-book-provider-${p.id}`}
                          >
                            <CalendarDays className="w-3.5 h-3.5 mr-1" /> Записатися
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

// ─── Tab: МІЙ КЕЙС ────────────────────────────────────────────────────────────
function MyCaseTab() {
  const { toast } = useToast();

  const handleCrisis = () => {
    toast({ title: "Термінова лінія", description: "Набираємо 7525. Час відповіді <5 хвилин.", variant: "destructive" });
  };

  return (
    <div className="space-y-5">
      {/* Case header */}
      <Card className="border-rose-200 bg-gradient-to-br from-rose-50 to-white">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <Badge className="bg-green-100 text-green-800 mb-1">Активний кейс</Badge>
              <p className="font-extrabold text-lg" style={{ color: NAVY }}>FEEL-2026-00847</p>
              <p className="text-xs text-muted-foreground">Протокол: EMDR-8-12 · WHO first-line PTSD</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Куратор</p>
              <p className="text-sm font-semibold" style={{ color: NAVY }}>Марина Іваненко</p>
              <p className="text-xs text-muted-foreground">mhGAP Supervisor</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { label: "Сеансів", val: "8/12", color: "text-rose-600" },
              { label: "Статус", val: "Активний", color: "text-green-600" },
              { label: "Почато", val: "07.04.26", color: "text-blue-600" },
            ].map(item => (
              <div key={item.label} className="bg-white rounded-lg p-2.5 border">
                <p className={`font-bold text-sm ${item.color}`}>{item.val}</p>
                <p className="text-[10px] text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Journey — detailed */}
      <Card>
        <CardContent className="pt-4 pb-5">
          <p className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: NAVY }}>5-кроковий маршрут</p>
          <JourneyTracker detailed />
        </CardContent>
      </Card>

      {/* Session log */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <ClipboardList className="w-4 h-4" style={{ color: ROSE }} />
            Журнал сеансів
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">#</th>
                  <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">Дата</th>
                  <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">Тип</th>
                  <th className="text-center px-3 py-2 text-xs font-semibold text-muted-foreground">PHQ-9</th>
                  <th className="text-center px-3 py-2 text-xs font-semibold text-muted-foreground">GAD-7</th>
                  <th className="text-center px-3 py-2 text-xs font-semibold text-muted-foreground">Статус</th>
                </tr>
              </thead>
              <tbody>
                {SESSION_LOG.map((s, i) => (
                  <motion.tr key={s.num} className="border-b last:border-0 hover:bg-slate-50/60"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                    <td className="px-3 py-2.5 text-xs font-bold" style={{ color: NAVY }}>{s.num}</td>
                    <td className="px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap">{s.date}</td>
                    <td className="px-3 py-2.5 text-xs whitespace-nowrap">{s.type}</td>
                    <td className="px-3 py-2.5 text-center">
                      {s.phq9 !== null
                        ? <span className="font-mono font-bold text-xs" style={{ color: s.phq9 >= 10 ? ROSE : "#16a34a" }}>{s.phq9}</span>
                        : <span className="text-muted-foreground text-xs">—</span>}
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      {s.gad7 !== null
                        ? <span className="font-mono font-bold text-xs text-blue-600">{s.gad7}</span>
                        : <span className="text-muted-foreground text-xs">—</span>}
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      {s.status === "completed"
                        ? <Badge className="bg-green-100 text-green-800 text-[10px]"><CheckCircle2 className="w-3 h-3 mr-0.5" />Завершено</Badge>
                        : <Badge className="bg-blue-100 text-blue-800 text-[10px]">Заплановано</Badge>}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Locked Handshake explanation */}
      <Card className="border-amber-200 bg-amber-50/30">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start gap-3 mb-3">
            <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm" style={{ color: NAVY }}>Заблокований рукостискання (Locked Handshake)</p>
              <p className="text-xs text-muted-foreground mt-0.5">Механізм верифікації та PforR ескроу</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              "GPS-верифікація старту сеансу (мітка часу + координати)",
              "Зашифровані нотатки фахівця після сеансу",
              "GPS-верифікація завершення + опитування бенефіціара",
              "Автоматичне розблокування ескроу PforR протягом 48 год",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold text-amber-800">{i + 1}</span>
                </div>
                <p className="text-xs text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next session */}
      <Card className="border-blue-200 bg-blue-50/40">
        <CardContent className="pt-4 pb-4">
          <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: NAVY }}>Наступний сеанс</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <Video className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm" style={{ color: NAVY }}>Сеанс #9 — EMDR Фаза 8</p>
              <p className="text-xs text-muted-foreground">09.07.2026 · 10:00 · Відеосеанс · Др. Олена Шевченко</p>
            </div>
            <Button size="sm" style={{ background: ROSE, color: "white", border: "none" }}>
              <Video className="w-3.5 h-3.5 mr-1" /> Приєднатись
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Session handshake */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: NAVY }}>Підтвердження сеансу</p>
        <SessionHandshake
          sessionNumber={9}
          totalSessions={12}
          providerName="Др. Олена Шевченко"
          role="beneficiary"
        />
      </div>

      {/* Crisis contact — always visible */}
      <div className="p-3 rounded-xl border-2 border-red-300 bg-red-50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
          <div>
            <p className="text-sm font-bold text-red-800">Лінія психологічної допомоги: 7525</p>
            <p className="text-xs text-red-600">Цілодобово · Безкоштовно · Ідеація суїциду</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge className="bg-red-600 text-white text-[10px]">&lt;5хв SLA</Badge>
          <Button size="sm" variant="outline" className="border-red-400 text-red-700 text-xs" onClick={handleCrisis}>
            <Phone className="w-3.5 h-3.5 mr-1" /> Зателефонувати
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: ФІНАНСУВАННЯ ─────────────────────────────────────────────────────────
function FundingTab() {
  const { toast } = useToast();

  const totalSessions = 12;
  const sessionCost = 1000;
  const personalPct = 30;
  const programPct = 70;
  const personalPerSession = 300;
  const programPerSession = 700;
  const totalCost = totalSessions * sessionCost;
  const completedSessions = 8;

  const handleRequestCoverage = () => {
    toast({ title: "Запит надіслано куратору", description: "Марина Іваненко отримала ваш запит на додаткове покриття. Відповідь протягом 24 год." });
  };

  const scoringCriteria = [
    { label: "Skin in the Game",         weight: 25, score: 80, detail: "₴300/сеанс особистий внесок", color: "bg-rose-500" },
    { label: "Co-funding Match",          weight: 20, score: 90, detail: "SoftServe Corporate Program", color: "bg-blue-500" },
    { label: "Demographic Multiplier",    weight: 20, score: 95, detail: "ВПО + 2 дітей", color: "bg-purple-500" },
    { label: "Probability of Completion", weight: 20, score: 85, detail: "Стабільне житло", color: "bg-green-500" },
  ];

  const weightedScore = Math.round(
    scoringCriteria.reduce((acc, c) => acc + (c.score * c.weight) / 100, 0)
  );

  const fundingSources = [
    { label: "Корпоративна донорська програма",  pct: 45, amount: 5400, color: "bg-rose-500" },
    { label: "Гуманітарний фонд (OCHA FTS)",      pct: 25, amount: 3000, color: "bg-blue-500" },
    { label: "Особистий внесок",                  pct: 30, amount: 3600, color: "bg-slate-400" },
  ];

  return (
    <div className="space-y-5">
      {/* Program cost breakdown */}
      <Card className="border-rose-200 bg-gradient-to-br from-rose-50 to-white">
        <CardContent className="pt-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Вартість повного курсу</p>
          <p className="text-3xl font-extrabold" style={{ color: NAVY }}>₴{totalCost.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mb-4">{totalSessions} сеансів × ₴{sessionCost} / сеанс</p>
          <div className="flex rounded-full overflow-hidden h-7 mb-3">
            <motion.div className="flex items-center justify-center text-white text-xs font-bold"
              style={{ background: ROSE, width: `${programPct}%` }}
              initial={{ width: 0 }} animate={{ width: `${programPct}%` }} transition={{ duration: 0.9 }}>
              {programPct}% Програма
            </motion.div>
            <motion.div className="flex items-center justify-center text-white text-xs font-bold"
              style={{ background: NAVY, width: `${personalPct}%` }}
              initial={{ width: 0 }} animate={{ width: `${personalPct}%` }} transition={{ duration: 0.9, delay: 0.1 }}>
              {personalPct}% Ви
            </motion.div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-rose-100 rounded-lg p-3 border border-rose-200">
              <p className="text-xs text-muted-foreground">Покриває програма</p>
              <p className="font-bold text-rose-700">₴{programPerSession} / сеанс</p>
              <p className="text-[10px] text-muted-foreground">₴{(programPerSession * totalSessions).toLocaleString()} всього</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 border">
              <p className="text-xs text-muted-foreground">Ваша частка</p>
              <p className="font-bold" style={{ color: NAVY }}>₴{personalPerSession} / сеанс</p>
              <p className="text-[10px] text-muted-foreground">₴{(personalPerSession * totalSessions).toLocaleString()} всього</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Funding source waterfall */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Layers className="w-4 h-4" style={{ color: ROSE }} />
            Джерела фінансування
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {fundingSources.map((src, i) => (
            <div key={src.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">{src.label}</span>
                <span className="font-bold" style={{ color: NAVY }}>₴{src.amount.toLocaleString()} ({src.pct}%)</span>
              </div>
              <div className="bg-slate-100 rounded-full h-3">
                <motion.div className={`h-3 rounded-full ${src.color}`}
                  initial={{ width: 0 }} animate={{ width: `${src.pct}%` }} transition={{ duration: 0.7, delay: i * 0.1 }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Humanitarian Scoring */}
      <Card className="border-indigo-200">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-600" />
            Гуманітарний скоринг кейсу
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {scoringCriteria.map(c => (
            <div key={c.label}>
              <div className="flex justify-between text-xs mb-1">
                <span>
                  <span className="font-semibold text-slate-700">{c.label}</span>
                  <span className="text-muted-foreground ml-2">— {c.detail}</span>
                </span>
                <span className="font-bold text-slate-700">вага {c.weight}% · бал <span style={{ color: NAVY }}>{c.score}/100</span></span>
              </div>
              <div className="bg-slate-100 rounded-full h-2.5">
                <motion.div className={`h-2.5 rounded-full ${c.color}`}
                  initial={{ width: 0 }} animate={{ width: `${c.score}%` }} transition={{ duration: 0.7 }} />
              </div>
            </div>
          ))}
          <div className="mt-3 p-3 rounded-xl border-2 border-indigo-300 bg-indigo-50 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Загальний зважений бал</p>
              <p className="text-3xl font-extrabold text-indigo-700">{weightedScore}<span className="text-sm font-normal">/100</span></p>
            </div>
            <Badge className="bg-indigo-600 text-white text-xs px-3 py-1">Пріоритетний статус</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Payment history */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Wallet className="w-4 h-4" style={{ color: ROSE }} />
            Історія платежів ({completedSessions} оплачених сеансів)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">Дата</th>
                  <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">Опис</th>
                  <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground">Разом</th>
                  <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground">Ваша</th>
                  <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground">Фонд</th>
                  <th className="text-center px-3 py-2 text-xs font-semibold text-muted-foreground">Статус</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_PAYMENTS.map((pay, i) => (
                  <motion.tr key={pay.id} className="border-b last:border-0 hover:bg-slate-50/60"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                    <td className="px-3 py-2 text-xs text-muted-foreground whitespace-nowrap">{pay.date}</td>
                    <td className="px-3 py-2 text-xs font-medium whitespace-nowrap">{pay.desc}</td>
                    <td className="px-3 py-2 text-xs text-right font-mono font-bold">₴{pay.total.toLocaleString()}</td>
                    <td className="px-3 py-2 text-xs text-right font-mono" style={{ color: NAVY }}>₴{pay.personal}</td>
                    <td className="px-3 py-2 text-xs text-right font-mono text-green-700">₴{pay.program}</td>
                    <td className="px-3 py-2 text-center">
                      {pay.status === "paid"
                        ? <Badge className="bg-green-100 text-green-800 text-[10px]">Оплачено</Badge>
                        : <Badge className="bg-amber-100 text-amber-800 text-[10px]">Ескроу</Badge>}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Next session escrow */}
      <Card className="border-amber-200 bg-amber-50/40">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-sm" style={{ color: NAVY }}>Ескроу — Сеанс #9</p>
              <p className="text-xs text-muted-foreground">₴1 000 заблоковано · Розблокується після GPS-верифікації 09.07.2026</p>
            </div>
            <Badge className="bg-amber-100 text-amber-800 text-[10px] shrink-0">PforR</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Request additional coverage */}
      <Button className="w-full" style={{ background: ROSE, color: "white", border: "none" }}
        onClick={handleRequestCoverage}
        data-testid="button-request-coverage"
      >
        <Share2 className="w-4 h-4 mr-2" /> Запросити додаткове покриття
      </Button>
    </div>
  );
}

// ─── Tab: НАЛАШТУВАННЯ ─────────────────────────────────────────────────────────
function SettingsTab() {
  const [sessionReminders, setSessionReminders] = useState(true);
  const [programUpdates, setProgramUpdates] = useState(true);
  const [reportReady, setReportReady] = useState(false);
  const [lang, setLang] = useState<"UA" | "EN">("UA");
  const [shareData, setShareData] = useState(true);
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: "Налаштування збережено", description: "Ваші уподобання оновлено." });
  };

  const handleSuspend = () => {
    setShowSuspendDialog(false);
    toast({ title: "Кейс призупинено", description: "Ваш куратор Марина Іваненко отримала сповіщення.", variant: "destructive" });
  };

  const toggles = [
    { label: "Нагадування про сеанси",   desc: "За 24 год та 1 год до сеансу", val: sessionReminders, set: setSessionReminders, id: "session-reminders" },
    { label: "Оновлення програми",        desc: "Нові можливості та зміни у вашому кейсі", val: programUpdates, set: setProgramUpdates, id: "program-updates" },
    { label: "Звіт готовий",             desc: "Сповіщення коли PHQ-9/GAD-7 звіт сформовано", val: reportReady, set: setReportReady, id: "report-ready" },
  ];

  return (
    <div className="space-y-5 max-w-xl">
      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <UserCircle className="w-4 h-4" style={{ color: ROSE }} />Профіль
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "Ім'я та прізвище",  value: "Олексій Мартиненко" },
            { label: "Email",             value: "o.martynenko@example.com" },
            { label: "Телефон",           value: "+380 50 123 45 67" },
            { label: "Тип бенефіціара",   value: "ВПО · 2 дітей" },
            { label: "Ідентифікатор",     value: "FEEL-2026-00847" },
          ].map(field => (
            <div key={field.label}>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{field.label}</label>
              <div className="mt-1 px-3 py-2 bg-slate-50 rounded-lg border text-sm font-medium" style={{ color: NAVY }}>
                {field.value}
              </div>
            </div>
          ))}
          <p className="text-xs text-muted-foreground">Дані верифіковані через Дія.ID. Для зміни зверніться до куратора.</p>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Bell className="w-4 h-4" style={{ color: ROSE }} />Сповіщення
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {toggles.map(item => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <button
                onClick={() => item.set(!item.val)}
                className={`relative inline-flex h-6 w-11 rounded-full transition-colors focus:outline-none ${item.val ? "bg-rose-500" : "bg-slate-200"}`}
                data-testid={`toggle-${item.id}`}
              >
                <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform mt-0.5 ${item.val ? "translate-x-5 ml-0.5" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Language */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Globe className="w-4 h-4" style={{ color: ROSE }} />Мова інтерфейсу
          </CardTitle>
        </CardHeader>
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
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Shield className="w-4 h-4" style={{ color: ROSE }} />Приватність
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Анонімізовані дані для досліджень</p>
              <p className="text-xs text-muted-foreground">Деперсоніфіковані результати PHQ-9/GAD-7 допомагають поліпшити програму для всіх</p>
            </div>
            <button
              onClick={() => setShareData(!shareData)}
              className={`relative inline-flex h-6 w-11 rounded-full transition-colors focus:outline-none ${shareData ? "bg-rose-500" : "bg-slate-200"}`}
              data-testid="toggle-share-data"
            >
              <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform mt-0.5 ${shareData ? "translate-x-5 ml-0.5" : "translate-x-0.5"}`} />
            </button>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full" style={{ background: ROSE, color: "white", border: "none" }}
        onClick={handleSave} data-testid="button-save-settings">
        Зберегти налаштування
      </Button>

      {/* Danger zone */}
      <Card className="border-red-200">
        <CardContent className="pt-4 pb-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-700 mb-2">Зона небезпеки</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-800">Призупинити кейс</p>
              <p className="text-xs text-muted-foreground">Тимчасово зупинить призначення сеансів та нагадування</p>
            </div>
            <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50"
              onClick={() => setShowSuspendDialog(true)}
              data-testid="button-suspend-case"
            >
              Призупинити
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Suspend confirmation dialog */}
      <AnimatePresence>
        {showSuspendDialog && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 mx-4 max-w-sm w-full"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            >
              <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-center" style={{ color: NAVY }}>Призупинити кейс?</h3>
              <p className="text-xs text-muted-foreground text-center mt-1 mb-5">
                Ваш куратор отримає сповіщення. Наступний заплановий сеанс буде скасовано. Ескроу-кошти збережуться.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowSuspendDialog(false)}>Скасувати</Button>
                <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={handleSuspend} data-testid="button-confirm-suspend">
                  Так, призупинити
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Tabs definition ───────────────────────────────────────────────────────────
const TABS = [
  { id: "dashboard",    label: "Дашборд",      icon: LayoutGrid },
  { id: "diagnostics",  label: "Діагностика",  icon: Activity },
  { id: "therapists",   label: "Терапевти",    icon: Stethoscope },
  { id: "mycase",       label: "Мій кейс",     icon: ClipboardList },
  { id: "funding",      label: "Фінансування", icon: Wallet },
  { id: "settings",     label: "Налаштування", icon: Settings },
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
                <p className="text-xs text-muted-foreground">FEEL-2026-00847 · Олексій Мартиненко</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-rose-100 text-rose-800 text-xs">Активний кейс</Badge>
            {/* Crisis quick access */}
            <a href="tel:7525">
              <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 text-xs hidden sm:flex">
                <Phone className="w-3.5 h-3.5 mr-1" /> 7525
              </Button>
            </a>
          </div>
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
            {activeTab === "dashboard"   && <DashboardTab />}
            {activeTab === "diagnostics" && <DiagnosticsTab />}
            {activeTab === "therapists"  && <TherapistsTab />}
            {activeTab === "mycase"      && <MyCaseTab />}
            {activeTab === "funding"     && <FundingTab />}
            {activeTab === "settings"    && <SettingsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
