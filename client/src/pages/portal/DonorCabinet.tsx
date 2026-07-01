import { useState } from "react";
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
  LayoutGrid, PieChart, Wallet, BadgeCheck, Timer, Trophy
} from "lucide-react";

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
  { id: "calculator", label: "Калькулятор", icon: Calculator },
  { id: "partners", label: "Партнери", icon: Trophy },
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

function Dashboard({ donorType }: { donorType: string }) {
  const kpisByType: Record<string, Array<{ label: string; val: string; sub: string; color: string }>> = {
    patron: [
      { label: "Ваш внесок", val: "€45,000", sub: "Активний", color: "text-rose-600" },
      { label: "Бенефіціарів охоплено", val: "38", sub: "з 40 цільових", color: "text-violet-600" },
      { label: "Сеансів проведено", val: "342", sub: "з верифікацією ДІЯ", color: "text-teal-600" },
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
      { label: "Програм активних", val: "3", sub: "Харків · Київ · Одеса", color: "text-violet-600" },
      { label: "Бенефіціарів охоплено", val: "1,240", sub: "+18% vs Q1", color: "text-teal-600" },
      { label: "Фахівців навчено", val: "47", sub: "Train for Care", color: "text-amber-600" },
      { label: "Donor reporting", val: "auto", sub: "Parametric model", color: "text-emerald-600" },
    ],
    bank: [
      { label: "Портфель ESG", val: "€2.4M", sub: "ЄБРР EU4Business", color: "text-amber-700" },
      { label: "Кредитний ризик", val: "-58%", sub: "ЄБРР гарантія", color: "text-green-600" },
      { label: "BFI-статус", val: "√", sub: "Закон №4465-IX", color: "text-blue-600" },
      { label: "HCR Charter", val: "підписано", sub: "Квітень 2024", color: "text-violet-600" },
    ],
  };

  const kpis = kpisByType[donorType] || kpisByType.patron;

  return (
    <div className="space-y-6">
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
              const maxVal = FUNNEL_STEPS[0].val;
              const pct = Math.round((step.val / maxVal) * 100);
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
    </div>
  );
}

