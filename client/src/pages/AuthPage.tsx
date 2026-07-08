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
import { RefreshCw, Mail, User as UserIcon, Lock, ArrowRight } from "lucide-react";

const NAVY = "#0F2B46";
const GOLD = "#D4A017";

// Registration: name + email (+ optional password)
const registerFormSchema = z.object({
  name: z.string().min(2, "Введіть ваше ім'я"),
  email: z.string().email("Введіть коректний email"),
  password: z.string().optional(),
});
type RegisterForm = z.infer<typeof registerFormSchema>;

// Login: email/username + optional password
const loginFormSchema = z.object({
  username: z.string().min(1, "Введіть email або логін"),
  password: z.string().optional(),
});
type LoginForm = z.infer<typeof loginFormSchema>;

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [tab, setTab] = useState<"login" | "register">("register");
  const [, setLocation] = useLocation();

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { username: "", password: "" },
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  if (user) return <Redirect to="/portal" />;

  const handleRegister = (data: RegisterForm) => {
    registerMutation.mutate(
      {
        name: data.name,
        email: data.email,
        username: "", // auto-generated server-side from email
        password: data.password || "feel-again-demo",
        role: "donor",
      },
      { onSuccess: () => setLocation("/portal") }
    );
  };

  const handleLogin = (data: LoginForm) => {
    loginMutation.mutate(
      { username: data.username, password: data.password || "" },
      { onSuccess: () => setLocation("/portal") }
    );
  };

  return (
    <div className="min-h-[80vh] grid md:grid-cols-2">
      {/* Left panel */}
      <div
        className="hidden md:flex flex-col justify-center px-12 text-white relative overflow-hidden"
        style={{ background: `linear-gradient(150deg, #091d30 0%, ${NAVY} 60%, #162944 100%)` }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 70% 30%, ${GOLD} 0%, transparent 60%), radial-gradient(circle at 20% 80%, #14B8A6 0%, transparent 50%)`
        }} />
        <div className="relative max-w-md">
          <div style={{ color: "white", fontSize: 40, fontWeight: 300, letterSpacing: "-0.02em" }}>
            FEEL <span style={{ color: GOLD }}>Again</span>
          </div>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
            Цифрова інфраструктура для сектору психічного здоров'я України.
          </p>
          <div className="mt-8 space-y-4">
            {[
              { icon: "🏥", text: "Кабінет надавача — проєкти, звітність, онбординг" },
              { icon: "💛", text: "Кабінет отримувача — діагностика, запис, програми" },
              { icon: "🤝", text: "Кабінет патрона — фінансування, ESG, імпакт" },
              { icon: "🔍", text: "Аудит — верифікація, комплаєнс, прозорість" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{item.text}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            Реєструючись, ви отримуєте доступ до всіх кабінетів платформи.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Card className="shadow-lg border-slate-200">
            <CardContent className="pt-6">
              {/* Tab switcher */}
              <div className="flex mb-6 rounded-lg bg-slate-100 p-1">
                <button
                  className="flex-1 py-2 text-sm font-medium rounded-md transition-colors"
                  style={tab === "register"
                    ? { background: "white", color: NAVY, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }
                    : { color: "#64748b" }}
                  onClick={() => setTab("register")}
                >
                  Реєстрація
                </button>
                <button
                  className="flex-1 py-2 text-sm font-medium rounded-md transition-colors"
                  style={tab === "login"
                    ? { background: "white", color: NAVY, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }
                    : { color: "#64748b" }}
                  onClick={() => setTab("login")}
                >
                  Увійти
                </button>
              </div>

              {tab === "register" ? (
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                    <FormField control={registerForm.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <UserIcon className="w-3.5 h-3.5 text-slate-400" /> Ваше ім'я
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Олена Іванова" data-testid="input-register-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={registerForm.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-400" /> Email
                        </FormLabel>
                        <FormControl>
                          <Input type="email" {...field} placeholder="your@email.com" data-testid="input-register-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={registerForm.control} name="password" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Lock className="w-3.5 h-3.5 text-slate-400" />
                          Пароль <span className="text-xs text-slate-400 font-normal">(необов'язково)</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="password" {...field} placeholder="Будь-який або залиште порожнім" data-testid="input-register-password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <Button
                      type="submit"
                      className="w-full mt-2"
                      disabled={registerMutation.isPending}
                      style={{ background: GOLD, color: NAVY, fontWeight: 700, border: "none", height: 44 }}
                      data-testid="button-submit-register"
                    >
                      {registerMutation.isPending
                        ? <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Реєструємо...</>
                        : <><ArrowRight className="w-4 h-4 mr-2" /> Отримати доступ до всіх кабінетів</>}
                    </Button>

                    <p className="text-xs text-center text-slate-400 mt-1">
                      Після реєстрації ви отримаєте доступ до кабінетів: надавача, отримувача, патрона та аудитора.
                    </p>
                  </form>
                </Form>
              ) : (
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <FormField control={loginForm.control} name="username" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-400" /> Email або логін
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="your@email.com або логін" data-testid="input-login-username" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={loginForm.control} name="password" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Lock className="w-3.5 h-3.5 text-slate-400" />
                          Пароль <span className="text-xs text-slate-400 font-normal">(необов'язково)</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="password" {...field} placeholder="Будь-який" data-testid="input-login-password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <Button
                      type="submit"
                      className="w-full mt-2"
                      disabled={loginMutation.isPending}
                      style={{ background: NAVY, color: "white", fontWeight: 600, border: "none", height: 44 }}
                      data-testid="button-submit-login"
                    >
                      {loginMutation.isPending
                        ? <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Входимо...</>
                        : "Увійти"}
                    </Button>

                    <p className="text-xs text-center text-slate-400">
                      Немає акаунту?{" "}
                      <button type="button" className="underline" style={{ color: GOLD }} onClick={() => setTab("register")}>
                        Зареєструйтесь
                      </button>
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
