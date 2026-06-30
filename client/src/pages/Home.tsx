import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Users, BarChart3, LogIn } from "lucide-react";

const NAVY = "#0F2B46";
const GOLD = "#D4A017";

const canonicalStats = [
  { value: "9.6M", label: "Людей у зоні ризику", source: "WHO, 2025" },
  { value: "74%", label: "Treatment Gap (ВПО)", source: "IOM/UNHCR 2023" },
  { value: "117,652", label: "Сертифікатів mhGAP", source: "WHO Dashboard" },
  { value: "42", label: "Практикують під супервізією", source: "PMC 2020 (6%)" },
  { value: "~$8B", label: "Втрат ВВП / рік", source: "OECD methodology" },
  { value: "$137M", label: "Гуман. потоків / рік", source: "OCHA FTS" },
];

const gaps = [
  { num: "01", title: "Кадровий", desc: "117,652 сертифікатів mhGAP → лише 42 практикують." },
  { num: "02", title: "Економічний", desc: "89% бюджету — стаціонар. 71% потребують амбулаторну допомогу." },
  { num: "03", title: "Доступу", desc: "4,000 фахівців обслуговують 100,000/рік = 1% потреби." },
  { num: "04", title: "Тіньової економіки", desc: "~8,000 приватних фахівців без сертифікації та видимості." },
  { num: "05", title: "Інтеграції", desc: "$137M/рік через фрагментовані канали. ~0% синхронізації з ЕСОЗ." },
  { num: "06", title: "Підзвітності", desc: "Inputs фінансуються. Outputs звітуються. Outcomes — невидимі." },
];

