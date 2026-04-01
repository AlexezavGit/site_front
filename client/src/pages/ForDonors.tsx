import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  ArrowRight, CheckCircle2, Shield, TrendingUp,
  Banknote, BarChart3, Users, Globe, FileText
} from "lucide-react";

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

const financingModel = [
  { label: "Рівень 1", title: "Community", desc: "P2P, мікро-донації, краудфандинг", color: "bg-green-100 text-green-800" },
  { label: "Рівень 2", title: "Бізнес КСВ", desc: "Корпоративне співфінансування, Train for Care", color: "bg-blue-100 text-blue-800" },
  { label: "Рівень 3", title: "Місцевий фонд", desc: "Муніципалітет, регіональний фонд", color: "bg-purple-100 text-purple-800" },
  { label: "Рівень 4", title: "Глобальний донор", desc: "USAID, EU, UN — останній резерв", color: "bg-slate-200 text-slate-700" },
];

const precedents = [
  { name: "WFP Building Blocks", sector: "Blockchain", proof: "Blockchain-based aid delivery at scale (Jordan, Bangladesh)" },
  { name: "UNHCR Stellar Aid Ukraine", sector: "Fintech", proof: "Crypto-based direct cash transfers до переселенців України" },
  { name: "Oxfam UnBlocked Cash", sector: "Blockchain", proof: "Децентралізований розподіл допомоги, пілот Vanuatu" },
  { name: "Dutch Relief Alliance", sector: "Координація", proof: "Спільна модель координації гуманітарного реагування" },
  { name: "UK IAPT Programme", sector: "Нац. MH", proof: "Stepped-care модель у масштабі мільйонів (NHS England)" },
];

export default function ForDonors() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50 to-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container"
        >
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
            Комісія платформи: 7% → 3% дегресивна. Потрібно $3M/місяць для blockchain.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/referral">
              <Button size="lg">
                Стати партнером
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/data">
              <Button variant="outline" size="lg">
                Відкриті дані <BarChart3 className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Key numbers */}
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

      {/* Audience Cards */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-10 text-center">Цінність для кожного партнера</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {audiences.map((aud, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
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

      {/* Reverse Waterfall */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-3 text-center">Reverse Waterfall</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Порядок фінансування знизу вгору: донор заповнює розрив, а не весь бюджет.
            Local ownership першочергово.
          </p>
          <div className="max-w-xl mx-auto space-y-3">
            {financingModel.map((level, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center gap-4 p-4 rounded-xl border ${level.color}`}
                style={{ marginLeft: `${i * 20}px` }}
              >
                <Badge className={level.color + " shrink-0"}>{level.label}</Badge>
                <div>
                  <div className="font-semibold text-sm">{level.title}</div>
                  <div className="text-xs text-muted-foreground">{level.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Precedents */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-3 text-center">Верифіковані прецеденти</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            Аналогічні підходи вже доведені в полі. FEEL Again — системна інтеграція цих рішень.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 font-semibold">Прецедент</th>
                  <th className="text-left p-3 font-semibold">Сектор</th>
                  <th className="text-left p-3 font-semibold">Що доводить</th>
                </tr>
              </thead>
              <tbody>
                {precedents.map((p, i) => (
                  <tr key={i} className="border-t hover:bg-slate-50">
                    <td className="p-3 font-medium">{p.name}</td>
                    <td className="p-3"><Badge variant="outline">{p.sector}</Badge></td>
                    <td className="p-3 text-muted-foreground">{p.proof}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Джерело: Grand Bargain 3.0, IASC, WHO pptx slide 5
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Стати партнером FEEL Again</h2>
          <p className="text-primary-foreground/80 mb-8">
            Від Train for Care когорти (€75K) до стратегічного партнерства.
            Кожен рівень — з прозорою звітністю та вимірюваним впливом.
          </p>
          <Link href="/referral">
            <Button variant="secondary" size="lg">
              Запит на партнерство <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
