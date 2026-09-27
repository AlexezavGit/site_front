import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { FundingProgram, Project, Report } from "@shared/schema";
import {
  ArrowLeft, Stethoscope, Users, Calculator, Star,
  CheckCircle2, FileText, Banknote, PlusCircle, Send,
  Clock, TrendingUp, UserPlus, ClipboardList, LayoutGrid,
  ArrowRight, BadgeCheck, Shield, ChevronRight, RefreshCw, Timer,
  AlertTriangle, Calendar, ChevronDown, ChevronUp, Download,
  MessageSquare, BookOpen, GraduationCap, Wallet, X, Info
} from "lucide-react";
import CirculationFolder from "@/components/CirculationFolder";
import SessionHandshake from "@/components/SessionHandshake";

const TEAL = "#0D9488";
const NAVY = "#0F2B46";

const PROVIDER_ID = 1;

// ─── Schemas (KEEP INTACT) ─────────────────────────────────────────────────
const registerClientSchema = z.object({
  name: z.string().min(2, "Введіть ім'я (мін. 2 символи)"),
  email: z.string().email("Невірний email"),
  phone: z.string().min(10, "Невірний номер телефону").max(15),
  message: z.string().min(5, "Вкажіть запит / первинний опис"),
});

const createProjectSchema = z.object({
  name: z.string().min(3, "Назва обов'язкова"),
  description: z.string().min(10, "Опис обов'язковий"),
  programId: z.string().min(1, "Оберіть програму"),
  sessionsPlanned: z.number().min(1),
  budgetAllocated: z.number().min(1),
});

const createReportSchema = z.object({
  projectId: z.string().min(1, "Оберіть проєкт"),
  type: z.string().min(1),
  periodStart: z.string().min(1),
  periodEnd: z.string().min(1),
  beneficiariesServed: z.number().min(0),
  sessionsDelivered: z.number().min(0),
});

// ─── Helpers ────────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    draft: "bg-slate-100 text-slate-700",
    submitted: "bg-blue-100 text-blue-800",
    approved: "bg-green-100 text-green-800",
    active: "bg-teal-100 text-teal-800",
    completed: "bg-purple-100 text-purple-800",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
    paid: "bg-green-100 text-green-800",
    escrow: "bg-blue-100 text-blue-800",
  };
  const labels: Record<string, string> = {
    draft: "Чернетка", submitted: "Подано", approved: "Затверджено",
    active: "Активний", completed: "Завершено", pending: "На розгляді",
    rejected: "Відхилено", paid: "Виплачено", escrow: "Ескроу",
  };
  return <Badge className={map[status] ?? "bg-slate-100 text-slate-700"}>{labels[status] ?? status}</Badge>;
}

