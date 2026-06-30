import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Eye, FileSearch, CheckCircle2, XCircle, Clock,
  BarChart3, Shield, AlertTriangle, Download, ArrowLeft,
  Users, Banknote, TrendingUp
} from "lucide-react";

const NAVY = "#0F2B46";
const GOLD = "#D4A017";
const VIOLET = "#7C3AED";

const mockReports = [
  { id: "RPT-001", project: "Психологічна підтримка ВПО — Львів", provider: "Марченко О.В.", program: "USAID MHPSS Q1", period: "Січ–Бер 2025", beneficiaries: 48, sessions: 192, budget: 96000, status: "submitted", risk: "low" },
  { id: "RPT-002", project: "Ветеранська підтримка — Харків", provider: "Коваль І.П.", program: "EU Mental Health Grant", period: "Лют–Кві 2025", beneficiaries: 31, sessions: 124, budget: 62000, status: "review", risk: "medium" },
  { id: "RPT-003", project: "Train for Care — Одеса", provider: "Бондаренко С.М.", program: "КСВ Метінвест", period: "Бер 2025", beneficiaries: 20, sessions: 80, budget: 75000, status: "approved", risk: "low" },
  { id: "RPT-004", project: "ПТСР реабілітація — Дніпро", provider: "Сидоренко К.О.", program: "UNHCR Cluster", period: "Лют 2025", beneficiaries: 15, sessions: 45, budget: 31500, status: "flagged", risk: "high" },
];

const mockCompliance = [
  { provider: "Марченко О.В.", credentials: ["mhGAP", "CPT"], verified: true, sessions: 192, rating: 94 },
  { provider: "Коваль І.П.", credentials: ["EMDR", "CBT"], verified: true, sessions: 124, rating: 88 },
  { provider: "Бондаренко С.М.", credentials: ["mhGAP"], verified: true, sessions: 80, rating: 91 },
  { provider: "Сидоренко К.О.", credentials: ["Нема верифікації"], verified: false, sessions: 45, rating: 42 },
];

const tabs = [
  { id: "reports", label: "Звіти", icon: FileSearch },
  { id: "compliance", label: "Комплаєнс", icon: Shield },
  { id: "summary", label: "Зведення", icon: BarChart3 },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    submitted: { label: "Подано", className: "bg-blue-100 text-blue-800" },
    review: { label: "На перевірці", className: "bg-yellow-100 text-yellow-800" },
    approved: { label: "Затверджено", className: "bg-green-100 text-green-800" },
    flagged: { label: "Позначено", className: "bg-red-100 text-red-800" },
  };
  const s = map[status] ?? { label: status, className: "bg-slate-100 text-slate-700" };
  return <Badge className={s.className}>{s.label}</Badge>;
}

function RiskBadge({ risk }: { risk: string }) {
  const map: Record<string, { icon: typeof CheckCircle2; color: string }> = {
    low: { icon: CheckCircle2, color: "text-green-600" },
    medium: { icon: AlertTriangle, color: "text-yellow-600" },
    high: { icon: XCircle, color: "text-red-600" },
  };
  const r = map[risk] ?? map.medium;
  return <r.icon className={`w-4 h-4 ${r.color}`} />;
}

