import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import { Database, AlertTriangle, CheckCircle2, Download } from "lucide-react";

const populationData = [
  { indicator: "Населення України", value: "~36.5M", source: "IMF / Держстат", status: "CANONICAL" },
  { indicator: "Клінічна потреба MHPSS", value: "3.9M осіб", source: "Lancet Commission 2023", status: "CANONICAL" },
  { indicator: "ВПО (IDPs)", value: "~5.1M", source: "UNHCR Ukraine 2024", status: "CANONICAL" },
  { indicator: "Treatment Gap (IDPs)", value: "74%", source: "IOM/UNHCR 2023", status: "CANONICAL" },
  { indicator: "Treatment Gap (загальний)", value: "74–95%", source: "WHO / різні джерела", status: "CONTESTED" },
  { indicator: "Психологів на 100K", value: "1.3 (EU avg: 2.7)", source: "WHO Mental Health Atlas 2020", status: "CANONICAL" },
  { indicator: "Синхронізація з ЕСОЗ", value: "~0%", source: "Ecosystem Audit v2.1", status: "CANONICAL" },
  { indicator: "Необхідний обсяг сесій", value: "62.4M годин/рік", source: "Розрахунок: 3.9M × 16 сесій", status: "РОЗРАХУНОК" },
  { indicator: "Втрати ВВП / рік", value: "~$8B", source: "5% ВВП (OECD methodology)", status: "CANONICAL" },
];

const trainingData = [
  { programme: "mhGAP certs", trained: 117652, practicing: 0, note: "NOT MEASURED" },
  { programme: "mhGAP supervised", trained: 700, practicing: 42, note: "6% conversion" },
  { programme: "UNICEF MHPSS", trained: 38000, practicing: 0, note: "NOT MEASURED" },
  { programme: "ТИ ЯК? listeners", trained: 400000, practicing: 0, note: "Awareness only" },
  { programme: "HeRAMS verified", trained: 8201, practicing: 8201, note: "100%" },
];

const financialData = [
  { source: "Держбюджет МОЗ", volume: 50, transparency: "Середня", integration: "Часткова" },
  { source: "Health Cluster OCHA", volume: 77, transparency: "Низька", integration: "Ні" },
  { source: "UNICEF MHPSS", volume: 5, transparency: "Середня", integration: "Ні" },
  { source: "USAID (Chemonics)", volume: 5, transparency: "Висока", integration: "Ні" },
];

const allocationData = [
  { name: "Стаціонар (поточний)", value: 89, fill: "#ef4444" },
  { name: "Амбулаторна (потреба: 71%)", value: 11, fill: "#22c55e" },
];

const targetAllocationData = [
  { name: "Приватна практика", value: 40, fill: "#3b82f6" },
  { name: "Клінічні центри", value: 25, fill: "#8b5cf6" },
  { name: "Community", value: 20, fill: "#22c55e" },
  { name: "Стаціонар", value: 15, fill: "#f59e0b" },
];

const statusColor: Record<string, string> = {
  "CANONICAL": "bg-green-100 text-green-800",
  "РОЗРАХУНОК": "bg-blue-100 text-blue-800",
  "CONTESTED": "bg-orange-100 text-orange-800",
  "ПРИПУЩЕННЯ": "bg-yellow-100 text-yellow-800",
};

const COLORS = ["#3b82f6", "#22c55e", "#8b5cf6", "#f59e0b", "#ef4444"];

