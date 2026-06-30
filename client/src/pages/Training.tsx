import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  ArrowRight, GraduationCap, Award, Users, Clock,
  CheckCircle2, BookOpen, TrendingUp, Shield, Zap,
  Globe, Heart, Building2, Lightbulb, Target
} from "lucide-react";

const trainForCare = {
  title: "Train for Care",
  budget: "€75,605",
  perPerson: "€3,780 / особу",
  cohort: "20 осіб / когорта",
  roi: "2.22×",
  duration: "6 місяців",
  description: "Флагманська програма підготовки практиків. Від навчання до верифікованої практики під супервізією. Кожна когорта — інвестиція для KSV-партнерів із задокументованим ROI.",
};

const tracks = [
  {
    icon: BookOpen,
    title: "Базовий рівень",
    subtitle: "MHPSS Foundations",
    duration: "3 місяці",
    audience: "Первинна ланка, волонтери, peer support",
    tools: ["Психологічна перша допомога (ПМД)", "Базові навички активного слухання", "mhGAP Intervention Guide", "Розпізнавання кризових станів"],
    outcome: "Сертифікат ПМД + реєстрація в FEEL Again",
    color: "border-blue-200",
  },
  {
    icon: Award,
    title: "Клінічний рівень",
    subtitle: "Clinical Practitioner",
    duration: "6 місяців",
    audience: "Психологи, психотерапевти, соціальні працівники",
    tools: ["PHQ-9 / GAD-7 / PCL-5 — стандартизовані інструменти", "КПТ (когнітивно-поведінкова терапія)", "EMDR (обробка травматичного досвіду)", "Супервізія 1:1 + групова"],
    outcome: "Clinical Proof-of-Stake: 10 верифікованих кейсів → доступ до фінансування",
    color: "border-green-200",
  },
  {
    icon: Shield,
    title: "Супервізорський рівень",
    subtitle: "Supervisor / Trainer",
    duration: "12 місяців",
    audience: "Досвідчені клініцисти, академічні фахівці, діаспора",
    tools: ["Клінічна супервізія (індивідуальна і групова)", "Навчання тренерів (ToT)", "Дистанційна супервізія через платформу", "Акредитація UPRA / міжнародна"],
    outcome: "Акредитований супервізор FEEL Again. Дохід за годину супервізії.",
    color: "border-purple-200",
  },
  {
    icon: TrendingUp,
    title: "VR-терапія",
    subtitle: "BRAVEMIND Operator",
    duration: "2 місяці (спеціалізація)",
    audience: "Клінічні фахівці з базовим рівнем",
    tools: ["VR Exposure Therapy (BRAVEMIND — USC ICT)", "Meta Quest 3 — технічне використання", "Протоколи VR для ПТСР", "Мультиплікатор: 1:25 → 1:200+"],
    outcome: "Сертифікований оператор VR-терапії. $12.50 / сесія (з розподілом із USC ICT).",
    color: "border-amber-200",
  },
];

const clinicalTools = [
  { name: "PHQ-9", desc: "Patient Health Questionnaire — скринінг депресії (9 питань)", source: "WHO validated" },
  { name: "GAD-7", desc: "Generalized Anxiety Disorder — оцінка тривожності (7 питань)", source: "WHO validated" },
  { name: "PCL-5", desc: "PTSD Checklist — DSM-5 сумісний, для ПТСР (20 питань)", source: "VA / NCPTSD" },
  { name: "WHO QoL", desc: "World Health Organization Quality of Life — загальний добробут", source: "WHO validated" },
  { name: "CORE-OM", desc: "Clinical Outcomes in Routine Evaluation — загальний дистрес", source: "CORE IMS" },
  { name: "mhGAP-IG", desc: "Mental Health Gap Action Programme — протоколи для первинної ланки", source: "WHO mhGAP" },
];

export default function Training() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container"
        >
          <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">Підвищення кваліфікації</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 max-w-3xl">
            Навчання та<br />
            <span className="text-primary">міжнародно визнана</span><br />
            сертифікація
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            Програма підготовки фахівців MHPSS — від базових навичок до клінічної практики
            та супервізії. Усі рівні базуються на валідованих WHO інструментах. Кожен крок —
            верифікований і прив'язаний до доступу до фінансування.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/referral">
              <Button size="lg">
                Записатися на програму
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pro">
              <Button variant="outline" size="lg">
                Для фахівців
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Train for Care highlight */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">Флагманська програма</Badge>
              <h2 className="text-3xl font-bold mb-4">{trainForCare.title}</h2>
              <p className="text-white/70 mb-6">{trainForCare.description}</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Бюджет когорти", val: trainForCare.budget },
                  { label: "Вартість / особу", val: trainForCare.perPerson },
                  { label: "Розмір когорти", val: trainForCare.cohort },
                  { label: "ROI для КСВ-партнера", val: trainForCare.roi },
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 rounded-xl p-4">
                    <div className="text-xl font-bold text-white mb-1">{item.val}</div>
                    <div className="text-xs text-white/60">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white/80">Канонічні дані Train for Care</h3>
              <ul className="space-y-3">
                {[
                  "Статус: CANONICAL (Doc 4, §4)",
                  "Тривалість: 6 місяців на когорту",
                  "Супервізія включена в бюджет",
                  "Вихід: Clinical Proof-of-Stake (10 верифік. кейсів)",
                  "КСВ-партнер отримує звіт та публічне визнання",
                  "Модуль масштабування: від 1 до N когорт",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Training Tracks */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-3 text-center">Треки підготовки</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Чотири рівні — від першої допомоги до спеціалізованої VR-терапії.
            Кожен рівень дає конкретний верифікований результат.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {tracks.map((track, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`h-full border-2 ${track.color}`}>
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <track.icon className="h-8 w-8 text-primary mt-1 shrink-0" />
                      <div>
                        <CardTitle className="text-lg">{track.title}</CardTitle>
                        <p className="text-sm text-primary font-medium">{track.subtitle}</p>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />{track.duration}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Users className="h-3 w-3 mr-1" />{track.audience}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Інструменти та методи:</p>
                      <ul className="space-y-1.5">
                        {track.tools.map((tool, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-600 mt-0.5 shrink-0" />
                            <span>{tool}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                        <GraduationCap className="h-3.5 w-3.5 inline mr-1" />Результат:
                      </p>
                      <p className="text-sm font-medium">{track.outcome}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Tools */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-3 text-center">Клінічний інструментарій</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Усі інструменти валідовані WHO та інтегровані в платформу FEEL Again.
            Кожна сесія фіксується — дані формують єдиний національний набір.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {clinicalTools.map((tool, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-primary">{tool.name}</h3>
                    <Badge variant="outline" className="text-xs">{tool.source}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{tool.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Готові розпочати?</h2>
          <p className="text-primary-foreground/80 mb-8">
            Реєстрація відкрита для всіх потоків. Після реєстрації — персональний менеджер
            визначить оптимальний трек та старт когорти.
          </p>
          <Link href="/referral">
            <Button variant="secondary" size="lg">
              Записатися на програму <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
