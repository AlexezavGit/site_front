import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  Heart, Users, Shield, ArrowRight, BarChart3, Briefcase, Stethoscope
} from "lucide-react";

const roles = [
  {
    id: "donor",
    icon: Heart,
    title: "Донор / Гуманітарний актор",
    subtitle: "Фінансист, меценат, корпоративний філантроп",
    desc: "Скоринг ініціатив, створення програм фінансування, імпакт-калькулятор, дошка пошани.",
    color: "bg-amber-50 border-amber-200",
    badge: "bg-amber-100 text-amber-800",
    iconColor: "text-amber-600",
    href: "/portal/donor",
    features: ["Імпакт-калькулятор", "Скоринг ініціатив", "Програми фінансування", "Дошка пошани"]
  },
  {
    id: "provider",
    icon: Stethoscope,
    title: "Надавач послуг",
    subtitle: "Психолог, психіатр, гуманітарний актор",
    desc: "Циркулейшн фолдер, ренкінг, керування пацієнтами, калькулятор доходу.",
    color: "bg-teal-50 border-teal-200",
    badge: "bg-teal-100 text-teal-800",
    iconColor: "text-teal-600",
    href: "/portal/provider",
    features: ["Циркулейшн фолдер", "Ренкінг фахівця", "Керування пацієнтами", "Калькулятор доходу"]
  },
  {
    id: "beneficiary",
    icon: Users,
    title: "Бенефіціар",
    subtitle: "Той, хто потребує підтримку",
    desc: "Діагностика, вибір фахівця, калькулятор кошторису, P2P-збір, зниження виплат.",
    color: "bg-rose-50 border-rose-200",
    badge: "bg-rose-100 text-rose-800",
    iconColor: "text-rose-600",
    href: "/portal/beneficiary",
    features: ["Діагностика", "Вибір фахівця", "Калькулятор кошторису", "P2P-збір"]
  }
];

export default function Portal() {
  return (
    <div>
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4 bg-white/10 text-white border-white/20">
              <Shield className="w-3 h-3 mr-1" />
              Оберіть свою роль
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-5">
              Кабінети <span className="text-amber-400">FEEL Again</span>
            </h1>
            <p className="text-lg text-white/70 mb-8">
              Три шляхи — один конектор. Оберіть свої відповідальний інтерфейс для
              доступу до функцій, персональних калькуляторів та даних.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-white/50">
              <BarChart3 className="w-4 h-4" />
              <span>Відкрити аналітику та дашборд — </span>
              <a href="https://dashboard-1q7.pages.dev/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
                dashboard.feelagain.me
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-6">
            {roles.map((role, i) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`h-full border-2 ${role.color} hover:shadow-lg transition-shadow`}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl bg-white ${role.iconColor}`}>
                        <role.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <Badge className={role.badge}>{role.title.split(" / ")[0]}</Badge>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{role.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{role.subtitle}</p>
                    <p className="text-sm text-muted-foreground mb-4">{role.desc}</p>
                    <ul className="space-y-1.5 mb-6">
                      {role.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          <Briefcase className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={role.href}>
                      <Button className="w-full">
                        Увійти в кабінет
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
    </div>
  );
}
