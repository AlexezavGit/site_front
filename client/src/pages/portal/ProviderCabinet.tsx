import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import {
  ArrowLeft, Stethoscope, Users, TrendingUp, Calculator,
  CheckCircle2, AlertCircle, FileText, Star, Clock, DollarSign
} from "lucide-react";

// Circulation Folder Mockup
function CirculationFolder() {
  const [patients] = useState([
    { id: 1, type: "diagnosed", status: "new", age: "34", diagnosis: "PTSD, середній", ready: true },
    { id: 2, type: "undiagnosed", status: "pending", age: "28", diagnosis: "Не діагностовано", ready: false },
    { id: 3, type: "diagnosed", status: "invited", age: "45", diagnosis: "GAD-7: тяжкий", ready: true },
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-teal-600" />
          Циркулейшн фолдер
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {patients.map((p) => (
            <div key={p.id} className={`p-4 border rounded-lg ${p.ready ? 'bg-teal-50 border-teal-200' : 'bg-slate-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge className={p.type === 'diagnosed' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-800'}>
                    {p.type === 'diagnosed' ? 'Діагностовано' : 'Не діагностовано'}
                  </Badge>
                  <Badge variant="outline">{p.status}</Badge>
                </div>
                <span className="text-sm text-muted-foreground">Вік: {p.age}</span>
              </div>
              <p className="text-sm font-medium mb-2">{p.diagnosis}</p>
              <div className="flex gap-2">
                <Button size="sm" variant={p.ready ? "default" : "outline"} disabled={!p.ready}>
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  {p.ready ? "Зацікавлений" : "Очікує діагнозу"}
                </Button>
                {p.ready && (
                  <Button size="sm" variant="outline">
                    <FileText className="w-4 h-4 mr-1" />
                    Запросити сеанс
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Income Calculator
function IncomeCalculator() {
  const [sessionsPerWeek, setSessionsPerWeek] = useState(20);
  const [sessionRate, setSessionRate] = useState(50);
  const [expenses, setExpenses] = useState(500);
  const [taxRate, setTaxRate] = useState(5);

  const monthlyRevenue = sessionsPerWeek * sessionRate * 4;
  const monthlyTax = monthlyRevenue * (taxRate / 100);
  const monthlyExpenses = expenses;
  const netIncome = monthlyRevenue - monthlyTax - monthlyExpenses;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-teal-600" />
          Калькулятор доходу
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Сеансів/тиждень</label>
            <input type="range" min="5" max="60" step="5" value={sessionsPerWeek}
              onChange={(e) => setSessionsPerWeek(Number(e.target.value))}
              className="w-full" />
            <div className="text-sm font-mono">{sessionsPerWeek}</div>
          </div>
          <div>
            <label className="text-sm font-medium">Вартість сеансу (€)</label>
            <input type="range" min="20" max="200" step="5" value={sessionRate}
              onChange={(e) => setSessionRate(Number(e.target.value))}
              className="w-full" />
            <div className="text-sm font-mono">€{sessionRate}</div>
          </div>
          <div>
            <label className="text-sm font-medium">Витрати/міс (€)</label>
            <input type="range" min="100" max="2000" step="50" value={expenses}
              onChange={(e) => setExpenses(Number(e.target.value))}
              className="w-full" />
            <div className="text-sm font-mono">€{expenses}</div>
          </div>
          <div>
            <label className="text-sm font-medium">Податок (%)</label>
            <input type="range" min="0" max="20" step="1" value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-full" />
            <div className="text-sm font-mono">{taxRate}%</div>
          </div>
        </div>
        <div className="bg-teal-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Місячний дохід (грос):</span>
            <span className="font-mono font-bold">€{monthlyRevenue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Податок:</span>
            <span className="font-mono">€{monthlyTax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Витрати:</span>
            <span className="font-mono">€{monthlyExpenses.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-green-600">
            <span>Чистий дохід:</span>
            <span className="font-mono">€{netIncome.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Річний дохід:</span>
            <span className="font-mono font-bold">€{(netIncome * 12).toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Ranking Mockup
function RankingMockup() {
  const providers = [
    { name: "Др. Олена Ш.", cases: 47, verified: 45, rating: 4.9, rank: 1 },
    { name: "Др. Максим К.", cases: 38, verified: 35, rating: 4.7, rank: 2 },
    { name: "Др. Світлана П.", cases: 32, verified: 30, rating: 4.6, rank: 3 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-teal-600" />
          Ренкінг фахівців
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-5 gap-2 text-xs font-bold text-muted-foreground">
            <div>#</div>
            <div>Фахівець</div>
            <div>Кейси</div>
            <div>Верифіковано</div>
            <div>Рейтинг</div>
          </div>
          {providers.map((p) => (
            <div key={p.rank} className="grid grid-cols-5 gap-2 items-center py-2 border-b">
              <div className="font-bold text-lg">{p.rank}</div>
              <div className="text-sm font-medium">{p.name}</div>
              <div className="text-sm font-mono">{p.cases}</div>
              <div className="text-sm font-mono text-green-600">{p.verified}</div>
              <div className="text-sm font-mono text-amber-600">{p.rating}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-teal-50 rounded-lg text-xs text-muted-foreground">
          <p><strong>Модель ренкінгу:</strong> 70% вага верифікованих бенефіціарами кейсів + 20% кількість сертифікатів + 10% освіта.</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProviderCabinet() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-teal-900 text-white py-8">
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
            <div className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-teal-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Кабінет надавача</h1>
              <p className="text-white/60">Демо-режим • Керування пацієнтами та практикою</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <Tabs defaultValue="circulation">
          <TabsList className="mb-6">
            <TabsTrigger value="circulation">
              <Users className="w-4 h-4 mr-2" />
              Циркулейшн фолдер
            </TabsTrigger>
            <TabsTrigger value="calculator">
              <Calculator className="w-4 h-4 mr-2" />
              Дохід
            </TabsTrigger>
            <TabsTrigger value="ranking">
              <Star className="w-4 h-4 mr-2" />
              Ренкінг
            </TabsTrigger>
            <TabsTrigger value="patients">
              <FileText className="w-4 h-4 mr-2" />
              Пацієнти
            </TabsTrigger>
          </TabsList>

          <TabsContent value="circulation">
            <CirculationFolder />
          </TabsContent>

          <TabsContent value="calculator">
            <IncomeCalculator />
          </TabsContent>

          <TabsContent value="ranking">
            <RankingMockup />
          </TabsContent>

          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <CardTitle>Активні пацієнти</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold">Бенефіціар #2847</h3>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">PTSD • 8/12 сеансів • Покращення: 34%</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Наступний: 15 червня</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> Співфінансування: 60%</span>
                    </div>
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
