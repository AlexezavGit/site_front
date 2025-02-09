import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  UserPlus, Stethoscope, ClipboardCheck, 
  PlayCircle, Percent, CheckCircle,
  ArrowRight, 
  Brain, Activity, LineChart
} from "lucide-react";

const clientJourneySteps = [
  {
    icon: UserPlus,
    title: "Реєстрація реципієнта",
    description: "Направлення цифрового ордера на Попередню діагностику",
    details: "Початок шляху реабілітації"
  },
  {
    icon: Stethoscope,
    title: "Результат діагностики",
    description: "Направлення цифрового ордера Сеанс до фахівця",
    details: "Професійна оцінка стану та потреб"
  },
  {
    icon: ClipboardCheck,
    title: "Затвердження діагнозу",
    description: "Направлення цифрового Ордера на курс рехабу",
    details: "Формування індивідуального плану реабілітації"
  },
  {
    icon: PlayCircle,
    title: "Перший сеанс курсу реабілітації",
    description: "Направлення цифрового Ордера Р2Р збір ресурсів",
    details: "Початок активної фази реабілітації"
  },
  {
    icon: Percent,
    title: "Проходження 25% курсу рехабу",
    description: "Направлення цифрового Ордера фінансування з гуманітарних бюджетів",
    details: "Оцінка прогресу та активація додаткової підтримки"
  },
  {
    icon: CheckCircle,
    title: "Завершення курсу реабілітації",
    description: "Направлення звіту донору та всім учасникам",
    details: "Відзначення успішного завершення програми та можливість привітати учасника"
  }
];

export default function Methodology() {
  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Перебіг подій залежно від тригерів</h1>

        {/* Client Journey Flow Chart */}
        <div className="mb-12">
          <div className="grid grid-cols-1 gap-8">
            {clientJourneySteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="group transition-all duration-300 hover:shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <div className="flex-shrink-0">
                        <step.icon className="h-12 w-12 text-primary" />
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground text-base md:text-lg">{step.description}</p>
                      </div>
                    </div>

                    {/* Hover Details */}
                    <div className="absolute inset-0 bg-background/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                      <p className="text-base md:text-lg">{step.details}</p>
                    </div>
                  </CardContent>
                </Card>
                {index < clientJourneySteps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <ArrowRight className="text-primary w-8 h-8 transform rotate-90 md:rotate-0" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Brain className="h-12 w-12 text-primary mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-3">Оцінка</h3>
                <ul className="space-y-2 text-muted-foreground text-left">
                  <li>Анкета PTSD</li>
                  <li>Клінічне інтерв'ю</li>
                  <li>Оцінка травми</li>
                  <li>Сімейна підтримка</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Activity className="h-12 w-12 text-primary mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-3">Терапія</h3>
                <ul className="space-y-2 text-muted-foreground text-left">
                  <li>КПТ терапія</li>
                  <li>EMDR терапія</li>
                  <li>Групова підтримка</li>
                  <li>Сімейне консультування</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <LineChart className="h-12 w-12 text-primary mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-3">Моніторинг</h3>
                <ul className="space-y-2 text-muted-foreground text-left">
                  <li>Відстеження прогресу</li>
                  <li>Моніторинг симптомів</li>
                  <li>Вимірювання результатів</li>
                  <li>Довгострокове спостереження</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-center">Забезпечення якості</h2>
          <p className="text-center text-lg">
            Всі методи терапії затверджені Всесвітньою організацією охорони здоров'я
            та адаптовані для роботи в умовах військового конфлікту
          </p>
        </div>
      </motion.div>
    </div>
  );
}