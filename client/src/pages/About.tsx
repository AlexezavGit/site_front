import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  ArrowRight, CheckCircle2, AlertTriangle, Shield,
  Layers, GitMerge, Globe, Building2, Cpu, Scale
} from "lucide-react";

const programLayers = [
  { num: "1", icon: Cpu, title: "FinTech", desc: "Блокчейн-верифіковані платежі, ескроу, смарт-кліринг, скоринг донорів", tech: "Solana, PrivatBank API, Monobank API, Stripe" },
  { num: "2", icon: Layers, title: "Digitalization", desc: "Реєстр надавачів, метрування сесій, алгоритми матчингу, чат-бот тріаж", tech: "React/Next.js, Node.js/Express, PostgreSQL, Redis" },
  { num: "3", icon: Shield, title: "Clinical", desc: "Ступенева допомога, VR-терапія (BRAVEMIND), EMDR, валідовані інструменти, супервізія", tech: "BRAVEMIND (USC ICT), Meta Quest 3, TensorFlow.js" },
  { num: "4", icon: TrendingUpIcon, title: "Sustainable Development", desc: "Формалізація надавачів, КСВ (Train for Care), модель державної SaaS-підписки", tech: "ФОП Г3, eHealth API, НСЗУ підписка" },
  { num: "5", icon: Globe, title: "Data & Coordination", desc: "Відкриті дані, звітність mhGAP, синхронізація DHIS2, IATI 2.03, координація донорів", tech: "HL7 FHIR R4, DHIS2, OCHA FTS, IATI" },
  { num: "6", icon: Scale, title: "Regulatory", desc: "Пісочниця НБУ, КМУ 506, інтеграція eHealth, правова рамка комплаєнсу", tech: "OAuth+DS DSTU-4145, BankID NBU, GDPR" },
];

const archLayers = [
  { id: "#1", name: "Потреба → Ідентифікація", desc: "Портал самовизначення", gap: "GAP 6" },
  { id: "#2", name: "Навчання → Рекомендація", desc: "Match на готовність", gap: "GAP 1" },
  { id: "#3", name: "Формалізація → Реєстр", desc: "Цифровий підпис кваліфікацій", gap: "GAP 4" },
  { id: "#4", name: "Вимірювання → Верифікація", desc: "WHO QoL, PCL-5, CORE-OM", gap: "GAP 3" },
  { id: "#5", name: "Платіжна → Результат", desc: "Outcome-based, SDK.finance", gap: "GAP 2" },
  { id: "#6", name: "Інтеграція → Держава", desc: "ESOZ+, budget harmonization", gap: "GAP 5" },
];

const clusters = [
  {
    letter: "A",
    title: "Платформа",
    desc: "Технічна інфраструктура: реєстр, матчинг, платежі, звітність",
    projects: ["Provider Registry", "Session Tracking", "Smart Clearing", "Open Data Dashboard", "Donor Scoring Terminal"],
    color: "border-blue-300 bg-blue-50",
  },
  {
    letter: "B",
    title: "Клініка",
    desc: "Клінічна операційна система: Train for Care, VR-терапія, супервізія",
    projects: ["Train for Care", "VR Clinic (BRAVEMIND)", "Clinical Supervision Network", "Outcomes Measurement"],
    color: "border-green-300 bg-green-50",
  },
  {
    letter: "C",
    title: "Інтеграція",
    desc: "Інтеграції з державою та міжнар. системами: eHealth, DHIS2, IATI",
    projects: ["eHealth API Gateway", "DHIS2 Sync", "IATI Reporting", "NBU Regulatory Sandbox"],
    color: "border-purple-300 bg-purple-50",
  },
];

const whyUkraine = [
  "Верифікована потреба в масштабі: 9.6M у зоні ризику — найвища щільність попиту MHPSS в рамках однієї нац. системи",
  "Закон 4223-IX (15.01.2025) — правова рамка реформи психічного здоров'я вже є",
  "Постанова КМУ №506 (02.05.2025) — нац. інформаційна платформа громадського здоров'я",
  "НБУ СЕП (ISO 20022, SEPA-сумісна) — фінансова інфраструктура вже побудована",
  "Clearly залучила €760K (липень 2025) — доведений інтерес інвесторів до UA digital health",
  "450+ організацій MHPSS — ідеальна лабораторія для валідації моделі глобального масштабу",
];

function TrendingUpIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
}

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container"
        >
          <Badge className="mb-4 bg-slate-100 text-slate-700 border-slate-300">Про програму FEEL Again</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 max-w-3xl">
            Що таке FEEL Again<br />
            <span className="text-primary">(і чим він не є)</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="font-bold text-green-700 text-sm uppercase tracking-wide mb-3 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> ЧИМ Є:
              </h3>
              <ul className="space-y-2">
                {[
                  "Гуманітарна інфраструктура, спроєктована для сталості",
                  "Перша уніфікована цифрова координаційна система MHPSS в Україні",
                  "Фінансові та операційні рейки для сектору",
                  "Trusted Digital Layer для Missing Middle",
                  "Фінансується донорами та державою → структурована для самоокупності",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-red-600 text-sm uppercase tracking-wide mb-3 flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" /> ЧИМ НЕ Є:
              </h3>
              <ul className="space-y-2">
                {[
                  "Не стартап, що шукає венчурний капітал",
                  "Не маркетплейс для психологів",
                  "Не окремий VR-продукт",
                  "Не НУО з грантовим фінансуванням",
                  "Цінність — у системній інфраструктурі, а не в окремій послузі",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 max-w-2xl">
            <p className="text-base font-medium text-primary mb-1">Метафора:</p>
            <p className="text-lg italic">
              «FEEL Again — це <strong>Visa гуманітарного сектору MHPSS</strong>.
              Не надає терапію — надає рейки, якими терапія протікає прозоро, підзвітно та масштабно.»
            </p>
          </div>
        </motion.div>
      </section>

      {/* 6 Program Layers */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-3 text-center">6 шарів програми</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            Стратегічний рівень. 6 розривів → 6 шарів інфраструктури. Кожен шар генерує
            дані для оцінки впливу на людський капітал.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programLayers.map((layer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-sm shrink-0">
                        {layer.num}
                      </div>
                      <div>
                        <h3 className="font-bold text-base">{layer.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{layer.desc}</p>
                    <div className="bg-slate-50 rounded-lg p-2 text-xs font-mono text-slate-600">
                      {layer.tech}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Architecture Layers */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-3 text-center">6 → 6 Архітектура розривів</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            Технічний рівень. Кожен шар відповідає конкретному системному розриву.
          </p>
          <div className="max-w-2xl mx-auto space-y-3">
            {archLayers.map((layer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 bg-white border rounded-xl p-4 hover:shadow-sm transition-shadow"
              >
                <div className="font-mono font-bold text-primary text-sm w-8 shrink-0">{layer.id}</div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{layer.name}</div>
                  <div className="text-xs text-muted-foreground">{layer.desc}</div>
                </div>
                <Badge variant="outline" className="text-xs shrink-0">{layer.gap}</Badge>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-center text-muted-foreground mt-6">
            Вимір ВВП: Кожен шар генерує дані для оцінки впливу (~$8B/рік втрат, OECD).
            НБУ/НСЗУ індекс ментального добробуту.
          </p>
        </div>
      </section>

      {/* 3 Clusters */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-3 text-center">3 кластери · 12 проєктів</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            Unified Program Matrix. Бюджет: $1,945K. Вартість для держави: $0.00.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {clusters.map((cluster, i) => (
              <Card key={i} className={`border-2 ${cluster.color} h-full`}>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xl mb-4">
                    {cluster.letter}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{cluster.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{cluster.desc}</p>
                  <ul className="space-y-1.5">
                    {cluster.projects.map((proj, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <ArrowRight className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{proj}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Ukraine First */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-3">Чому Україна першою</h2>
            <p className="text-white/70 mb-8">
              Запуск в Україні — не обмеження, а стратегічна перевага.
              П'ять умов збігаються тут, які не існують одночасно в жодній іншій країні.
            </p>
            <ul className="space-y-4">
              {whyUkraine.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 shrink-0" />
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 p-4 bg-white/10 rounded-xl">
              <p className="text-white/70 italic">
                «Засновано в Україні, дивимося глобально» — це не компроміс, а конкурентна перевага.
                Якщо інфраструктура працює тут — за цих умов — вона працює будь-де.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal framework */}
      <section className="py-14">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8 text-center">Правова та інституційна база</h2>
          <div className="grid md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {[
              { title: "Закон 4223-IX", date: "15 січня 2025", desc: "Правова рамка реформи системи психічного здоров'я. Саморегульовані організації для фахівців." },
              { title: "Постанова КМУ №506", date: "02 травня 2025", desc: "Національна інформаційна платформа громадського здоров'я. Правова основа для підходу FEEL Again." },
              { title: "НБУ СЕП (ISO 20022)", date: "01 січня 2024", desc: "Система електронних платежів. SEPA-сумісна, 24/7, розрахунки < 10 сек. Регуляторна пісочниця НБУ." },
            ].map((law, i) => (
              <Card key={i} className="text-center">
                <CardContent className="pt-6">
                  <Scale className="h-7 w-7 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-1">{law.title}</h3>
                  <Badge variant="outline" className="mb-3 text-xs">{law.date}</Badge>
                  <p className="text-sm text-muted-foreground">{law.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
