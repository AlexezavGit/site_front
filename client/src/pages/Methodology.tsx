import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  ArrowRight, CheckCircle2, UserPlus, Stethoscope,
  ClipboardCheck, PlayCircle, Percent, CheckCircle,
  Cpu, BarChart3, Database
} from "lucide-react";

const journeySteps = [
  {
    icon: UserPlus,
    title: "Реєстрація бенефіціара",
    trigger: "Ідентифікація потреби",
    action: "Цифровий ордер на попередню діагностику",
    detail: "Чат-бот тріаж або пряме звернення. Первинний скринінг PHQ-9 / GAD-7. Визначення рівня ступеневої допомоги.",
  },
  {
    icon: Stethoscope,
    title: "Діагностична сесія",
    trigger: "Результат тріажу",
    action: "Цифровий ордер: Сесія до фахівця",
    detail: "Матчинг із сертифікованим фахівцем. PCL-5 / CORE-OM оцінка. Формування клінічного профілю.",
  },
  {
    icon: ClipboardCheck,
    title: "Затвердження плану",
    trigger: "Верифікація діагнозу",
    action: "Цифровий ордер на курс реабілітації",
    detail: "Персональний план: рівень, тривалість, методи. Ескроу-активація: T1 фінансування (20%). Підпис Learning Agreement.",
  },
  {
    icon: PlayCircle,
    title: "Перший сеанс курсу",
    trigger: "Старт реабілітації",
    action: "Ордер P2P збір ресурсів (опційно)",
    detail: "Початок активної фази. Сесія фіксується в системі. Перший запис у клінічному журналі.",
  },
  {
    icon: Percent,
    title: "25% курсу завершено",
    trigger: "Milestone T2",
    action: "Активація гуман. фінансування (30%)",
    detail: "Triple Verification Oracle: Self → Provider → Platform. Milestone release T2. Коригування плану за необхідності.",
  },
  {
    icon: CheckCircle,
    title: "Завершення курсу",
    trigger: "Milestone T3",
    action: "Звіт донору та всім учасникам",
    detail: "T3 release (50%). Pre/post вимірювання PHQ-9 / PCL-5. Звіт автоматично генерується в IATI / Grand Bargain форматі.",
  },
];

const paymentLogic = [
  { phase: "T1", pct: "20%", trigger: "Старт курсу (ордер підписано)", desc: "Ескроу активовано, фахівець отримує аванс" },
  { phase: "T2", pct: "30%", trigger: "25% курсу завершено (верифіковано)", desc: "Triple Verification Oracle + milestone release" },
  { phase: "T3", pct: "50%", trigger: "Завершення курсу (outcome зафіксовано)", desc: "Pre/post вимірювання + авто-звіт донору" },
];

const platformLayers = [
  { num: "1", title: "Фіскальний", func: "Обробка платежів, ескроу, смарт-контракти, USDC", tech: "Solana, PrivatBank API, Monobank API, Stripe" },
  { num: "2", title: "Фінансовий", func: "Комісійна модель, скоринг донорів, розподіл коштів, P2P", tech: "QLDB → Solana, Smart Clearing" },
  { num: "3", title: "Цифровий", func: "Реєстр надавачів, метрування сесій, матчинг, чат-бот, звітність", tech: "React/Next.js, Node.js, PostgreSQL, Redis" },
  { num: "4", title: "Клінічний", func: "VR-терапія, вимірювання результатів, супервізія", tech: "BRAVEMIND (USC ICT), Meta Quest 3, TensorFlow.js" },
  { num: "5", title: "Регуляторний", func: "Інтеграція eHealth/ЕСОЗ, DIA KYC, GDPR, IATI", tech: "OAuth+DS DSTU-4145, HL7 FHIR R4, BankID NBU" },
];

