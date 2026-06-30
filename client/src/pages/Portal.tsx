import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  Search, Stethoscope, ClipboardCheck, Eye,
  ArrowRight, BarChart3, Globe, ArrowLeftRight, ExternalLink
} from "lucide-react";

const NAVY = "#0F2B46";
const GOLD = "#D4A017";

const gatewayQuestions = [
  {
    id: "beneficiary",
    icon: Search,
    question: "Бажаю анонімно діагностуватися",
    description: "Оцініть свій стан, знайдіть підтримку та запишіться на програму — без обов'язкової реєстрації.",
    cta: "Розпочати діагностику",
    href: "/portal/beneficiary",
    color: "bg-rose-50 border-rose-200",
    badge: "Бенефіціар · Клієнт · Пацієнт",
    badgeColor: "bg-rose-100 text-rose-800",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    btnStyle: { background: "#F43F5E", color: "white", border: "none" },
  },
  {
    id: "provider",
    icon: Stethoscope,
    question: "Маю наміри надавати фахову допомогу",
    description: "Реєстрація фахівця, доступ до програм фінансування, керування клієнтами, звітність та розвиток.",
    cta: "Увійти як фахівець",
    href: "/portal/provider",
    color: "bg-teal-50 border-teal-200",
    badge: "Надавач · Фахівець",
    badgeColor: "bg-teal-100 text-teal-800",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    btnStyle: { background: "#14B8A6", color: "white", border: "none" },
  },
  {
    id: "donor",
    icon: ClipboardCheck,
    question: "Поцікавитись цифровим контролем трансакцій",
    description: "Програми фінансування, моніторинг витрат, верифікований аудит ланцюга допомоги та імпакт-звітність.",
    cta: "Увійти як донор",
    href: "/portal/donor",
    color: "bg-amber-50 border-amber-200",
    badge: "Донор · Меценат · КСВ · Актор",
    badgeColor: "bg-amber-100 text-amber-800",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    btnStyle: { background: GOLD, color: NAVY, border: "none", fontWeight: 600 },
  },
  {
    id: "auditor",
    icon: Eye,
    question: "Аудит та громадський контроль",
    description: "Незалежна верифікація звітів, моніторинг комплаєнсу та прозорість використання гуманітарних ресурсів.",
    cta: "Увійти як аудитор",
    href: "/portal/auditor",
    color: "bg-violet-50 border-violet-200",
    badge: "Аудитор · Супервайзер · Агент",
    badgeColor: "bg-violet-100 text-violet-800",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    btnStyle: { background: "#7C3AED", color: "white", border: "none" },
  },
];

const externalPaths = [
  {
    icon: Globe,
    label: "Дослідити Програму FEEL Again",
    desc: "Повна документація, архітектура рішення та інфографіка для інституційних партнерів.",
    href: "https://program.feelagain.me",
    linkLabel: "program.feelagain.me",
  },
  {
    icon: BarChart3,
    label: "Дані та інсайти",
    desc: "Агрегована аналітика, моніторинг програм та верифіковані результати в реальному часі.",
    href: "https://dashboard-1q7.pages.dev/",
    linkLabel: "dashboard.feelagain.me",
  },
];

export default function Portal() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-20 text-white" style={{ background: `linear-gradient(135deg, #091d30 0%, ${NAVY} 60%, #162944 100%)` }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">Кабінети FEEL Again</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-5">
              Оберіть свій <span style={{ color: GOLD }}>шлях</span>
            </h1>
            <p className="text-lg mb-6" style={{ color: "rgba(255,255,255,0.70)" }}>
              Чотири ролі — єдина цифрова інфраструктура. Кожен шлях веде до персоналізованого кабінету.
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.40)" }}>
              Вже маєте обліковий запис? Увійдіть до свого кабінету нижче.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4 Gateway cards */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {gatewayQuestions.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card className={`h-full border-2 ${item.color} transition-all duration-300 ${hoveredCard === item.id ? "shadow-xl -translate-y-1" : ""}`}>
                  <CardContent className="pt-6 flex flex-col h-full">
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`p-2.5 rounded-xl ${item.iconBg} ${item.iconColor} shrink-0`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <Badge className={`${item.badgeColor} text-[10px] leading-tight`}>{item.badge}</Badge>
                    </div>
                    <h3 className="text-lg font-bold mb-2 leading-snug">{item.question}</h3>
                    <p className="text-sm text-muted-foreground mb-6 flex-1">{item.description}</p>
                    <Link href={item.href}>
                      <button className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-opacity hover:opacity-90" style={item.btnStyle}>
                        {item.cta} <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Додаткові шляхи */}
      <section className="py-8 border-t border-b border-slate-100 bg-slate-50">
        <div className="container">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">Також</p>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {externalPaths.map((path, i) => (
              <a key={i} href={path.href} target="_blank" rel="noopener noreferrer" className="no-underline">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="rounded-xl p-5 flex items-start gap-4 bg-white border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
                >
                  <div className="p-2.5 rounded-lg shrink-0" style={{ background: "rgba(15,43,70,0.06)" }}>
                    <path.icon className="w-5 h-5" style={{ color: NAVY }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm" style={{ color: NAVY }}>{path.label}</span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{path.desc}</p>
                    <span className="text-xs font-mono" style={{ color: GOLD }}>{path.linkLabel}</span>
                  </div>
                </motion.div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Мульти-роль */}
      <section className="py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <ArrowLeftRight className="w-5 h-5" style={{ color: GOLD }} />
              <h3 className="text-base font-semibold">Мульти-роль</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Всередині кабінету можна перемикати ролі. Фахівець може також бути бенефіціаром певної програми,
              а донор — мати супервізорський або аудиторський доступ.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
