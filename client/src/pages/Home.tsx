import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  ArrowRight, Shield, Users, Banknote, Heart,
  TrendingUp, Database, CheckCircle2, AlertCircle
} from "lucide-react";

const canonicalStats = [
  { value: "9.6M", label: "Людей у зоні ризику", source: "WHO, 2025", color: "text-red-600 bg-red-50 border-red-100" },
  { value: "74%", label: "Treatment Gap (ВПО)", source: "IOM/UNHCR 2023", color: "text-orange-600 bg-orange-50 border-orange-100" },
  { value: "117,652", label: "Сертифікатів mhGAP", source: "WHO Dashboard", color: "text-blue-600 bg-blue-50 border-blue-100" },
  { value: "42", label: "Практикують під супервізією", source: "PMC 2020 (6%)", color: "text-primary bg-primary/5 border-primary/20" },
  { value: "~$8B", label: "Втрат ВВП / рік", source: "OECD methodology", color: "text-slate-700 bg-slate-50 border-slate-200" },
  { value: "$137M", label: "Гуман. потоків / рік", source: "OCHA FTS + bilateral", color: "text-green-700 bg-green-50 border-green-100" },
];

const audienceCards = [
  {
    icon: Users,
    audience: "Фахівці та практиканти",
    tagline: "Справедлива платня. Визнання. Масштаб.",
    points: [
      "Вихід із тіні через Digital Corridor",
      "Міжнародно визнана сертифікація",
      "Гнучкий дохід ~3 год/тиждень",
    ],
    cta: "Фахівцям",
    href: "/pro",
    color: "border-blue-200 bg-blue-50/50 hover:border-blue-400",
  },
  {
    icon: Banknote,
    audience: "Донори та гуманітарні актори",
    tagline: "Де-ризиковане спів-фінансування.",
    points: [
      "Payment for Result: ресурси → за бенефіціаром",
      "Блокчейн-верифікований аудит-трейл",
      "Авто-звітність IATI / Grand Bargain",
    ],
    cta: "Донорам",
    href: "/donors",
    color: "border-green-200 bg-green-50/50 hover:border-green-400",
  },
  {
    icon: TrendingUp,
    audience: "Громади та КСВ",
    tagline: "Публічний контроль. Вимірюваний вплив.",
    points: [
      "Train for Care: €75K / 20 фахівців, ROI 2.22×",
      "P2P-кампанії та мобілізація ресурсів",
      "Прозора звітність у реальному часі",
    ],
    cta: "Партнерам",
    href: "/donors",
    color: "border-amber-200 bg-amber-50/50 hover:border-amber-400",
  },
  {
    icon: Heart,
    audience: "Бенефіціари",
    tagline: "Рівний доступ. Цифровий супровід.",
    points: [
      "Ступенева допомога від PSS до VR-терапії",
      "Ресурси не залежать від місця знаходження",
      "PHQ-9 / GAD-7 / PCL-5 — вимірювані результати",
    ],
    cta: "Отримати підтримку",
    href: "/beneficiaries",
    color: "border-purple-200 bg-purple-50/50 hover:border-purple-400",
  },
];

