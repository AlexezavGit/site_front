import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowRight, Shield, Users, Banknote, Heart, TrendingUp, Database, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";

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

const audienceCards = [
  { icon: Users, audience: "Фахівці та практиканти", tagline: "Справедлива платня. Визнання. Масштаб.", points: ["Вихід із тіні через Digital Corridor", "Міжнародно визнана сертифікація", "Гнучкий дохід ~3 год/тиждень"], cta: "Фахівцям", href: "/pro" },
  { icon: Banknote, audience: "Донори та гуманітарні актори", tagline: "Де-ризиковане спів-фінансування.", points: ["Payment for Result: ресурси → за бенефіціаром", "Блокчейн-верифікований аудит-трейл", "Авто-звітність IATI / Grand Bargain"], cta: "Донорам", href: "/donors" },
  { icon: TrendingUp, audience: "Громади та КСВ", tagline: "Публічний контроль. Вимірюваний вплив.", points: ["Train for Care: €75K / 20 фахівців, ROI 2.22×", "P2P-кампанії та мобілізація ресурсів", "Прозора звітність у реальному часі"], cta: "Партнерам", href: "/donors" },
  { icon: Heart, audience: "Бенефіціари", tagline: "Рівний доступ. Цифровий супровід.", points: ["Ступенева допомога від PSS до VR-терапії", "Ресурси не залежать від місця знаходження", "PHQ-9 / GAD-7 / PCL-5 — вимірювані результати"], cta: "Отримати підтримку", href: "/beneficiaries" },
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
            <p className="text-sm max-w-xl mb-10 italic" style={{ color: "rgba(255,255,255,0.45)" }}>«FEEL Again — це Visa гуманітарного сектору психічного здоров'я. Не надає терапію — надає рейки, якими терапія протікає прозоро, підзвітно та масштабно.»</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/beneficiaries"><button style={{ background: GOLD, color: NAVY, fontWeight: 600, padding: "0.75rem 1.75rem", borderRadius: "0.5rem", border: "none", cursor: "pointer", fontSize: "0.9375rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>Отримати підтримку <ArrowRight style={{ width: 16, height: 16 }} /></button></Link>
              <Link href="/pro"><button style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.35)", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.9375rem" }}>Я фахівець</button></Link>
              <Link href="/donors"><button style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.35)", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.9375rem" }}>Я донор / партнер</button></Link>
            </div>
          </div>
        </motion.div>
      </section>

      <section style={{ background: "#0B1E30", borderTop: "1px solid rgba(212,160,23,0.15)", borderBottom: "1px solid rgba(212,160,23,0.15)" }} className="py-10">
        <div className="container">
          <div className="flex items-center gap-2 mb-6"><div style={{ width: 24, height: 2, background: GOLD, borderRadius: 1 }} /><span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>Канонічний датасет · Doc 4 · Єдине джерело правди</span></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {canonicalStats.map((stat, i) => <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} style={{ textAlign: "center", padding: "1.25rem 0.75rem", borderRadius: "0.75rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,160,23,0.12)" }}><div style={{ color: GOLD, fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.1, marginBottom: "0.35rem" }}>{stat.value}</div><div style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.25rem", lineHeight: 1.3 }}>{stat.label}</div><div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.65rem" }}>{stat.source}</div></motion.div>)}
          </div>
        </div>
      </section>

      <section className="py-16"><div className="container"><div className="text-center mb-12"><h2 className="text-3xl font-bold mb-3" style={{ color: NAVY }}>Ціннісна пропозиція</h2><p className="text-muted-foreground max-w-2xl mx-auto">Програма впливає на чотири групи стейкхолдерів. Кожна отримує свою конкретну цінність.</p></div><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">{audienceCards.map((card, i) => <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}><div className="h-full rounded-xl p-5 flex flex-col" style={{ background: i === 2 ? "rgba(212,160,23,0.06)" : "rgba(255,255,255,0.98)", border: `1px solid ${i === 2 ? "rgba(212,160,23,0.25)" : "#E5E7EB"}` }}><card.icon className="mb-3" style={{ color: i === 2 ? GOLD : NAVY, width: 36, height: 36 }} /><h3 className="font-bold text-base mb-1" style={{ color: NAVY }}>{card.audience}</h3><p className="text-sm text-muted-foreground mb-4 italic">{card.tagline}</p><ul className="space-y-2 mb-5 flex-1">{card.points.map((point, j) => <li key={j} className="flex items-start gap-2 text-sm"><CheckCircle2 style={{ color: GOLD, width: 15, height: 15, marginTop: 2, flexShrink: 0 }} /><span className="text-muted-foreground">{point}</span></li>)}</ul><Link href={card.href}><Button variant="outline" size="sm" className="w-full">{card.cta} <ArrowRight className="ml-1 h-3 w-3" /></Button></Link></div></motion.div>)}</div></div></section>

      <section style={{ background: "#091d30" }} className="py-16"><div className="container"><div className="max-w-3xl mx-auto text-center"><h2 className="text-3xl mb-4" style={{ color: "white", fontWeight: 300 }}>Чому існує FEEL Again</h2><div className="rounded-2xl p-7 mb-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,160,23,0.18)" }}><p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Структурне пляшкове горлечко</p><p className="text-lg" style={{ color: "white", fontWeight: 300 }}>1 терапевт × 25 пацієнтів/тиждень × 50 тижнів = <span style={{ color: GOLD, fontWeight: 700 }}>1,250 / рік</span></p><p className="mt-2 text-lg" style={{ color: "white", fontWeight: 300 }}>~4,000 фахівців × 25/тиждень ≈ <span style={{ color: GOLD, fontWeight: 700 }}>100,000 людей / рік</span></p><p className="mt-3 text-2xl font-bold" style={{ color: "#EF4444" }}>= 1% від 9.6M, які потребують допомоги</p></div><p style={{ color: "rgba(255,255,255,0.65)" }}>Навчання не може закрити цю прогалину. Єдине рішення — змінити <strong style={{ color: "white" }}>співвідношення</strong>.</p></div></div></section>

      <section className="py-16"><div className="container"><div className="text-center mb-12"><h2 className="text-3xl font-bold mb-3" style={{ color: NAVY }}>6 Системних розривів</h2><p className="text-muted-foreground max-w-2xl mx-auto">Шість GAPs — це симптоми однієї структурної відсутності: Missing Middle між первинною та психіатричною допомогою.</p></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{gaps.map((gap, i) => <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }}><Card className="h-full hover:shadow-md transition-shadow"><CardContent className="pt-6"><div className="flex items-start gap-3"><span style={{ color: GOLD, fontSize: "2rem", fontWeight: 800, lineHeight: 1, opacity: 0.6 }}>{gap.num}</span><div><h3 className="font-bold text-base mb-2" style={{ color: NAVY }}>GAP {gap.num}: {gap.title}</h3><p className="text-sm text-muted-foreground">{gap.desc}</p></div></div></CardContent></Card></motion.div>)}</div><div className="text-center mt-8"><Link href="/about"><Button variant="outline">Детальніше про програму <ArrowRight className="ml-2 h-4 w-4" /></Button></Link></div></div></section>

      <section style={{ background: NAVY, borderTop: `3px solid ${GOLD}` }} className="py-12"><div className="container"><div className="grid md:grid-cols-4 gap-8 text-center">{[{ val: "3 кластери", desc: "12 проєктів: A, B, C" }, { val: "$1,945K", desc: "Unified Program Matrix" }, { val: "$0.00", desc: "Вартість для держави" }, { val: "7% → 3%", desc: "Дегресивна комісія платформи" }].map((item, i) => <div key={i}><div style={{ color: GOLD, fontSize: "1.875rem", fontWeight: 700, marginBottom: "0.25rem" }}>{item.val}</div><div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.8125rem" }}>{item.desc}</div></div>)}</div></div></section>

      <section className="py-16"><div className="container"><div className="text-center mb-10"><h2 className="text-3xl font-bold mb-3" style={{ color: NAVY }}>Три кабінети — один екосистема</h2><p className="text-muted-foreground max-w-2xl mx-auto">Донор, надавач чи бенефіціар — кожен має свой інтерфейс з персональними калькуляторами та демо-мокапами.</p></div><div className="grid md:grid-cols-3 gap-6"><div className="rounded-xl p-6" style={{ background: "rgba(212,160,23,0.06)", border: "1px solid rgba(212,160,23,0.25)" }}><Shield style={{ color: GOLD, width: 32, height: 32, marginBottom: 12 }} /><h3 className="font-bold text-lg mb-2" style={{ color: NAVY }}>Донор / КСВ</h3><p className="text-sm text-muted-foreground mb-4">Скоринг ініціатив, імпакт-калькулятор, дошка пошани. Де-ризиковане співфінансування.</p><Link href="/portal/donor"><Button variant="outline" className="w-full border-amber-400 text-amber-700 hover:bg-amber-100">Кабінет донора →</Button></Link></div><div className="rounded-xl p-6" style={{ background: "rgba(20,184,166,0.06)", border: "1px solid rgba(20,184,166,0.2)" }}><Users style={{ color: "#14B8A6", width: 32, height: 32, marginBottom: 12 }} /><h3 className="font-bold text-lg mb-2" style={{ color: NAVY }}>Фахівець / Надавач</h3><p className="text-sm text-muted-foreground mb-4">Циркулейшн фолдер, ренкінг, калькулятор доходу, керування пацієнтами.</p><Link href="/portal/provider"><Button variant="outline" className="w-full border-teal-400 text-teal-700 hover:bg-teal-100">Кабінет фахівця →</Button></Link></div><div className="rounded-xl p-6" style={{ background: "rgba(244,63,94,0.06)", border: "1px solid rgba(244,63,94,0.2)" }}><Heart style={{ color: "#F43F5E", width: 32, height: 32, marginBottom: 12 }} /><h3 className="font-bold text-lg mb-2" style={{ color: NAVY }}>Бенефіціар</h3><p className="text-sm text-muted-foreground mb-4">Діагностика, вибір фахівця, калькулятор кошторису, P2P-збір, зниження виплат.</p><Link href="/portal/beneficiary"><Button variant="outline" className="w-full border-rose-400 text-rose-700 hover:bg-rose-100">Кабінет бенефіціара →</Button></Link></div></div><div className="mt-8 text-center"><Link href="/portal"><Button variant="outline" className="mr-3">Портал входу</Button></Link><a href="https://dashboard-1q7.pages.dev/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "rgba(0,0,0,0.45)", fontSize: "0.8125rem", textDecoration: "none" }}><ExternalLink style={{ width: 13, height: 13 }} />Аналітика та дашборд</a></div></div></section>
    </div>
  );
}
