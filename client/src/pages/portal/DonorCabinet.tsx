import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import {
  ArrowLeft, Heart, TrendingUp, BarChart3, Award, Calculator,
  Shield, Globe, Users, CheckCircle2, AlertCircle, FileText
} from "lucide-react";

function ImpactCalculator() {
  const [budget, setBudget] = useState(75000);
  const [cohortSize, setCohortSize] = useState(20);
  const [sessionsPerPerson, setSessionsPerPerson] = useState(12);
  const [costPerSession, setCostPerSession] = useState(50);
  const [platformFee, setPlatformFee] = useState(7);

  const totalCost = cohortSize * sessionsPerPerson * costPerSession;
  const platformCost = totalCost * (platformFee / 100);
  const netImpact = totalCost - platformCost;
  const beneficiariesPerDollar = (cohortSize * sessionsPerPerson) / budget;
  const roi = (netImpact / budget) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-amber-600" />
          Імпакт-калькулятор програми
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Бюджет (€)</label>
            <input type="range" min="10000" max="500000" step="5000" value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full" />
            <div className="text-sm font-mono">€{budget.toLocaleString()}</div>
          </div>
          <div>
            <label className="text-sm font-medium">Когорта (осіб)</label>
            <input type="range" min="5" max="100" step="5" value={cohortSize}
              onChange={(e) => setCohortSize(Number(e.target.value))}
              className="w-full" />
            <div className="text-sm font-mono">{cohortSize} осіб</div>
          </div>
          <div>
            <label className="text-sm font-medium">Сеансів/особу</label>
            <input type="range" min="4" max="40" step="2" value={sessionsPerPerson}
              onChange={(e) => setSessionsPerPerson(Number(e.target.value))}
              className="w-full" />
            <div className="text-sm font-mono">{sessionsPerPerson} сеансів</div>
          </div>
          <div>
            <label className="text-sm font-medium">Вартість сеансу (€)</label>
            <input type="range" min="20" max="200" step="5" value={costPerSession}
              onChange={(e) => setCostPerSession(Number(e.target.value))}
              className="w-full" />
            <div className="text-sm font-mono">€{costPerSession}</div>
          </div>
        </div>
        <div className="bg-slate-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Загальна вартість послуг:</span>
            <span className="font-mono font-bold">€{totalCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Комісія платформи ({platformFee}%):</span>
            <span className="font-mono">€{platformCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-green-600">
            <span>Чистий вплив:</span>
            <span className="font-mono">€{netImpact.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Сеансів/€1000:</span>
            <span className="font-mono">{(beneficiariesPerDollar * 1000).toFixed(1)}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-amber-600">
            <span>ROI:</span>
            <span className="font-mono">{roi.toFixed(2)}×</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ScoringMockup() {
  const initiatives = [
    { name: "Kharkiv PTSD Program", score: 91, status: "AUTO", action: "Invest", color: "text-green-600" },
    { name: "Mariupol Child Support", score: 73, status: "REVIEW", action: "Pending", color: "text-amber-600" },
    { name: "Odesa Veterans Care", score: 45, status: "REJECT", action: "Low ROI", color: "text-red-600" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-amber-600" />
          Скоринг гуманітарних ініціатив
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-2 text-xs font-bold text-muted-foreground">
            <div>Ініціатива</div>
            <div>Скор</div>
            <div>Статус</div>
            <div>Дія</div>
          </div>
          {initiatives.map((item, i) => (
            <div key={i} className="grid grid-cols-4 gap-2 items-center py-2 border-b">
              <div className="text-sm font-medium">{item.name}</div>
              <div className="text-sm font-mono">{item.score}/100</div>
              <div className={`text-sm font-bold ${item.color}`}>{item.status}</div>
              <div className="text-sm text-muted-foreground">{item.action}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-slate-50 rounded-lg text-xs text-muted-foreground">
          <p><strong>Автоматичні пороги:</strong> Скор &gt;75 — авто-затвердження, 50-74 — ручне розгляд, &lt;50 — відхилення.</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DonorCabinet() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 text-white py-8">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/portal">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-1" />
                До порталу
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Heart className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Кабінет донора</h1>
              <p className="text-white/60">Демо-режим • Управління програмами та інвестиціями</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <Tabs defaultValue="calculator">
          <TabsList className="mb-6">
            <TabsTrigger value="calculator">
              <Calculator className="w-4 h-4 mr-2" />
              Імпакт-калькулятор
            </TabsTrigger>
            <TabsTrigger value="scoring">
              <BarChart3 className="w-4 h-4 mr-2" />
              Скоринг
            </TabsTrigger>
            <TabsTrigger value="programs">
              <FileText className="w-4 h-4 mr-2" />
              Програми
            </TabsTrigger>
            <TabsTrigger value="honor">
              <Award className="w-4 h-4 mr-2" />
              Дошка пошани
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator">
            <ImpactCalculator />
          </TabsContent>

          <TabsContent value="scoring">
            <ScoringMockup />
          </TabsContent>

          <TabsContent value="programs">
            <Card>
              <CardHeader>
                <CardTitle>Мої програми фінансування</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold">Train for Care — Когорта №20</h3>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">€75,605 • 20 фахівців • EMDR + mhGAP</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 18/20 зареєстровано</span>
                      <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4" /> 90% комплейтність</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg opacity-50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold">VR Bravemind — Ветерани Харківа</h3>
                      <Badge variant="outline">Draft</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">$12.50 за сеанс • Планується 40 бенефіціарів</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="honor">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  Дошка пошани гуманітарних акторів
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-lg">1</div>
                    <div className="flex-1">
                      <h3 className="font-bold">Івент Глобал</h3>
                      <p className="text-sm text-muted-foreground">€2.4M внесок • 12,000 бенефіціарів • ESG рейтинг A+</p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800">Золотий партнер</Badge>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border">
                    <div className="w-12 h-12 rounded-full bg-slate-400 flex items-center justify-center text-white font-bold text-lg">2</div>
                    <div className="flex-1">
                      <h3 className="font-bold">Український Червоний Хрест</h3>
                      <p className="text-sm text-muted-foreground">€1.8M • 8,500 бенефіціарів • Медична програма</p>
                    </div>
                    <Badge variant="outline">Серебрний партнер</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
