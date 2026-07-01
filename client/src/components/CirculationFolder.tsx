import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Bell, CheckCircle2, XCircle, Clock, CalendarDays,
  Video, MapPin, ChevronDown, ChevronUp, Users,
  AlertTriangle, Brain, Heart, Shield, UserCheck
} from "lucide-react";

interface IncomingCase {
  id: string;
  anonymous_id: string;
  arrived_at: string;
  phq9: number;
  gad7: number;
  pcl5: number;
  route: string;
  severity: string;
  severityColor: string;
  age_range: string;
  region: string;
  status: "new" | "accepted" | "declined" | "booked";
  provider_proposed_time?: string;
  format?: "online" | "offline";
}

const MOCK_CASES: IncomingCase[] = [
  {
    id: "c001", anonymous_id: "BNF-2025-0847",
    arrived_at: "2026-07-01T09:15:00", phq9: 18, gad7: 14, pcl5: 52,
    route: "specialist", severity: "Помірно тяжкий", severityColor: "text-red-700",
    age_range: "25–34", region: "Харківська обл.", status: "new"
  },
  {
    id: "c002", anonymous_id: "BNF-2025-0902",
    arrived_at: "2026-07-01T10:30:00", phq9: 12, gad7: 10, pcl5: 35,
    route: "specialist", severity: "Помірний", severityColor: "text-orange-600",
    age_range: "35–44", region: "Київська обл.", status: "new"
  },
  {
    id: "c003", anonymous_id: "BNF-2025-0788",
    arrived_at: "2026-06-30T16:00:00", phq9: 22, gad7: 18, pcl5: 67,
    route: "psychiatry", severity: "Тяжкий", severityColor: "text-red-900",
    age_range: "45–54", region: "Запорізька обл.", status: "new"
  },
  {
    id: "c004", anonymous_id: "BNF-2025-0711",
    arrived_at: "2026-06-29T14:00:00", phq9: 9, gad7: 7, pcl5: 28,
    route: "mid_level", severity: "Легкий", severityColor: "text-yellow-600",
    age_range: "18–24", region: "Дніпропетровська обл.", status: "accepted",
    provider_proposed_time: "2026-07-05T10:00", format: "online"
  },
];

function routeLabel(route: string) {
  const map: Record<string, string> = {
    no_intervention: "Самодопомога",
    self_help: "Психоосвіта",
    mid_level: "Середня ланка",
    specialist: "Спеціаліст",
    psychiatry: "Психіатрія",
  };
  return map[route] ?? route;
}

function routeBadgeStyle(route: string) {
  const map: Record<string, string> = {
    no_intervention: "bg-green-100 text-green-800",
    self_help: "bg-yellow-100 text-yellow-800",
    mid_level: "bg-orange-100 text-orange-800",
    specialist: "bg-red-100 text-red-800",
    psychiatry: "bg-red-200 text-red-900 font-bold",
  };
  return map[route] ?? "bg-slate-100 text-slate-700";
}

