import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  ArrowRight, CheckCircle2, Users, Shield, Banknote,
  Award, Clock, TrendingUp, UserCheck, Globe
} from "lucide-react";

const NAVY = "#0F2B46";
const TEAL = "#1C5A52";
const TEAL_LIGHT = "#3E91A2";

const sectors = [
  {
    title: "Тіньовий сектор",
    count: "~8,000 фахівців",
    situation: "Кваліфіковані, 6–9 год/день. Без сертифікації, без видимості для держави, без інституційного фінансування. Вони вже практикують повний день.",
    solution: "Digital Corridor: спрощений вхід через ФОП Група 3, підключення до eHealth API, автоматизована звітність.",
    color: "border-orange-200 bg-orange-50",
    badge: "Пріоритет 1",
    badgeColor: "bg-orange-100 text-orange-800",
  },
  {
    title: "Гуманітарне реагування",
    count: "~38,000 (UNICEF trained)",
    situation: "Навчені в межах гуман. фінансування. ~95% без клінічної компетентності. Втрачають фінансування при виході донорів.",
    solution: "Humanitarian Transition Stream: шлях до державної звітності, супервізія, підключення до формальної системи.",
    color: "border-blue-200 bg-blue-50",
    badge: "Потік 7",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    title: "Психіатричні диспансери",
    count: "~2,700–4,000 (UPRA)",
    situation: "Психіатри в застарілій радянській системі. Результати самозвітні, не вимірюються незалежно.",
    solution: "Psychiatry Conversion: перехід до community-based практики, клінічні інструменти PHQ-9/GAD-7/PCL-5.",
    color: "border-purple-200 bg-purple-50",
    badge: "Потік 8",
    badgeColor: "bg-purple-100 text-purple-800",
  },
];

const pipeline = [
  { stream: "Shadow Sector", pool: "~8,000", conv: "15–25%", desc: "Діючі приватні практики без формалізації" },
  { stream: "UPRA (Психол. Асоціація)", pool: "~2,500", conv: "20–30%", desc: "Зареєстровані члени з різним рівнем активності" },
  { stream: "Veterans-psychologists", pool: "~500–1,000", conv: "10–15%", desc: "Ветерани з психологічною освітою" },
  { stream: "University pipeline", pool: "~3,000/рік", conv: "5–10%", desc: "Випускники психологічних факультетів" },
  { stream: "Diaspora repatriation", pool: "~1,000–2,000", conv: "5–10%", desc: "Психологи-емігранти з досвідом за кордоном" },
  { stream: "Diaspora supervision", pool: "~500", conv: "30–40%", desc: "Дистанційна супервізія від діаспори" },
  { stream: "Humanitarian transition", pool: "~2,000–3,000", conv: "15–20%", desc: "USAID/UN-навчені фахівці після виходу донорів" },
  { stream: "Psychiatry conversion", pool: "~2,700", conv: "5–10%", desc: "Психіатри з диспансерів → community-based" },
];

const benefits = [
  { icon: Banknote, title: "Справедлива платня", desc: "Оплата за результат. Ескроу. Milestone-based release (T1 20%, T2 30%, T3 50%). Середній дохід ~3 год/тиждень протягом року." },
  { icon: Award, title: "Міжнародна сертифікація", desc: "Clinical Proof-of-Stake: 10 верифікованих кейсів = доступ до фінансування. Визнана WHO, UPRA, HeRAMS." },
  { icon: Shield, title: "Цифровий коридор", desc: "Вихід із тіні без примусового ліцензування. ФОП Група 3. Підключення до eHealth/Helsi API. Авто-звітність." },
  { icon: UserCheck, title: "Супервізія та підтримка", desc: "Мережа супервізорів включно з діаспорою. Peer support. Безперервний професійний розвиток." },
  { icon: Globe, title: "Видимість та масштаб", desc: "Матчинг з бенефіціарами через алгоритм готовності. Вихід із невидимості. Один реєстр для держави та донорів." },
  { icon: Clock, title: "Гнучкість", desc: "Гнучке відшкодування годин. Не зобов'язує до повного переходу. Поєднання з існуючою практикою." },
];

