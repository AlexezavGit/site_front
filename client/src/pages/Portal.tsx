import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  Search, Stethoscope, ClipboardCheck, Eye,
  ArrowRight, BarChart3, Globe, ArrowLeftRight, ExternalLink,
  Activity, Brain, FileCheck, Banknote, HandHeart,
  UserCheck, FolderOpen, CalendarCheck, ShieldCheck,
  ClipboardList, FileText, Coins, Building2, Lock,
  LayoutDashboard, Zap,
} from "lucide-react";

const NAVY = "#0F2B46";
const GOLD = "#D4A017";

const gatewayQuestions = [
  {
    id: "beneficiary",
    icon: Search,
    question: "Бажаю анонімно діагностуватися",
    description: "Оцініть свій стан, знайдіть підтримку та запишіться на програму — без обов'язкової реєстрації.",
    cta: "Розпочати діагностику",
    href: "/portal/beneficiary",
    color: "bg-rose-50 border-rose-200",
    badge: "Бенефіціар · Клієнт · Пацієнт",
    badgeColor: "bg-rose-100 text-rose-800",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    btnStyle: { background: "#F43F5E", color: "white", border: "none" },
  },
  {
    id: "provider",
    icon: Stethoscope,
    question: "Маю наміри надавати фахову допомогу",
    description: "Реєстрація фахівця, доступ до програм фінансування, керування клієнтами, звітність та розвиток.",
    cta: "Увійти як фахівець",
    href: "/portal/provider",
    color: "bg-teal-50 border-teal-200",
    badge: "Надавач · Фахівець",
    badgeColor: "bg-teal-100 text-teal-800",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    btnStyle: { background: "#14B8A6", color: "white", border: "none" },
  },
  {
    id: "donor",
    icon: ClipboardCheck,
    question: "Поцікавитись цифровим контролем трансакцій",
    description: "Програми фінансування, моніторинг витрат, верифікований аудит ланцюга допомоги та імпакт-звітність.",
    cta: "Увійти як донор",
    href: "/portal/donor",
    color: "bg-amber-50 border-amber-200",
    badge: "Донор · Меценат · КСВ · Актор",
    badgeColor: "bg-amber-100 text-amber-800",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    btnStyle: { background: GOLD, color: NAVY, border: "none", fontWeight: 600 },
  },
  {
    id: "auditor",
    icon: Eye,
    question: "Аудит та громадський контроль",
    description: "Незалежна верифікація звітів, моніторинг комплаєнсу та прозорість використання гуманітарних ресурсів.",
    cta: "Увійти як аудитор",
    href: "/portal/auditor",
    color: "bg-violet-50 border-violet-200",
    badge: "Аудитор · Супервайзер · Агент",
    badgeColor: "bg-violet-100 text-violet-800",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    btnStyle: { background: "#7C3AED", color: "white", border: "none" },
  },
];

const externalPaths = [
  {
    icon: Globe,
    label: "Дослідити Програму FEEL Again",
    desc: "Повна документація, архітектура рішення та інфографіка для інституційних партнерів.",
    href: "https://program.feelagain.me",
    linkLabel: "program.feelagain.me",
  },
  {
    icon: BarChart3,
    label: "Дані та інсайти",
    desc: "Агрегована аналітика, моніторинг програм та верифіковані результати в реальному часі.",
    href: "https://dashboard-1q7.pages.dev/",
    linkLabel: "dashboard.feelagain.me",
  },
];

// ── Three Paths data ──────────────────────────────────────────────────────────

type LaneStep = {
  icon: React.ElementType;
  title: string;
  desc: string;
};

type Lane = {
  id: string;
  label: string;
  color: string;          // hex accent
  textOnColor: string;    // text color on colored elements
  bgLight: string;        // tailwind bg for step cards
  borderLight: string;    // tailwind border
  badgeBg: string;
  badgeText: string;
  numberBg: string;
  numberText: string;
  steps: LaneStep[];
  ctaText: string;
  ctaHref: string;
};

