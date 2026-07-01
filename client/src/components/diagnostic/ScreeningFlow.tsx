import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2, AlertTriangle, AlertCircle, ArrowRight,
  Brain, Heart, Shield, ChevronRight, RefreshCw,
  Building2, UserCheck, PhoneCall, Stethoscope
} from "lucide-react";
import { PHQ9_QUESTIONS, FREQUENCY_OPTIONS, getPHQ9Severity } from "./PHQ9";
import { GAD7_QUESTIONS, GAD7_OPTIONS, getGAD7Severity } from "./GAD7";
import { PCL5_QUESTIONS, PCL5_OPTIONS, getPCL5Severity } from "./PCL5";

type Stage = "intro" | "phq9" | "gad7" | "pcl5" | "triage" | "done";

interface ScaleResult {
  score: number;
  severity: { label: string; color: string; route: string };
}

interface TriageResult {
  phq9: ScaleResult;
  gad7: ScaleResult;
  pcl5: ScaleResult;
  finalRoute: string;
  routeLabel: string;
  routeColor: string;
  routeIcon: any;
  routeDescription: string;
  primaryScale: string;
}

function getRouteDetails(route: string) {
  switch (route) {
    case "no_intervention":
      return {
        label: "Перенаправлення до громади",
        color: "text-green-700",
        bg: "bg-green-50 border-green-200",
        icon: CheckCircle2,
        description: "Показники в межах норми. Рекомендовано ресурси самодопомоги, групи підтримки та психоосвіту. Повторний скринінг через 3 місяці.",
        action: "Ресурси самодопомоги"
      };
    case "self_help":
      return {
        label: "Психоосвіта та самодопомога",
        color: "text-yellow-700",
        bg: "bg-yellow-50 border-yellow-200",
        icon: Heart,
        description: "Легкий рівень симптоматики. Рекомендовані структуровані матеріали самодопомоги, психоосвіта, групи підтримки. Моніторинг стану.",
        action: "Ресурси та підтримка"
      };
    case "mid_level":
      return {
        label: "Фахівець середньої ланки",
        color: "text-orange-700",
        bg: "bg-orange-50 border-orange-200",
        icon: UserCheck,
        description: "Помірний рівень симптоматики. Направлення до психолога / психотерапевта в приватній практиці або амбулаторному центрі ПМСД.",
        action: "Обрати фахівця"
      };
    case "specialist":
      return {
        label: "Спеціалізована психологічна допомога",
        color: "text-red-700",
        bg: "bg-red-50 border-red-200",
        icon: Stethoscope,
        description: "Значний рівень симптоматики. Необхідна консультація верифікованого клінічного психолога / психотерапевта з досвідом у роботі з травмою.",
        action: "Терміново записатись"
      };
    case "psychiatry":
      return {
        label: "Психіатрична допомога (стаціонар / ПНД)",
        color: "text-red-900",
        bg: "bg-red-100 border-red-400",
        icon: Building2,
        description: "Тяжкий рівень симптоматики. Необхідна невідкладна консультація психіатра. Можливе стаціонарне лікування. Контактуйте з Центром психічного здоров'я.",
        action: "Отримати направлення"
      };
    default:
      return {
        label: "Консультація фахівця",
        color: "text-slate-700",
        bg: "bg-slate-50 border-slate-200",
        icon: PhoneCall,
        description: "Рекомендовано звернутись до фахівця для отримання індивідуальної оцінки.",
        action: "Записатись"
      };
  }
}

function computeFinalRoute(phq9Route: string, gad7Route: string, pcl5Route: string): string {
  const hierarchy = ["psychiatry", "specialist", "mid_level", "self_help", "no_intervention"];
  const worst = [phq9Route, gad7Route, pcl5Route].reduce((a, b) =>
    hierarchy.indexOf(a) < hierarchy.indexOf(b) ? a : b
  );
  return worst;
}

