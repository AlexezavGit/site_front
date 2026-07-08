import { motion } from "framer-motion";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Wallet, BarChart3, Shield, TrendingUp, Users, Heart, Building2, Globe, Banknote, Sparkles, CheckCircle2 } from "lucide-react";

const NAVY = "#0F2B46";
const GOLD = "#D4A017";
const AMBER = "#D97706";

const PATRON_TYPES = [
  { icon: Heart, label: "Меценат", desc: "Благодійний внесок з ESG-сертифікатом та donor dashboard", color: "text-rose-600", bg: "bg-rose-50" },
  { icon: Building2, label: "Роботодавець", desc: "Корпоративна програма для співробітників — ROI +180% vs заміна персоналу", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: TrendingUp, label: "SIB-інвестор", desc: "Outcomes-based фінансування, ЄБРР гарантія 60%, очікуваний ROI 2.3×", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Globe, label: "Гум. актор", desc: "Parametric reporting model, IATI XML, інтеграція WHO Health Cluster", color: "text-violet-600", bg: "bg-violet-50" },
  { icon: Banknote, label: "Банк / Фонд", desc: "HCR Charter, EU4Business cashback, BFI-статус (Закон №4465-IX), ЄБРР", color: "text-amber-700", bg: "bg-amber-50" },
];

const VALUE_PROPS = [
  { icon: Shield, title: "Ескроу-прозорість", desc: "Кожна гривня видима від ISO 20022 pain.001 до FHIR outcome. Overhead: 7% → 3%." },
  { icon: BarChart3, title: "Автоматична звітність", desc: "Кожен сеанс автоматично тегується «Funded by [Patron]». White-label ESG-дашборд." },
  { icon: Users, title: "Triple Verification", desc: "ДІЯ · Solana-реєстр (Qouroom GB) · Bank ID. Жодного фальсифікованого звіту." },
  { icon: Sparkles, title: "Скоринг проєктів", desc: "AI-скоринг фахівців та програм. Ви фінансуєте тільки верифіковані pipeline." },
];

const MODES = [
  { id: "manual", label: "Manual", desc: "Ви обираєте кожен кейс вручну. Повний контроль.", color: "border-slate-300" },
  { id: "auto", label: "Auto", desc: "Критерії + ліміт. Платформа матчить автоматично.", color: "border-amber-300" },
  { id: "god", label: "God Mode", desc: "Повна передача: алгоритм розподіляє кошти за ефективністю.", color: "border-violet-300" },
];

export default function LandingPatron() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, #1a1200 0%, #2d1f00 50%, ${NAVY} 100%)`, paddingTop: 80, paddingBottom: 80 }}>
        <div className="container text-center text-white">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-4 bg-amber-100 text-amber-800 px-3 py-1 text-xs font-semibold">Фандрейзинг · Патронат</Badge>
            <h1 className="text-4xl md:text-5xl font-light mb-4" style={{ letterSpacing: "-0.02em" }}>
              Кожен долар{" "}
              <span style={{ color: GOLD }}>1:1</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
              Blended Finance для психічного здоров'я України. Прозора VISA для MHPSS — від вашого рахунку до кінцевого бенефіціара, з верифікованим outcome.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link href="/portal/donor">
                <Button size="lg" style={{ background: GOLD, color: NAVY, border: "none", fontWeight: 700 }}>
                  Запустити програму фінансування <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/auth">
                <Button size="lg" variant="outline" style={{ border: `1px solid ${GOLD}`, color: GOLD, background: "transparent" }}>
                  Дізнатись більше
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market stats */}
      <section className="py-10 border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: ">$400M", label: "гум. фінансування MHPSS/рік (WHO + OCHA)" },
              { val: "30%+", label: "overhead у традиційному секторі → 7% у нас" },
              { val: "$2.5B+", label: "потенційний ринок терапевтичних послуг (WHO 50M год)" },
              { val: "$0", label: "вартість для держави — COST TO STATE" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl font-bold font-mono" style={{ color: NAVY }}>{s.val}</p>
                <p className="text-xs text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patron types */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-semibold text-center mb-3" style={{ color: NAVY }}>Хто може бути патроном?</h2>
          <p className="text-sm text-slate-500 text-center mb-10">Єдина платформа для всіх типів фінансування</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PATRON_TYPES.map((pt, i) => {
              const Icon = pt.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                  <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="pt-5 pb-5">
                      <div className={`w-9 h-9 rounded-lg ${pt.bg} flex items-center justify-center mb-3`}>
                        <Icon className={`w-5 h-5 ${pt.color}`} />
                      </div>
                      <p className="font-semibold text-sm mb-1" style={{ color: NAVY }}>{pt.label}</p>
                      <p className="text-xs text-slate-500">{pt.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="py-16 bg-slate-50 border-t">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-semibold text-center mb-10" style={{ color: NAVY }}>Чому FEEL Again?</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {VALUE_PROPS.map((vp, i) => {
              const Icon = vp.icon;
              return (
                <div key={i} className="p-5 bg-white rounded-xl border shadow-sm flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1" style={{ color: NAVY }}>{vp.title}</p>
                    <p className="text-sm text-slate-600">{vp.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 Funding modes */}
      <section className="py-16 border-t">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl font-semibold mb-3" style={{ color: NAVY }}>Три режими фінансування</h2>
          <p className="text-sm text-slate-500 mb-10">Від повного контролю до автоматичного розподілу за ефективністю</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {MODES.map((mode, i) => (
              <div key={mode.id} className={`p-5 rounded-xl border-2 ${mode.color} bg-white text-left`}>
                <Badge variant="outline" className="mb-3 font-mono text-xs">{mode.label}</Badge>
                <p className="text-sm text-slate-700">{mode.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ background: `linear-gradient(135deg, #1a1200 0%, ${NAVY} 100%)` }}>
        <div className="container text-white">
          <h2 className="text-3xl font-light mb-4">Запустіть програму вже сьогодні</h2>
          <p className="text-base mb-8 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
            Мінімальна група — 1 бенефіціар. Реліз ескроу — після верифікованого outcome.
          </p>
          <Link href="/portal/donor">
            <Button size="lg" style={{ background: GOLD, color: NAVY, border: "none", fontWeight: 700, fontSize: "1rem" }}>
              До кабінету патрона <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