const lanes: Lane[] = [
  {
    id: "beneficiary",
    label: "Отримувач допомоги",
    color: "#E11D48",
    textOnColor: "white",
    bgLight: "bg-rose-50",
    borderLight: "border-rose-200",
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-700",
    numberBg: "bg-rose-600",
    numberText: "text-white",
    steps: [
      { icon: HandHeart,     title: "Перший контакт",      desc: "Партнер або самозвернення" },
      { icon: Brain,         title: "AI-триаж",             desc: "PHQ-9 / GAD-7 / PCL-5 скринінг" },
      { icon: FolderOpen,    title: "Циркуляційна папка",   desc: "Анонімний кейс у пулі фахівців" },
      { icon: ShieldCheck,   title: "1-й сеанс",            desc: "Верифікація + цифрове рукопожаття" },
      { icon: Activity,      title: "Курс терапії",         desc: "5–20 сеансів за протоколом WHO" },
      { icon: Banknote,      title: "P2P дофінансування",   desc: "5–10% тригер роботодавця / соц. бондів" },
      { icon: UserCheck,     title: "Реінтеграція",         desc: "Повернення до функціонування" },
    ],
    ctaText: "Запустити діагностику або AI-розмову?",
    ctaHref: "/portal/beneficiary",
  },
  {
    id: "provider",
    label: "Надавач допомоги",
    color: "#0D9488",
    textOnColor: "white",
    bgLight: "bg-teal-50",
    borderLight: "border-teal-200",
    badgeBg: "bg-teal-100",
    badgeText: "text-teal-700",
    numberBg: "bg-teal-600",
    numberText: "text-white",
    steps: [
      { icon: FileCheck,      title: "Онбординг",             desc: "W3C Verifiable Credential від МОЗ" },
      { icon: LayoutDashboard,title: "Створення проєкту",     desc: "Стає доступним у кабінеті патрона" },
      { icon: CalendarCheck,  title: "Прийом кейсу",          desc: "Призначення за протоколом та навантаженням" },
      { icon: ShieldCheck,    title: "Сеанс · рукопожаття",   desc: "Start/stop, GPS, AI-асистент" },
      { icon: ClipboardList,  title: "Клінічні шкали",        desc: "PROM + супервізорська валідація" },
      { icon: FileText,       title: "Автоматичний звіт",     desc: "FHIR → Trembita → ЄСОЗ" },
      { icon: Coins,          title: "Зарахування",           desc: "Ескроу-реліз після Triple Verification" },
    ],
    ctaText: "Запустити онбординг фахівця?",
    ctaHref: "/portal/provider",
  },
  {
    id: "donor",
    label: "Патрон",
    color: "#D4A017",
    textOnColor: NAVY,
    bgLight: "bg-amber-50",
    borderLight: "border-amber-200",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
    numberBg: "bg-amber-500",
    numberText: "text-white",
    steps: [
      { icon: Building2,      title: "Створення програми",    desc: "Протокол, регіон, KPI, смарт-контракт" },
      { icon: Lock,           title: "Резервування ескроу",   desc: "ISO 20022 pain.001" },
      { icon: Globe,          title: "Відображення",          desc: "Програма доступна для матчингу" },
      { icon: Zap,            title: "Тригер за критерієм",   desc: "Напр. «30% для ветеранів»" },
      { icon: ShieldCheck,    title: "Підтверджений outcome", desc: "FHIR PROM → ескроу-реліз" },
      { icon: FileText,       title: "Автоматична звітність", desc: "Кожна сесія тегована «Funded by [Patron]»" },
      { icon: BarChart3,      title: "ESG / CSR звіт",        desc: "White-label dashboard для корпорацій" },
    ],
    ctaText: "Запустити протокол програми фінансування?",
    ctaHref: "/portal/donor",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function StepCard({
  step,
  index,
  lane,
  isLast,
}: {
  step: LaneStep;
  index: number;
  lane: Lane;
  isLast: boolean;
}) {
  const Icon = step.icon;
  return (
    <div className="relative flex gap-3">
      {/* vertical dashed connector */}
      {!isLast && (
        <div
          className="absolute left-[18px] top-10 bottom-0 w-px"
          style={{ borderLeft: `2px dashed ${lane.color}40`, zIndex: 0 }}
        />
      )}
      {/* number circle */}
      <div
        className={`relative z-10 flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${lane.numberBg} ${lane.numberText}`}
        style={{ boxShadow: `0 0 0 3px ${lane.color}20` }}
      >
        {index + 1}
      </div>
      {/* card body */}
      <div className={`flex-1 mb-3 rounded-xl border ${lane.borderLight} ${lane.bgLight} px-3 py-2.5`}>
        <div className="flex items-center gap-2 mb-0.5">
          <Icon className="w-4 h-4 flex-shrink-0" style={{ color: lane.color }} />
          <span className="font-semibold text-sm leading-tight" style={{ color: NAVY }}>
            {step.title}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-snug pl-6">{step.desc}</p>
      </div>
    </div>
  );
}

function LaneColumn({ lane }: { lane: Lane }) {
  return (
    <div className="flex flex-col">
      {/* Lane header */}
      <div
        className="rounded-xl px-4 py-3 mb-5 text-center font-bold text-sm tracking-wide"
        style={{ background: lane.color, color: lane.textOnColor }}
      >
        {lane.label}
      </div>

      {/* Steps */}
      <div className="flex flex-col flex-1">
        {lane.steps.map((step, i) => (
          <StepCard
            key={i}
            step={step}
            index={i}
            lane={lane}
            isLast={i === lane.steps.length - 1}
          />
        ))}
      </div>

      {/* CTA */}
      <div
        className={`mt-4 rounded-xl border-2 ${lane.borderLight} ${lane.bgLight} px-4 py-3 text-center`}
      >
        <p className="text-xs font-medium mb-2" style={{ color: lane.color }}>
          {lane.ctaText}
        </p>
        <Link href={lane.ctaHref}>
          <button
            className="w-full py-2 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-opacity hover:opacity-90"
            style={{ background: lane.color, color: lane.textOnColor }}
          >
            Перейти <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>
    </div>
  );
}

function TripleVerificationBadge() {
  return (
    <div
      className="mx-auto my-1 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-md w-fit"
      style={{
        background: `linear-gradient(135deg, #0F2B46 0%, #1e4060 100%)`,
        color: GOLD,
        border: `1.5px solid ${GOLD}40`,
      }}
    >
      <Zap className="w-3.5 h-3.5" style={{ color: GOLD }} />
      Triple Verification Oracle
    </div>
  );
}

// ── Three Paths Section ───────────────────────────────────────────────────────

function ThreePathsSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <Badge className="mb-3 bg-white border border-slate-200 text-slate-600 text-xs">
            Інтерактивна карта шляху
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: NAVY }}>
            Три шляхи —{" "}
            <span style={{ color: GOLD }}>Один цифровий міст</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Оберіть роль та побачте кожен крок шляху
          </p>
        </motion.div>

        {/* ── MOBILE: tabbed accordion ── */}
        <div className="lg:hidden">
          {/* Tab buttons */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {lanes.map((lane, i) => (
              <button
                key={lane.id}
                onClick={() => setActiveTab(i)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all border"
                style={
                  activeTab === i
                    ? { background: lane.color, color: lane.textOnColor, borderColor: lane.color }
                    : { background: "white", color: "#64748b", borderColor: "#e2e8f0" }
                }
              >
                {lane.label}
              </button>
            ))}
          </div>

          {/* Animated panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22 }}
            >
              <LaneColumn lane={lanes[activeTab]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── DESKTOP: 3 columns ── */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 relative">
          {lanes.map((lane, laneIdx) => (
            <motion.div
              key={lane.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: laneIdx * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Vertical divider between lanes */}
              {laneIdx < lanes.length - 1 && (
                <div className="absolute top-0 -right-3 w-px h-full bg-slate-200 z-0" />
              )}

              {/* Inject Triple Verification badge between step 3 and 4 (after step index 3) */}
              <div className="flex flex-col">
                {/* Lane header */}
                <div
                  className="rounded-xl px-4 py-3 mb-5 text-center font-bold text-sm tracking-wide"
                  style={{ background: lane.color, color: lane.textOnColor }}
                >
                  {lane.label}
                </div>

                {/* Steps with badge injected after step 3 (index 3) */}
                {lane.steps.map((step, i) => (
                  <div key={i}>
                    <StepCard
                      step={step}
                      index={i}
                      lane={lane}
                      isLast={i === lane.steps.length - 1}
                    />
                    {/* Show badge only in center column (provider) after step 3 */}
                    {laneIdx === 1 && i === 3 && (
                      <div className="my-1">
                        <TripleVerificationBadge />
                      </div>
                    )}
                  </div>
                ))}

                {/* CTA */}
                <div
                  className={`mt-4 rounded-xl border-2 ${lane.borderLight} ${lane.bgLight} px-4 py-3 text-center`}
                >
                  <p className="text-xs font-medium mb-2" style={{ color: lane.color }}>
                    {lane.ctaText}
                  </p>
                  <Link href={lane.ctaHref}>
                    <button
                      className="w-full py-2 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-opacity hover:opacity-90"
                      style={{ background: lane.color, color: lane.textOnColor }}
                    >
                      Перейти <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function Portal() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-20 text-white" style={{ background: `linear-gradient(135deg, #091d30 0%, ${NAVY} 60%, #162944 100%)` }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">Кабінети FEEL Again</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-5">
              Оберіть свій <span style={{ color: GOLD }}>шлях</span>
            </h1>
            <p className="text-lg mb-6" style={{ color: "rgba(255,255,255,0.70)" }}>
              Чотири ролі — єдина цифрова інфраструктура. Кожен шлях веде до персоналізованого кабінету.
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.40)" }}>
              Вже маєте обліковий запис? Увійдіть до свого кабінету нижче.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4 Gateway cards */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {gatewayQuestions.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card className={`h-full border-2 ${item.color} transition-all duration-300 ${hoveredCard === item.id ? "shadow-xl -translate-y-1" : ""}`}>
                  <CardContent className="pt-6 flex flex-col h-full">
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`p-2.5 rounded-xl ${item.iconBg} ${item.iconColor} shrink-0`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <Badge className={`${item.badgeColor} text-[10px] leading-tight`}>{item.badge}</Badge>
                    </div>
                    <h3 className="text-lg font-bold mb-2 leading-snug">{item.question}</h3>
                    <p className="text-sm text-muted-foreground mb-6 flex-1">{item.description}</p>
                    <Link href={item.href}>
                      <button className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-opacity hover:opacity-90" style={item.btnStyle}>
                        {item.cta} <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Three Paths Quest Map ── */}
      <ThreePathsSection />

      {/* Додаткові шляхи */}
      <section className="py-8 border-t border-b border-slate-100 bg-slate-50">
        <div className="container">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">Також</p>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {externalPaths.map((path, i) => (
              <a key={i} href={path.href} target="_blank" rel="noopener noreferrer" className="no-underline">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="rounded-xl p-5 flex items-start gap-4 bg-white border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
                >
                  <div className="p-2.5 rounded-lg shrink-0" style={{ background: "rgba(15,43,70,0.06)" }}>
                    <path.icon className="w-5 h-5" style={{ color: NAVY }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm" style={{ color: NAVY }}>{path.label}</span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{path.desc}</p>
                    <span className="text-xs font-mono" style={{ color: GOLD }}>{path.linkLabel}</span>
                  </div>
                </motion.div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Мульти-роль */}
      <section className="py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <ArrowLeftRight className="w-5 h-5" style={{ color: GOLD }} />
              <h3 className="text-base font-semibold">Мульти-роль</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Всередині кабінету можна перемикати ролі. Фахівець може також бути бенефіціаром певної програми,
              а донор — мати супервізорський або аудиторський доступ.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
