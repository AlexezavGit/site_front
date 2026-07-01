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
  ArrowRight, BadgeCheck, Shield, ChevronRight, RefreshCw
} from "lucide-react";

const TEAL = "#0D9488";
const NAVY = "#0F2B46";

const PROVIDER_ID = 1;

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

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    draft: "bg-slate-100 text-slate-700",
    submitted: "bg-blue-100 text-blue-800",
    approved: "bg-green-100 text-green-800",
    active: "bg-teal-100 text-teal-800",
    completed: "bg-purple-100 text-purple-800",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
  };
  const labels: Record<string, string> = {
    draft: "Чернетка", submitted: "Подано", approved: "Затверджено",
    active: "Активний", completed: "Завершено", pending: "На розгляді", rejected: "Відхилено",
  };
  return <Badge className={map[status] ?? "bg-slate-100 text-slate-700"}>{labels[status] ?? status}</Badge>;
}

function ProgramBanners({ providerId }: { providerId: number }) {
  const { toast } = useToast();
  const { data: programs = [], isLoading } = useQuery<FundingProgram[]>({
    queryKey: ["/api/programs"],
  });

  const enroll = useMutation({
    mutationFn: (programId: number) =>
      apiRequest("POST", "/api/enrollments", { programId, userId: providerId, userRole: "provider" }),
    onSuccess: () => {
      toast({ title: "Заявку подано", description: "Ваш запит на участь у програмі надіслано на розгляд." });
      queryClient.invalidateQueries({ queryKey: ["/api/enrollments"] });
    },
    onError: () => toast({ title: "Помилка", description: "Не вдалося подати заявку.", variant: "destructive" }),
  });

  if (isLoading) return <div className="text-center py-12 text-muted-foreground">Завантаження програм...</div>;
  if (!programs.length) return (
    <div className="text-center py-16">
      <LayoutGrid className="w-12 h-12 mx-auto mb-4 text-slate-300" />
      <p className="text-muted-foreground">Активних програм фінансування поки немає.</p>
      <p className="text-xs text-muted-foreground mt-1">Коли донор запустить програму — вона з'явиться тут як банер.</p>
    </div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-5">
      {programs.map((p, i) => (
        <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
          <Card className="h-full border-teal-200 bg-gradient-to-br from-teal-50 to-white">
            <CardContent className="pt-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-base" style={{ color: NAVY }}>{p.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.description}</p>
                </div>
                <Badge className="bg-teal-100 text-teal-800 shrink-0 ml-2">Активна</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="bg-white rounded-lg p-2.5 border">
                  <p className="text-xs text-muted-foreground">Бюджет</p>
                  <p className="font-bold">₴{p.budgetTotal.toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-lg p-2.5 border">
                  <p className="text-xs text-muted-foreground">Макс. сеанс</p>
                  <p className="font-bold">₴{p.maxSessionCost}</p>
                </div>
              </div>
              {p.requiredCredentials?.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {p.requiredCredentials.map((c) => (
                    <Badge key={c} variant="outline" className="text-[10px]">
                      <BadgeCheck className="w-3 h-3 mr-1" />{c}
                    </Badge>
                  ))}
                </div>
              )}
              <Button
                className="w-full"
                style={{ background: TEAL, color: "white", border: "none" }}
                onClick={() => enroll.mutate(p.id)}
                disabled={enroll.isPending}
              >
                {enroll.isPending ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />}
                Записатися на програму
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function RegisterClient() {
  const { toast } = useToast();
  const [step, setStep] = useState<"form" | "confirm" | "done">("form");
  const [confirmCode] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());
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
            <div className="font-mono text-3xl font-bold tracking-widest" style={{ color: TEAL }}>{confirmCode}</div>
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
            onClick={() => enteredCode === confirmCode ? setStep("done") : toast({ title: "Невірний код", description: "Попросіть клієнта ще раз.", variant: "destructive" })}
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

function CirculationFolder() {
  const [patients] = useState([
    { id: 1, name: "Бенефіціар #2847", status: "active", diagnosis: "PTSD · 8/12 сеансів", progress: 34, nextSession: "15 липня", coFin: 60 },
    { id: 2, name: "Бенефіціар #3120", status: "pending", diagnosis: "Не діагностовано — очікує скринінгу", progress: 0, nextSession: "—", coFin: 0 },
    { id: 3, name: "Бенефіціар #2991", status: "active", diagnosis: "GAD-7 · 3/8 сеансів", progress: 18, nextSession: "18 липня", coFin: 75 },
  ]);

  return (
    <div className="space-y-4">
      {patients.map((p) => (
        <Card key={p.id} className={p.status === "active" ? "border-teal-200 bg-teal-50/30" : ""}>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm" style={{ color: NAVY }}>{p.name}</span>
                  <Badge className={p.status === "active" ? "bg-teal-100 text-teal-800" : "bg-slate-100 text-slate-700"}>
                    {p.status === "active" ? "Активний" : "Очікує"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{p.diagnosis}</p>
              </div>
              {p.status === "active" && (
                <div className="text-right text-xs text-muted-foreground">
                  <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.nextSession}</div>
                  <div className="flex items-center gap-1 mt-0.5"><Banknote className="w-3 h-3" />Спів: {p.coFin}%</div>
                </div>
              )}
            </div>
            {p.status === "active" && p.progress > 0 && (
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Покращення PHQ-9</span>
                  <span className="font-semibold text-green-600">+{p.progress}%</span>
                </div>
                <div className="bg-slate-200 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-green-500" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
            )}
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline" className="text-xs h-7">
                <FileText className="w-3 h-3 mr-1" /> Сеанс
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-7">
                <TrendingUp className="w-3 h-3 mr-1" /> Прогрес
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function IncomeCalculator() {
  const [sessionsPerWeek, setSessionsPerWeek] = useState(20);
  const [sessionRate, setSessionRate] = useState(50);
  const [expenses, setExpenses] = useState(500);
  const [taxRate, setTaxRate] = useState(5);
  const monthlyRevenue = sessionsPerWeek * sessionRate * 4;
  const monthlyTax = monthlyRevenue * (taxRate / 100);
  const netIncome = monthlyRevenue - monthlyTax - expenses;
  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5" style={{ color: TEAL }} />Калькулятор доходу</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Сеансів/тиждень", val: sessionsPerWeek, set: setSessionsPerWeek, min: 5, max: 60, step: 5, fmt: (v: number) => String(v) },
            { label: "Вартість сеансу (€)", val: sessionRate, set: setSessionRate, min: 20, max: 200, step: 5, fmt: (v: number) => `€${v}` },
            { label: "Витрати/міс (€)", val: expenses, set: setExpenses, min: 100, max: 2000, step: 50, fmt: (v: number) => `€${v}` },
            { label: "Податок (%)", val: taxRate, set: setTaxRate, min: 0, max: 20, step: 1, fmt: (v: number) => `${v}%` },
          ].map((item) => (
            <div key={item.label}>
              <label className="text-sm font-medium">{item.label}</label>
              <input type="range" min={item.min} max={item.max} step={item.step} value={item.val}
                onChange={(e) => item.set(Number(e.target.value))} className="w-full" />
              <div className="text-sm font-mono">{item.fmt(item.val)}</div>
            </div>
          ))}
        </div>
        <div className="bg-teal-50 rounded-lg p-4 space-y-2">
          {[
            { label: "Місячний дохід (грос):", val: `€${monthlyRevenue.toLocaleString()}`, bold: false },
            { label: "Податок:", val: `€${monthlyTax.toLocaleString()}`, bold: false },
            { label: "Витрати:", val: `€${expenses.toLocaleString()}`, bold: false },
            { label: "Чистий дохід:", val: `€${netIncome.toLocaleString()}`, bold: true },
            { label: "Річний дохід:", val: `€${(netIncome * 12).toLocaleString()}`, bold: true },
          ].map((row) => (
            <div key={row.label} className={`flex justify-between text-sm ${row.bold ? "font-bold text-green-600" : ""}`}>
              <span>{row.label}</span><span className="font-mono">{row.val}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const TABS = [
  { id: "programs", label: "Програми", icon: LayoutGrid },
  { id: "register", label: "Реєстрація клієнта", icon: UserPlus },
  { id: "projects", label: "Проєкти", icon: ClipboardList },
  { id: "reports", label: "Звітність", icon: FileText },
  { id: "circulation", label: "Фолдер", icon: Users },
  { id: "calculator", label: "Дохід", icon: Calculator },
];

export default function ProviderCabinet() {
  const [activeTab, setActiveTab] = useState("programs");

  return (
    <div className="min-h-screen bg-slate-50">
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
                <p className="text-xs text-muted-foreground">Надавач · Демо-режим</p>
              </div>
            </div>
          </div>
          <Badge className="bg-teal-100 text-teal-800 text-xs">Демо-режим</Badge>
        </div>
        <div className="container">
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id ? "border-teal-500 text-teal-700" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                data-testid={`tab-${tab.id}`}
              >
                <tab.icon className="w-3.5 h-3.5" /> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-6">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
            {activeTab === "programs" && <ProgramBanners providerId={PROVIDER_ID} />}
            {activeTab === "register" && <RegisterClient />}
            {activeTab === "projects" && <Projects />}
            {activeTab === "reports" && <Reports />}
            {activeTab === "circulation" && <CirculationFolder />}
            {activeTab === "calculator" && <IncomeCalculator />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