export default function Home() {
  return (
    <div>
      {/* Hero — без CTA кнопок */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: `linear-gradient(145deg, #091d30 0%, ${NAVY} 45%, #162944 100%)` }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(212,160,23,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="container relative">
          <div className="flex flex-col items-center text-center">
            <div className="mb-10">
              <div className="inline-flex flex-col items-center select-none" style={{ lineHeight: 1 }}>
                <div style={{ color: "white", fontSize: 72, fontWeight: 300, letterSpacing: "0.06em" }}>FEEL</div>
                <div style={{ color: GOLD, fontSize: 18, fontWeight: 300, letterSpacing: "0.42em", marginTop: 6, textIndent: "0.42em" }}>Again</div>
              </div>
            </div>
            <div className="mb-8 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase" style={{ background: "rgba(212,160,23,0.12)", color: GOLD, border: "1px solid rgba(212,160,23,0.3)", letterSpacing: "0.12em" }}>Гуманітарна програма MHPSS · Україна</div>
            <h1 className="text-4xl md:text-6xl mb-6 max-w-4xl leading-tight" style={{ color: "white", fontWeight: 300 }}>Цифрова інфраструктура для <span style={{ color: GOLD }}>психічного здоров'я України</span></h1>
            <p className="text-base md:text-lg max-w-2xl mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.70)" }}>FEEL Again з'єднує три роз'єднані сектори надавачів з бенефіціарами через єдиний довірений цифровий шар. Не маркетплейс — фінансові рейки для сектору MHPSS.</p>
            <p className="text-sm max-w-xl italic" style={{ color: "rgba(255,255,255,0.45)" }}>«FEEL Again — це Visa гуманітарного сектору психічного здоров'я. Не надає терапію — надає рейки, якими терапія протікає прозоро, підзвітно та масштабно.»</p>
          </div>
        </motion.div>
      </section>

      {/* Канонічна статистика */}
      <section style={{ background: "#0B1E30", borderTop: "1px solid rgba(212,160,23,0.15)", borderBottom: "1px solid rgba(212,160,23,0.15)" }} className="py-10">
        <div className="container">
          <div className="flex items-center gap-2 mb-6">
            <div style={{ width: 24, height: 2, background: GOLD, borderRadius: 1 }} />
            <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>Канонічний датасет · Doc 4 · Єдине джерело правди</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {canonicalStats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} style={{ textAlign: "center", padding: "1.25rem 0.75rem", borderRadius: "0.75rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,160,23,0.12)" }}>
                <div style={{ color: GOLD, fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.1, marginBottom: "0.35rem" }}>{stat.value}</div>
                <div style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.25rem", lineHeight: 1.3 }}>{stat.label}</div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.65rem" }}>{stat.source}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Чому існує FEEL Again */}
      <section style={{ background: "#091d30" }} className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl mb-4" style={{ color: "white", fontWeight: 300 }}>Чому існує FEEL Again</h2>
            <div className="rounded-2xl p-7 mb-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,160,23,0.18)" }}>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Структурне пляшкове горлечко</p>
              <p className="text-lg" style={{ color: "white", fontWeight: 300 }}>1 терапевт × 25 пацієнтів/тиждень × 50 тижнів = <span style={{ color: GOLD, fontWeight: 700 }}>1,250 / рік</span></p>
              <p className="mt-2 text-lg" style={{ color: "white", fontWeight: 300 }}>~4,000 фахівців × 25/тиждень ≈ <span style={{ color: GOLD, fontWeight: 700 }}>100,000 людей / рік</span></p>
              <p className="mt-3 text-2xl font-bold" style={{ color: "#EF4444" }}>= 1% від 9.6M, які потребують допомоги</p>
            </div>
            <p style={{ color: "rgba(255,255,255,0.65)" }}>Навчання не може закрити цю прогалину. Єдине рішення — змінити <strong style={{ color: "white" }}>співвідношення</strong>.</p>
          </div>
        </div>
      </section>

      {/* 6 Системних розривів */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" style={{ color: NAVY }}>6 Системних розривів</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Шість GAPs — це симптоми однієї структурної відсутності: Missing Middle між первинною та психіатричною допомогою.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {gaps.map((gap, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <span style={{ color: GOLD, fontSize: "2rem", fontWeight: 800, lineHeight: 1, opacity: 0.6 }}>{gap.num}</span>
                      <div>
                        <h3 className="font-bold text-base mb-2" style={{ color: NAVY }}>GAP {gap.num}: {gap.title}</h3>
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
              <Button variant="outline">Детальніше про програму <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Метрики програми */}
      <section style={{ background: NAVY, borderTop: `3px solid ${GOLD}` }} className="py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { val: "3 кластери", desc: "12 проєктів: A, B, C" },
              { val: "$1,945K", desc: "Unified Program Matrix" },
              { val: "$0.00", desc: "Вартість для держави" },
              { val: "7% → 3%", desc: "Дегресивна комісія платформи" },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ color: GOLD, fontSize: "1.875rem", fontWeight: 700, marginBottom: "0.25rem" }}>{item.val}</div>
                <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.8125rem" }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Вхід до системи — замість "Три кабінети — одна екосистема" */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3" style={{ color: NAVY }}>Увійти до системи</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Оберіть свій шлях — до кабінетів користувачів або до аналітичного дашборду.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Link href="/portal">
              <div className="rounded-xl p-8 flex flex-col items-center text-center cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5" style={{ background: "white", border: `2px solid rgba(212,160,23,0.3)` }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(212,160,23,0.1)" }}>
                  <LogIn style={{ color: GOLD, width: 28, height: 28 }} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: NAVY }}>Кабінети користувачів</h3>
                <p className="text-sm text-muted-foreground mb-5">Фахівці, бенефіціари, донори та аудитори — кожен має свій персоналізований кабінет.</p>
                <Button style={{ background: GOLD, color: NAVY, fontWeight: 600, border: "none" }}>
                  Увійти до кабінету <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Link>
            <a href="https://dashboard-1q7.pages.dev/" target="_blank" rel="noopener noreferrer" className="no-underline">
              <div className="rounded-xl p-8 flex flex-col items-center text-center cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5" style={{ background: "white", border: "2px solid rgba(15,43,70,0.15)" }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(15,43,70,0.06)" }}>
                  <BarChart3 style={{ color: NAVY, width: 28, height: 28 }} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: NAVY }}>Дані та інсайти</h3>
                <p className="text-sm text-muted-foreground mb-5">Агрегована аналітика, моніторинг програм та верифіковані результати в реальному часі.</p>
                <Button variant="outline" style={{ borderColor: NAVY, color: NAVY, fontWeight: 600 }}>
                  Відкрити дашборд <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
