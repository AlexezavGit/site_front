import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  Heart, Users, Shield, ArrowRight, BarChart3, Stethoscope,
  Search, ClipboardCheck, Activity, ArrowLeftRight, Sparkles
} from "lucide-react";

const gatewayQuestions = [
  {
    id: "beneficiary",
    icon: Search,
    question: "Бажаю анонімно діагностуватися",
    description: "Оцініть свій стан, знайдіть підтримку та запишіться на програму фінансування — без обов'язкової реєстрації.",
    cta: "Розпочати діагностику",
    href: "/portal/beneficiary",
    color: "bg-rose-50 border-rose-200",
    badge: "bg-rose-100 text-rose-800",
    iconColor: "text-rose-600"
  },
  {
    id: "provider",
    icon: Stethoscope,
    question: "Маю наміри надавати фахову допомогу",
    description: "Реєстрація фахівця, доступ до програм фінансування, керування пацієнтами, звітність та професійний розвиток.",
    cta: "Увійти як фахівець",
    href: "/portal/provider",
    color: "bg-teal-50 border-teal-200",
    badge: "bg-teal-100 text-teal-800",
    iconColor: "text-teal-600"
  },
  {
    id: "donor",
    icon: ClipboardCheck,
    question: "Поцікавитись цифровим контролем трансакцій",
    description: "Створення програм фінансування, моніторинг витрат, імпакт-звітність та верифікований аудит ланцюга допомоги.",
    cta: "Увійти як донор",
    href: "/portal/donor",
    color: "bg-amber-50 border-amber-200",
    badge: "bg-amber-100 text-amber-800",
    iconColor: "text-amber-600"
  }
];

export default function Portal() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0F2B46] to-slate-800 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4 bg-white/10 text-white border-white/20">
              <Shield className="w-3 h-3 mr-1" />
              Портал користувачів
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-5">
              Кабінети <span className="text-[#D4A017]">FEEL Again</span>
            </h1>
            <p className="text-lg text-white/70 mb-8">
              Три шляхи — один конектор. Оберіть свій шлях для доступу до функцій,
              персональних калькуляторів та даних.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-white/50">
              <BarChart3 className="w-4 h-4" />
              <span>Відкрити аналітику та дашборд — </span>
              <a href="https://dashboard-1q7.pages.dev/" target="_blank" rel="noopener noreferrer" className="text-[#D4A017] hover:underline">
                dashboard.feelagain.me
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gateway Questions */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Оберіть свій шлях</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              FEEL Again поєднує трьох акторів через єдину цифрову інфраструктуру.
              Кожен шлях веде до персоналізованого кабінету.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {gatewayQuestions.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card className={`h-full border-2 ${item.color} transition-all duration-300 ${hoveredCard === item.id ? 'shadow-lg scale-[1.02]' : ''}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl bg-white ${item.iconColor}`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <Badge className={item.badge}>
                        {item.id === 'beneficiary' ? 'Отримувач' : item.id === 'provider' ? 'Надавач' : 'Донор'}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.question}</h3>
                    <p className="text-sm text-muted-foreground mb-6">{item.description}</p>
                    <Link href={item.href}>
                      <Button className="w-full">
                        {item.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-role info */}
      <section className="py-12 bg-slate-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <ArrowLeftRight className="w-5 h-5 text-[#D4A017]" />
              <h3 className="text-lg font-semibold">Мульти-роль</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Всередині кабінету можна перемикати ролі. Наприклад, фахівець може також
              бути бенефіціаром певної програми, а донор — мати супервізорський доступ.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
