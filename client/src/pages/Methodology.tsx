import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  UserPlus, Stethoscope, ClipboardCheck, 
  PlayCircle, Percent, CheckCircle,
  ArrowRight, 
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
        <h1 className="text-4xl font-bold mb-8">Перебіг подій залежно від тригерів</h1>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <img
              src="https://images.unsplash.com/photo-1612538498456-e861df91d4d0"
              alt="Чоловік ветеран на консультації"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Процес реабілітації</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Покроковий шлях відновлення з чіткими тригерами та діями на кожному етапі,
              що забезпечує прозорість та ефективність процесу.
            </p>
          </div>
        </div>

        {/* Client Journey Flow Chart */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Етапи процесу</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clientJourneySteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="group transition-all duration-300 hover:shadow-lg">
                  <CardContent className="pt-6">
                    <step.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>

                    {/* Hover Details */}
                    <div className="absolute inset-0 bg-background/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                      <p className="text-sm">{step.details}</p>
                    </div>
                  </CardContent>
                </Card>
                {index < clientJourneySteps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="text-primary w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="relative overflow-hidden group">
            <CardContent className="pt-6">
              <Brain className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Evidence-Based Methods</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Cognitive Behavioral Therapy</li>
                <li>EMDR Trauma Treatment</li>
                <li>Somatic Experience</li>
                <li>Group Support Sessions</li>
              </ul>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-sm">
                  All methods are WHO-approved and adapted for conflict zones
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group">
            <CardContent className="pt-6">
              <Activity className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Treatment Process</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Initial Assessment</li>
                <li>Customized Treatment Plan</li>
                <li>Regular Progress Review</li>
                <li>Family Integration</li>
              </ul>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-sm">
                  Personalized approach with continuous monitoring
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group">
            <CardContent className="pt-6">
              <LineChart className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Outcome Tracking</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Symptom Monitoring</li>
                <li>Quality of Life Measures</li>
                <li>Functional Improvement</li>
                <li>Family Feedback</li>
              </ul>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-sm">
                  Regular assessment of treatment effectiveness
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="prose prose-lg max-w-none">
          <h2>Забезпечення якості</h2>
          <p>
            Всі методи терапії затверджені Всесвітньою організацією охорони здоров'я
            та адаптовані для роботи в умовах військового конфлікту:
          </p>
          <ul>
            <li>Регулярна супервізія та професійний розвиток</li>
            <li>Оновлення методик на основі доказової медицини</li>
            <li>Культурно-компетентний підхід</li>
            <li>Принципи травма-інформованої допомоги</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}