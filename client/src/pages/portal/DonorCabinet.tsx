import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  ArrowLeft, Heart, TrendingUp, BarChart3, Award, Calculator,
  Users, CheckCircle2, FileText, Activity, Star, Zap,
  Globe, Building2, Banknote, Brain, Shield, ChevronRight,
  AlertCircle, Clock, GraduationCap, Sparkles, Target, ArrowRight,
  LayoutGrid, PieChart, Wallet, BadgeCheck, Timer, Trophy, RefreshCw,
  Lock, Link2, ShieldCheck, Layers, ArrowDown, CheckSquare, Info
} from "lucide-react";

// v5 (DATA_DICTIONARY v5 §4): tariff canonical = €70/гoд (70% нім. бенчмарку) для приватного треку,
// $60 — Train for Care, $31.25 — субсидований. SIB-маржа 3/5/7% від пулу.
// Застарілі: $954M HEAL/THRIVE gap (DEPRECATED §2.3); MHEI legacy 4.12→8.16 (DEPRECATED).
// DonorCabinet підключений до живого /api/sync feed (live?.total_aid_volume).

const GOLD = "#B45309";
const NAVY = "#0F2B46";
const TEAL = "#0D9488";
const AMBER = "#D97706";

const DONOR_TYPES = [
  { id: "patron", label: "Меценат", icon: Heart, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200" },
  { id: "employer", label: "Роботодавець", icon: Building2, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
  { id: "sib", label: "SIB-інвестор", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  { id: "humanitarian", label: "Гум. актор", icon: Globe, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200" },
  { id: "bank", label: "Банк / Фонд", icon: Banknote, color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
];

const TABS = [
  { id: "dashboard", label: "Дашборд", icon: LayoutGrid },
  { id: "programs", label: "Програми", icon: FileText },
  { id: "scoring", label: "Скоринг", icon: BarChart3 },
  { id: "trustbridge", label: "Trust Bridge", icon: ShieldCheck },
  { id: "calculator", label: "Калькулятор", icon: Calculator },
];

const FUNNEL_STEPS = [
  { id: 1, label: "Запити на діагностику", val: 4820, icon: Activity, color: "bg-slate-200", fill: "bg-slate-500" },
  { id: 2, label: "Підтверджені запити", val: 3940, icon: CheckCircle2, color: "bg-blue-100", fill: "bg-blue-400" },
  { id: 3, label: "Верифіковані", val: 3210, icon: BadgeCheck, color: "bg-blue-100", fill: "bg-blue-500" },
  { id: 4, label: "Початі реабілітації", val: 2780, icon: Heart, color: "bg-violet-100", fill: "bg-violet-500" },
  { id: 5, label: "Позиції у скорингу", val: 2650, icon: Star, color: "bg-amber-100", fill: "bg-amber-500" },
  { id: 6, label: "Погоджені фінансування", val: 2340, icon: Wallet, color: "bg-emerald-100", fill: "bg-emerald-400" },
  { id: 7, label: "Сеанси (ДІЯ-підпис)", val: 21840, icon: Shield, color: "bg-emerald-100", fill: "bg-emerald-500" },
  { id: 8, label: "Звітні записи фахівця", val: 21180, icon: FileText, color: "bg-teal-100", fill: "bg-teal-500" },
  { id: 9, label: "Звіти донорам", val: 2280, icon: BarChart3, color: "bg-teal-100", fill: "bg-teal-600" },
  { id: 10, label: "Завершені реабілітації", val: 1940, icon: Trophy, color: "bg-green-100", fill: "bg-green-500" },
  { id: 11, label: "Вихід на робоче місце", val: 1210, icon: Building2, color: "bg-green-100", fill: "bg-green-600" },
  { id: 12, label: "Профілактика 1-3-6міс", val: 870, icon: Timer, color: "bg-lime-100", fill: "bg-lime-600" },
];

const TRANSACTION_DNA = [
  { date: "2025-06-10", benefId: "BNF-7A3F", providerId: "PRV-C91D", amount: "€550", hash: "a1b2c3d4", status: "✓ Verified" },
  { date: "2025-06-08", benefId: "BNF-2E8B", providerId: "PRV-F44A", amount: "€550", hash: "e5f6a7b8", status: "✓ Verified" },
  { date: "2025-06-05", benefId: "BNF-9D1C", providerId: "PRV-B22E", amount: "€385", hash: "c9d0e1f2", status: "✓ Verified" },
];

interface LiveMetrics {
  humanitarian_composite_index: number;
  total_beneficiaries_served: number;
  organizations_using_stream: number;
  total_aid_volume: number;
  feel_again: { active_beneficiaries: number };
  blockchain_verifications: number;
  real_time_transactions: number;
  last_updated: string;
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function Dashboard({ donorType }: { donorType: string }) {
  const { data: live, isLoading } = useQuery<LiveMetrics>({
    queryKey: ["/api/stream/live-metrics"],
    refetchInterval: 30000,
    staleTime: 25000,
  });

  const kpisByType: Record<string, Array<{ label: string; val: string; sub: string; color: string }>> = {
    patron: [
      { label: "Ваш внесок", val: "€45,000", sub: "Активний", color: "text-rose-600" },
      { label: "Бенефіціарів охоплено", val: live?.total_beneficiaries_served?.toLocaleString() ?? "38", sub: "з 40 цільових", color: "text-violet-600" },
      { label: "Сеансів проведено", val: live?.feel_again?.active_beneficiaries?.toLocaleString() ?? "342", sub: "з верифікацією ДІЯ", color: "text-teal-600" },
      { label: "ESG-рейтинг", val: "A+", sub: "Platinum donor", color: "text-amber-600" },
    ],
    employer: [
      { label: "Співробітники в програмі", val: "23", sub: "з 200 в компанії", color: "text-blue-600" },
      { label: "Повернулись на роботу", val: "18", sub: "78% return rate", color: "text-green-600" },
      { label: "Збережено л/г", val: "~€180K", sub: "vs. заміна персоналу", color: "text-emerald-600" },
      { label: "HCR Charter", val: "✓", sub: "38 банків-підписантів", color: "text-amber-600" },
    ],
    sib: [
      { label: "Вкладено (SIB)", val: "€120,000", sub: "Транш 1 з 3", color: "text-emerald-600" },
      { label: "Outcomes верифіковано", val: "74%", sub: "Ціль 70%", color: "text-green-600" },
      { label: "Очікуваний ROI", val: "2.3×", sub: "при 85% completion", color: "text-teal-600" },
      { label: "ЄБРР гарантія", val: "60%", sub: "ризик-покриття", color: "text-blue-600" },
    ],
    humanitarian: [
      { label: "Програм активних", val: live?.organizations_using_stream?.toString() ?? "3", sub: "Харків · Київ · Одеса", color: "text-violet-600" },
      { label: "Бенефіціарів охоплено", val: live?.total_beneficiaries_served?.toLocaleString() ?? "1,240", sub: "+18% vs Q1", color: "text-teal-600" },
      { label: "Фахівців навчено", val: "47", sub: "Train for Care", color: "text-amber-600" },
      { label: "Donor reporting", val: "auto", sub: "Parametric model", color: "text-emerald-600" },
    ],
    bank: [
      { label: "Портфель ESG", val: live?.total_aid_volume ? `€${(live.total_aid_volume / 1e6).toFixed(1)}M` : "€2.4M", sub: "ЄБРР EU4Business", color: "text-amber-700" },
      { label: "Кредитний ризик", val: "-58%", sub: "ЄБРР гарантія", color: "text-green-600" },
      { label: "BFI-статус", val: "√", sub: "Закон №4465-IX", color: "text-blue-600" },
      { label: "HCR Charter", val: "підписано", sub: "Квітень 2024", color: "text-violet-600" },
    ],
  };

  const kpis = kpisByType[donorType] || kpisByType.patron;

  return (
    <div className="space-y-6">
      {/* Anti-mistrust headline */}
      <div className="rounded-xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 shrink-0 mt-0.5" style={{ color: GOLD }} />
          <div>
            <p className="text-base font-bold leading-snug" style={{ color: NAVY }}>
              Цифровий контроль кожної транзакції — від вашого рахунку до кінцевого одержувача.
            </p>
            <p className="text-xs mt-1.5 text-amber-800 leading-relaxed">
              Не фонд, не посередник — цифрова VISA для MHPSS. Кожна гривня верифікована через Locked Handshake + Solana-реєстр + Bank ID до конкретного результату.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {["Locked Handshake", "Solana-реєстр", "Bank ID", "ДІЯ.ID", "PforR escrow"].map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-medium border border-amber-200">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground" data-testid="live-metrics-loading">
          <RefreshCw className="w-3 h-3 animate-spin" /> Оновлення живих метрик...
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <Card key={i} className="border-0 shadow-sm">
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-muted-foreground mb-1">{k.label}</p>
              <p className={`text-2xl font-bold font-mono ${k.color}`}>{k.val}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{k.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Activity className="w-4 h-4 text-teal-600" />
            Параметрична модель — 12 контрольних точок
            <Badge className="ml-auto bg-teal-50 text-teal-700 text-xs font-normal">Реальний час</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {FUNNEL_STEPS.map((step, i) => {
              const maxVal = Math.max(...FUNNEL_STEPS.map((s) => s.val));
              const pct = Math.min(100, Math.round((step.val / maxVal) * 100));
              return (
                <div key={step.id} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-4 shrink-0 text-right">{step.id}</span>
                  <span className="text-xs w-44 shrink-0 text-slate-700">{step.label}</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${step.fill}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, delay: i * 0.04 }}
                    />
                  </div>
                  <span className="text-xs font-mono w-14 text-right text-slate-600">
                    {step.val.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-3 border-t pt-3">
            Кожен крок верифікується через ДІЯ · Solana-реєстр (Qouroom GB) · Bank ID. Мінімальна група: 1 бенефіціар.
          </p>
        </CardContent>
      </Card>

      {/* Transaction DNA */}
      <Card className="border-slate-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Link2 className="w-4 h-4" style={{ color: GOLD }} />
            Transaction DNA — останні 3 транзакції
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-left pb-2 font-medium">Дата</th>
                  <th className="text-left pb-2 font-medium">Бенефіціар</th>
                  <th className="text-left pb-2 font-medium">Провайдер</th>
                  <th className="text-right pb-2 font-medium">Сума</th>
                  <th className="text-right pb-2 font-medium">Solana hash</th>
                  <th className="text-right pb-2 font-medium">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TRANSACTION_DNA.map((tx, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 font-mono text-slate-600">{tx.date}</td>
                    <td className="py-2.5 font-mono text-slate-700">{tx.benefId}</td>
                    <td className="py-2.5 font-mono text-slate-700">{tx.providerId}</td>
                    <td className="py-2.5 text-right font-mono font-semibold text-emerald-700">{tx.amount}</td>
                    <td className="py-2.5 text-right font-mono text-slate-500">{tx.hash}…</td>
                    <td className="py-2.5 text-right">
                      <span className="text-emerald-600 font-medium">{tx.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Всі транзакції публічні у Solana-реєстрі. ID бенефіціарів та провайдерів анонімізовані відповідно до GDPR / Закону №2297-VIII.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── PROGRAMS ────────────────────────────────────────────────────────────────
const FUNDING_MODES = [
  { id: "manual", label: "Ручний", desc: "Патрон переглядає кожну заявку бенефіціара → затверджує/відхиляє вручну", color: "text-blue-700 bg-blue-50 border-blue-200" },
  { id: "auto", label: "Авто", desc: "Система авто-матчить в межах ваших скорингових ваг → кошти вивільняються автоматично", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { id: "god", label: "God Mode", desc: "Повна довіра алгоритму + супервайзерам. Патрон отримує звіт раз на місяць", color: "text-violet-700 bg-violet-50 border-violet-200" },
];

const SCORING_WEIGHTS = [
  { label: "Skin in the Game", pct: 25, color: "bg-amber-500" },
  { label: "Co-funding Match", pct: 20, color: "bg-blue-500" },
  { label: "Demographic Multiplier", pct: 20, color: "bg-violet-500" },
  { label: "Probability of Completion", pct: 20, color: "bg-emerald-500" },
  { label: "Geography Focus", pct: 15, color: "bg-teal-500" },
];

function Programs() {
  const [selected, setSelected] = useState<string | null>(null);
  const [fundingModes, setFundingModes] = useState<Record<string, string>>({});

  const programs = [
    {
      id: "t4c",
      name: "Train for Care",
      tag: "Флагман",
      tagColor: "bg-amber-100 text-amber-800",
      budget: "€75,605",
      cohort: "20 фахівців",
      effect: "Потрійний гуманітарний ефект",
      methods: ["EMDR", "VR Bravemind"],
      partners: ["Geha Clalit (Ізраїль)", "Skip Rizzo / USC (США)"],
      status: "active",
      details: {
        headline: "Підвищення кваліфікації в обмін на безоплатні години терапії",
        subtitle: "Гуманітарних бюджетів — у ресурси сталого розвитку",
        emdr: "Золотий стандарт ПТСР. Партнер: Geha Clalit. 80 років практики. Ефективний для підлітків — не потребує вербалізації травми.",
        vr: "Bravemind / Exposure VR (USC). 170+ центрів VA (США). Гейміфікована діагностика UCLA PTSD-RI. Безпечне середовище для соціальних навичок.",
        quote: "Від американських воїнів — українським побратимам",
        impact: ["Сталий розвиток", "Ефективна філантропія", "Реабілітація"],
        university: "Центр передового досвіду — Університет Шевченка",
        cycle: "Контент цифровано для дистанційного інтерактивного навчання. Локальні практики визначаються через Centers of Excellence.",
      },
    },
    {
      id: "vr-kharkiv",
      name: "VR Bravemind — Ветерани Харкова",
      tag: "Планується",
      tagColor: "bg-slate-100 text-slate-600",
      budget: "€12.50/сеанс",
      cohort: "40 бенефіціарів",
      effect: "Gamified PTSD-RI діагностика",
      methods: ["VR Bravemind"],
      partners: ["Skip Rizzo / USC"],
      status: "draft",
    },
    {
      id: "sib-kyiv",
      name: "SIB Київ — Ветеранська психологія",
      tag: "SIB-структура",
      tagColor: "bg-emerald-100 text-emerald-800",
      budget: "€180,000",
      cohort: "120 ветеранів",
      effect: "Outcomes-based фінансування",
      methods: ["CBT", "EMDR", "mhGAP"],
      partners: ["ЄБРР", "Локальний фонд"],
      status: "scoring",
    },
  ];

  return (
    <div className="space-y-5">
      {programs.map((prog) => {
        const mode = fundingModes[prog.id] || "auto";
        return (
          <Card
            key={prog.id}
            className={`transition-all ${selected === prog.id ? "ring-2 ring-amber-400 shadow-md" : "hover:shadow-sm"} ${prog.status === "draft" ? "opacity-60" : ""}`}
          >
            <CardContent className="pt-4 pb-4">
              <div
                className="cursor-pointer"
                onClick={() => setSelected(selected === prog.id ? null : prog.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm" style={{ color: NAVY }}>{prog.name}</span>
                      <Badge className={`text-xs ${prog.tagColor}`}>{prog.tag}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{prog.budget} · {prog.cohort}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${selected === prog.id ? "rotate-90" : ""}`} />
                </div>

                <div className="flex items-center gap-2 flex-wrap mb-2">
                  {prog.methods.map((m) => (
                    <Badge key={m} variant="outline" className="text-xs">{m}</Badge>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-xs text-teal-700">
                  <Sparkles className="w-3 h-3" />
                  <span>{prog.effect}</span>
                </div>
              </div>

              {/* Funding mode selector */}
              <div className="mt-4 pt-3 border-t">
                <p className="text-xs font-semibold text-slate-600 mb-2">Режим фінансування:</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {FUNDING_MODES.map((fm) => (
                    <button
                      key={fm.id}
                      onClick={() => setFundingModes((prev) => ({ ...prev, [prog.id]: fm.id }))}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${mode === fm.id ? fm.color : "border-slate-200 text-slate-500 hover:border-slate-300"}`}
                    >
                      {fm.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 italic">
                  {FUNDING_MODES.find((fm) => fm.id === mode)?.desc}
                </p>
              </div>

              {/* Scoring weights visualization */}
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs font-semibold text-slate-600 mb-2">Матриця скорингових ваг:</p>
                <div className="space-y-1.5">
                  {SCORING_WEIGHTS.map((w) => (
                    <div key={w.label} className="flex items-center gap-2">
                      <span className="text-xs text-slate-600 w-44 shrink-0">{w.label}</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${w.color}`} style={{ width: `${w.pct * 4}%` }} />
                      </div>
                      <span className="text-xs font-mono text-slate-500 w-8 text-right">{w.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {selected === prog.id && prog.details && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 pt-4 border-t space-y-4"
                  >
                    <div>
                      <p className="text-sm font-semibold" style={{ color: NAVY }}>{prog.details.headline}</p>
                      <p className="text-xs text-muted-foreground">{prog.details.subtitle}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Brain className="w-3.5 h-3.5 text-blue-600" />
                          <span className="text-xs font-semibold text-blue-800">EMDR</span>
                          <span className="text-xs text-blue-600">· Geha Clalit, Ізраїль</span>
                        </div>
                        <p className="text-xs text-blue-700">{prog.details.emdr}</p>
                      </div>
                      <div className="bg-violet-50 rounded-lg p-3">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Zap className="w-3.5 h-3.5 text-violet-600" />
                          <span className="text-xs font-semibold text-violet-800">VR Bravemind</span>
                          <span className="text-xs text-violet-600">· USC, США</span>
                        </div>
                        <p className="text-xs text-violet-700">{prog.details.vr}</p>
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                      <p className="text-xs italic text-amber-800 font-medium">«{prog.details.quote}»</p>
                      <p className="text-xs text-amber-700 mt-1">Технологія рятувала ветеранів США — тепер служить Україні</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {prog.details.impact.map((eff, i) => {
                        const icons = [TrendingUp, Heart, Shield];
                        const colors = ["text-green-600 bg-green-50", "text-rose-600 bg-rose-50", "text-blue-600 bg-blue-50"];
                        const Icon = icons[i];
                        return (
                          <div key={eff} className={`rounded-lg p-2.5 text-center ${colors[i].split(" ")[1]}`}>
                            <Icon className={`w-4 h-4 mx-auto mb-1 ${colors[i].split(" ")[0]}`} />
                            <p className={`text-xs font-medium ${colors[i].split(" ")[0]}`}>{eff}</p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <GraduationCap className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-500" />
                      <span>{prog.details.university} · {prog.details.cycle}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="text-xs h-8 bg-amber-600 hover:bg-amber-700 text-white">
                        <Wallet className="w-3 h-3 mr-1" /> Інвестувати в програму
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs h-8">
                        <FileText className="w-3 h-3 mr-1" /> Повний пропозал (PDF)
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        );
      })}

      <Card className="border-dashed border-2 border-slate-200 bg-transparent">
        <CardContent className="pt-4 pb-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">Запропонувати програму</p>
          <Button size="sm" variant="outline" className="text-xs">
            <ArrowRight className="w-3 h-3 mr-1" /> Подати пропозицію
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── SCORING / MARKETPLACE ───────────────────────────────────────────────────
const MARKETPLACE_BUNDLES = [
  {
    id: "BDL-0471",
    location: "Харків",
    region: "Харківська обл.",
    group: "veteran",
    groupLabel: "Ветерани",
    groupColor: "bg-blue-100 text-blue-800",
    sessions: 120,
    costPerSession: 55,
    humScore: 91,
    gap: "€4,200",
  },
  {
    id: "BDL-0219",
    location: "Київ",
    region: "Київська обл.",
    group: "woman",
    groupLabel: "Жінки",
    groupColor: "bg-rose-100 text-rose-800",
    sessions: 96,
    costPerSession: 55,
    humScore: 87,
    gap: "€3,080",
  },
  {
    id: "BDL-0583",
    location: "Одеса",
    region: "Одеська обл.",
    group: "child",
    groupLabel: "Діти",
    groupColor: "bg-violet-100 text-violet-800",
    sessions: 80,
    costPerSession: 35,
    humScore: 89,
    gap: "€1,960",
  },
  {
    id: "BDL-0338",
    location: "Запоріжжя",
    region: "Запорізька обл.",
    group: "vpo",
    groupLabel: "ВПО",
    groupColor: "bg-amber-100 text-amber-800",
    sessions: 160,
    costPerSession: 55,
    humScore: 84,
    gap: "€5,500",
  },
  {
    id: "BDL-0124",
    location: "Львів",
    region: "Львівська обл.",
    group: "veteran",
    groupLabel: "Ветерани",
    groupColor: "bg-blue-100 text-blue-800",
    sessions: 200,
    costPerSession: 55,
    humScore: 93,
    gap: "€7,700",
  },
  {
    id: "BDL-0692",
    location: "Дніпро",
    region: "Дніпропетровська обл.",
    group: "woman",
    groupLabel: "Жінки",
    groupColor: "bg-rose-100 text-rose-800",
    sessions: 110,
    costPerSession: 55,
    humScore: 88,
    gap: "€3,850",
  },
];

const GROUP_FILTERS = [
  { id: "all", label: "Всі" },
  { id: "veteran", label: "Ветерани" },
  { id: "woman", label: "Жінки" },
  { id: "child", label: "Діти" },
  { id: "vpo", label: "ВПО" },
];

function ScoringBoard({ donorType }: { donorType: string }) {
  const [groupFilter, setGroupFilter] = useState("all");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastBundle, setToastBundle] = useState("");

  const filteredBundles = groupFilter === "all"
    ? MARKETPLACE_BUNDLES
    : MARKETPLACE_BUNDLES.filter((b) => b.group === groupFilter);

  const handleFund = (id: string) => {
    setToastBundle(id);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  };

  const items = [
    {
      name: "Train for Care — Когорта №20",
      region: "Всеукраїнська",
      score: 94,
      compliance: 100,
      status: "AUTO",
      statusColor: "text-green-600 bg-green-50",
      ai: "Рекомендовано: максимальний пакет. Підтверджені партнери USC + Geha Clalit. Completion rate 90%+.",
    },
    {
      name: "SIB Київ — Ветеранська психологія",
      region: "Київська обл.",
      score: 81,
      compliance: 88,
      status: "REVIEW",
      statusColor: "text-amber-700 bg-amber-50",
      ai: "Потребує верифікації outcome-метрик. ЄБРР ризик-покриття 60%. Рекомендовано: пілотний транш.",
    },
    {
      name: "VR Bravemind — Ветерани Харкова",
      region: "Харківська обл.",
      score: 72,
      compliance: 65,
      status: "PIPELINE",
      statusColor: "text-blue-700 bg-blue-50",
      ai: "Скоринг формується. 3 незакриті compliance-пункти. Очікуваний повний скор через 14 днів.",
    },
    {
      name: "Одеса — Підліткова програма",
      region: "Одеська обл.",
      score: 41,
      compliance: 40,
      status: "LOW",
      statusColor: "text-red-600 bg-red-50",
      ai: "Недостатньо даних. Відсутня верифікація фахівців. Рекомендовано: відкласти до Q3.",
    },
  ];

  const bankInfo = donorType === "bank" && (
    <Card className="border-blue-200 bg-blue-50/50 mb-5">
      <CardContent className="pt-4 pb-4">
        <div className="flex items-start gap-3">
          <Banknote className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">Хартія фінансової інклюзії · ЄБРР + НБУ · Квітень 2024</p>
            <div className="text-xs text-blue-800 space-y-1">
              <p>38 банків-підписантів отримують: гарантії ЄБРР 50–70% кредитного ризику · EU4Business cashback 10–30% · BFI-статус (Закон №4465-IX) · ESG-рейтинг для міжнародних інвесторів</p>
              <p className="font-medium">ПриватБанк €185M · Укргазбанк €89M + €160M ESSF · OTPBank · Кредобанк</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Toast notification */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-700 text-white text-sm px-5 py-3 rounded-xl shadow-lg flex items-center gap-2"
          >
            <CheckSquare className="w-4 h-4" />
            Програму {toastBundle} профінансовано. Кошти заблоковані в ескроу.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Marketplace */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Layers className="w-4 h-4" style={{ color: GOLD }} />
            Маркетплейс проєктів
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Готові бандли бенефіціарів для прямого фінансування. Кошти надходять в ескроу та вивільняються після верифікації Locked Handshake.
          </p>
        </CardHeader>
        <CardContent>
          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {GROUP_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setGroupFilter(f.id)}
                className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${groupFilter === f.id ? "bg-amber-100 text-amber-800 border-amber-300" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredBundles.map((bundle) => {
              const totalCost = bundle.sessions * bundle.costPerSession;
              return (
                <div key={bundle.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-mono text-slate-400">{bundle.id}</p>
                      <p className="text-sm font-semibold" style={{ color: NAVY }}>{bundle.location}</p>
                      <p className="text-xs text-muted-foreground">{bundle.region}</p>
                    </div>
                    <Badge className={`text-xs ${bundle.groupColor}`}>{bundle.groupLabel}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 rounded-lg p-2">
                      <p className="text-muted-foreground">EMDR сеансів</p>
                      <p className="font-mono font-semibold text-slate-700">{bundle.sessions}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2">
                      <p className="text-muted-foreground">Загальна вартість</p>
                      <p className="font-mono font-semibold text-slate-700">€{totalCost.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs">
                      <span className="text-muted-foreground">Humanitarian Score: </span>
                      <span
                        className={`font-bold ${bundle.humScore >= 90 ? "text-emerald-600" : bundle.humScore >= 85 ? "text-amber-600" : "text-slate-600"}`}
                      >
                        {bundle.humScore}/100
                      </span>
                    </div>
                    <div className="text-xs text-right">
                      <span className="text-muted-foreground">Гейп: </span>
                      <span className="font-semibold text-rose-600">{bundle.gap}</span>
                    </div>
                  </div>

                  <div className="bg-slate-100 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-emerald-500"
                      style={{ width: `${bundle.humScore}%` }}
                    />
                  </div>

                  <Button
                    size="sm"
                    className="w-full text-xs h-8 bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={() => handleFund(bundle.id)}
                  >
                    <Wallet className="w-3 h-3 mr-1" /> Фінансувати
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {bankInfo}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <BarChart3 className="w-4 h-4" style={{ color: GOLD }} />
            Скоринг-борд ініціатив
          </CardTitle>
          <div className="grid grid-cols-3 gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500" /> AUTO (&gt;80) — авто-затвердження</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500" /> REVIEW (60–80) — ручний розгляд</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500" /> LOW (&lt;60) — відхилено</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold" style={{ color: NAVY }}>{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.region}</p>
                </div>
                <Badge className={`text-xs ${item.statusColor}`}>{item.status}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Скор</span>
                    <span className="font-mono font-semibold">{item.score}/100</span>
                  </div>
                  <div className="bg-slate-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${item.score >= 80 ? "bg-green-500" : item.score >= 60 ? "bg-amber-500" : "bg-red-400"}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Compliance</span>
                    <span className="font-mono font-semibold">{item.compliance}%</span>
                  </div>
                  <div className="bg-slate-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${item.compliance >= 90 ? "bg-teal-500" : item.compliance >= 70 ? "bg-blue-400" : "bg-orange-400"}`}
                      style={{ width: `${item.compliance}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-slate-50 rounded-lg p-2.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-xs text-slate-700">{item.ai}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── TRUST BRIDGE ─────────────────────────────────────────────────────────────
const SIB_FLOW = [
  { step: 1, label: "Патрон депонує кошти", sub: "Bank ID верифікація · ДІЯ.ID підпис", icon: Wallet, color: "bg-amber-100 text-amber-700 border-amber-300" },
  { step: 2, label: "Ескроу (смарт-контракт)", sub: "Кошти заблоковані на Solana · PforR умови активовані", icon: Lock, color: "bg-blue-100 text-blue-700 border-blue-300" },
  { step: 3, label: "Провайдер проводить сеанс", sub: "GPS-старт/стоп · PCL-5 / PHQ-9 / GAD-7 опитування · звіт фахівця", icon: Brain, color: "bg-violet-100 text-violet-700 border-violet-300" },
  { step: 4, label: "Locked Handshake верифікація", sub: "Підпис бенефіціара + провайдера · Solana хеш · 48h таймаут", icon: ShieldCheck, color: "bg-teal-100 text-teal-700 border-teal-300" },
  { step: 5, label: "PforR вивільнення + Outcome-звіт", sub: "Кошти надходять провайдеру · Патрон отримує верифікований звіт", icon: CheckCircle2, color: "bg-emerald-100 text-emerald-700 border-emerald-300" },
];

const MOCK_SOLANA_LOG = [
  { date: "2025-06-10", sessionId: "SES-A7F2C1", amount: "₴20,350", hash: "4d8e9f1a", status: "Verified" },
  { date: "2025-06-08", sessionId: "SES-B3D9E4", amount: "₴20,350", hash: "2c7b4e8d", status: "Verified" },
  { date: "2025-06-05", sessionId: "SES-C1A6B8", amount: "₴14,245", hash: "9f3a1b5c", status: "Verified" },
];

const FEE_BREAKDOWN = [
  { label: "Platform", pct: "1.0%", color: "bg-amber-500" },
  { label: "Tech", pct: "0.5%", color: "bg-blue-500" },
  { label: "Compliance", pct: "0.5%", color: "bg-violet-500" },
  { label: "Reserve", pct: "0.5%", color: "bg-teal-500" },
  { label: "Dev", pct: "1.0%", color: "bg-slate-400" },
];

function TrustBridge() {
  const [sibAmount, setSibAmount] = useState(500000);
  const completion = 85;
  const roi = 2.3;
  const ebrdCoverage = 0.6;
  const sibYield = Math.round(sibAmount * roi);
  const ebrdCovered = Math.round(sibAmount * ebrdCoverage);
  const netExposure = sibAmount - ebrdCovered;

  const fmtUah = (v: number) => `₴${v.toLocaleString()}`;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-xl border-2 border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50 p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 shrink-0 mt-0.5 text-emerald-700" />
          <div>
            <p className="text-base font-bold" style={{ color: NAVY }}>
              SIB — Social Impact Bond · FEEL Again
            </p>
            <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
              Механізм «платимо за результат» (PforR). ЄБРР покриває 60% ризику. Очікуваний ROI 2.3× при 85% completion. Outcomes підтверджені Locked Handshake + Solana-реєстр.
            </p>
          </div>
          <div className="shrink-0 rounded-lg bg-white border-2 border-emerald-300 px-3 py-2 text-center">
            <p className="text-xs text-emerald-700 font-medium">ЄБРР гарантія</p>
            <p className="text-2xl font-bold font-mono text-emerald-600">60%</p>
            <p className="text-xs text-emerald-600">ризик-покриття</p>
          </div>
        </div>
      </div>

      {/* 5-layer flow diagram */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Layers className="w-4 h-4" style={{ color: GOLD }} />
            5-шаровий потік SIB
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {SIB_FLOW.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.step}>
                  <div className={`flex items-start gap-3 rounded-xl border p-4 ${step.color}`}>
                    <div className="w-8 h-8 rounded-full bg-white border flex items-center justify-center shrink-0 font-bold text-sm" style={{ color: NAVY }}>
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{step.label}</p>
                      <p className="text-xs mt-0.5 opacity-80">{step.sub}</p>
                    </div>
                    <Icon className="w-5 h-5 shrink-0 mt-0.5 opacity-70" />
                  </div>
                  {i < SIB_FLOW.length - 1 && (
                    <div className="flex justify-center my-1">
                      <ArrowDown className="w-4 h-4 text-slate-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* SIB yield calculator */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Calculator className="w-4 h-4 text-amber-600" />
            SIB Yield Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-700">Сума SIB-інвестиції (₴)</label>
            <input
              type="range"
              min={100000}
              max={5000000}
              step={50000}
              value={sibAmount}
              onChange={(e) => setSibAmount(Number(e.target.value))}
              className="w-full accent-amber-600 mt-1"
            />
            <div className="text-lg font-bold font-mono text-amber-700">{fmtUah(sibAmount)}</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Цільове completion", val: `${completion}%`, color: "text-blue-700" },
              { label: "Очікуваний ROI", val: `${roi}×`, color: "text-emerald-700" },
              { label: "Вихід при ROI 2.3×", val: fmtUah(sibYield), color: "text-emerald-600" },
              { label: "Термін", val: "18 місяців", color: "text-slate-700" },
            ].map((item) => (
              <div key={item.label} className="bg-slate-50 rounded-lg p-3 border">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className={`text-base font-bold font-mono ${item.color}`}>{item.val}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <p className="font-semibold text-emerald-800">ЄБРР ризик-структура</p>
                <div className="flex justify-between">
                  <span className="text-emerald-700">ЄБРР покриває:</span>
                  <span className="font-mono font-bold text-emerald-700">{fmtUah(ebrdCovered)} (60%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-700">Ваше нетто-ризик:</span>
                  <span className="font-mono font-bold text-amber-700">{fmtUah(netExposure)} (40%)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction fee breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <PieChart className="w-4 h-4" style={{ color: GOLD }} />
            Комісія: 7% → 3.5% (прогресивне зниження)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2.5 mb-4">
            {FEE_BREAKDOWN.map((fee) => (
              <div key={fee.label} className="flex items-center gap-3">
                <span className="text-xs text-slate-600 w-24 shrink-0">{fee.label}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2">
                  <div className={`h-2 rounded-full ${fee.color}`} style={{ width: `${parseFloat(fee.pct) * 20}%` }} />
                </div>
                <span className="text-xs font-mono font-semibold text-slate-700 w-10 text-right">{fee.pct}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-3 border-t">
            <span className="text-xs font-semibold text-slate-700">Загальна комісія</span>
            <span className="text-sm font-bold font-mono text-amber-700">3.5%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Стартова ставка 7% знижується до 3.5% при масштабуванні. Порівняно: Grand Bargain — localization 1.2% глобально vs 25% цільова; quality funding &lt;12% vs 30% цільова.
          </p>
        </CardContent>
      </Card>

      {/* Blockchain verification log */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Link2 className="w-4 h-4" style={{ color: GOLD }} />
            Solana Blockchain · Верифікаційний журнал
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-left pb-2 font-medium">Дата</th>
                  <th className="text-left pb-2 font-medium">Session ID</th>
                  <th className="text-right pb-2 font-medium">Сума</th>
                  <th className="text-right pb-2 font-medium">Solana hash</th>
                  <th className="text-right pb-2 font-medium">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_SOLANA_LOG.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-2.5 font-mono text-slate-600">{row.date}</td>
                    <td className="py-2.5 font-mono text-slate-700">{row.sessionId}</td>
                    <td className="py-2.5 text-right font-mono font-semibold text-emerald-700">{row.amount}</td>
                    <td className="py-2.5 text-right font-mono text-slate-400">{row.hash}…</td>
                    <td className="py-2.5 text-right">
                      <span className="text-emerald-600 font-medium">✓ {row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3 border-t pt-3">
            Кожен запис незмінний у публічному Solana-реєстрі. Хеш відображено перші 8 символів. Верифікація через Qouroom GB.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── IMPACT CALCULATOR ────────────────────────────────────────────────────────
function ImpactCalculator({ donorType }: { donorType: string }) {
  // Canonical constants
  const TRAINING_GROUP_SIZE = 20;
  const TRAINING_GROUP_COST = 90000;
  const PRO_BONO_HOURS_MIN = 120;
  const PRO_BONO_HOURS_MAX = 140;
  const SESSIONS_PER_BENEFICIARY_INTERNAL = 12;
  const SESSIONS_PER_BENEFICIARY_MARKET = 16;
  const MARKET_HOUR_RATE = 50;
  const MARKET_COURSE_VALUE = SESSIONS_PER_BENEFICIARY_MARKET * MARKET_HOUR_RATE; // €800
  const L2_RATE = 55; // €55/session canonical
  const BRAVEMIND_COMPLETION = 0.9; // 90% completion (BRAVEMIND canonical)
  const ROI_MULTIPLIER = 4.3; // €1 → €4.3 socio-economic return (canonical)

  // Inputs
  const [numBeneficiaries, setNumBeneficiaries] = useState(50);
  const [sessionsPerBeneficiary, setSessionsPerBeneficiary] = useState(10);
  const [budget, setBudget] = useState(75000);
  const [specialists, setSpecialists] = useState(20);
  const [beneficiariesPerSpec, setBeneficiariesPerSpec] = useState(5);
  const [matchPct, setMatchPct] = useState(60);
  const [ebrdrPct, setEbrdrPct] = useState(0);
  const [proBonoHours, setProBonoHours] = useState(130);

  // New canonical outputs
  const totalSessions = numBeneficiaries * sessionsPerBeneficiary;
  const totalCostL2 = totalSessions * L2_RATE;
  const platformFee = totalCostL2 * 0.035;
  const netToProviders = totalCostL2 - platformFee;
  const completingBeneficiaries = Math.round(numBeneficiaries * BRAVEMIND_COMPLETION);
  const projectedGdpImpact = totalCostL2 * ROI_MULTIPLIER;

  // Legacy blended finance
  const totalBeneficiaries = specialists * beneficiariesPerSpec;
  const totalSessionsLegacy = totalBeneficiaries * sessionsPerBeneficiary;
  const costPerSession = budget / Math.max(totalSessionsLegacy, 1);
  const matchFunding = (budget * matchPct) / 100;
  const ebrdrGuarantee = (budget * ebrdrPct) / 100;
  const totalLeverage = budget + matchFunding + ebrdrGuarantee;
  const costPerBeneficiary = totalLeverage / Math.max(totalBeneficiaries, 1);
  const socialReturnMultiple = (totalBeneficiaries * 4200) / Math.max(budget, 1);
  const trainingCost = (specialists / TRAINING_GROUP_SIZE) * TRAINING_GROUP_COST;
  const baseCost = totalBeneficiaries * MARKET_COURSE_VALUE;
  const totalActualCost = baseCost + trainingCost;
  const userContribution = totalActualCost * (matchPct / 100);
  const otherFunding = totalActualCost - userContribution;
  const crowdfunding = otherFunding * 0.10;
  const corporate = otherFunding * 0.25;
  const donorsShare = otherFunding * 0.65;
  const totalMarketValue = totalBeneficiaries * MARKET_COURSE_VALUE;
  const totalEfficiency = userContribution > 0 ? totalMarketValue / userContribution : 0;
  const effectiveCostPerBeneficiary = totalBeneficiaries > 0 ? totalActualCost / totalBeneficiaries : MARKET_COURSE_VALUE;
  const addedBeneficiaries = (specialists / TRAINING_GROUP_SIZE) * ((TRAINING_GROUP_SIZE * proBonoHours) / SESSIONS_PER_BENEFICIARY_INTERNAL);

  const isSIB = donorType === "sib";
  const isBank = donorType === "bank";
  const fmtCurrency = (v: number) => `€${Math.round(v).toLocaleString()}`;

  return (
    <div className="space-y-5">
      {isBank && (
        <Card className="border-amber-200 bg-amber-50/40">
          <CardContent className="pt-3 pb-3">
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong>ЄБРР EU4Business:</strong> Додайте % гарантії нижче — ЄБРР покриває 50–70% кредитного ризику по нових портфелях. Cashback для підприємств-ветеранів: 10–30%.
            </p>
          </CardContent>
        </Card>
      )}

      {/* New canonical calculator */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Calculator className="w-4 h-4 text-amber-600" />
            {isSIB ? "SIB Outcomes-калькулятор" : "Імпакт-калькулятор · L2 ставка €55/сеанс"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-700">Бенефіціарів</label>
              <input
                type="range" min={10} max={500} step={10} value={numBeneficiaries}
                onChange={(e) => setNumBeneficiaries(Number(e.target.value))}
                className="w-full accent-amber-600 mt-1"
              />
              <div className="text-sm font-mono text-amber-700 font-semibold">{numBeneficiaries} осіб</div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-700">Сеансів / бенефіціар</label>
              <input
                type="range" min={4} max={20} step={1} value={sessionsPerBeneficiary}
                onChange={(e) => setSessionsPerBeneficiary(Number(e.target.value))}
                className="w-full accent-amber-600 mt-1"
              />
              <div className="text-sm font-mono text-amber-700 font-semibold">{sessionsPerBeneficiary} сеансів</div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-700">Тип патрона</label>
              <div className="mt-2 text-sm font-semibold capitalize" style={{ color: NAVY }}>
                {DONOR_TYPES.find((d) => d.id === donorType)?.label ?? "Меценат"}
              </div>
            </div>
          </div>

          {/* Comparison: Без FEEL Again vs З FEEL Again */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-4 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-slate-400" />
                <p className="text-sm font-bold text-slate-500">Без FEEL Again</p>
              </div>
              {[
                { label: "Ринкова ставка / сеанс", val: "€80–€120" },
                { label: "Всього сеансів", val: totalSessions.toLocaleString() },
                { label: "Загальна вартість (ринок)", val: `€${(totalSessions * 100).toLocaleString()}` },
                { label: "Комісія посередника", val: "7%–15%" },
                { label: "Верифікація outcome", val: "Відсутня" },
                { label: "Звітність донору", val: "Ручна / рідко" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between text-xs text-slate-600">
                  <span>{row.label}</span>
                  <span className="font-mono text-slate-500">{row.val}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-4 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <p className="text-sm font-bold text-emerald-700">З FEEL Again</p>
              </div>
              {[
                { label: "Ставка L2 / сеанс", val: "€55 (WHO-узгоджено)" },
                { label: "Всього сеансів", val: totalSessions.toLocaleString() },
                { label: "Загальна вартість", val: fmtCurrency(totalCostL2) },
                { label: "Комісія платформи", val: `${fmtCurrency(platformFee)} (3.5%)` },
                { label: "Нетто до провайдерів", val: fmtCurrency(netToProviders) },
                { label: "Завершать програму", val: `${completingBeneficiaries} осіб (${(BRAVEMIND_COMPLETION * 100)}%)` },
              ].map((row) => (
                <div key={row.label} className="flex justify-between text-xs text-emerald-800">
                  <span>{row.label}</span>
                  <span className="font-mono font-semibold">{row.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* GDP impact highlight */}
          <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-900">Прогнозований соціально-економічний ROI</p>
                <p className="text-xs text-amber-700 mt-0.5">€1 вкладено → €4.3 соціально-економічного повернення (OECD conservative)</p>
                <p className="text-3xl font-bold font-mono text-amber-700 mt-2">{fmtCurrency(projectedGdpImpact)}</p>
                <p className="text-xs text-amber-600 mt-0.5">
                  на базі {numBeneficiaries} бенефіціарів · {totalSessions.toLocaleString()} сеансів · ROI 4.3× · реабілітація {completingBeneficiaries} осіб
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legacy blended finance calculator */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Calculator className="w-4 h-4 text-slate-500" />
            Blended Finance · Розширені параметри
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Ваш внесок (€)", val: budget, set: setBudget, min: 10000, max: 500000, step: 5000, fmt: (v: number) => `€${v.toLocaleString()}` },
              { label: "Фахівців навчається", val: specialists, set: setSpecialists, min: 5, max: 100, step: 5, fmt: (v: number) => `${v} осіб` },
              { label: "Бенефіціарів / фахівець", val: beneficiariesPerSpec, set: setBeneficiariesPerSpec, min: 1, max: 20, step: 1, fmt: (v: number) => `${v} осіб` },
              { label: "Co-financing match (%)", val: matchPct, set: setMatchPct, min: 0, max: 100, step: 5, fmt: (v: number) => `${v}%` },
              { label: "Pro bono годин / абітурієнт", val: proBonoHours, set: setProBonoHours, min: 120, max: 140, step: 5, fmt: (v: number) => `${v} год` },
              ...(isBank ? [{ label: "ЄБРР гарантія (%)", val: ebrdrPct, set: setEbrdrPct, min: 0, max: 70, step: 5, fmt: (v: number) => `${v}%` }] : []),
            ].map((item) => (
              <div key={item.label}>
                <label className="text-xs font-medium text-slate-700">{item.label}</label>
                <input
                  type="range" min={item.min} max={item.max} step={item.step} value={item.val}
                  onChange={(e) => item.set(Number(e.target.value))}
                  className="w-full accent-amber-600 mt-1"
                  data-testid={`slider-${item.label.replace(/[€%\s/]/g, '').toLowerCase()}`}
                />
                <div className="text-sm font-mono text-amber-700 font-semibold">{item.fmt(item.val)}</div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border bg-slate-50 p-3 space-y-2">
            {[
              { label: "Бенефіціарів (blended)", val: totalBeneficiaries.toLocaleString(), bold: false, color: "" },
              { label: "Co-financing залучено", val: fmtCurrency(matchFunding), bold: false, color: "" },
              ...(isBank ? [{ label: "ЄБРР гарантія", val: fmtCurrency(ebrdrGuarantee), bold: false, color: "" }] : []),
              { label: "Загальний леверидж", val: fmtCurrency(totalLeverage), bold: true, color: "text-emerald-700" },
              { label: "Вартість / бенефіціар", val: `€${costPerBeneficiary.toFixed(0)}`, bold: false, color: "" },
              { label: "Social Return (SROI)", val: `${socialReturnMultiple.toFixed(1)}×`, bold: true, color: "text-amber-700" },
            ].map((row) => (
              <div key={row.label} className={`flex justify-between text-sm ${row.bold ? `font-bold ${row.color}` : "text-slate-700"}`}>
                <span>{row.label}</span>
                <span className="font-mono">{row.val}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl border p-3 space-y-3" style={{ background: "#0B2422", borderColor: "rgba(62,145,162,0.25)" }}>
            <div className="text-xs uppercase mb-2" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em" }}>Blended Finance · Розподіл ресурсів</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Краудфандінг", val: crowdfunding, color: "#F59E0B" },
                { label: "Корпоративні", val: corporate, color: "#3E91A2" },
                { label: "Донори", val: donorsShare, color: "#00FF66" },
                { label: "Ефективність", val: totalEfficiency, fmt: (v: number) => `${v.toFixed(2)}x`, color: "#F59E0B" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg p-3 text-center" style={{ background: "rgba(0,0,0,0.18)", border: `1px solid ${item.color}33` }}>
                  <div className="text-[10px] uppercase font-bold tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>{item.label}</div>
                  <div className="text-base sm:text-lg font-mono font-bold" style={{ color: item.color }}>
                    {item.fmt ? item.fmt(item.val as number) : fmtCurrency(item.val as number)}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
              <span>Ринкова вартість курсу: {fmtCurrency(MARKET_COURSE_VALUE)}</span>
              <span>Фактична вартість / бенефіціар: €{Math.round(effectiveCostPerBeneficiary).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
              <span>Додано бенефіціарів через тренінг: {Math.round(addedBeneficiaries).toLocaleString()}</span>
              <span>Вартість навчання групи: {fmtCurrency(TRAINING_GROUP_COST)}</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            SROI базується на €4,200 / рік економічного відновлення на одного бенефіціара (WHO Human Capital Model, середнє ЄС).
            L2-ставка €55/сеанс (FEEL Again canonical). Completion rate 90% (BRAVEMIND, VA). ROI 4.3× (OECD, консервативний).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function PatronCabinet() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [donorType, setDonorType] = useState("patron");

  const currentDonor = DONOR_TYPES.find((d) => d.id === donorType)!;
  const DonorIcon = currentDonor.icon;

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
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-100">
                <DonorIcon className="w-4 h-4 text-amber-700" />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: NAVY }}>Кабінет патрона</p>
                <p className="text-xs text-muted-foreground">Меценат · Роботодавець · SIB · Гум. актор · Банк / Фонд</p>
              </div>
            </div>
          </div>
          <Badge className="bg-amber-100 text-amber-800 text-xs">Демо-режим</Badge>
        </div>

        <div className="container border-t border-slate-100 py-2">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-xs text-muted-foreground mr-1">Тип патрона:</span>
            {DONOR_TYPES.map((dt) => {
              const Icon = dt.icon;
              return (
                <button
                  key={dt.id}
                  onClick={() => setDonorType(dt.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all border ${donorType === dt.id ? `${dt.bg} ${dt.color} ${dt.border}` : "border-transparent text-muted-foreground hover:text-foreground"}`}
                  data-testid={`donor-type-${dt.id}`}
                >
                  <Icon className="w-3 h-3" /> {dt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="container">
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id ? "border-amber-500 text-amber-700" : "border-transparent text-muted-foreground hover:text-foreground"}`}
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
          <motion.div
            key={activeTab + donorType}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {activeTab === "dashboard" && <Dashboard donorType={donorType} />}
            {activeTab === "programs" && <Programs />}
            {activeTab === "scoring" && <ScoringBoard donorType={donorType} />}
            {activeTab === "trustbridge" && <TrustBridge />}
            {activeTab === "calculator" && <ImpactCalculator donorType={donorType} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