function Programs() {
  const [selected, setSelected] = useState<string | null>(null);

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
      {programs.map((prog) => (
        <Card
          key={prog.id}
          className={`cursor-pointer transition-all ${selected === prog.id ? "ring-2 ring-amber-400 shadow-md" : "hover:shadow-sm"} ${prog.status === "draft" ? "opacity-60" : ""}`}
          onClick={() => setSelected(selected === prog.id ? null : prog.id)}
        >
          <CardContent className="pt-4 pb-4">
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
      ))}

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

function ScoringBoard({ donorType }: { donorType: string }) {
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
    <div className="space-y-4">
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

function ImpactCalculator({ donorType }: { donorType: string }) {
  const [budget, setBudget] = useState(75000);
  const [specialists, setSpecialists] = useState(20);
  const [sessionsPerBeneficiary, setSessionsPerBeneficiary] = useState(12);
  const [beneficiariesPerSpec, setBeneficiariesPerSpec] = useState(5);
  const [matchPct, setMatchPct] = useState(60);
  const [ebrdrPct, setEbrdrPct] = useState(0);

  const totalBeneficiaries = specialists * beneficiariesPerSpec;
  const totalSessions = totalBeneficiaries * sessionsPerBeneficiary;
  const costPerSession = budget / Math.max(totalSessions, 1);
  const matchFunding = (budget * matchPct) / 100;
  const ebrdrGuarantee = (budget * ebrdrPct) / 100;
  const totalLeverage = budget + matchFunding + ebrdrGuarantee;
  const costPerBeneficiary = totalLeverage / Math.max(totalBeneficiaries, 1);
  const socialReturnMultiple = (totalBeneficiaries * 4200) / Math.max(budget, 1);

  const isSIB = donorType === "sib";
  const isBank = donorType === "bank";

  return (
    <div className="space-y-5">
      {isBank && (
        <Card className="border-amber-200 bg-amber-50/40">
          <CardContent className="pt-3 pb-3">
            <p className="text-xs text-amber-800">
              <strong>ЄБРР EU4Business:</strong> Додайте % гарантії нижче — ЄБРР покриває 50–70% кредитного ризику по нових портфелях. Cashback для підприємств-ветеранів: 10–30%.
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Calculator className="w-4 h-4 text-amber-600" />
            {isSIB ? "SIB Outcomes-калькулятор" : "Імпакт-калькулятор"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            {[
              { label: "Ваш внесок (€)", val: budget, set: setBudget, min: 10000, max: 500000, step: 5000, fmt: (v: number) => `€${v.toLocaleString()}` },
              { label: "Фахівців навчається", val: specialists, set: setSpecialists, min: 5, max: 100, step: 5, fmt: (v: number) => `${v} осіб` },
              { label: "Сеансів / бенефіціар", val: sessionsPerBeneficiary, set: setSessionsPerBeneficiary, min: 4, max: 40, step: 2, fmt: (v: number) => `${v} сеансів` },
              { label: "Бенефіціарів / фахівець", val: beneficiariesPerSpec, set: setBeneficiariesPerSpec, min: 1, max: 20, step: 1, fmt: (v: number) => `${v} осіб` },
              { label: "Co-financing match (%)", val: matchPct, set: setMatchPct, min: 0, max: 100, step: 5, fmt: (v: number) => `${v}%` },
              ...(isBank ? [{ label: "ЄБРР гарантія (%)", val: ebrdrPct, set: setEbrdrPct, min: 0, max: 70, step: 5, fmt: (v: number) => `${v}%` }] : []),
            ].map((item) => (
              <div key={item.label}>
                <label className="text-xs font-medium text-slate-700">{item.label}</label>
                <input
                  type="range" min={item.min} max={item.max} step={item.step} value={item.val}
                  onChange={(e) => item.set(Number(e.target.value))}
                  className="w-full accent-amber-600 mt-1"
                />
                <div className="text-sm font-mono text-amber-700 font-semibold">{item.fmt(item.val)}</div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border bg-slate-50 p-4 space-y-2">
            {[
              { label: "Бенефіціарів охоплено", val: totalBeneficiaries.toLocaleString(), bold: false, color: "" },
              { label: "Всього сеансів", val: totalSessions.toLocaleString(), bold: false, color: "" },
              { label: "Вартість сеансу", val: `€${costPerSession.toFixed(0)}`, bold: false, color: "" },
              { label: "Co-financing залучено", val: `€${matchFunding.toLocaleString()}`, bold: false, color: "" },
              ...(isBank ? [{ label: "ЄБРР гарантія", val: `€${ebrdrGuarantee.toLocaleString()}`, bold: false, color: "" }] : []),
              { label: "Загальний леверидж", val: `€${totalLeverage.toLocaleString()}`, bold: true, color: "text-emerald-700" },
              { label: "Вартість / бенефіціар", val: `€${costPerBeneficiary.toFixed(0)}`, bold: false, color: "" },
              { label: "Social Return (SROI)", val: `${socialReturnMultiple.toFixed(1)}×`, bold: true, color: "text-amber-700" },
            ].map((row) => (
              <div key={row.label} className={`flex justify-between text-sm ${row.bold ? `font-bold ${row.color}` : "text-slate-700"}`}>
                <span>{row.label}</span>
                <span className="font-mono">{row.val}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            SROI базується на €4,200 / рік економічного відновлення на одного бенефіціара (WHO Human Capital Model, середнє ЄС). Відмова від відповідальності: розрахунки базуються на середньоринкових ставках ЄС.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function Partners() {
  const partners = [
    {
      rank: 1,
      name: "Інвент Глобал",
      type: "SIB-інвестор",
      contribution: "€2.4M",
      beneficiaries: "12,000",
      badge: "Золотий партнер",
      badgeColor: "bg-amber-100 text-amber-800",
      rankBg: "bg-amber-400",
      esg: "A+",
    },
    {
      rank: 2,
      name: "Укргазбанк / ЄБРР",
      type: "Банк / фонд",
      contribution: "€89M гарантія",
      beneficiaries: "8,500",
      badge: "Срібний партнер",
      badgeColor: "bg-slate-200 text-slate-700",
      rankBg: "bg-slate-400",
      esg: "A",
    },
    {
      rank: 3,
      name: "NGO Open Society",
      type: "Гуманітарний актор",
      contribution: "€1.1M",
      beneficiaries: "5,200",
      badge: "Бронзовий партнер",
      badgeColor: "bg-orange-100 text-orange-800",
      rankBg: "bg-orange-400",
      esg: "A-",
    },
    {
      rank: 4,
      name: "Geha Clalit (Ізраїль)",
      type: "Методологічний партнер",
      contribution: "Pro bono EMDR",
      beneficiaries: "47 фахівців навчено",
      badge: "Train for Care",
      badgeColor: "bg-blue-100 text-blue-800",
      rankBg: "bg-blue-400",
      esg: "—",
    },
    {
      rank: 5,
      name: "USC / Skip Rizzo",
      type: "Методологічний партнер",
      contribution: "VR Bravemind IP",
      beneficiaries: "170+ центрів VA",
      badge: "Train for Care",
      badgeColor: "bg-violet-100 text-violet-800",
      rankBg: "bg-violet-400",
      esg: "—",
    },
  ];

  const donorTypeCards = DONOR_TYPES.map((dt) => {
    const perks: Record<string, string[]> = {
      patron: ["ESG-сертифікат донора", "Іменна звітність", "Публічна подяка"],
      employer: ["HCR Charter підписання", "ESG-рейтинг від ЄБРР", "Доступ до BFI-статусу", "HR reintegration report"],
      sib: ["Outcomes-верифікований звіт", "ЄБРР ризик-покриття до 70%", "SIB-транш структура", "Exit при 85% completion"],
      humanitarian: ["Donor reporting auto", "Open data Solana-реєстр", "Публічний impact-звіт", "Co-branding"],
      bank: ["ЄБРР EU4Business лінії", "BFI-статус (Закон №4465-IX)", "50-70% гарантія ризику", "Cashback 10-30% ветеранам"],
    };
    return {
      ...dt,
      perks: perks[dt.id] || [],
    };
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Trophy className="w-4 h-4 text-amber-600" />
            Дошка пошани гуманітарних акторів
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {partners.map((p) => (
            <div key={p.rank} className="flex items-center gap-4 p-3 rounded-lg border bg-white hover:bg-slate-50 transition-colors">
              <div className={`w-9 h-9 rounded-full ${p.rankBg} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                {p.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm" style={{ color: NAVY }}>{p.name}</span>
                  <Badge className={`text-xs ${p.badgeColor}`}>{p.badge}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{p.type} · {p.contribution} · {p.beneficiaries}</p>
              </div>
              {p.esg !== "—" && (
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">ESG</p>
                  <p className="text-sm font-bold text-emerald-600">{p.esg}</p>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Що отримує кожен тип донора</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {donorTypeCards.map((dt) => {
              const Icon = dt.icon;
              return (
                <div key={dt.id} className={`rounded-lg p-3 border ${dt.border} ${dt.bg}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-3.5 h-3.5 ${dt.color}`} />
                    <span className={`text-xs font-semibold ${dt.color}`}>{dt.label}</span>
                  </div>
                  <ul className="space-y-1">
                    {dt.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0 text-emerald-500" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function DonorCabinet() {
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
                <p className="text-sm font-semibold" style={{ color: NAVY }}>Кабінет донора</p>
                <p className="text-xs text-muted-foreground">Меценат · Роботодавець · SIB · Актор · Банк · Фонд</p>
              </div>
            </div>
          </div>
          <Badge className="bg-amber-100 text-amber-800 text-xs">Демо-режим</Badge>
        </div>

        <div className="container border-t border-slate-100 py-2">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-xs text-muted-foreground mr-1">Тип донора:</span>
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
            {activeTab === "calculator" && <ImpactCalculator donorType={donorType} />}
            {activeTab === "partners" && <Partners />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
