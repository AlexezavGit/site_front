import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  ArrowRight, Heart, CheckCircle2, Shield, Phone,
  MapPin, Clock, Users, Star, ChevronRight,
  Stethoscope, Calculator, Share2
} from "lucide-react";

const NAVY = "#0F2B46";

const steppedCare = [
  {
    level: "Рівень 1",
    title: "Психологічна перша допомога",
    desc: "Базова емоційна підтримка для всіх. Peer support, гаряча лінія, ресурси самодопомоги.",
    who: "Волонтери, peer support, ПМД-фахівці",
    tools: ["Гаряча лінія підтримки", "Чат-бот тріаж", "Ресурси самодопомоги", "Групи підтримки"],
    color: "border-green-200 bg-green-50",
    badge: "Для всіх",
    badgeColor: "bg-green-100 text-green-800",
  },
  {
    level: "Рівень 2",
    title: "Індивідуальна психологічна підтримка",
    desc: "Робота з фахівцем — оцінка стану, розробка плану підтримки, короткострокова підтримка.",
    who: "Психологи, соціальні працівники",
    tools: ["PHQ-9 / GAD-7 скринінг", "Індивідуальні сесії", "Онлайн і офлайн формати", "Гнучкий розклад"],
    color: "border-blue-200 bg-blue-50",
    badge: "Сесії",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    level: "Рівень 3",
    title: "Клінічна психотерапія",
    desc: "Структурований курс психотерапії для осіб із клінічно значущими симптомами ПТСР, депресії, тривоги.",
    who: "Сертифіковані психотерапевти (FEEL Again)",
    tools: ["КПТ курс (8–16 сесій)", "EMDR терапія", "PCL-5 моніторинг прогресу", "Супервізована практика"],
    color: "border-purple-200 bg-purple-50",
    badge: "Курс терапії",
    badgeColor: "bg-purple-100 text-purple-800",
  },
  {
    level: "Рівень 4",
    title: "VR-терапія BRAVEMIND",
    desc: "Інноваційна VR Exposure Therapy для ПТСР — технологія USC ICT (Університет Південної Каліфорнії). Мультиплікатор: 1:25 → 1:200+",
    who: "Сертифіковані оператори VR-терапії",
    tools: ["BRAVEMIND протокол", "Meta Quest 3 обладнання", "PCL-5 pre/post вимірювання", "$12.50 / сесія (субсидована)"],
    color: "border-amber-200 bg-amber-50",
    badge: "VR-терапія",
    badgeColor: "bg-amber-100 text-amber-800",
  },
];

const accessFeatures = [
  { icon: MapPin, title: "Незалежно від місця", desc: "Ресурси доступні незалежно від регіону, переміщення або статусу. ВПО, ветерани, цивільні — всі мають рівний доступ." },
  { icon: Clock, title: "Цифровий супровід", desc: "Платформа відстежує ваш шлях від першого звернення до завершення курсу. Ніяких втрат при зміні фахівця або регіону." },
  { icon: Shield, title: "Конфіденційність", desc: "GDPR-комплаєнс. Дані захищені. Ніхто не має доступу до вашої особистої інформації без вашої згоди." },
  { icon: Users, title: "Вибір фахівця", desc: "Алгоритм матчингу підбирає фахівця за вашим запитом, мовою, спеціалізацією та доступністю." },
  { icon: Heart, title: "Без стигми", desc: "Програма ТИ ЯК? та FEEL Again спільно формують культуру відкритості та підтримки ментального здоров'я." },
  { icon: Star, title: "Вимірювані результати", desc: "PHQ-9, GAD-7, PCL-5 — кожен крок вашого відновлення зафіксований і видимий вам та вашому фахівцю." },
];

const journey = [
  { step: "1", title: "Реєстрація", desc: "Заповніть форму онлайн або зверніться через гарячу лінію. Без черг." },
  { step: "2", title: "Скринінг", desc: "Чат-бот тріаж або первинна консультація. Визначення рівня підтримки." },
  { step: "3", title: "Матчинг", desc: "Підбір фахівця за вашим профілем, мовою та розкладом." },
  { step: "4", title: "Курс підтримки", desc: "Від PSS до клінічного курсу. Ваш план — ваш темп." },
  { step: "5", title: "Моніторинг", desc: "Регулярне відстеження прогресу. Коригування за потреби." },
  { step: "6", title: "Завершення / Підтримка", desc: "Звіт про завершення + опції подальшої підтримки та peer network." },
];

