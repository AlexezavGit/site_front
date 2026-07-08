import { motion } from "framer-motion";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, Brain, Shield, Clock, MapPin, Video, CheckCircle2, Star, Users } from "lucide-react";

const NAVY = "#0F2B46";
const ROSE = "#E11D48";
const GOLD = "#D4A017";

const STEPS = [
  { num: 1, icon: Brain, title: "AI-скринінг", desc: "Анонімний тест PHQ-9 / GAD-7 / PCL-5. Без реєстрації. 5 хвилин — і ви знаєте свій рівень." },
  { num: 2, icon: MapPin, title: "Матчинг фахівця", desc: "Алгоритм підбирає психолога за модальністю, локацією, мовою, навантаженням." },
  { num: 3, icon: Shield, title: "Захищений сеанс", desc: "Цифрове рукопожаття — старт/стоп фіксується в блокчейні. Ваші дані — ваші." },
  { num: 4, icon: Heart, title: "Програма терапії", desc: "5–20 сеансів за протоколом WHO. 70% покривається патронатом, 30% — P2P або самостійно." },
  { num: 5, icon: CheckCircle2, title: "Реінтеграція", desc: "Вихід на роботу, повернення до соціальних ролей — з верифікованим outcome-звітом." },
];

const MODALITIES = [
  { name: "EMDR", badge: "Золотий стандарт WHO", color: "bg-blue-100 text-blue-800" },
  { name: "VR Bravemind", badge: "USC · 170+ VA-центрів США", color: "bg-violet-100 text-violet-800" },
  { name: "CBT / КПТ", badge: "Поведінкова терапія", color: "bg-teal-100 text-teal-800" },
  { name: "mhGAP", badge: "WHO протокол ПМД", color: "bg-emerald-100 text-emerald-800" },
];

const FAQ = [
  { q: "Чи безпечні мої дані?", a: "Ваш кейс циркулює анонімно. Особисті дані видимі лише обраному фахівцю після вашої згоди." },
  { q: "Скільки це коштує?", a: "70% вартості сеансу покривається програмою патрона. Ви доплачуєте 30% або активуєте P2P-дофінансування від роботодавця/оточення." },
  { q: "Я в іншому місті — чи можна онлайн?", a: "Так, платформа підтримує відео-сеанси та сеанси в додатках. Фахівці з усієї України та діаспори." },
  { q: "Що як я не готовий до терапії?", a: "Починайте з AI-розмови або анонімного скринінгу. Жодного зобов'язання — тільки ваш вибір." },
];

export default function LandingRecipient() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a3a5c 100%)`, paddingTop: 80, paddingBottom: 80 }}>
        <div className="container text-center text-white">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-4 bg-rose-100 text-rose-800 px-3 py-1 text-xs font-semibold">Отримання допомоги</Badge>
            <h1 className="text-4xl md:text-5xl font-light mb-4" style={{ letterSpacing: "-0.02em" }}>
              Ваш шлях до{" "}
              <span style={{ color: ROSE }}>відновлення</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
              Анонімна діагностика · Верифіковані фахівці · Прозоре фінансування.
              Без черг, без стигми, без зайвих паперів.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link href="/portal/beneficiary">
                <Button size="lg" style={{ background: ROSE, color: "white", border: "none", fontWeight: 700 }}>
                  Розпочати безкоштовний скринінг <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/auth">
                <Button size="lg" variant="outline" style={{ border: "1px solid rgba(255,255,255,0.3)", color: "white", background: "transparent" }}>
                  Зареєструватись
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key stats */}
      <section className="py-10 border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: "9.6M", label: "людей потребують підтримки (WHO 2025)" },
              { val: "74%", label: "ВПО не отримують допомоги (WHO SIMH 2024)" },
              { val: "8–12", label: "сеансів за ізраїльським EMDR-протоколом" },
              { val: "≥90%", label: "завершуваність VR Bravemind" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl font-bold font-mono" style={{ color: NAVY }}>{s.val}</p>
                <p className="text-xs text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey steps */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-semibold text-center mb-10" style={{ color: NAVY }}>Як це працює</h2>
          <div className="space-y-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4 p-5 rounded-xl border bg-white shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm" style={{ background: ROSE }}>
                    {step.num}
                  </div>
                  <div className="flex items-start gap-3 flex-1">
                    <Icon className="w-5 h-5 mt-0.5 shrink-0" style={{ color: ROSE }} />
                    <div>
                      <p className="font-semibold text-sm mb-0.5" style={{ color: NAVY }}>{step.title}</p>
                      <p className="text-sm text-slate-600">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modalities */}
      <section className="py-16 bg-slate-50 border-t">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl font-semibold mb-3" style={{ color: NAVY }}>Методології, що працюють</h2>
          <p className="text-sm text-slate-500 mb-8">Доказові підходи з підтвердженою ефективністю для травми, ПТСР та тривоги</p>
          <div className="grid grid-cols-2 gap-4">
            {MODALITIES.map((m) => (
              <Card key={m.name} className="border-0 shadow-sm text-left">
                <CardContent className="pt-4 pb-4">
                  <p className="font-semibold text-sm mb-1" style={{ color: NAVY }}>{m.name}</p>
                  <Badge className={`text-xs ${m.color}`}>{m.badge}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-t">
        <div className="container max-w-2xl">
          <h2 className="text-2xl font-semibold text-center mb-8" style={{ color: NAVY }}>Часті запитання</h2>
          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <div key={i} className="p-5 rounded-xl border bg-white">
                <p className="font-semibold text-sm mb-2" style={{ color: NAVY }}>{item.q}</p>
                <p className="text-sm text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a3a5c 100%)` }}>
        <div className="container text-white">
          <h2 className="text-3xl font-light mb-4">Зробіть перший крок сьогодні</h2>
          <p className="text-base mb-8 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
            Анонімний скринінг займає 5 хвилин і не зобов'язує вас ні до чого.
          </p>
          <Link href="/portal/beneficiary">
            <Button size="lg" style={{ background: ROSE, color: "white", border: "none", fontWeight: 700, fontSize: "1rem" }}>
              Розпочати <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