export default function OpenData() {
  return (
    <div>
      {/* Hero */}
      <section className="py-14 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-5 w-5 text-blue-400" />
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                Doc 4 · Canonical Dataset v1.0 · Березень 2026
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Відкриті дані FEEL Again</h1>
            <p className="text-white/70 max-w-2xl mb-4">
              Єдине джерело правди для всіх цифр програми. Кожна цифра має джерело, дату верифікації
              та статус (CANONICAL / РОЗРАХУНОК / ПРИПУЩЕННЯ).
            </p>
            <p className="text-xs text-white/40 font-mono">
              Верифіковані: ISR #6, Gradus, AMP MH, WHO Atlas · Двомовний · Реальний час
            </p>
          </motion.div>
        </div>
      </section>

      {/* Status legend */}
      <section className="py-6 bg-slate-100 border-b">
        <div className="container flex flex-wrap gap-3 items-center">
          <span className="text-sm font-semibold text-muted-foreground">Статуси:</span>
          {Object.entries(statusColor).map(([key, cls]) => (
            <Badge key={key} className={`${cls} border`}>{key}</Badge>
          ))}
          <span className="text-xs text-muted-foreground ml-2">
            Оновлення потребує зміни version number та дати.
          </span>
        </div>
      </section>

      {/* Population & Needs Table */}
      <section className="py-14">
        <div className="container">
          <h2 className="text-2xl font-bold mb-2">§1. Популяція та потреби</h2>
          <p className="text-muted-foreground mb-6 text-sm">Canonical Dataset: Population &amp; Needs</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 font-semibold">Показник</th>
                  <th className="text-right p-3 font-semibold">Значення</th>
                  <th className="text-left p-3 font-semibold">Джерело</th>
                  <th className="text-center p-3 font-semibold">Статус</th>
                </tr>
              </thead>
              <tbody>
                {populationData.map((row, i) => (
                  <tr key={i} className="border-t hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-medium">{row.indicator}</td>
                    <td className="p-3 text-right font-mono font-bold">{row.value}</td>
                    <td className="p-3 text-muted-foreground text-xs">{row.source}</td>
                    <td className="p-3 text-center">
                      <Badge className={`${statusColor[row.status]} text-xs`}>{row.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>
              $2.5–4.5B — теоретичний максимум ринку, не бюджет програми. Використовувати лише для контексту масштабу.
              Реалістичний addressable market значно менший.
            </span>
          </div>
        </div>
      </section>

      {/* Killer Table: Training vs Practice */}
      <section className="py-14 bg-slate-50">
        <div className="container">
          <h2 className="text-2xl font-bold mb-2">§2. Навчання vs Практика (Killer Table)</h2>
          <p className="text-muted-foreground mb-2 text-sm">
            117,652 сертифікатів mhGAP → 42 практикують під супервізією. Це не провал навчання —
            це відсутність інфраструктури.
          </p>
          <p className="text-xs text-muted-foreground mb-6">
            Канонічне значення mhGAP: 117,652 (не 96K). Джерело: WHO mhGAP Dashboard.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-200">
                      <th className="text-left p-3 font-semibold">Програма</th>
                      <th className="text-right p-3 font-semibold">Навчено</th>
                      <th className="text-right p-3 font-semibold">Практикує</th>
                      <th className="text-center p-3 font-semibold">Конверсія</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainingData.map((row, i) => (
                      <tr key={i} className="border-t hover:bg-slate-100">
                        <td className="p-3 font-medium">{row.programme}</td>
                        <td className="p-3 text-right font-mono">{row.trained.toLocaleString()}</td>
                        <td className="p-3 text-right font-mono">{row.practicing > 0 ? row.practicing.toLocaleString() : "—"}</td>
                        <td className="p-3 text-center">
                          <Badge variant="outline" className={row.note === "100%" ? "text-green-700 border-green-300" : "text-muted-foreground"}>
                            {row.note}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={trainingData.slice(0, 3)} margin={{ top: 5, right: 10, left: 0, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="programme" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" />
                  <YAxis tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}K` : v} />
                  <Tooltip formatter={(v) => Number(v).toLocaleString()} />
                  <Bar dataKey="trained" name="Навчено" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="practicing" name="Практикує" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Flows */}
      <section className="py-14">
        <div className="container">
          <h2 className="text-2xl font-bold mb-2">§3. Фінансові потоки</h2>
          <p className="text-muted-foreground mb-6 text-sm">TOTAL: ~$137M / рік · Фрагментована прозорість · ~2.5% інтеграція з eHealth</p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="text-left p-3 font-semibold">Джерело</th>
                      <th className="text-right p-3 font-semibold">$M</th>
                      <th className="text-center p-3 font-semibold">Прозорість</th>
                      <th className="text-center p-3 font-semibold">eHealth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialData.map((row, i) => (
                      <tr key={i} className="border-t hover:bg-slate-50">
                        <td className="p-3 font-medium">{row.source}</td>
                        <td className="p-3 text-right font-mono font-bold">${row.volume}M</td>
                        <td className="p-3 text-center text-sm text-muted-foreground">{row.transparency}</td>
                        <td className="p-3 text-center">
                          <Badge variant="outline" className={row.integration === "Ні" ? "text-red-500 border-red-300" : "text-amber-600 border-amber-300"}>
                            {row.integration}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t font-bold bg-slate-100">
                      <td className="p-3">РАЗОМ</td>
                      <td className="p-3 text-right font-mono">~$137M</td>
                      <td className="p-3 text-center text-muted-foreground">Фрагментована</td>
                      <td className="p-3 text-center"><Badge variant="outline" className="text-red-500">~2.5%</Badge></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-3">Парадокс стін:</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2 text-center">Поточна алокація</p>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie data={allocationData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                        {allocationData.map((entry, index) => (
                          <Cell key={index} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v) => `${v}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <p className="text-xs text-center text-red-600 font-semibold">89% → Стаціонар</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2 text-center">Цільова алокація</p>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie data={targetAllocationData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                        {targetAllocationData.map((entry, index) => (
                          <Cell key={index} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v) => `${v}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <p className="text-xs text-center text-green-700 font-semibold">40% → Приватна практика</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2 italic">
                «We are funding walls while patients are left outside.» — Walls Paradox
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Model */}
      <section className="py-14 bg-slate-50">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">§4. Фінансова модель FEEL Again</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { param: "Комісія платформи", value: "7% → 3% дегресивна", status: "CANONICAL", note: "Blockchain: $3M/місяць мінімум для сталості" },
              { param: "Train for Care (когорта 20 осіб)", value: "€75,605 (€3,780/особу)", status: "CANONICAL", note: "ROI: 2.22×" },
              { param: "WHO Coordination", value: "$350K", status: "CANONICAL", note: "Окремий scope" },
              { param: "Повний портфель", value: "$1,945K", status: "CANONICAL", note: "UNIFIED_PROGRAM_MATRIX" },
              { param: "Вже інвестовано консорціумом", value: "$5M", status: "CANONICAL", note: "" },
              { param: "Вартість для держави", value: "$0.00", status: "CANONICAL", note: "SaaS-підписка — держава купує послугу" },
              { param: "Tom Fletcher MOU", value: "$2B", status: "CANONICAL", note: "29 Dec 2025, OCHA" },
              { param: "EBRD Veterans Charter", value: "38 банків, €12.2M", status: "CANONICAL", note: "111 суб-кредитів" },
              { param: "Трицінова архітектура", value: "€70/hr | €30–60/hr | €50/hr", status: "CANONICAL", note: "Pull | Market | Operational" },
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-xs text-muted-foreground font-medium">{item.param}</p>
                    <Badge className={`${statusColor[item.status]} text-xs shrink-0 ml-2`}>{item.status}</Badge>
                  </div>
                  <p className="text-lg font-bold mb-1">{item.value}</p>
                  {item.note && <p className="text-xs text-muted-foreground">{item.note}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Data discrepancies */}
      <section className="py-12">
        <div className="container">
          <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl max-w-3xl mx-auto">
            <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Реєстр розбіжностей — зафіксовані канонічні значення
            </h3>
            <ul className="space-y-2 text-sm text-amber-900">
              {[
                "mhGAP: 117,652 (не 96K) — WHO mhGAP Dashboard, Session Extraction Part 7",
                "Treatment gap: 74% (canonical) — IOM/UNHCR 2023 (деякі джерела 95% — contested)",
                "Комісія: 7→3% дегресивна (не 2.5–3.5% як у деяких старих файлах)",
                "Humanitarian funding: ~$137M total (не $67M і не $100M — це часткові цифри)",
                "Provider pipeline: 8 потоків з конс. конверсіями 5–40% (не 6 потоків з 30–50%)",
                "Клінічна потреба: 3.9M (не 3.3M — Lancet 2023 оновлення)",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