export default function AuditorCabinet() {
  const [activeTab, setActiveTab] = useState("reports");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-10 shadow-sm">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/portal">
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                <ArrowLeft className="w-4 h-4" /> Портал
              </Button>
            </Link>
            <div className="h-5 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(124,58,237,0.1)" }}>
                <Eye className="w-4 h-4" style={{ color: VIOLET }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: NAVY }}>Кабінет аудитора</p>
                <p className="text-xs text-muted-foreground">Аудитор · Супервайзер · Громадський контроль</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-violet-100 text-violet-800 text-xs">Незалежний аудит</Badge>
            <Button size="sm" variant="outline" className="gap-1 text-xs">
              <Download className="w-3.5 h-3.5" /> Звіт
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-6">
        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: FileSearch, label: "Звітів на перевірці", value: "4", color: "text-blue-600", bg: "bg-blue-50" },
            { icon: Users, label: "Охоплено бенефіціарів", value: "114", color: "text-green-600", bg: "bg-green-50" },
            { icon: Banknote, label: "Бюджет під моніторингом", value: "₴264,500", color: "text-amber-600", bg: "bg-amber-50" },
            { icon: AlertTriangle, label: "Позначено ризиків", value: "1", color: "text-red-600", bg: "bg-red-50" },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className={`w-9 h-9 rounded-lg ${item.bg} flex items-center justify-center mb-3`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="text-xl font-bold" style={{ color: NAVY }}>{item.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-5 bg-white border rounded-lg p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === tab.id ? "text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              style={activeTab === tab.id ? { background: VIOLET } : {}}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Звіти */}
        {activeTab === "reports" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileSearch className="w-4 h-4" style={{ color: VIOLET }} />
                Звіти проєктів — на перевірці
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="text-left p-3">ID</th>
                      <th className="text-left p-3">Проєкт</th>
                      <th className="text-left p-3">Надавач</th>
                      <th className="text-left p-3">Програма</th>
                      <th className="text-right p-3">Бенеф.</th>
                      <th className="text-right p-3">Сеанси</th>
                      <th className="text-right p-3">Бюджет</th>
                      <th className="text-center p-3">Ризик</th>
                      <th className="text-center p-3">Статус</th>
                      <th className="text-center p-3">Дія</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockReports.map((r, i) => (
                      <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-mono text-xs text-muted-foreground">{r.id}</td>
                        <td className="p-3 font-medium max-w-[200px]">
                          <div className="leading-snug">{r.project}</div>
                          <div className="text-xs text-muted-foreground">{r.period}</div>
                        </td>
                        <td className="p-3 text-sm">{r.provider}</td>
                        <td className="p-3 text-xs text-muted-foreground max-w-[140px] leading-snug">{r.program}</td>
                        <td className="p-3 text-right font-mono">{r.beneficiaries}</td>
                        <td className="p-3 text-right font-mono">{r.sessions}</td>
                        <td className="p-3 text-right font-mono">₴{r.budget.toLocaleString()}</td>
                        <td className="p-3 text-center"><div className="flex justify-center"><RiskBadge risk={r.risk} /></div></td>
                        <td className="p-3 text-center"><StatusBadge status={r.status} /></td>
                        <td className="p-3 text-center">
                          <div className="flex gap-1 justify-center">
                            <Button size="sm" variant="outline" className="text-xs h-7 px-2 text-green-700 border-green-300 hover:bg-green-50">✓</Button>
                            <Button size="sm" variant="outline" className="text-xs h-7 px-2 text-red-700 border-red-300 hover:bg-red-50">✗</Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab: Комплаєнс */}
        {activeTab === "compliance" && (
          <div className="grid md:grid-cols-2 gap-4">
            {mockCompliance.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <Card className={!item.verified ? "border-red-200 bg-red-50/30" : ""}>
                  <CardContent className="pt-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-sm font-semibold" style={{ color: NAVY }}>
                          {item.provider.split(" ")[0][0]}
                        </div>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: NAVY }}>{item.provider}</p>
                          <p className="text-xs text-muted-foreground">{item.sessions} сеансів</p>
                        </div>
                      </div>
                      {item.verified
                        ? <Badge className="bg-green-100 text-green-800 gap-1"><CheckCircle2 className="w-3 h-3" /> Верифіковано</Badge>
                        : <Badge className="bg-red-100 text-red-800 gap-1"><XCircle className="w-3 h-3" /> Не верифіковано</Badge>
                      }
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.credentials.map((c, j) => (
                        <Badge key={j} variant="outline" className="text-xs">{c}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                        <div className="h-1.5 rounded-full" style={{ width: `${item.rating}%`, background: item.rating > 70 ? "#16A34A" : item.rating > 50 ? GOLD : "#EF4444" }} />
                      </div>
                      <span className="text-xs font-semibold" style={{ color: NAVY }}>{item.rating}/100</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tab: Зведення */}
        {activeTab === "summary" && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" style={{ color: VIOLET }} />
                  Виконання програм
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "USAID MHPSS Q1", used: 78, total: 100 },
                  { name: "EU Mental Health Grant", used: 52, total: 100 },
                  { name: "КСВ Метінвест", used: 95, total: 100 },
                  { name: "UNHCR Cluster", used: 31, total: 100 },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{p.name}</span>
                      <span className="font-semibold" style={{ color: NAVY }}>{p.used}%</span>
                    </div>
                    <div className="bg-slate-100 rounded-full h-2">
                      <div className="h-2 rounded-full transition-all" style={{ width: `${p.used}%`, background: p.used > 80 ? "#16A34A" : GOLD }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="w-4 h-4" style={{ color: VIOLET }} />
                  Аудит-трейл
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { time: "Сьогодні 14:32", action: "RPT-003 затверджено аудитором", type: "approved" },
                    { time: "Сьогодні 11:15", action: "RPT-004 позначено як ризиковий", type: "flagged" },
                    { time: "Вчора 16:48", action: "RPT-002 передано на перевірку", type: "review" },
                    { time: "Вчора 09:20", action: "RPT-001 отримано від надавача", type: "submitted" },
                  ].map((log, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">{log.time}</p>
                        <p>{log.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