export default function ForBeneficiaries() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container"
        >
          <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">Бенефіціарам</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 max-w-3xl">
            Рівний доступ<br />
            <span className="text-primary">до якісної</span><br />
            психологічної допомоги
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            Незалежно від місця, доходу або статусу — кожен має право на ментальне здоров'я.
            FEEL Again з'єднує вас із сертифікованим фахівцем через прозору, цифрову систему.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/referral">
              <Button size="lg">
                <Phone className="mr-2 h-4 w-4" />
                Отримати підтримку зараз
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-purple-300 text-purple-700">
              Дізнатися про типи допомоги
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Stepped Care */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-3 text-center">Ступенева модель допомоги</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Ви отримуєте саме той рівень підтримки, який вам потрібен — не більше і не менше.
            Перехід між рівнями — плавний і керований фахівцем.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {steppedCare.map((level, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`h-full border-2 ${level.color}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">{level.level}</p>
                        <h3 className="text-lg font-bold">{level.title}</h3>
                      </div>
                      <Badge className={level.badgeColor}>{level.badge}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{level.desc}</p>
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Хто надає:</p>
                      <p className="text-sm font-medium">{level.who}</p>
                    </div>
                    <ul className="space-y-1.5">
                      {level.tools.map((tool, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                          <span>{tool}</span>
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

      {/* Journey */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-3 text-center">Ваш шлях у програмі</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            Від першого звернення до завершення — цифровий супровід на кожному кроці.
          </p>
          <div className="max-w-2xl mx-auto">
            {journey.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex gap-4 mb-6"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  {step.step}
                </div>
                <div className="pt-1.5">
                  <h3 className="font-bold text-base mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
                {i < journey.length - 1 && (
                  <div className="absolute" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Access Features */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-10 text-center">Чому FEEL Again</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessFeatures.map((feat, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <feat.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-bold mb-2">{feat.title}</h3>
                  <p className="text-sm text-muted-foreground">{feat.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      <section className="py-8 bg-red-50 border-y border-red-200">
        <div className="container text-center">
          <p className="font-bold text-red-700 mb-2">
            Якщо ви або хтось поруч у кризовій ситуації — телефонуйте негайно:
          </p>
          <p className="text-red-600 font-mono text-xl font-bold mb-2">
            <Phone className="inline h-5 w-5 mr-2" />
            Гаряча лінія: 0 800 505 010 (ТИ ЯК?)
          </p>
          <p className="text-sm text-red-500">Безкоштовно · 24/7 · Анонімно</p>
        </div>
      </section>

      {/* Cabinet teaser */}
      <section className="py-14" style={{ background: "#FAFBFC", borderTop: "1px solid #E5E7EB" }}>
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2" style={{ color: "#0F2B46" }}>Попередже кабінет бенефіціара</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Інтерактивні мокапи: діагностика, вибір фахівця, калькулятор кошторису, P2P-збір.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            <div className="rounded-xl p-5 border border-rose-200 bg-rose-50 text-center">
              <Stethoscope className="h-8 w-8 text-rose-600 mx-auto mb-3" />
              <h3 className="font-bold text-sm mb-1">Самодіагностика</h3>
              <p className="text-xs text-muted-foreground mb-3">3 питання — оцінка тривоги, сну, концентрації. Рекомендація до спеціаліста.</p>
              <Link href="/portal/beneficiary"><Button variant="outline" size="sm" className="w-full border-rose-400 text-rose-700">Перейти →</Button></Link>
            </div>
            <div className="rounded-xl p-5 border border-rose-200 bg-rose-50 text-center">
              <Calculator className="h-8 w-8 text-rose-600 mx-auto mb-3" />
              <h3 className="font-bold text-sm mb-1">Калькулятор кошторису</h3>
              <p className="text-xs text-muted-foreground mb-3">Кількість сеансів × вартість × співфінансування = самооплата.</p>
              <Link href="/portal/beneficiary"><Button variant="outline" size="sm" className="w-full border-rose-400 text-rose-700">Розрахувати →</Button></Link>
            </div>
            <div className="rounded-xl p-5 border border-rose-200 bg-rose-50 text-center">
              <Share2 className="h-8 w-8 text-rose-600 mx-auto mb-3" />
              <h3 className="font-bold text-sm mb-1">P2P-збір коштів</h3>
              <p className="text-xs text-muted-foreground mb-3">Створити кампанію, поширити серед друзів, відстежувати прогрес.</p>
              <Link href="/portal/beneficiary"><Button variant="outline" size="sm" className="w-full border-rose-400 text-rose-700">Розпочати →</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container max-w-xl mx-auto">
          <Heart className="h-12 w-12 mx-auto mb-4 text-white/80" />
          <h2 className="text-3xl font-bold mb-4">Зробіть перший крок</h2>
          <p className="text-primary-foreground/80 mb-8">
            Реєстрація займає 5 хвилин. Перша консультація — протягом 48 годин.
            Ваша конфіденційність захищена.
          </p>
          <Link href="/referral">
            <Button variant="secondary" size="lg">
              Зареєструватися <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
