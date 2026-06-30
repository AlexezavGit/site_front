import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  ArrowRight, CheckCircle2, Shield, TrendingUp,
  Banknote, BarChart3, Users, Globe, FileText
} from "lucide-react";

const NAVY = "#0F2B46";

const audiences = [
  {
    icon: Shield,
    title: "Гуманітарні Актори",
    subtitle: "USAID, EU, UN, Health Cluster OCHA",
    tagline: "Де-ризиковане спів-фінансування із зниженням витрат на випадок.",
    benefits: [
      "Payment for Result: Escrow + 3-етапний milestone release (T1 20%, T2 30%, T3 50%)",
      "Triple Verification Oracle — блокчейн-верифікований аудит-трейл",
      "Авто-звітність: WHO mhGAP, IASC 4Ws, OCHA FTS, IATI 2.03",
      "Драматичне зниження адмін-витрат — автоматизація звітності",
      "Grand Bargain 2026: від 2–8% до цілі 25% локалізації",
      "End-to-end traceability: Source → Service → Outcome",
    ],
    color: "border-blue-200 bg-blue-50",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    icon: TrendingUp,
    title: "КСВ та Бізнес",
    subtitle: "Корпоративна соціальна відповідальність",
    tagline: "Участь у гуманітарному реагуванні з публічним контролем.",
    benefits: [
      "Train for Care: €75K / когорта 20 фахівців, ROI 2.22×",
      "Іменована когорта — публічне визнання компанії",
      "P2P-кампанії та краудфандинг-інструменти",
      "Мобілізація ресурсів та прозора звітність",
      "Сталий розвиток та Ментальний Добробут у суспільстві",
      "ESG-звіт: задокументований соціальний вплив",
    ],
    color: "border-green-200 bg-green-50",
    badgeColor: "bg-green-100 text-green-800",
  },
  {
    icon: Users,
    title: "Держава та Муніципалітети",
    subtitle: "МОЗ, НСЗУ, місцеве самоврядування",
    tagline: "SaaS-підписка. Вартість для держави: $0.00 на старті.",
    benefits: [
      "Закон 4223-IX (15 січня 2025) — правова рамка вже є",
      "Постанова КМУ №506 (2025) — нац. інформ. платформа гром. здоров'я",
      "Інтеграція з ЕСОЗ (HL7 FHIR R4), Helsi (49,000+ закладів)",
      "Реєстр надавачів → видимість тіньового сектору",
      "НБУ / НСЗУ індекс ментального добробуту",
      "Держава купує послугу, а не інфраструктуру — нуль CAPEX",
    ],
    color: "border-amber-200 bg-amber-50",
    badgeColor: "bg-amber-100 text-amber-800",
  },
];

export default function ForDonors() {
  return (
    <div>
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50 to-background">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container">
          <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-200">Донорам, КСВ та партнерам</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 max-w-3xl">
            Де-ризиковане<br />
            <span className="text-primary">спів-фінансування.</span><br />
            Вимірюваний вплив.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-5">
            FEEL Again усуває ключові ризики гуманітарного фінансування: дублювання,
            неперевіреність результатів і втрата коштів при виході донорів.
            Ваш внесок верифікований, підзвітний і вимірюваний на кожному кроці.
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl mb-8 font-mono bg-slate-100 p-3 rounded-lg">
            Reverse Waterfall: Donor fills gap, not the whole budget. Local ownership first.<br />
            Комісія платформи: 7% → 3% дегресивна.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/referral">
              <Button size="lg">
                Стати партнером
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="https://dashboard-1q7.pages.dev/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                Відкрити дашборд <BarChart3 className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </motion.div>
      </section>

      <section className="py-10 bg-slate-900 text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: "$137M", label: "Гуман. потоків / рік", note: "OCHA FTS + bilateral" },
              { val: "~0%", label: "Синхронізація з ЕСОЗ", note: "Ecosystem Audit v2.1" },
              { val: "450+", label: "Організацій у секторі", note: "WHO coordination data" },
              { val: "$2B", label: "Tom Fletcher MOU", note: "29 Dec 2025, OCHA" },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-white mb-1">{item.val}</div>
                <div className="text-sm text-white/70 mb-1">{item.label}</div>
                <div className="text-xs text-white/40">{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-10 text-center">Цінність для кожного партнера</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {audiences.map((aud, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <Card className={`h-full border-2 ${aud.color}`}>
                  <CardHeader>
                    <aud.icon className="h-9 w-9 text-primary mb-2" />
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle>{aud.title}</CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">{aud.subtitle}</p>
                      </div>
                      <Badge className={aud.badgeColor}>{aud.title.split(" ")[0]}</Badge>
                    </div>
                    <p className="text-sm italic text-muted-foreground mt-2">{aud.tagline}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {aud.benefits.map((b, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Cabinet teaser */}
      <section className="py-14" style={{ background: "#FAFBFC", borderTop: "1px solid #E5E7EB" }}>
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2" style={{ color: NAVY }}>Кабінет донора — попередній перегляд</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Інтерактивні мокапи: скоринг ініціатив, імпакт-калькулятор, дошка пошани.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            <div className="rounded-xl p-5 border border-amber-200 bg-amber-50 text-center">
              <BarChart3 className="h-8 w-8 text-amber-600 mx-auto mb-3" />
              <h3 className="font-bold text-sm mb-1">Скоринг ініціатив</h3>
              <p className="text-xs text-muted-foreground mb-3">Авто-затвердження за порогами: скор &gt;75 = auto, 50-75 = review.</p>
              <Link href="/portal/donor"><Button variant="outline" size="sm" className="w-full border-amber-400 text-amber-700">Перейти →</Button></Link>
            </div>
            <div className="rounded-xl p-5 border border-amber-200 bg-amber-50 text-center">
              <Banknote className="h-8 w-8 text-amber-600 mx-auto mb-3" />
              <h3 className="font-bold text-sm mb-1">Імпакт-калькулятор</h3>
              <p className="text-xs text-muted-foreground mb-3">Train for Care ROI: бюджет → бенефіціари → платформна комісія → чистий вплив.</p>
              <Link href="/portal/donor"><Button variant="outline" size="sm" className="w-full border-amber-400 text-amber-700">Розрахувати →</Button></Link>
            </div>
            <div className="rounded-xl p-5 border border-amber-200 bg-amber-50 text-center">
              <Shield className="h-8 w-8 text-amber-600 mx-auto mb-3" />
              <h3 className="font-bold text-sm mb-1">Дошка пошани</h3>
              <p className="text-xs text-muted-foreground mb-3">Золотий та серебрний партнери за внесок та вплив.</p>
              <Link href="/portal/donor"><Button variant="outline" size="sm" className="w-full border-amber-400 text-amber-700">Переглянути →</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
