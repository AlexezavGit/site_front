import { motion } from "framer-motion";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BadgeCheck, Briefcase, FileText, Wallet, TrendingUp, Shield, Clock, BookOpen, Star } from "lucide-react";

const NAVY = "#0F2B46";
const TEAL = "#0D9488";
const GOLD = "#D4A017";

const BENEFITS = [
  { icon: Wallet, title: "Прозорий дохід", desc: "Ставка €18–€85/год залежно від рівня сертифікації. Ескроу-реліз автоматично після Triple Verification." },
  { icon: FileText, title: "Автоматична звітність", desc: "FHIR-звіт формується автоматично. Адмін-навантаження: 10% замість 40%. Більше часу — клієнтам." },
  { icon: BadgeCheck, title: "Верифіковані credentials", desc: "W3C Verifiable Credential від МОЗ. Єдина цифрова ліцензія для всіх фінансових потоків." },
  { icon: TrendingUp, title: "Доступ до програм", desc: "Видимість у кабінеті патрона. Матчинг з платоспроможними програмами. Без комерційного посередника." },
  { icon: BookOpen, title: "Train for Care", desc: "Дистанційне підвищення кваліфікації EMDR (Geha Clalit) та VR Bravemind (USC). Сертифікація включена." },
  { icon: Shield, title: "Захист та підтримка", desc: "Супервізія, клінічна валідація, страхування ризиків. Ви не сам-на-сам із системою." },
];

const COMPLIANCE_LEVELS = [
  { level: "L0", title: "Базовий", rate: "€18/год", req: "Диплом психолога / соціального працівника", color: "bg-slate-100 text-slate-700" },
  { level: "L1", title: "Стандарт", rate: "€35/год", req: "mhGAP сертифікат + 50 клієнт/год", color: "bg-blue-100 text-blue-800" },
  { level: "L2", title: "Клінічний", rate: "€55/год", req: "EMDR / CPT + супервізія + 150 год", color: "bg-teal-100 text-teal-800" },
  { level: "L3", title: "Майстер", rate: "€85/год", req: "VR Bravemind / клінічна психіатрія + 300 год", color: "bg-violet-100 text-violet-800" },
];

export default function LandingProvider() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0d2035 100%)`, paddingTop: 80, paddingBottom: 80 }}>
        <div className="container text-center text-white">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-4 bg-teal-100 text-teal-800 px-3 py-1 text-xs font-semibold">Надання допомоги</Badge>
            <h1 className="text-4xl md:text-5xl font-light mb-4" style={{ letterSpacing: "-0.02em" }}>
              Вийдіть із тіні.{" "}
              <span style={{ color: TEAL }}>Практикуйте відкрито.</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
              Digital Bus для психологів України: верифікація, матчинг із клієнтами, автозвітність і прозора оплата.
              Жодного комерційного посередника.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link href="/portal/provider">
                <Button size="lg" style={{ background: TEAL, color: "white", border: "none", fontWeight: 700 }}>
                  Розпочати онбординг <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/training">
                <Button size="lg" variant="outline" style={{ border: "1px solid rgba(255,255,255,0.3)", color: "white", background: "transparent" }}>
                  Train for Care
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: "50K+", label: "фахівців потрібно системі (за оцінками WHO)" },
              { val: "40%", label: "часу йде на адмін — ми скорочуємо до 10%" },
              { val: "4 рівні", label: "сертифікації L0–L3, €18–€85/год" },
              { val: "€0", label: "вартість для держави (COST TO STATE)" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl font-bold font-mono" style={{ color: NAVY }}>{s.val}</p>
                <p className="text-xs text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container max-w-5xl">
          <h2 className="text-2xl font-semibold text-center mb-10" style={{ color: NAVY }}>Що ви отримуєте</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="pt-5 pb-5">
                      <Icon className="w-6 h-6 mb-3" style={{ color: TEAL }} />
                      <p className="font-semibold text-sm mb-2" style={{ color: NAVY }}>{b.title}</p>
                      <p className="text-sm text-slate-600">{b.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance levels */}
      <section className="py-16 bg-slate-50 border-t">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-semibold text-center mb-3" style={{ color: NAVY }}>Рівні сертифікації</h2>
          <p className="text-sm text-slate-500 text-center mb-8">Починайте з L0 і підвищуйте рівень через Train for Care</p>
          <div className="space-y-3">
            {COMPLIANCE_LEVELS.map((cl) => (
              <div key={cl.level} className="flex items-center gap-4 p-4 bg-white rounded-xl border shadow-sm">
                <Badge className={`text-sm font-mono px-3 py-1 shrink-0 ${cl.color}`}>{cl.level}</Badge>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm" style={{ color: NAVY }}>{cl.title}</p>
                    <span className="text-xs text-slate-500">{cl.req}</span>
                  </div>
                </div>
                <span className="font-bold font-mono text-sm shrink-0" style={{ color: TEAL }}>{cl.rate}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0d2035 100%)` }}>
        <div className="container text-white">
          <h2 className="text-3xl font-light mb-4">Готові приєднатись?</h2>
          <p className="text-base mb-8 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
            Онбординг займає до 30 хвилин. Верифікація — до 3 робочих днів.
          </p>
          <Link href="/portal/provider">
            <Button size="lg" style={{ background: TEAL, color: "white", border: "none", fontWeight: 700, fontSize: "1rem" }}>
              Почати онбординг <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