export default function CirculationFolder() {
  const { toast } = useToast();
  const [cases, setCases] = useState<IncomingCase[]>(MOCK_CASES);
  const [expandedId, setExpandedId] = useState<string | null>("c001");
  const [proposedTimes, setProposedTimes] = useState<Record<string, string>>({});
  const [proposedFormats, setProposedFormats] = useState<Record<string, "online" | "offline">>({});

  const newCount = cases.filter(c => c.status === "new").length;

  const handleAccept = (id: string) => {
    const time = proposedTimes[id];
    const format = proposedFormats[id] ?? "online";
    if (!time) { toast({ title: "Вкажіть запропонований час", variant: "destructive" }); return; }
    setCases(prev => prev.map(c => c.id === id ? { ...c, status: "accepted" as const, provider_proposed_time: time, format } : c));
    toast({ title: "Запис запропоновано!", description: `Бенефіціар ${cases.find(c => c.id === id)?.anonymous_id} отримає сповіщення для підтвердження.` });
  };

  const handleDecline = (id: string) => {
    setCases(prev => prev.map(c => c.id === id ? { ...c, status: "declined" as const } : c));
    toast({ description: "Кейс повернено до Циркулейшн Фолдеру для інших фахівців." });
  };

  const handleBooked = (id: string) => {
    setCases(prev => prev.map(c => c.id === id ? { ...c, status: "booked" as const } : c));
    toast({ title: "Сеанс підтверджено!", description: "Додано до вашого календаря. Бенефіціар отримав підтвердження." });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-teal-600" />
          <span className="font-semibold text-slate-800">Циркулейшн Фолдер</span>
          {newCount > 0 && (
            <span className="flex items-center gap-1">
              <Bell className="w-4 h-4 text-amber-500 animate-pulse" />
              <Badge className="bg-amber-100 text-amber-800">{newCount} нових</Badge>
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">AI-тріаж · Анонімні кейси</p>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        {[
          { icon: Brain, label: "PHQ-9", desc: "Депресія", color: "text-blue-600" },
          { icon: Heart, label: "GAD-7", desc: "Тривога", color: "text-emerald-600" },
          { icon: Shield, label: "PCL-5", desc: "ПТСР", color: "text-indigo-600" },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5 p-2 rounded bg-slate-50 border">
            <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
            <span className="font-bold">{item.label}</span>
            <span className="text-muted-foreground">{item.desc}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {cases.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card className={`border ${c.status === "new" ? "border-amber-300 bg-amber-50/30" : c.status === "booked" ? "border-green-300 bg-green-50/20" : "border-slate-200"}`}>
              <CardContent className="pt-3 pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-mono text-xs font-bold text-slate-700">{c.anonymous_id}</span>
                      <Badge className={routeBadgeStyle(c.route)}>{routeLabel(c.route)}</Badge>
                      {c.status === "new" && <Badge className="bg-amber-100 text-amber-800 animate-pulse text-[10px]">Нове сповіщення</Badge>}
                      {c.status === "accepted" && <Badge className="bg-blue-100 text-blue-800 text-[10px]">Запропоновано час</Badge>}
                      {c.status === "booked" && <Badge className="bg-green-100 text-green-800 text-[10px]">✓ Підтверджено</Badge>}
                      {c.status === "declined" && <Badge className="bg-slate-100 text-slate-600 text-[10px]">Відхилено</Badge>}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                      <span>{c.age_range} р. · {c.region}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(c.arrived_at).toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Brain className="w-3.5 h-3.5 text-blue-500" />
                        <span className="font-mono font-bold">{c.phq9}</span><span className="text-muted-foreground">/27</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <Heart className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="font-mono font-bold">{c.gad7}</span><span className="text-muted-foreground">/21</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <Shield className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="font-mono font-bold">{c.pcl5}</span><span className="text-muted-foreground">/80</span>
                      </div>
                      <span className={`text-xs font-semibold ${c.severityColor}`}>{c.severity}</span>
                    </div>

                    {c.status === "accepted" && c.provider_proposed_time && (
                      <div className="mt-2 p-2 rounded bg-blue-50 border border-blue-200 text-xs flex items-center gap-2">
                        <CalendarDays className="w-3.5 h-3.5 text-blue-600" />
                        <span>Запропоновано: <strong>{new Date(c.provider_proposed_time).toLocaleString("uk-UA", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</strong></span>
                        {c.format === "online" ? <Video className="w-3.5 h-3.5 text-blue-500" /> : <MapPin className="w-3.5 h-3.5 text-green-600" />}
                        <Button size="sm" className="ml-auto h-6 text-[10px] bg-green-600 hover:bg-green-700 text-white px-2"
                          onClick={() => handleBooked(c.id)} data-testid={`button-confirm-booking-${c.id}`}>
                          Підтвердити
                        </Button>
                      </div>
                    )}

                    {c.status === "booked" && (
                      <div className="mt-2 p-2 rounded bg-green-50 border border-green-200 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                        <span>Сеанс підтверджено — {new Date(c.provider_proposed_time!).toLocaleString("uk-UA", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
                      </div>
                    )}

                    {c.route === "psychiatry" && (
                      <div className="mt-2 p-2 rounded bg-red-50 border border-red-300 text-xs flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-700 shrink-0" />
                        <span className="text-red-800">Тяжкий випадок. Рекомендовано перенаправлення до психіатра / стаціонару.</span>
                      </div>
                    )}
                  </div>

                  <button className="ml-3 text-muted-foreground hover:text-slate-700"
                    onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
                    data-testid={`button-expand-case-${c.id}`}
                  >
                    {expandedId === c.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                <AnimatePresence>
                  {expandedId === c.id && c.status === "new" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                      <div className="mt-4 pt-4 border-t space-y-3">
                        <p className="text-xs font-medium text-slate-700">Запропонуйте час діагностичного сеансу:</p>
                        <div className="flex gap-3">
                          <Input type="datetime-local" className="text-xs flex-1"
                            value={proposedTimes[c.id] ?? ""}
                            onChange={e => setProposedTimes(prev => ({ ...prev, [c.id]: e.target.value }))}
                            data-testid={`input-proposed-time-${c.id}`}
                          />
                          <div className="flex gap-1">
                            {(["online", "offline"] as const).map(f => (
                              <Button key={f} size="sm" variant={(proposedFormats[c.id] ?? "online") === f ? "default" : "outline"}
                                onClick={() => setProposedFormats(prev => ({ ...prev, [c.id]: f }))}
                                className={(proposedFormats[c.id] ?? "online") === f ? "bg-teal-600 text-white hover:bg-teal-700" : ""}
                                data-testid={`format-${f}-${c.id}`}
                              >
                                {f === "online" ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                            onClick={() => handleAccept(c.id)}
                            data-testid={`button-accept-case-${c.id}`}
                          >
                            <UserCheck className="w-3.5 h-3.5 mr-1" /> Прийняти та запропонувати час
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50"
                            onClick={() => handleDecline(c.id)}
                            data-testid={`button-decline-case-${c.id}`}
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1" /> Відхилити
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