const supplyChain = [
  { link: "Фінансування", current: "Фрагментоване: USAID, EU, UN — кожен окремо", solution: "Blended Finance + Reverse Waterfall + Smart Clearing" },
  { link: "Координація", current: "Мануальна: Excel, чати, 2×/тиждень", solution: "Service Bus для 450+ org, real-time dashboard" },
  { link: "Верифікація", current: "Відсутня: немає єдиного стандарту якості", solution: "Clinical Proof-of-Stake: 10 верифіков. кейсів = доступ" },
  { link: "Надання послуг", current: "Фрагментоване: держава, НУО, приватники — окремо", solution: "Unified provider registry + API integration" },
  { link: "Моніторинг результатів", current: "Відсутній: немає уніфікованих даних", solution: "PHQ-9/GAD-7/PCL-5 tracking, blockchain-verified outcomes" },
  { link: "Звітність", current: "Кожен звітує по-різному", solution: "Авто-генерація: WHO mhGAP, IASC 4Ws, OCHA FTS, IATI" },
];

export default function Methodology() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Методологія FEEL Again</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 max-w-3xl">
            Як це працює:<br />
            <span className="text-primary">від запиту</span><br />
            до верифікованого результату
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            Identity → Session → Outcome → Payment → Reporting. Цифрова шина між тими,
            хто потребує допомоги, і тими, хто здатен її надати. Кожен крок —
            зафіксований і верифікований.
          </p>
        </motion.div>
      </section>

      {/* Journey Flow */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-3 text-center">Шлях бенефіціара</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            Перебіг подій залежно від тригерів. Кожен тригер активує наступний ордер у системі.
          </p>
          <div className="max-w-3xl mx-auto">
            {journeySteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="mb-4 group hover:shadow-md transition-all">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                          {i + 1}
                        </div>
                        <step.icon className="h-7 w-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">{step.trigger}</Badge>
                          <Badge className="text-xs bg-primary/10 text-primary border-primary/20">{step.action}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {i < journeySteps.length - 1 && (
                  <div className="flex justify-center mb-1">
                    <ArrowRight className="h-5 w-5 text-primary/40 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment for Result */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container">
          <h2 className="text-3xl font-bold mb-3 text-center">Payment for Result</h2>
          <p className="text-white/70 text-center mb-10 max-w-xl mx-auto">
            Ресурси слідують за бенефіціаром. Надавачі отримують компенсацію за продемонстровані результати.
            Escrow + Triple Verification Oracle.
          </p>
          <div className="grid md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {paymentLogic.map((p, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-4xl font-black text-yellow-300 mb-2">{p.pct}</div>
                <div className="font-bold text-white mb-2">{p.phase}</div>
                <div className="text-xs text-white/60 mb-3">{p.trigger}</div>
                <div className="text-sm text-white/80">{p.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/50 text-xs mt-6">
            GAP 2: Economic Resolution — Smart Clearing, SDK.finance. Blockchain-verified audit trail.
          </p>
        </div>
      </section>

      {/* 5 Platform Layers */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-3 text-center">5 шарів платформи</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            Технічний рівень. Кожен шар має чітку функцію та стек технологій.
          </p>
          <div className="max-w-2xl mx-auto space-y-3">
            {platformLayers.map((layer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="bg-white border rounded-xl p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center font-bold text-primary text-sm shrink-0">
                    {layer.num}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold mb-1">{layer.title}</div>
                    <div className="text-sm text-muted-foreground mb-2">{layer.func}</div>
                    <div className="text-xs font-mono bg-slate-50 border rounded p-1.5 text-slate-600">{layer.tech}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supply Chain Broken Links */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-3 text-center">6 розірваних ланок</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            Шість ланок ланцюга постачання послуг MHPSS — і як FEEL Again їх з'єднує.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-200">
                  <th className="text-left p-3 font-semibold">#</th>
                  <th className="text-left p-3 font-semibold">Ланка</th>
                  <th className="text-left p-3 font-semibold">Поточний стан</th>
                  <th className="text-left p-3 font-semibold">Рішення FEEL</th>
                </tr>
              </thead>
              <tbody>
                {supplyChain.map((row, i) => (
                  <tr key={i} className="border-t hover:bg-slate-100 transition-colors">
                    <td className="p-3 font-mono text-muted-foreground">{i + 1}</td>
                    <td className="p-3 font-semibold">{row.link}</td>
                    <td className="p-3 text-muted-foreground">{row.current}</td>
                    <td className="p-3 text-green-700 font-medium">{row.solution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