// ─── KEEP INTACT: RegisterClient ────────────────────────────────────────────
function RegisterClient() {
  const { toast } = useToast();
  const [step, setStep] = useState<"form" | "confirm" | "done">("form");
  const DEMO_CODE = "847291";
  const [enteredCode, setEnteredCode] = useState("");

  const form = useForm<z.infer<typeof registerClientSchema>>({
    resolver: zodResolver(registerClientSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const register = useMutation({
    mutationFn: (data: z.infer<typeof registerClientSchema>) =>
      apiRequest("POST", "/api/referrals", { ...data, serviceType: "beneficiary" }),
    onSuccess: () => setStep("confirm"),
    onError: () => toast({ title: "Помилка реєстрації", variant: "destructive" }),
  });

  if (step === "done") return (
    <Card>
      <CardContent className="pt-10 pb-10 text-center">
        <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2" style={{ color: NAVY }}>Клієнта підтверджено</h3>
        <p className="text-muted-foreground mb-6">Клієнт {form.getValues("name")} додано до вашого циркулейшн фолдеру та може підписатися на програми.</p>
        <Button onClick={() => { setStep("form"); form.reset(); setEnteredCode(""); }}>
          <UserPlus className="w-4 h-4 mr-2" /> Зареєструвати ще одного
        </Button>
      </CardContent>
    </Card>
  );

  if (step === "confirm") return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" style={{ color: TEAL }} />
          Підтвердження клієнта
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
          <p className="text-sm text-muted-foreground mb-2">Код підтвердження надіслано на email клієнта <strong>{form.getValues("email")}</strong>. Попросіть клієнта назвати код або введіть його нижче.</p>
          <div className="text-center py-3">
            <p className="text-xs text-muted-foreground mb-1">Демо-код (у реальній системі надсилається на email клієнта)</p>
            <div className="font-mono text-3xl font-bold tracking-widest" style={{ color: TEAL }}>{DEMO_CODE}</div>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">Введіть код підтвердження від клієнта</label>
          <Input
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
            placeholder="______"
            className="font-mono text-center text-lg tracking-widest"
            maxLength={6}
            data-testid="input-confirm-code"
          />
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setStep("form")} className="flex-1">← Назад</Button>
          <Button
            className="flex-1"
            style={{ background: TEAL, color: "white", border: "none" }}
            onClick={() => enteredCode === DEMO_CODE ? setStep("done") : toast({ title: "Невірний код", description: "Попросіть клієнта ще раз.", variant: "destructive" })}
            data-testid="button-confirm-client"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" /> Підтвердити
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5" style={{ color: TEAL }} />
          Реєстрація клієнта / бенефіціара
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => register.mutate(data))} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Ім'я та прізвище</FormLabel>
                  <FormControl><Input placeholder="Марія Коваленко" {...field} data-testid="input-client-name" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email клієнта</FormLabel>
                  <FormControl><Input type="email" placeholder="client@email.com" {...field} data-testid="input-client-email" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон</FormLabel>
                  <FormControl><Input placeholder="+380991234567" {...field} data-testid="input-client-phone" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="message" render={({ field }) => (
              <FormItem>
                <FormLabel>Первинний запит / опис стану</FormLabel>
                <FormControl><Textarea placeholder="Опишіть запит клієнта, первинний стан, запланований тип допомоги..." rows={3} {...field} data-testid="input-client-message" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
              Після реєстрації клієнт отримає email з кодом підтвердження. Підтвердження необхідне для участі клієнта в програмах фінансування.
            </div>
            <Button type="submit" disabled={register.isPending} style={{ background: TEAL, color: "white", border: "none" }} data-testid="button-register-client">
              {register.isPending ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
              Надіслати запрошення клієнту
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

// ─── KEEP INTACT: Projects ───────────────────────────────────────────────────
function Projects() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects", PROVIDER_ID],
    queryFn: () => fetch(`/api/projects?providerId=${PROVIDER_ID}`).then(r => r.json()),
  });
  const { data: programs = [] } = useQuery<FundingProgram[]>({ queryKey: ["/api/programs"] });

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: { name: "", description: "", programId: "", sessionsPlanned: 12, budgetAllocated: 6000 },
  });

  const create = useMutation({
    mutationFn: (data: z.infer<typeof createProjectSchema>) =>
      apiRequest("POST", "/api/projects", {
        ...data,
        programId: Number(data.programId),
        providerId: PROVIDER_ID,
        beneficiaries: [],
      }),
    onSuccess: () => {
      toast({ title: "Проєкт створено!", description: "Проєкт передано на затвердження донору." });
      queryClient.invalidateQueries({ queryKey: ["/api/projects", PROVIDER_ID] });
      setShowForm(false);
      form.reset();
    },
    onError: () => toast({ title: "Помилка створення проєкту", variant: "destructive" }),
  });

  const submitProject = useMutation({
    mutationFn: (id: number) => apiRequest("PATCH", `/api/projects/${id}/status`, { status: "submitted" }),
    onSuccess: () => {
      toast({ title: "Проєкт подано на затвердження" });
      queryClient.invalidateQueries({ queryKey: ["/api/projects", PROVIDER_ID] });
    },
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold" style={{ color: NAVY }}>Мої проєкти</h3>
          <p className="text-xs text-muted-foreground">Проєкти подаються на фінансування в рамках активних програм.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} style={{ background: TEAL, color: "white", border: "none" }} data-testid="button-new-project">
          <PlusCircle className="w-4 h-4 mr-2" />{showForm ? "Скасувати" : "Новий проєкт"}
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
            <Card className="border-teal-200">
              <CardHeader><CardTitle className="text-base">Створити новий проєкт</CardTitle></CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((d) => create.mutate(d))} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Назва проєкту</FormLabel>
                          <FormControl><Input placeholder="Психологічна підтримка ВПО" {...field} data-testid="input-project-name" /></FormControl>
                          <FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="programId" render={({ field }) => (
                        <FormItem><FormLabel>Програма фінансування</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger data-testid="select-program"><SelectValue placeholder="Оберіть програму" /></SelectTrigger></FormControl>
                            <SelectContent>
                              {programs.map(p => <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>)}
                              {!programs.length && <SelectItem value="0" disabled>Немає активних програм</SelectItem>}
                            </SelectContent>
                          </Select>
                          <FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="description" render={({ field }) => (
                      <FormItem><FormLabel>Опис проєкту</FormLabel>
                        <FormControl><Textarea placeholder="Мета, методологія, цільова група..." rows={3} {...field} data-testid="input-project-description" /></FormControl>
                        <FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="sessionsPlanned" render={({ field }) => (
                        <FormItem><FormLabel>Кількість сеансів</FormLabel>
                          <FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} data-testid="input-sessions-planned" /></FormControl>
                          <FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="budgetAllocated" render={({ field }) => (
                        <FormItem><FormLabel>Бюджет (₴)</FormLabel>
                          <FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} data-testid="input-budget" /></FormControl>
                          <FormMessage /></FormItem>
                      )} />
                    </div>
                    <Button type="submit" disabled={create.isPending} style={{ background: TEAL, color: "white", border: "none" }} data-testid="button-create-project">
                      {create.isPending ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <PlusCircle className="w-4 h-4 mr-2" />}
                      Створити проєкт
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Завантаження...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16">
          <ClipboardList className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <p className="text-muted-foreground">Проєктів ще немає.</p>
          <p className="text-xs text-muted-foreground mt-1">Створіть перший проєкт та подайте на фінансування.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm" style={{ color: NAVY }}>{p.name}</h4>
                        <StatusBadge status={p.status} />
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{p.description}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.sessionsPlanned} сеансів</span>
                        <span className="flex items-center gap-1"><Banknote className="w-3 h-3" />₴{p.budgetAllocated.toLocaleString()}</span>
                        <span>Виконано: {p.sessionsCompleted}/{p.sessionsPlanned}</span>
                      </div>
                      {p.sessionsPlanned > 0 && (
                        <div className="mt-2 bg-slate-100 rounded-full h-1.5 w-48">
                          <div className="h-1.5 rounded-full" style={{ width: `${(p.sessionsCompleted / p.sessionsPlanned) * 100}%`, background: TEAL }} />
                        </div>
                      )}
                    </div>
                    {p.status === "draft" && (
                      <Button size="sm" variant="outline" className="ml-3 shrink-0 border-teal-300 text-teal-700"
                        onClick={() => submitProject.mutate(p.id)}
                        disabled={submitProject.isPending}
                        data-testid={`button-submit-project-${p.id}`}
                      >
                        <Send className="w-3.5 h-3.5 mr-1" /> Подати
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── KEEP INTACT: Reports ────────────────────────────────────────────────────
function Reports() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects", PROVIDER_ID],
    queryFn: () => fetch(`/api/projects?providerId=${PROVIDER_ID}`).then(r => r.json()),
  });
  const { data: reports = [], isLoading } = useQuery<Report[]>({
    queryKey: ["/api/reports"],
  });

  const form = useForm<z.infer<typeof createReportSchema>>({
    resolver: zodResolver(createReportSchema),
    defaultValues: { projectId: "", type: "progress", periodStart: "", periodEnd: "", beneficiariesServed: 0, sessionsDelivered: 0 },
  });

  const create = useMutation({
    mutationFn: (data: z.infer<typeof createReportSchema>) =>
      apiRequest("POST", "/api/reports", {
        ...data,
        projectId: Number(data.projectId),
        periodStart: new Date(data.periodStart).toISOString(),
        periodEnd: new Date(data.periodEnd).toISOString(),
        outcomes: JSON.stringify({}),
      }),
    onSuccess: () => {
      toast({ title: "Звіт створено", description: "Звіт збережено як чернетку." });
      queryClient.invalidateQueries({ queryKey: ["/api/reports"] });
      setShowForm(false);
      form.reset();
    },
    onError: () => toast({ title: "Помилка створення звіту", variant: "destructive" }),
  });

  const submit = useMutation({
    mutationFn: (id: number) => apiRequest("PATCH", `/api/reports/${id}/status`, { status: "submitted" }),
    onSuccess: () => {
      toast({ title: "Звіт надіслано на перевірку" });
      queryClient.invalidateQueries({ queryKey: ["/api/reports"] });
    },
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold" style={{ color: NAVY }}>Звітність</h3>
          <p className="text-xs text-muted-foreground">Звіти по проєктах видимі донору та аудитору.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} style={{ background: TEAL, color: "white", border: "none" }} data-testid="button-new-report">
          <PlusCircle className="w-4 h-4 mr-2" />{showForm ? "Скасувати" : "Новий звіт"}
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
            <Card className="border-teal-200">
              <CardHeader><CardTitle className="text-base">Створити звіт</CardTitle></CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((d) => create.mutate(d))} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="projectId" render={({ field }) => (
                        <FormItem><FormLabel>Проєкт</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger data-testid="select-report-project"><SelectValue placeholder="Оберіть проєкт" /></SelectTrigger></FormControl>
                            <SelectContent>
                              {projects.map(p => <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>)}
                              {!projects.length && <SelectItem value="0" disabled>Немає проєктів</SelectItem>}
                            </SelectContent>
                          </Select><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="type" render={({ field }) => (
                        <FormItem><FormLabel>Тип звіту</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger data-testid="select-report-type"><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="progress">Прогрес-звіт</SelectItem>
                              <SelectItem value="final">Фінальний звіт</SelectItem>
                              <SelectItem value="financial">Фінансовий звіт</SelectItem>
                            </SelectContent>
                          </Select><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="periodStart" render={({ field }) => (
                        <FormItem><FormLabel>Початок періоду</FormLabel>
                          <FormControl><Input type="date" {...field} data-testid="input-period-start" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="periodEnd" render={({ field }) => (
                        <FormItem><FormLabel>Кінець періоду</FormLabel>
                          <FormControl><Input type="date" {...field} data-testid="input-period-end" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="beneficiariesServed" render={({ field }) => (
                        <FormItem><FormLabel>Охоплено бенефіціарів</FormLabel>
                          <FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} data-testid="input-beneficiaries-served" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="sessionsDelivered" render={({ field }) => (
                        <FormItem><FormLabel>Проведено сеансів</FormLabel>
                          <FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} data-testid="input-sessions-delivered" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <Button type="submit" disabled={create.isPending} style={{ background: TEAL, color: "white", border: "none" }} data-testid="button-create-report">
                      {create.isPending ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <FileText className="w-4 h-4 mr-2" />}
                      Зберегти звіт
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? <div className="text-center py-8 text-muted-foreground">Завантаження...</div>
        : reports.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p className="text-muted-foreground">Звітів ще немає.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}>
                <Card>
                  <CardContent className="pt-4 pb-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm" style={{ color: NAVY }}>Звіт #{r.id}</span>
                        <StatusBadge status={r.status} />
                        <Badge variant="outline" className="text-xs capitalize">{r.type}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{r.beneficiariesServed} бенефіціарів · {r.sessionsDelivered} сеансів</p>
                    </div>
                    {r.status === "draft" && (
                      <Button size="sm" variant="outline" className="border-teal-300 text-teal-700" onClick={() => submit.mutate(r.id)} disabled={submit.isPending} data-testid={`button-submit-report-${r.id}`}>
                        <Send className="w-3.5 h-3.5 mr-1" /> Надіслати
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )
      }
    </div>
  );
}

// ─── TAB 1: ДАШБОРД ─────────────────────────────────────────────────────────
function TabDashboard() {
  const { toast } = useToast();
  const todaySessions = 4;
  const maxSessions = 4.5;
  const isAmber = todaySessions >= 4;
  const isRed = todaySessions >= maxSessions;

  return (
    <div className="space-y-6">
      {/* Anti-stigma headline */}
      <div className="rounded-2xl p-6" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a3f5c 100%)` }}>
        <p className="text-white font-bold text-lg leading-tight mb-2">
          Гуманітарна робота ≠ волонтерство. Ваша кваліфікація коштує — і система нарешті це визнає.
        </p>
        <p className="text-teal-200 text-sm leading-relaxed">
          FOP-статус + цифрова практика + прозорий дохід. Без тіньових розрахунків — верифіковані виплати на рахунок протягом 48 годин після сеансу.
        </p>
      </div>

      {/* 4 KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Активні клієнти", value: "7", icon: Users, color: "text-teal-600", bg: "bg-teal-50" },
          { label: "Сеансів цього тижня", value: "4 / 4.5", icon: Timer, color: "text-amber-600", bg: "bg-amber-50", note: "⚠ Ліміт" },
          { label: "Дохід за місяць", value: "€1,540", icon: Banknote, color: "text-green-600", bg: "bg-green-50", note: "L2 · €55/год × 28" },
          { label: "Рівень комплаєнсу", value: "L2", icon: BadgeCheck, color: "text-indigo-600", bg: "bg-indigo-50" },
        ].map((kpi) => (
          <Card key={kpi.label} className="border-0 shadow-sm">
            <CardContent className={`pt-4 pb-4 ${kpi.bg} rounded-xl`}>
              <kpi.icon className={`w-5 h-5 mb-2 ${kpi.color}`} />
              <p className="text-2xl font-bold" style={{ color: NAVY }}>{kpi.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
              {kpi.note && <p className={`text-xs font-semibold mt-1 ${kpi.color}`}>{kpi.note}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Anti-burnout widget */}
      <Card className={`border-2 ${isRed ? "border-red-500 bg-red-50" : isAmber ? "border-amber-400 bg-amber-50" : "border-slate-200"}`}>
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className={`w-5 h-5 ${isRed ? "text-red-600" : "text-amber-600"}`} />
            <span className="font-semibold text-sm" style={{ color: NAVY }}>Анти-вигорання: денний лічильник</span>
            <Badge className={`ml-auto ${isRed ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}>
              {todaySessions} / {maxSessions} сеансів
            </Badge>
          </div>
          <div className="flex gap-1.5 mb-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className={`flex-1 h-3 rounded-full ${n <= todaySessions ? (isRed ? "bg-red-500" : "bg-amber-400") : "bg-slate-200"}`} />
            ))}
          </div>
          {isAmber && (
            <p className={`text-sm ${isRed ? "text-red-700 font-semibold" : "text-amber-800"}`}>
              ⚠ Melodic Alert: ви досягли рекомендованого денного ліміту (4.5 сеансів). Розклад завтрашніх записів на наступний день.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Income transparency */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Banknote className="w-4 h-4" style={{ color: TEAL }} />
            Прозора шкала оплати
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 mb-4">
            {[
              { level: "L0", rate: "€18/год", label: "Базовий", current: false },
              { level: "L1", rate: "€35/год", label: "Апробований", current: false },
              { level: "L2", rate: "€55/год", label: "Вартий резидент", current: true },
              { level: "L3", rate: "€85/год", label: "Експерт", current: false },
            ].map((row) => (
              <div key={row.level} className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${row.current ? "bg-teal-50 border-2 border-teal-400 font-semibold" : "bg-slate-50 border border-slate-200"}`}>
                <span className={row.current ? "text-teal-800" : "text-slate-600"}>{row.level} · {row.label}</span>
                <span className={`font-mono font-bold ${row.current ? "text-teal-700" : "text-slate-500"}`}>
                  {row.rate} {row.current && "← поточний"}
                </span>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-lg bg-green-50 border border-green-200 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Наступна виплата</p>
              <p className="font-bold text-green-700">₴21,000 — очікується 11 липня 2026</p>
              <p className="text-xs text-muted-foreground">48h після сеансу #28</p>
            </div>
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          </div>
        </CardContent>
      </Card>

      {/* Referral queue */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <UserPlus className="w-4 h-4" style={{ color: TEAL }} />
            Нові запити на матч
            <Badge className="bg-amber-100 text-amber-800 ml-auto">2 нових</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">2 нових бенефіціари очікують на матчинг. Перейдіть до вкладки <strong>Клієнти</strong> для перегляду та прийняття.</p>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── TAB 2: ОНБОРДИНГ ────────────────────────────────────────────────────────
function TabOnboarding() {
  const { toast } = useToast();
  const [expandedStep, setExpandedStep] = useState<number | null>(3);

  const steps = [
    {
      id: 1,
      title: "Дія.ID верифікація",
      status: "done",
      icon: "✓",
      what: "Верифікація особи через державну систему Дія.ID.",
      why: "Забезпечує цифрову ідентичність фахівця в реєстрі — юридична основа для FOP-практики.",
    },
    {
      id: 2,
      title: "Реєстр фахівців",
      status: "done",
      icon: "✓",
      what: "Перевірка у UPRA / NPA — Українській психологічній асоціації та Національній психіатричній асоціації.",
      why: "Підтверджує ліцензовану практику; є умовою для отримання оплати з програм фінансування.",
    },
    {
      id: 3,
      title: "Освітні документи",
      status: "done",
      icon: "✓",
      what: "Завантаження диплому + сертифікату EMDR. Автоматична верифікація через освітній реєстр.",
      why: "Визначає початковий рівень (L0–L3) та доступні методи роботи (EMDR, CBT, PE тощо).",
    },
    {
      id: 4,
      title: "SBT-токен",
      status: "active",
      icon: "🔷",
      what: "Soulbound Token на блокчейні Solana — незмінний цифровий credential.",
      why: "Гарантує захист від підробки дипломів; видимий донорам та реєстру Qouroom GB.",
      sbt: {
        address: "7XqR4mBt",
        type: "PsychologistL2",
        issued: "2026-03-15",
        expiry: "2027-03-15",
      },
    },
    {
      id: 5,
      title: "Протокол комплаєнсу",
      status: "progress",
      icon: "⏳",
      what: "Виконання вимог поточного рівня L2.",
      why: "Умова для збереження рівня та відповідної ставки оплати.",
      compliance: {
        L0: { total: 5, done: 5, items: ["Реєстрація", "Дія.ID", "Диплом", "Телефон верифіковано", "Угода підписана"] },
        L1: { total: 8, done: 8, items: ["30 сеансів завершено", "1 референс супервізора", "Базовий CBT курс", "NPS ≥4.5", "3 звіти подано", "GPS-верифікація увімкнена", "Страховий поліс", "eHealth інтеграція"] },
        L2: { total: 8, done: 6, items: ["EMDR Basic завершено", "50+ сеансів", "NPS ≥5.0", "Peer-review аудит", "3 позитивні звіти L1", "Helsi-профіль активний"], missing: ["Загальний нагляд (6 годин)", "EMDR Level II практика (20 годин)"] },
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-lg" style={{ color: NAVY }}>Онбординг фахівця</h2>
        <Badge className="bg-teal-100 text-teal-800">4/5 кроків</Badge>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1.5 mb-4">
        {steps.map((s) => (
          <div key={s.id} className={`flex-1 h-2 rounded-full ${s.status === "done" ? "bg-teal-500" : s.status === "active" ? "bg-blue-400" : s.status === "progress" ? "bg-amber-400" : "bg-slate-200"}`} />
        ))}
      </div>

      {steps.map((step) => (
        <Card key={step.id} className={`border ${step.status === "done" ? "border-teal-200 bg-teal-50/30" : step.status === "active" ? "border-blue-300 bg-blue-50/30" : step.status === "progress" ? "border-amber-300 bg-amber-50/20" : "border-slate-200"}`}>
          <CardContent className="pt-4 pb-4">
            <button className="w-full" onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${step.status === "done" ? "bg-teal-500 text-white" : step.status === "active" ? "bg-blue-500 text-white" : step.status === "progress" ? "bg-amber-400 text-white" : "bg-slate-200 text-slate-500"}`}>
                  {step.status === "done" ? "✓" : step.icon === "🔷" ? "4" : "5"}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-sm" style={{ color: NAVY }}>{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.what.slice(0, 60)}…</p>
                </div>
                <Badge className={`shrink-0 text-xs ${step.status === "done" ? "bg-teal-100 text-teal-800" : step.status === "active" ? "bg-blue-100 text-blue-800" : step.status === "progress" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600"}`}>
                  {step.status === "done" ? "Завершено" : step.status === "active" ? "Активний" : step.status === "progress" ? "В процесі" : "Очікує"}
                </Badge>
                {expandedStep === step.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </div>
            </button>

            <AnimatePresence>
              {expandedStep === step.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <div className="mt-4 pt-4 border-t space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-white border">
                        <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Що це?</p>
                        <p className="text-sm text-slate-700">{step.what}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white border">
                        <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Чому важливо?</p>
                        <p className="text-sm text-slate-700">{step.why}</p>
                      </div>
                    </div>

                    {step.sbt && (
                      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-2">
                        <p className="text-xs font-bold text-blue-800 uppercase tracking-wide">Soulbound Token</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div><span className="text-muted-foreground">Адреса:</span> <span className="font-mono font-bold">{step.sbt.address}…</span></div>
                          <div><span className="text-muted-foreground">Тип:</span> <span className="font-semibold">{step.sbt.type}</span></div>
                          <div><span className="text-muted-foreground">Видано:</span> <span className="font-semibold">{step.sbt.issued}</span></div>
                          <div><span className="text-muted-foreground">Дійсний до:</span> <span className="font-semibold">{step.sbt.expiry}</span></div>
                        </div>
                        <Button size="sm" className="mt-1" style={{ background: TEAL, color: "white", border: "none" }}
                          onClick={() => toast({ title: "Blockchain Registry", description: "Відкриває Qouroom GB реєстр в новій вкладці (демо)." })}>
                          <ChevronRight className="w-3.5 h-3.5 mr-1" /> Переглянути в реєстрі
                        </Button>
                      </div>
                    )}

                    {step.compliance && (
                      <div className="space-y-3">
                        {(["L0", "L1", "L2"] as const).map((lvl) => {
                          const c = step.compliance![lvl];
                          return (
                            <div key={lvl} className="p-3 rounded-lg bg-white border">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-slate-700">{lvl} вимоги</span>
                                <Badge className={c.done === c.total ? "bg-teal-100 text-teal-800" : "bg-amber-100 text-amber-800"}>
                                  {c.done}/{c.total}
                                </Badge>
                              </div>
                              <div className="space-y-1">
                                {c.items.map((item) => (
                                  <div key={item} className="flex items-center gap-2 text-xs">
                                    <CheckCircle2 className="w-3 h-3 text-teal-500 shrink-0" />
                                    <span className="text-slate-600">{item}</span>
                                  </div>
                                ))}
                                {"missing" in c && c.missing && c.missing.map((item: string) => (
                                  <div key={item} className="flex items-center gap-2 text-xs">
                                    <Clock className="w-3 h-3 text-amber-500 shrink-0" />
                                    <span className="text-amber-700 font-medium">{item} — очікує</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ─── TAB 3: КЛІЄНТИ ─────────────────────────────────────────────────────────
function TabClients() {
  const { toast } = useToast();

  const pendingClients = [
    { id: "B-2026-1204", profile: "PTSD + тривожний розлад, ВПО, Київ", format: "онлайн", protocol: "EMDR 8–12 сеансів", urgency: "звичайний" },
    { id: "B-2026-1187", profile: "Депресія середнього ступеня, ВПО, Харків", format: "онлайн", protocol: "CBT 10–15 сеансів", urgency: "звичайний" },
  ];

  const activeClients = [
    { id: "C-2026-0847", sessions: 5, total: 12, next: "2026-07-08 10:00", phq9Trend: "↓ -4 (покращення)" },
    { id: "C-2026-0712", sessions: 8, total: 12, next: "2026-07-09 14:00", phq9Trend: "↓ -6 (покращення)" },
    { id: "C-2026-0634", sessions: 3, total: 8, next: "2026-07-10 11:00", phq9Trend: "→ стабільно" },
    { id: "C-2026-0521", sessions: 11, total: 12, next: "2026-07-11 09:00", phq9Trend: "↓ -8 (суттєве покращення)" },
    { id: "C-2026-0445", sessions: 2, total: 10, next: "2026-07-08 16:00", phq9Trend: "→ початок" },
    { id: "C-2026-0389", sessions: 7, total: 12, next: "2026-07-12 13:00", phq9Trend: "↓ -3 (покращення)" },
    { id: "C-2026-0304", sessions: 4, total: 8, next: "2026-07-14 15:00", phq9Trend: "↓ -5 (покращення)" },
  ];

  return (
    <div className="space-y-6">
      {/* Pending match requests */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: NAVY }}>
          <UserPlus className="w-4 h-4" style={{ color: TEAL }} />
          Нові запити на матч
          <Badge className="bg-amber-100 text-amber-800">2</Badge>
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {pendingClients.map((c) => (
            <Card key={c.id} className="border-amber-300 bg-amber-50/20">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-slate-700">{c.id}</span>
                  <Badge className="bg-amber-100 text-amber-800 text-xs">Очікує</Badge>
                </div>
                <p className="text-sm text-slate-700 mb-1">{c.profile}</p>
                <div className="flex gap-3 text-xs text-muted-foreground mb-3">
                  <span>Формат: {c.format}</span>
                  <span>Протокол: {c.protocol}</span>
                  <span>Терміновість: {c.urgency}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" style={{ background: TEAL, color: "white", border: "none" }}
                    onClick={() => toast({ title: "Клієнт прийнятий", description: "Призначте час першого сеансу." })}>
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Прийняти
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50"
                    onClick={() => toast({ description: "Запит повернено до черги." })}>
                    <X className="w-3.5 h-3.5 mr-1" /> Відхилити
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Active clients table */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: NAVY }}>
          <Users className="w-4 h-4" style={{ color: TEAL }} />
          Активні клієнти
          <Badge className="bg-teal-100 text-teal-800">7</Badge>
        </h3>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b bg-slate-50">
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-600">ID клієнта</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-600">Сеансів</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-600">Прогрес</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-600">Наступний сеанс</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-600">PHQ-9 тренд</th>
                  </tr>
                </thead>
                <tbody>
                  {activeClients.map((c, i) => (
                    <tr key={c.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                      <td className="px-4 py-2.5 font-mono font-bold text-slate-700">{c.id}</td>
                      <td className="px-4 py-2.5">{c.sessions}/{c.total}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-slate-200">
                            <div className="h-1.5 rounded-full bg-teal-500" style={{ width: `${(c.sessions / c.total) * 100}%` }} />
                          </div>
                          <span>{Math.round((c.sessions / c.total) * 100)}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-slate-600">{c.next}</td>
                      <td className="px-4 py-2.5">
                        <span className={`font-medium ${c.phq9Trend.startsWith("↓") ? "text-green-600" : "text-slate-500"}`}>{c.phq9Trend}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Circulation Folder */}
      <div>
        <h3 className="font-semibold mb-3" style={{ color: NAVY }}>Циркулейшн Фолдер (PsyUber)</h3>
        <CirculationFolder />
      </div>
    </div>
  );
}

// ─── TAB 4: СЕАНСИ ──────────────────────────────────────────────────────────
function TabSessions() {
  const { toast } = useToast();
  const [showEmdrChecklist, setShowEmdrChecklist] = useState(false);
  const [showSupervisionModal, setShowSupervisionModal] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState("");
  const [caseChallenge, setCaseChallenge] = useState("");

  const todaySessions = 4;
  const isAmber = todaySessions >= 4;

  const upcomingSessions = [
    { date: "2026-07-08", time: "10:00", client: "C-2026-0847", protocol: "EMDR", session: "6/12" },
    { date: "2026-07-08", time: "14:00", client: "C-2026-0445", protocol: "CBT", session: "2/10" },
    { date: "2026-07-09", time: "11:00", client: "C-2026-0712", protocol: "EMDR", session: "9/12" },
    { date: "2026-07-10", time: "09:00", client: "C-2026-0521", protocol: "EMDR", session: "12/12" },
  ];

  const emdrChecklist = [
    "Bilateral stimulation готовність перевірено (тактильна / аудіо / візуальна)",
    "Безпечне місце визначено і активоване",
    "SUDs-рівень зафіксовано до сеансу",
    "Цільова пам'ять обрана і встановлена",
    "EMDR протокол фаза підтверджена (1–8)",
    "Когнітивна установка NC/PC сформульована",
    "VoC зафіксовано перед початком десенситизації",
  ];

  const supervisors = [
    { id: "s1", name: "Д-р Кравченко О.В.", specialty: "Травма і EMDR", availability: "Вт, Чт 18:00–20:00" },
    { id: "s2", name: "Д-р Мельник І.П.", specialty: "CBT, Ветерани", availability: "Пн, Ср 17:00–19:00" },
    { id: "s3", name: "Д-р Іваненко С.М.", specialty: "Дитяча та підліткова", availability: "Пт 16:00–18:00" },
  ];

  return (
    <div className="space-y-6">
      {/* Anti-burnout counter */}
      <div className={`p-4 rounded-xl border-2 flex items-center gap-3 ${isAmber ? "border-amber-400 bg-amber-50" : "border-slate-200 bg-white"}`}>
        <Timer className={`w-5 h-5 shrink-0 ${isAmber ? "text-amber-600" : "text-slate-400"}`} />
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: NAVY }}>Денний ліміт сеансів</p>
          <p className="text-xs text-muted-foreground">Сьогодні: {todaySessions} / 4.5 макс</p>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className={`w-4 h-4 rounded-sm ${n <= todaySessions ? "bg-amber-400" : "bg-slate-200"}`} />
          ))}
        </div>
        {isAmber && <Badge className="bg-amber-100 text-amber-800 shrink-0">⚠ Amber</Badge>}
      </div>

      {/* Upcoming sessions calendar */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" style={{ color: TEAL }} />
            Заплановані сеанси — наступні 7 днів
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {upcomingSessions.map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-center w-12 shrink-0">
                  <p className="text-xs text-muted-foreground">{s.date.split("-").slice(1).join(".")}</p>
                  <p className="font-bold text-sm" style={{ color: NAVY }}>{s.time}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700">{s.client}</p>
                  <p className="text-xs text-muted-foreground">Сеанс {s.session}</p>
                </div>
                <Badge className={s.protocol === "EMDR" ? "bg-indigo-100 text-indigo-800" : "bg-blue-100 text-blue-800"}>
                  {s.protocol}
                </Badge>
                {s.protocol === "EMDR" && (
                  <Button size="sm" variant="outline" className="text-xs h-7"
                    onClick={() => setShowEmdrChecklist(!showEmdrChecklist)}>
                    Чекліст
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* EMDR checklist */}
          <AnimatePresence>
            {showEmdrChecklist && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <div className="mt-4 p-4 rounded-xl bg-indigo-50 border border-indigo-200">
                  <p className="text-xs font-bold text-indigo-800 uppercase tracking-wide mb-3">EMDR — Bilateral Stimulation Protocol Checklist</p>
                  <div className="space-y-1.5">
                    {emdrChecklist.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <input type="checkbox" className="mt-0.5 accent-indigo-600" />
                        <span className="text-indigo-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Session Handshake */}
      <div>
        <h3 className="font-semibold mb-3" style={{ color: NAVY }}>Активний сеанс — Locked Handshake</h3>
        <SessionHandshake
          sessionNumber={9}
          totalSessions={12}
          providerName="Бенефіціар #2847"
          role="provider"
        />
      </div>

      {/* Supervision request */}
      <Card>
        <CardContent className="pt-4 pb-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm" style={{ color: NAVY }}>Запросити супервізію</p>
            <p className="text-xs text-muted-foreground">Консультація з сертифікованим супервізором EMDR/CBT протягом 24 годин</p>
          </div>
          <Button style={{ background: TEAL, color: "white", border: "none" }} onClick={() => setShowSupervisionModal(true)}>
            <MessageSquare className="w-4 h-4 mr-2" /> Запросити
          </Button>
        </CardContent>
      </Card>

      {/* Supervision modal */}
      <AnimatePresence>
        {showSupervisionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && setShowSupervisionModal(false)}
          >
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold" style={{ color: NAVY }}>Запит на супервізію</h3>
                <button onClick={() => setShowSupervisionModal(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-2 block">Оберіть супервізора</label>
                <div className="space-y-2">
                  {supervisors.map((sv) => (
                    <button key={sv.id}
                      className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${selectedSupervisor === sv.id ? "border-teal-500 bg-teal-50" : "border-slate-200 hover:border-teal-300"}`}
                      onClick={() => setSelectedSupervisor(sv.id)}>
                      <p className="font-semibold text-slate-800">{sv.name}</p>
                      <p className="text-xs text-muted-foreground">{sv.specialty} · {sv.availability}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-2 block">Опис виклику кейсу</label>
                <Textarea
                  placeholder="Опишіть складність кейсу, конкретне питання для супервізора..."
                  value={caseChallenge}
                  onChange={(e) => setCaseChallenge(e.target.value)}
                  rows={3}
                />
              </div>
              <Button
                className="w-full"
                style={{ background: TEAL, color: "white", border: "none" }}
                disabled={!selectedSupervisor || !caseChallenge.trim()}
                onClick={() => {
                  toast({ title: "Запит надіслано", description: "Супервізор підтвердить протягом 24 годин." });
                  setShowSupervisionModal(false);
                  setSelectedSupervisor("");
                  setCaseChallenge("");
                }}>
                <Send className="w-4 h-4 mr-2" /> Надіслати запит
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── TAB 5: ФІНАНСИ ──────────────────────────────────────────────────────────
function TabFinances() {
  const { toast } = useToast();

  const grossMonthly = 1540;
  const platformFee = grossMonthly * 0.035;
  const netMonthly = grossMonthly - platformFee;

  const feeBreakdown = [
    { label: "Платформа", pct: 1.0 },
    { label: "Технологія", pct: 0.5 },
    { label: "Комплаєнс", pct: 0.5 },
    { label: "Резерв", pct: 0.5 },
    { label: "Розробка", pct: 0.5 },
  ];

  const paymentHistory = [
    { date: "2026-06-13", client: "C-2026-0847", gross: 55, net: 53.07, status: "paid" },
    { date: "2026-06-20", client: "C-2026-0712", gross: 55, net: 53.07, status: "paid" },
    { date: "2026-06-27", client: "C-2026-0634", gross: 55, net: 53.07, status: "paid" },
    { date: "2026-07-04", client: "C-2026-0521", gross: 55, net: 53.07, status: "paid" },
    { date: "2026-07-08", client: "C-2026-0445", gross: 55, net: 53.07, status: "escrow" },
    { date: "2026-07-09", client: "C-2026-0389", gross: 55, net: 53.07, status: "escrow" },
  ];

  return (
    <div className="space-y-6">
      {/* Monthly summary */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "Нараховано (грос)", value: `€${grossMonthly.toFixed(0)}`, sub: "28 сеансів × €55", color: "bg-slate-50" },
          { label: "Комісія платформи", value: `-€${platformFee.toFixed(2)}`, sub: "3.5% (5 компонентів)", color: "bg-red-50" },
          { label: "До виплати (нет)", value: `€${netMonthly.toFixed(2)}`, sub: "~₴62,500", color: "bg-green-50 border-green-300" },
        ].map((item) => (
          <Card key={item.label} className={`border ${item.color}`}>
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className="text-2xl font-bold" style={{ color: NAVY }}>{item.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Fee breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Info className="w-4 h-4" style={{ color: TEAL }} />
            Розбивка комісії: 7% → 3.5% (стандартний тариф)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {feeBreakdown.map((f) => (
              <div key={f.label} className="flex items-center justify-between text-sm">
                <span className="text-slate-600">{f.label}</span>
                <span className="font-mono font-bold text-slate-800">{f.pct}%</span>
              </div>
            ))}
            <div className="border-t pt-2 flex items-center justify-between text-sm font-bold">
              <span style={{ color: NAVY }}>Разом</span>
              <span className="font-mono" style={{ color: TEAL }}>3.5%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment history */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Wallet className="w-4 h-4" style={{ color: TEAL }} />
            Історія виплат
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="text-left px-4 py-2.5 font-semibold text-slate-600">Дата</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-slate-600">Клієнт</th>
                  <th className="text-right px-4 py-2.5 font-semibold text-slate-600">Грос</th>
                  <th className="text-right px-4 py-2.5 font-semibold text-slate-600">Нет</th>
                  <th className="text-center px-4 py-2.5 font-semibold text-slate-600">Статус</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((p, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="px-4 py-2.5 text-slate-600">{p.date}</td>
                    <td className="px-4 py-2.5 font-mono text-slate-700">{p.client}</td>
                    <td className="px-4 py-2.5 text-right font-mono">€{p.gross}</td>
                    <td className="px-4 py-2.5 text-right font-mono font-semibold text-green-700">€{p.net}</td>
                    <td className="px-4 py-2.5 text-center"><StatusBadge status={p.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Escrow explainer */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-blue-800 mb-1">PforR — Payment for Results</p>
              <p className="text-xs text-blue-700">Кошти заблоковані в ескроу після підтвердження сеансу через Locked Handshake. Виплата протягом 48 годин після GPS-верифікованого завершення сеансу та підпису клінічного запису фахівцем.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* L3 upgrade projection */}
      <Card className="border-teal-200 bg-teal-50">
        <CardContent className="pt-4 pb-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm" style={{ color: NAVY }}>Потенціал рівня L3</p>
            <p className="text-xs text-muted-foreground mt-1">При переході на L3 (€85/год) ваш місячний дохід зросте з <strong>€1,540</strong> до <strong>€2,380</strong> (+55%)</p>
          </div>
          <div className="text-right shrink-0 ml-4">
            <p className="text-lg font-bold text-teal-700">+55%</p>
            <p className="text-xs text-muted-foreground">28 сеансів × €85</p>
          </div>
        </CardContent>
      </Card>

      {/* FOP download */}
      <Button
        className="w-full"
        variant="outline"
        onClick={() => toast({ title: "Звіт для ФОП завантажується...", description: "Файл буде готовий протягом 30 секунд." })}>
        <Download className="w-4 h-4 mr-2" /> Завантажити звіт для ФОП (xlsx)
      </Button>
    </div>
  );
}

// ─── TAB 6: СПІЛЬНОТА ────────────────────────────────────────────────────────
function TabCommunity() {
  const { toast } = useToast();

  const peerCases = [
    {
      id: "PC-001",
      title: "ПТСР + коморбідна депресія",
      summary: "35 р., ВПО, 18 місяців після евакуації. PHQ-9=19, PCL-5=58. EMDR зупинився на фазі 3. Питання: як інтегрувати активацію безпечного місця при хронічному горі?",
      replies: 4,
    },
    {
      id: "PC-002",
      title: "Складна травма у дитини/підлітка",
      summary: "14 р., повторна виктимізація, відмова від CBT. Шкільна дезадаптація, вторинна тривожність у матері. Питання: протокол EMDR-IGTP чи TF-CBT?",
      replies: 7,
    },
    {
      id: "PC-003",
      title: "Ветеран з TBI overlay",
      summary: "42 р., ЧМТ (2024), симптоми ПТСР + когнітивне навантаження. PE-протокол занадто інтенсивний. Питання: адаптація EMDR при когнітивних обмеженнях?",
      replies: 2,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Group supervision */}
      <Card className="border-teal-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Users className="w-4 h-4" style={{ color: TEAL }} />
            Групова супервізія
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm" style={{ color: NAVY }}>Наступна сесія: 14 липня 2026</p>
              <p className="text-xs text-muted-foreground mt-0.5">18:00 · Онлайн · Д-р Кравченко О.В. (супервізор)</p>
              <p className="text-xs text-muted-foreground">Тема: EMDR Phase 3-4 складні випадки</p>
            </div>
            <Button size="sm" style={{ background: TEAL, color: "white", border: "none" }}
              onClick={() => toast({ title: "Реєстрацію підтверджено", description: "Лінк на Zoom надійде за 1 годину до початку." })}>
              Зареєструватися
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Peer exchange */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: NAVY }}>
          <MessageSquare className="w-4 h-4" style={{ color: TEAL }} />
          Peer Exchange — анонімні кейси для обговорення
        </h3>
        <div className="space-y-3">
          {peerCases.map((c) => (
            <Card key={c.id} className="border-slate-200 hover:border-teal-300 transition-colors">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-sm" style={{ color: NAVY }}>{c.title}</h4>
                  <Badge className="bg-slate-100 text-slate-600 text-xs ml-2 shrink-0">{c.replies} відповідей</Badge>
                </div>
                <p className="text-xs text-slate-600 mb-3">{c.summary}</p>
                <Button size="sm" variant="outline" className="border-teal-300 text-teal-700 text-xs"
                  onClick={() => toast({ title: "Перехід до обговорення", description: `Кейс ${c.id} — форум спільноти.` })}>
                  <MessageSquare className="w-3 h-3 mr-1" /> Приєднатися до обговорення
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Research participation */}
      <Card className="border-indigo-200 bg-indigo-50">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-indigo-800">FEEL Again Research Hub</p>
              <p className="text-xs text-indigo-700 mt-1">Ваші анонімізовані дані допомагають розробити протоколи для 50,000+ фахівців. Участь добровільна та захищена GDPR. Дані агрегуються без можливості ідентифікації.</p>
              <Button size="sm" className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => toast({ title: "Участь підтверджено", description: "Ваш внесок у дослідження зафіксовано." })}>
                Взяти участь у дослідженні
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training calendar */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <GraduationCap className="w-4 h-4" style={{ color: TEAL }} />
            Навчальний календар
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl border-2 border-teal-200 bg-teal-50">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-sm" style={{ color: NAVY }}>EMDR Level II — наступний потік</p>
                <p className="text-xs text-muted-foreground mt-0.5">1 серпня 2026 · 40 годин · Партнер: Geha Clalit</p>
                <div className="flex gap-2 mt-2">
                  <Badge className="bg-green-100 text-green-800 text-xs">Безкоштовно для L1+</Badge>
                  <Badge className="bg-teal-100 text-teal-800 text-xs">WHO сертифікація</Badge>
                </div>
              </div>
              <Button size="sm" style={{ background: TEAL, color: "white", border: "none" }}
                onClick={() => toast({ title: "Реєстрацію подано", description: "Підтвердження надійде на email протягом 48 годин." })}>
                Подати заявку
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── MAIN TABS DEFINITION ────────────────────────────────────────────────────
const TABS = [
  { id: "dashboard", label: "Дашборд", icon: LayoutGrid },
  { id: "onboarding", label: "Онбординг", icon: BadgeCheck },
  { id: "clients", label: "Клієнти", icon: Users },
  { id: "sessions", label: "Сеанси", icon: Timer },
  { id: "finances", label: "Фінанси", icon: Banknote },
  { id: "community", label: "Спільнота", icon: Star },
];

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export default function ProviderCabinet() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-white shadow-sm">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/portal">
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                <ArrowLeft className="w-4 h-4" /> Портал
              </Button>
            </Link>
            <div className="h-5 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(13,148,136,0.1)" }}>
                <Stethoscope className="w-4 h-4" style={{ color: TEAL }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: NAVY }}>Кабінет фахівця</p>
                <p className="text-xs text-muted-foreground">L2 · EMDR · Демо-режим</p>
              </div>
            </div>
          </div>
          <Badge className="bg-teal-100 text-teal-800 text-xs">Демо-режим</Badge>
        </div>

        {/* Tab navigation */}
        <div className="container">
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id ? "border-teal-500 text-teal-700" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                data-testid={`tab-${tab.id}`}
              >
                <tab.icon className="w-3.5 h-3.5" /> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {activeTab === "dashboard" && <TabDashboard />}
            {activeTab === "onboarding" && <TabOnboarding />}
            {activeTab === "clients" && <TabClients />}
            {activeTab === "sessions" && <TabSessions />}
            {activeTab === "finances" && <TabFinances />}
            {activeTab === "community" && <TabCommunity />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
