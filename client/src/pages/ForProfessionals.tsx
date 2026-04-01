import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  ArrowRight, CheckCircle2, Users, Shield, Banknote,
  Award, Clock, TrendingUp, UserCheck, Globe
} from "lucide-react";

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
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container"
        >
          <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">Фахівцям у сфері MHPSS</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 max-w-3xl">
            Справедлива платня.<br />
            <span className="text-primary">Персональна ефективність.</span><br />
            Гуманітарне реагування.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            FEEL Again створює Digital Corridor — спрощений шлях від неформальної практики до
            підзвітної, сертифікованої та фінансово стабільної роботи. Не ще один тренінг —
            рейки для тих, хто вже навчений.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/referral">
              <Button size="lg">
                Приєднатися до програми
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/training">
              <Button variant="outline" size="lg">
                Підвищення кваліфікації
              </Button>
            </Link>
          </div>
        </motion.div>
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

      {/* Sectors */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4 text-center">Три сектори надавачів</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Між первинною допомогою та психіатричними закладами — пропасть. FEEL Again будує
            Trusted Digital Layer для Missing Middle.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {sectors.map((s, i) => (
              <Card key={i} className={`border-2 ${s.color} h-full`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{s.title}</CardTitle>
                    <Badge className={s.badgeColor}>{s.badge}</Badge>
                  </div>
                  <p className="text-sm font-semibold text-muted-foreground">{s.count}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{s.situation}</p>
                  <div className="border-t pt-3">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Рішення FEEL:</p>
                    <p className="text-sm">{s.solution}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline Table */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-3 text-center">8 потоків фахівців</h2>
          <p className="text-muted-foreground text-center mb-2 max-w-2xl mx-auto">
            Консервативна оцінка Year 1: ~1,500–2,500 формалізованих фахівців.
          </p>
          <p className="text-xs text-center text-muted-foreground mb-8">
            Doc 4 · Canonical Dataset v1.0 · Конверсії — консервативні оцінки, потребують валідації через пілот
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 font-semibold">#</th>
                  <th className="text-left p-3 font-semibold">Потік</th>
                  <th className="text-left p-3 font-semibold">Опис</th>
                  <th className="text-right p-3 font-semibold">Pool</th>
                  <th className="text-right p-3 font-semibold">Конверсія</th>
                </tr>
              </thead>
              <tbody>
                {pipeline.map((row, i) => (
                  <tr key={i} className="border-t hover:bg-slate-50 transition-colors">
                    <td className="p-3 text-muted-foreground font-mono">{i + 1}</td>
                    <td className="p-3 font-medium">{row.stream}</td>
                    <td className="p-3 text-muted-foreground">{row.desc}</td>
                    <td className="p-3 text-right font-mono">{row.pool}</td>
                    <td className="p-3 text-right">
                      <Badge variant="outline" className="text-green-700 border-green-300">{row.conv}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
    </div>
  );
}
