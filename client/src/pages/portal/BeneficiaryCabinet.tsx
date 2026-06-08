import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import {
  ArrowLeft, Users, Heart, Calculator, Stethoscope,
  CheckCircle2, AlertCircle, DollarSign, TrendingUp, Share2
} from "lucide-react";

// Diagnosis Mockup
function DiagnosisMockup() {
  const [step, setStep] = useState(1);

  const questions = [
    { q: "Чи ви почуваєте тривогу або неспокій більше ніж завичай?", options: ["Ні", "Іноді", "Часто", "Постійно"] },
    { q: "Чи уникають спогади з сном?", options: ["Ніколи", "Іноді", "Часто", "Постійно"] },
    { q: "Чи вам важко зосередитися або зберігти концентрацію?", options: ["Не важко", "Іноді", "Часто", "Дуже важко"] },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-rose-600" />
          Самодіагностика (демо)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {step <= questions.length ? (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">Питання {step} з {questions.length}</div>
            <h3 className="text-lg font-medium">{questions[step - 1].q}</h3>
            <div className="space-y-2">
              {questions[step - 1].options.map((opt, i) => (
                <Button key={i} variant="outline" className="w-full justify-start" onClick={() => setStep(step + 1)}>
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Діагностику завершено</h3>
            <p className="text-sm text-muted-foreground mb-4">За результатами рекомендовано консультацію з спеціалістом.</p>
            <Button onClick={() => setStep(1)}>Повторити</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Cost Calculator
function CostCalculator() {
  const [sessionCount, setSessionCount] = useState(12);
  const [sessionCost, setSessionCost] = useState(50);
  const [coFinancing, setCoFinancing] = useState(60);
  const [creditAmount, setCreditAmount] = useState(5000);
  const [creditRate, setCreditRate] = useState(18);
  const [creditTerm, setCreditTerm] = useState(12);

  const totalCost = sessionCount * sessionCost;
  const covered = totalCost * (coFinancing / 100);
  const selfPay = totalCost - covered;

  const monthlyPayment = (creditAmount * (creditRate / 100 / 12)) / (1 - Math.pow(1 + creditRate / 100 / 12, -creditTerm));
  const totalCreditCost = monthlyPayment * creditTerm;
  const savings = creditAmount * (creditRate / 100) * (creditTerm / 12) * 0.3;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-rose-600" />
            Калькулятор кошторису сесій
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Кількість сеансів</label>
              <input type="range" min="4" max="40" step="2" value={sessionCount}
                onChange={(e) => setSessionCount(Number(e.target.value))}
                className="w-full" />
              <div className="text-sm font-mono">{sessionCount}</div>
            </div>
            <div>
              <label className="text-sm font-medium">Вартість (€)</label>
              <input type="range" min="20" max="200" step="5" value={sessionCost}
                onChange={(e) => setSessionCost(Number(e.target.value))}
                className="w-full" />
              <div className="text-sm font-mono">€{sessionCost}</div>
            </div>
            <div>
              <label className="text-sm font-medium">Співфінансування (%)</label>
              <input type="range" min="0" max="100" step="5" value={coFinancing}
                onChange={(e) => setCoFinancing(Number(e.target.value))}
                className="w-full" />
              <div className="text-sm font-mono">{coFinancing}%</div>
            </div>
          </div>
          <div className="bg-rose-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Загальна вартість:</span>
              <span className="font-mono font-bold">€{totalCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Співфінансування:</span>
              <span className="font-mono">€{covered.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-green-600">
              <span>Самооплата:</span>
              <span className="font-mono">€{selfPay.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-rose-600" />
            Калькулятор зниження виплат по кредиту
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Сума (€)</label>
              <input type="range" min="1000" max="50000" step="1000" value={creditAmount}
                onChange={(e) => setCreditAmount(Number(e.target.value))}
                className="w-full" />
              <div className="text-sm font-mono">€{creditAmount.toLocaleString()}</div>
            </div>
            <div>
              <label className="text-sm font-medium">Ставка (%)</label>
              <input type="range" min="5" max="30" step="1" value={creditRate}
                onChange={(e) => setCreditRate(Number(e.target.value))}
                className="w-full" />
              <div className="text-sm font-mono">{creditRate}%</div>
            </div>
            <div>
              <label className="text-sm font-medium">Термін (міс)</label>
              <input type="range" min="6" max="60" step="6" value={creditTerm}
                onChange={(e) => setCreditTerm(Number(e.target.value))}
                className="w-full" />
              <div className="text-sm font-mono">{creditTerm} міс</div>
            </div>
          </div>
          <div className="bg-rose-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Місячний платіж:</span>
              <span className="font-mono font-bold">€{monthlyPayment.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Загальна переплата:</span>
              <span className="font-mono">€{totalCreditCost.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-green-600">
              <span>Економія (за покращення ментального здоров'я):</span>
              <span className="font-mono">€{savings.toFixed(0)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// P2P Fundraising Mockup
function P2PFundraising() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="w-5 h-5 text-rose-600" />
          P2P-збір коштів
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold">Мій курс реабілітації</h3>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">€600 з €800 зібрано • 12 сеансів • 75% готовності</p>
            <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
              <div className="bg-rose-500 h-2 rounded-full" style={{ width: "75%" }} />
            </div>
            <div className="flex gap-2">
              <Button size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                Поширити
              </Button>
              <Button size="sm" variant="outline">
                <DollarSign className="w-4 h-4 mr-1" />
                Поповнити
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function BeneficiaryCabinet() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-rose-900 text-white py-8">
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
            <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center">
              <Users className="w-8 h-8 text-rose-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Кабінет бенефіціара</h1>
              <p className="text-white/60">Демо-режим • Діагностика, вибір фахівця, кошторис</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <Tabs defaultValue="diagnosis">
          <TabsList className="mb-6">
            <TabsTrigger value="diagnosis">
              <Stethoscope className="w-4 h-4 mr-2" />
              Діагностика
            </TabsTrigger>
            <TabsTrigger value="calculator">
              <Calculator className="w-4 h-4 mr-2" />
              Калькулятор
            </TabsTrigger>
            <TabsTrigger value="p2p">
              <Share2 className="w-4 h-4 mr-2" />
              P2P-збір
            </TabsTrigger>
            <TabsTrigger value="providers">
              <Heart className="w-4 h-4 mr-2" />
              Фахівці
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diagnosis">
            <DiagnosisMockup />
          </TabsContent>

          <TabsContent value="calculator">
            <CostCalculator />
          </TabsContent>

          <TabsContent value="p2p">
            <P2PFundraising />
          </TabsContent>

          <TabsContent value="providers">
            <Card>
              <CardHeader>
                <CardTitle>Рекомендовані фахівці</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold">Др. Олена Ш.</h3>
                      <div className="flex items-center gap-1">
                        <span className="text-amber-500 font-bold">4.9</span>
                        <span className="text-xs text-muted-foreground">(47 кейсів)</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">EMDR • PTSD • Групова терапія • Дистанційно</p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-teal-100 text-teal-800">mhGAP сертифікований</Badge>
                      <Badge className="bg-amber-100 text-amber-800">Топ-рейтинг</Badge>
                    </div>
                    <Button size="sm" className="mt-3">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Записатися на консультацію
                    </Button>
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