const gaps = [
  { num: "01", title: "Кадровий", desc: "117,652 сертифікатів mhGAP → лише 42 практикують. Масове навчання без інфраструктури = папір, не фахівці." },
  { num: "02", title: "Економічний", desc: "89% держбюджету MH → стаціонар. 71% пацієнтів потребують амбулаторну допомогу. Гроші йдуть за будівлями, не за пацієнтом." },
  { num: "03", title: "Доступу", desc: "3.9M потребують допомоги. 4,000 фахівців обслуговують 100,000/рік = 1% потреби. Навчання не масштабується." },
  { num: "04", title: "Тіньової економіки", desc: "~8,000 приватних фахівців без сертифікації, без видимості для держави, без інститут. фінансування." },
  { num: "05", title: "Інтеграції", desc: "$137M/рік через фрагментовані канали. ~0% синхронізації з ЕСОЗ. 450+ організацій координуються через Excel." },
  { num: "06", title: "Підзвітності", desc: "Inputs фінансуються. Outputs звітуються. Outcomes — невидимі. Донори фінансують прогнози, не результати." },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-blue-50/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container"
        >
          <div className="max-w-4xl">
            <Badge className="mb-5 bg-primary/10 text-primary border-primary/20 text-sm px-3 py-1">
              Гуманітарна програма MHPSS · Україна
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Рівний доступ до послуг<br />
              <span className="text-primary">психологічної реабілітації</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-5">
              FEEL Again — це цифрова інфраструктура, що з'єднує три роз'єднані сектори надавачів
              з бенефіціарами через єдиний довірений цифровий шар. Не маркетплейс — фінансові рейки
              для сектору MHPSS.
            </p>
            <p className="text-base text-muted-foreground max-w-3xl mb-10 italic">
              «FEEL Again — це Visa гуманітарного сектору психічного здоров'я. Не надає терапію —
              надає рейки, якими терапія протікає прозоро, підзвітно та масштабно.»
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/beneficiaries">
                <Button size="lg">
                  Отримати підтримку
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pro">
                <Button variant="outline" size="lg">
                  Я фахівець
                </Button>
              </Link>
              <Link href="/donors">
                <Button variant="outline" size="lg">
                  Я донор / партнер
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Canonical Stats Strip */}
      <section className="py-10 bg-slate-50 border-y">
        <div className="container">
          <div className="flex items-center gap-2 mb-5">
            <Database className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              Канонічний датасет · Doc 4 · Єдине джерело правди для всіх цифр програми
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {canonicalStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`text-center border rounded-xl p-4 ${stat.color}`}
              >
                <div className={`text-2xl md:text-3xl font-bold mb-1`}>{stat.value}</div>
                <div className="text-xs font-semibold mb-1 leading-tight">{stat.label}</div>
                <div className="text-xs opacity-70">{stat.source}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Audience Value Props */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Ціннісна пропозиція</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Програма впливає на чотири групи стейкхолдерів. Кожна отримує свою конкретну цінність.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {audienceCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`h-full border-2 transition-all duration-200 ${card.color}`}>
                  <CardContent className="pt-6 flex flex-col h-full">
                    <card.icon className="h-9 w-9 text-primary mb-3" />
                    <h3 className="text-base font-bold mb-1">{card.audience}</h3>
                    <p className="text-sm text-muted-foreground mb-4 italic">{card.tagline}</p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {card.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={card.href}>
                      <Button variant="outline" size="sm" className="w-full">
                        {card.cta} <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem - dark section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Чому існує FEEL Again</h2>
            <div className="bg-white/10 rounded-2xl p-7 mb-6 font-mono">
              <p className="text-white/60 text-sm mb-3">Структурне пляшкове горлечко:</p>
              <p className="text-lg text-white">
                1 терапевт × 25 пацієнтів/тиждень × 50 тижнів ={" "}
                <span className="text-yellow-300 font-bold">1,250 / рік</span>
              </p>
              <p className="mt-2 text-lg text-white">
                ~4,000 фахівців × 25/тиждень ≈{" "}
                <span className="text-yellow-300 font-bold">100,000 людей / рік</span>
              </p>
              <p className="mt-3 text-2xl font-bold text-red-300">
                = 1% від 9.6M, які потребують допомоги
              </p>
            </div>
            <p className="text-white/70">
              Навчання не може закрити цю прогалину. Єдине рішення — змінити <strong className="text-white">співвідношення</strong>.
              Це потребує інфраструктури, а не більшої кількості терапевтів.
            </p>
          </div>
        </div>
      </section>

      {/* 6 Gaps */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">6 Системних розривів</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Шість GAPs — це симптоми однієї структурної відсутності: Missing Middle між
              первинною та психіатричною допомогою.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {gaps.map((gap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl font-black text-primary/20 leading-none">{gap.num}</span>
                      <div>
                        <h3 className="font-bold text-base mb-2">GAP {gap.num}: {gap.title}</h3>
                        <p className="text-sm text-muted-foreground">{gap.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/about">
              <Button variant="outline">
                Детальніше про програму <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Program Summary Bar */}
      <section className="py-12 bg-primary text-white">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">3 кластери</div>
              <div className="text-primary-foreground/80 text-sm">12 проєктів: A, B, C</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">$1,945K</div>
              <div className="text-primary-foreground/80 text-sm">Unified Program Matrix</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">$0.00</div>
              <div className="text-primary-foreground/80 text-sm">Вартість для держави</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">7% → 3%</div>
              <div className="text-primary-foreground/80 text-sm">Дегресивна комісія платформи</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <AlertCircle className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-bold text-lg mb-2">Потрібна допомога?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ступенева програма підтримки — від першої консультації до клінічної реабілітації.
                </p>
                <Link href="/beneficiaries">
                  <Button className="w-full">Бенефіціарам →</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 text-green-700 mb-3" />
                <h3 className="font-bold text-lg mb-2">Ви фахівець?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Вийдіть із тіні. Отримайте сертифікацію, доступ до пацієнтів і стале фінансування.
                </p>
                <Link href="/pro">
                  <Button variant="outline" className="w-full border-green-400 text-green-700 hover:bg-green-100">Фахівцям →</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="pt-6">
                <Shield className="h-8 w-8 text-amber-600 mb-3" />
                <h3 className="font-bold text-lg mb-2">Хочете підтримати?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Де-ризиковане співфінансування. Прозора підзвітність. Вимірюваний вплив.
                </p>
                <Link href="/donors">
                  <Button variant="outline" className="w-full border-amber-400 text-amber-700 hover:bg-amber-100">Донорам →</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