function QuestionnaireStep({
  title, subtitle, icon: Icon, color, questions, options,
  onComplete, totalQuestions
}: {
  title: string; subtitle: string; icon: any; color: string;
  questions: string[]; options: { label: string; value: number }[];
  onComplete: (answers: number[]) => void; totalQuestions: number;
}) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (val: number) => {
    const newAnswers = [...answers, val];
    if (current + 1 < questions.length) {
      setAnswers(newAnswers);
      setCurrent(c => c + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const progress = ((current) / questions.length) * 100;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-base text-slate-800">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <Badge variant="outline" className="ml-auto text-xs">{current + 1} / {questions.length}</Badge>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-2">
        <motion.div className="h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%`, background: color.includes("blue") ? "#3b82f6" : color.includes("emerald") ? "#10b981" : "#6366f1" }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-xs text-muted-foreground mb-1">
        Протягом останніх <strong>2 тижнів</strong>, як часто вас турбувало таке:
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
          <div className="p-4 rounded-xl bg-slate-50 border mb-4">
            <p className="text-sm font-medium text-slate-800 leading-relaxed">
              <span className="text-muted-foreground text-xs mr-2">{current + 1}.</span>
              {questions[current]}
            </p>
          </div>
          <div className="space-y-2">
            {options.map((opt) => (
              <button key={opt.value} onClick={() => handleAnswer(opt.value)}
                className="w-full text-left px-4 py-3 rounded-lg border bg-white hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center gap-3 group"
                data-testid={`option-${current}-${opt.value}`}
              >
                <span className="w-7 h-7 rounded-full border-2 border-slate-300 group-hover:border-blue-400 flex-shrink-0 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:text-blue-500">
                  {opt.value}
                </span>
                <span className="text-sm text-slate-700">{opt.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {current > 0 && (
        <button className="text-xs text-muted-foreground hover:text-slate-600"
          onClick={() => { setCurrent(c => c - 1); setAnswers(a => a.slice(0, -1)); }}>
          ← Попереднє питання
        </button>
      )}
    </div>
  );
}

function ScaleResultBadge({ label, score, max, severity }: { label: string; score: number; max: number; severity: { label: string; color: string } }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border">
      <div>
        <p className="text-xs font-bold text-slate-600">{label}</p>
        <p className={`text-xs font-medium ${severity.color}`}>{severity.label}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-slate-800">{score}</p>
        <p className="text-xs text-muted-foreground">/ {max}</p>
      </div>
    </div>
  );
}

export default function ScreeningFlow({ onComplete }: { onComplete?: (result: TriageResult) => void }) {
  const [stage, setStage] = useState<Stage>("intro");
  const [phq9Score, setPhq9Score] = useState(0);
  const [gad7Score, setGad7Score] = useState(0);
  const [pcl5Score, setPcl5Score] = useState(0);
  const [result, setResult] = useState<TriageResult | null>(null);

  const handlePHQ9Done = (answers: number[]) => {
    const score = answers.reduce((a, b) => a + b, 0);
    setPhq9Score(score);
    setStage("gad7");
  };

  const handleGAD7Done = (answers: number[]) => {
    const score = answers.reduce((a, b) => a + b, 0);
    setGad7Score(score);
    setStage("pcl5");
  };

  const handlePCL5Done = (answers: number[]) => {
    const score = answers.reduce((a, b) => a + b, 0);
    setPcl5Score(score);

    const phq9Sev = getPHQ9Severity(phq9Score);
    const gad7Sev = getGAD7Severity(gad7Score);
    const pcl5Sev = getPCL5Severity(score);

    const finalRoute = computeFinalRoute(phq9Sev.route, gad7Sev.route, pcl5Sev.route);
    const routeDetails = getRouteDetails(finalRoute);

    const scales = [
      { name: "PHQ-9", score: phq9Score, severity: phq9Sev },
      { name: "GAD-7", score: gad7Score, severity: gad7Sev },
      { name: "PCL-5", score, severity: pcl5Sev },
    ];
    const primary = scales.reduce((a, b) =>
      ["psychiatry", "specialist", "mid_level", "self_help", "no_intervention"].indexOf(a.severity.route) <
      ["psychiatry", "specialist", "mid_level", "self_help", "no_intervention"].indexOf(b.severity.route) ? a : b
    );

    const r: TriageResult = {
      phq9: { score: phq9Score, severity: phq9Sev },
      gad7: { score: gad7Score, severity: gad7Sev },
      pcl5: { score, severity: pcl5Sev },
      finalRoute,
      routeLabel: routeDetails.label,
      routeColor: routeDetails.color,
      routeIcon: routeDetails.icon,
      routeDescription: routeDetails.description,
      primaryScale: primary.name,
    };

    setResult(r);
    setStage("triage");
    onComplete?.(r);
  };

  const routeDetails = result ? getRouteDetails(result.finalRoute) : null;
  const RouteIcon = routeDetails?.icon ?? CheckCircle2;

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Brain className="w-5 h-5 text-indigo-600" />
                  Стандартизований психологічний скринінг
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Скринінг включає три міжнародно визнані шкали оцінки психічного здоров'я. Результати допомагають визначити найбільш підходящу форму підтримки.</p>
                <div className="space-y-2">
                  {[
                    { icon: Brain, color: "bg-blue-500", label: "PHQ-9", desc: "Шкала депресії (9 питань · ≈3 хв)" },
                    { icon: Heart, color: "bg-emerald-500", label: "GAD-7", desc: "Шкала тривоги (7 питань · ≈2 хв)" },
                    { icon: Shield, color: "bg-indigo-500", label: "PCL-5", desc: "Шкала ПТСР (20 питань · ≈5 хв)" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg border bg-slate-50">
                      <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center`}>
                        <item.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
                  Скринінг не є медичним діагнозом. Результати використовуються для AI-тріажу та направлення до відповідного рівня допомоги. Ваші відповіді захищені та деперсоніфіковані.
                </div>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setStage("phq9")} data-testid="button-start-screening">
                  <ArrowRight className="w-4 h-4 mr-2" /> Розпочати скринінг (~10 хв)
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {stage === "phq9" && (
          <motion.div key="phq9" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <Card>
              <CardContent className="pt-5">
                <QuestionnaireStep
                  title="PHQ-9" subtitle="Шкала оцінки депресії (Patient Health Questionnaire)"
                  icon={Brain} color="bg-blue-500"
                  questions={PHQ9_QUESTIONS} options={FREQUENCY_OPTIONS}
                  onComplete={handlePHQ9Done} totalQuestions={PHQ9_QUESTIONS.length}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {stage === "gad7" && (
          <motion.div key="gad7" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <Card>
              <CardContent className="pt-5">
                <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-xs text-blue-800">PHQ-9 завершено. Бал: <strong>{phq9Score}/27</strong> · {getPHQ9Severity(phq9Score).label}</span>
                </div>
                <QuestionnaireStep
                  title="GAD-7" subtitle="Шкала оцінки генералізованого тривожного розладу"
                  icon={Heart} color="bg-emerald-500"
                  questions={GAD7_QUESTIONS} options={GAD7_OPTIONS}
                  onComplete={handleGAD7Done} totalQuestions={GAD7_QUESTIONS.length}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {stage === "pcl5" && (
          <motion.div key="pcl5" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <Card>
              <CardContent className="pt-5">
                <div className="mb-4 space-y-1">
                  <div className="p-2 rounded bg-blue-50 border border-blue-200 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="text-xs text-blue-800">PHQ-9: <strong>{phq9Score}/27</strong> · {getPHQ9Severity(phq9Score).label}</span>
                  </div>
                  <div className="p-2 rounded bg-emerald-50 border border-emerald-200 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="text-xs text-emerald-800">GAD-7: <strong>{gad7Score}/21</strong> · {getGAD7Severity(gad7Score).label}</span>
                  </div>
                </div>
                <QuestionnaireStep
                  title="PCL-5" subtitle="Шкала оцінки ПТСР (PTSD Checklist for DSM-5)"
                  icon={Shield} color="bg-indigo-500"
                  questions={PCL5_QUESTIONS} options={PCL5_OPTIONS}
                  onComplete={handlePCL5Done} totalQuestions={PCL5_QUESTIONS.length}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {stage === "triage" && result && routeDetails && (
          <motion.div key="triage" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-5 pb-5">
                  <div className="text-center mb-5">
                    <div className={`w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center border-2 ${routeDetails.bg}`}>
                      <RouteIcon className={`w-7 h-7 ${routeDetails.color}`} />
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-1">AI-тріаж завершено</h3>
                    <p className={`text-sm font-semibold ${routeDetails.color}`}>{routeDetails.label}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <ScaleResultBadge label="PHQ-9" score={result.phq9.score} max={27} severity={result.phq9.severity} />
                    <ScaleResultBadge label="GAD-7" score={result.gad7.score} max={21} severity={result.gad7.severity} />
                    <ScaleResultBadge label="PCL-5" score={result.pcl5.score} max={80} severity={result.pcl5.severity} />
                  </div>

                  <div className={`p-4 rounded-xl border ${routeDetails.bg} mb-4`}>
                    <p className={`text-sm font-medium mb-1 ${routeDetails.color}`}>Рекомендація AI-тріажу</p>
                    <p className="text-xs text-slate-700 leading-relaxed">{routeDetails.description}</p>
                  </div>

                  {result.finalRoute === "psychiatry" && (
                    <div className="p-3 rounded-lg bg-red-100 border border-red-400 mb-4 flex gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                      <p className="text-xs text-red-800 font-medium">Результати свідчать про необхідність термінової психіатричної консультації. Будь ласка, зверніться до найближчого центру психічного здоров'я або психіатричної лікарні.</p>
                    </div>
                  )}

                  <div className="p-3 rounded-lg bg-slate-50 border text-xs text-muted-foreground mb-4">
                    <p className="font-medium text-slate-600 mb-1">Подальші кроки (подвійне підтвердження)</p>
                    <ol className="space-y-1 list-decimal list-inside">
                      <li>Ваші результати надходять до Циркулейшн Фолдеру — фахівці бачать запит анонімно</li>
                      <li>Фахівець пропонує діагностичний сеанс для клінічного підтвердження</li>
                      <li>Ви обираєте фахівця, дату та формат зустрічі</li>
                      <li>Після сеансу фахівець підтверджує або коригує AI-тріаж</li>
                    </ol>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1" style={{ background: "#6366f1", color: "white", border: "none" }} data-testid="button-find-specialist">
                      <ChevronRight className="w-4 h-4 mr-2" /> {routeDetails.action}
                    </Button>
                    <Button variant="outline" onClick={() => { setStage("intro"); setPhq9Score(0); setGad7Score(0); setPcl5Score(0); setResult(null); }} data-testid="button-restart-screening">
                      <RefreshCw className="w-3.5 h-3.5 mr-1" /> Знову
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-muted-foreground text-center">
                Результати скринінгу надіслано до Циркулейшн Фолдеру. Фахівці отримали анонімне сповіщення.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