export default function ForProfessionals() {
  return (
    <div>
      {/* Hero — TEAL / Providers */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: `linear-gradient(135deg, #0B2422 0%, #123C3A 45%, ${TEAL} 100%)` }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 85% 0%, rgba(62,145,162,0.16) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="container relative grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-block mb-5 px-3 py-1 rounded-full text-xs font-medium uppercase" style={{ background: "rgba(62,145,162,0.15)", color: TEAL_LIGHT, border: `1px solid rgba(62,145,162,0.35)`, letterSpacing: "0.12em" }}>
              Фахівцям · Провайдерам послуг
            </div>
            <h1 className="text-4xl md:text-5xl mb-5 max-w-xl leading-tight" style={{ color: "white", fontWeight: 300 }}>
              Справедлива платня.<br />
              <span style={{ color: TEAL_LIGHT, fontWeight: 500 }}>Персональна ефективність.</span><br />
              Гуманітарне реагування.
            </h1>
            <p className="text-base md:text-lg max-w-xl mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              FEEL Again створює Digital Corridor — спрощений шлях від неформальної практики до
              підзвітної, сертифікованої та фінансово стабільної роботи. Не ще один тренінг —
              рейки для тих, хто вже навчений.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/referral">
                <Button size="lg" style={{ background: TEAL_LIGHT, color: "#06100E", fontWeight: 600, border: "none" }}>
                  Приєднатися до програми
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/training">
                <Button size="lg" variant="outline" style={{ borderColor: "rgba(255,255,255,0.35)", color: "white", background: "transparent" }}>
                  Підвищення кваліфікації
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-xl p-6" style={{ background: "rgba(0,0,0,0.18)", border: "1px solid rgba(62,145,162,0.25)" }}>
            <div className="text-xs uppercase mb-4" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em" }}>Тіньовий сектор · зараз</div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: "~8,000", l: "фахівців у тіні" },
                { v: "42", l: "практикують під супервізією" },
                { v: "~3 год", l: "дохід/тиждень" },
                { v: "10 кейсів", l: "= доступ до фінансування" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ color: TEAL_LIGHT, fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.1 }}>{s.v}</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.72rem", marginTop: "0.25rem" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-10 text-center">Що отримує фахівець</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <b.icon className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-bold text-base mb-2">{b.title}</h3>
                    <p className="text-sm text-muted-foreground">{b.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-16 bg-primary text-white">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Як приєднатися</h2>
          <div className="grid grid-cols-3 gap-6 mb-10">
            {["Реєстрація в системі FEEL Again", "10 верифікованих кейсів (Clinical Proof-of-Stake)", "Доступ до фінансування та пацієнтів"].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg mx-auto mb-3">{i + 1}</div>
                <p className="text-sm text-primary-foreground/90">{step}</p>
              </div>
            ))}
          </div>
          <Link href="/referral">
            <Button variant="secondary" size="lg">
              Розпочати реєстрацію <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Cabinet teaser */}
      <section className="py-14" style={{ background: "#FAFBFC", borderTop: "1px solid #E5E7EB" }}>
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2" style={{ color: NAVY }}>Кабінет фахівця — попередній перегляд</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Інтерактивні мокапи: циркулейшн фолдер, ренкінг, калькулятор доходу.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            <div className="rounded-xl p-5 border border-teal-200 bg-teal-50 text-center">
              <Users className="h-8 w-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-bold text-sm mb-1">Циркулейшн фолдер</h3>
              <p className="text-xs text-muted-foreground mb-3">Керування пацієнтами: діагностовано / не діагностовано, статуси, запрос сеансів.</p>
              <Link href="/portal/provider"><Button variant="outline" size="sm" className="w-full border-teal-400 text-teal-700">Перейти →</Button></Link>
            </div>
            <div className="rounded-xl p-5 border border-teal-200 bg-teal-50 text-center">
              <Award className="h-8 w-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-bold text-sm mb-1">Ренкінг фахівців</h3>
              <p className="text-xs text-muted-foreground mb-3">70% вага верифікованих бенефіціарами + 20% сертифікати + 10% освіта.</p>
              <Link href="/portal/provider"><Button variant="outline" size="sm" className="w-full border-teal-400 text-teal-700">Переглянути →</Button></Link>
            </div>
            <div className="rounded-xl p-5 border border-teal-200 bg-teal-50 text-center">
              <Banknote className="h-8 w-8 text-teal-600 mx-auto mb-3" />
              <h3 className="font-bold text-sm mb-1">Калькулятор доходу</h3>
              <p className="text-xs text-muted-foreground mb-3">Сеанси у тиждень × вартість × витрати × податок = чистий дохід.</p>
              <Link href="/portal/provider"><Button variant="outline" size="sm" className="w-full border-teal-400 text-teal-700">Розрахувати →</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
