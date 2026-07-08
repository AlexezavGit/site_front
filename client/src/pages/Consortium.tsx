import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Globe, Award, Microscope, GraduationCap, Shield, Heart } from "lucide-react";

const NAVY = "#0F2B46";
const GOLD = "#D4A017";
const TEAL = "#0D9488";

const PARTNERS = [
  {
    id: "fos",
    name: "Future of Survivors (FOS)",
    country: "Ізраїль",
    flag: "🇮🇱",
    role: "Координатор програми · Голова консорціуму",
    badge: "Координатор",
    badgeColor: "bg-amber-100 text-amber-800",
    icon: Award,
    color: "text-amber-600",
    bg: "bg-amber-50",
    desc: "НКО зі штаб-квартирою в Ізраїлі. Координує консорціум, забезпечує міжнародні стандарти звітності, виступає гарантом прозорості для донорів. 30+ років досвіду у роботі з наслідками травми.",
    link: null,
  },
  {
    id: "geha",
    name: "Geha Clalit Mental Health",
    country: "Ізраїль",
    flag: "🇮🇱",
    role: "Клінічна досконалість · EMDR · Підліткова психотерапія",
    badge: "Клінічний партнер",
    badgeColor: "bg-blue-100 text-blue-800",
    icon: Microscope,
    color: "text-blue-600",
    bg: "bg-blue-50",
    desc: "80 років клінічної практики. Золотий стандарт EMDR — не потребує вербалізації травми, ефективний для підлітків. Ізраїльський клінічний протокол скорочує курс з 12–20 до 8–12 сеансів.",
    link: null,
  },
  {
    id: "usc",
    name: "USC Institute for Creative Technologies",
    country: "США",
    flag: "🇺🇸",
    role: "VR Bravemind · Гейміфікована діагностика ПТСР",
    badge: "Технологічний партнер",
    badgeColor: "bg-violet-100 text-violet-800",
    icon: Shield,
    color: "text-violet-600",
    bg: "bg-violet-50",
    desc: "Skip Rizzo та команда USC ICT. VR Bravemind — 170+ центрів VA США. Протокол: 6–12 сеансів, ≥90% завершуваності, низька рецидивність. UCLA PTSD-RI діагностика. «Від американських воїнів — українським побратимам.»",
    link: null,
  },
  {
    id: "knu",
    name: "КНУ імені Тараса Шевченка",
    country: "Україна",
    flag: "🇺🇦",
    role: "Центр передового досвіду · Регресний датасет · ВВП-метрики",
    badge: "Центр компетенції",
    badgeColor: "bg-teal-100 text-teal-800",
    icon: GraduationCap,
    color: "text-teal-600",
    bg: "bg-teal-50",
    desc: "Перший в Україні Центр передового досвіду в галузі психічного здоров'я. Розробляє методологію оцінки впливу на ВВП, аналізує регресний датасет 10 років приватної практики, будує систему дистанційного підвищення кваліфікації.",
    link: null,
  },
];

const STATS = [
  { val: "30+", label: "Років клінічного досвіду партнерів" },
  { val: "170+", label: "Центрів VA США з VR Bravemind" },
  { val: "8–12", label: "Сеансів за ізраїльським EMDR-протоколом" },
  { val: "≥90%", label: "Завершуваність VR-протоколу" },
];

const PHASES = [
  { phase: "Фаза 1 (0–12 міс)", name: "RAILS", desc: "Банківський пілот · P2P · Helsi · КНУ датасет · Діаспорна супервізія", color: "border-amber-400 bg-amber-50" },
  { phase: "Фаза 2 (6–24 міс)", name: "CONNECT", desc: "Наскрізний супровід · Приватна практика · Інтеграція WHO MHPSS TWG · Індекс ментального здоров'я по 24 областях", color: "border-teal-400 bg-teal-50" },
  { phase: "Фаза 3 (18–36 міс)", name: "SCALE", desc: "Податкові преференції · Повна цифрова координація · Показники ВВП", color: "border-violet-400 bg-violet-50" },
];

export default function Consortium() {
  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      {/* Hero */}
      <section className="py-20" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #162944 100%)` }}>
        <div className="container text-center text-white">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-4 bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1">
              Консорціум
            </Badge>
            <h1 className="text-4xl md:text-5xl font-light mb-4" style={{ letterSpacing: "-0.02em" }}>
              Партнери програми{" "}
              <span style={{ color: GOLD }}>FEEL Again</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto mt-4" style={{ color: "rgba(255,255,255,0.65)" }}>
              Міжнародний консорціум клінічної досконалості, технологій та академічної науки —
              об'єднаний навколо одного завдання: відновлення психічного здоров'я України.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 border-b bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="text-center">
                <p className="text-3xl font-bold font-mono" style={{ color: NAVY }}>{s.val}</p>
                <p className="text-xs text-slate-500 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl font-semibold text-center mb-10" style={{ color: NAVY }}>
            Члени консорціуму
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {PARTNERS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="pt-5 pb-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl ${p.bg} flex items-center justify-center shrink-0`}>
                          <Icon className={`w-5 h-5 ${p.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 flex-wrap">
                            <p className="font-semibold text-sm" style={{ color: NAVY }}>{p.flag} {p.name}</p>
                            <Badge className={`text-xs shrink-0 ${p.badgeColor}`}>{p.badge}</Badge>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{p.country} · {p.role}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 Phases */}
      <section className="py-16 bg-white border-t">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-semibold text-center mb-3" style={{ color: NAVY }}>
            Три фази з послідовною активацією
          </h2>
          <p className="text-center text-sm text-slate-500 mb-10">6 шарів трансформації → 3 фази → $2.5–4.5B потенційний імпакт</p>
          <div className="space-y-4">
            {PHASES.map((ph, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 }}
                className={`rounded-xl border-l-4 p-5 ${ph.color}`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <Badge variant="outline" className="text-xs font-mono">{ph.phase}</Badge>
                  <span className="font-bold text-sm tracking-widest" style={{ color: NAVY }}>{ph.name}</span>
                </div>
                <p className="text-sm text-slate-600">{ph.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Layers summary */}
      <section className="py-16 border-t">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: NAVY }}>Шість шарів трансформації</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left mt-8">
            {[
              { emoji: "🏦", name: "Фінтех · Blended Finance", desc: "ISO 20022, ескроу, P2P, SIB" },
              { emoji: "💻", name: "Цифрові відносини", desc: "МІС Helsi, чат-бот, HL7 FHIR" },
              { emoji: "🧠", name: "Клінічна методологія", desc: "EMDR, VR Bravemind, mhGAP" },
              { emoji: "🌱", name: "Сталий розвиток", desc: "Приватна практика, 50 000+ фахівців" },
              { emoji: "📊", name: "Дані та координація", desc: "WHO MHPSS TWG, IATI XML, відкриті дані" },
              { emoji: "⚖️", name: "Регуляторний шар", desc: "Податкові преференції, сертифікація" },
            ].map((layer) => (
              <div key={layer.name} className="rounded-lg border bg-white p-4 shadow-sm">
                <div className="text-2xl mb-2">{layer.emoji}</div>
                <p className="text-sm font-semibold" style={{ color: NAVY }}>{layer.name}</p>
                <p className="text-xs text-slate-500 mt-1">{layer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
