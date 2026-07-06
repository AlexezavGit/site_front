import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Redirect, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { loginUserSchema, registerUserSchema, ROLE_VALUES, type RoleValue } from "@shared/schema";
import { RefreshCw, Heart, Stethoscope, TrendingUp, ShieldCheck } from "lucide-react";

const NAVY = "#0F2B46";
const GOLD = "#D4A017";

const roleLabels: Record<RoleValue, { label: string; icon: any; desc: string }> = {
  beneficiary: { label: "Бенефіціар", icon: Heart, desc: "Отримання підтримки та участь у програмах" },
  provider: { label: "Надавач", icon: Stethoscope, desc: "Надання фахової допомоги, звітність, проєкти" },
  donor: { label: "Донор", icon: TrendingUp, desc: "Створення програм фінансування та контроль" },
  supervisor: { label: "Супервізор", icon: ShieldCheck, desc: "Аудит, верифікація та комплаєнс" },
};

const registerFormSchema = registerUserSchema;

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [, setLocation] = useLocation();

  const loginForm = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: { username: "", password: "" },
  });

  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { username: "", password: "", name: "", email: "", role: "beneficiary" },
  });

  if (user) {
    return <Redirect to="/portal" />;
  }

  return (
    <div className="min-h-[80vh] grid md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-center px-12 text-white" style={{ background: `linear-gradient(150deg, #091d30 0%, ${NAVY} 60%, #162944 100%)` }}>
        <div className="max-w-md">
          <div style={{ color: "white", fontSize: 40, fontWeight: 300 }}>FEEL <span style={{ color: GOLD }}>Again</span></div>
          <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
            Єдина цифрова інфраструктура для сектору психічного здоров'я України. Увійдіть до свого кабінету або зареєструйтеся, щоб отримати доступ до ролі надавача, бенефіціара, донора чи супервізора.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Card>
            <CardContent className="pt-6">
              <div className="flex mb-6 rounded-lg bg-slate-100 p-1">
                <button
                  className="flex-1 py-2 text-sm font-medium rounded-md transition-colors"
                  style={tab === "login" ? { background: "white", color: NAVY, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" } : { color: "#64748b" }}
                  onClick={() => setTab("login")}
                  data-testid="tab-login"
                >
                  Увійти
                </button>
                <button
                  className="flex-1 py-2 text-sm font-medium rounded-md transition-colors"
                  style={tab === "register" ? { background: "white", color: NAVY, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" } : { color: "#64748b" }}
                  onClick={() => setTab("register")}
                  data-testid="tab-register"
                >
                  Реєстрація
                </button>
              </div>

              {tab === "login" ? (
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit((data) => loginMutation.mutate(data, { onSuccess: () => setLocation("/portal") }))} className="space-y-4">
                    <FormField control={loginForm.control} name="username" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Логін</FormLabel>
                        <FormControl><Input {...field} data-testid="input-login-username" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={loginForm.control} name="password" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Пароль</FormLabel>
                        <FormControl><Input type="password" {...field} data-testid="input-login-password" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit" className="w-full" disabled={loginMutation.isPending} style={{ background: GOLD, color: NAVY, fontWeight: 600, border: "none" }} data-testid="button-submit-login">
                      {loginMutation.isPending && <RefreshCw className="w-4 h-4 mr-2 animate-spin" />}
                      Увійти
                    </Button>
                  </form>
                </Form>
              ) : (
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit((data) => registerMutation.mutate(data, { onSuccess: () => setLocation("/portal") }))} className="space-y-4">
                    <FormField control={registerForm.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ім'я</FormLabel>
                        <FormControl><Input {...field} data-testid="input-register-name" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={registerForm.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" {...field} data-testid="input-register-email" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={registerForm.control} name="username" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Логін</FormLabel>
                        <FormControl><Input {...field} data-testid="input-register-username" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={registerForm.control} name="password" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Пароль</FormLabel>
                        <FormControl><Input type="password" {...field} data-testid="input-register-password" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={registerForm.control} name="role" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Роль</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-role"><SelectValue /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ROLE_VALUES.map((r) => (
                              <SelectItem key={r} value={r}>{roleLabels[r].label} — {roleLabels[r].desc}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit" className="w-full" disabled={registerMutation.isPending} style={{ background: GOLD, color: NAVY, fontWeight: 600, border: "none" }} data-testid="button-submit-register">
                      {registerMutation.isPending && <RefreshCw className="w-4 h-4 mr-2 animate-spin" />}
                      Зареєструватися
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Роль можна буде розширити зсередини кабінету (мульти-роль).
                    </p>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
