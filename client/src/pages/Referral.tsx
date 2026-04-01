import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { insertReferralSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Heart, Users, Banknote, GraduationCap, Phone, CheckCircle2 } from "lucide-react";

const formSchema = insertReferralSchema.extend({
  email: z.string().email("Введіть коректний email"),
  phone: z.string().min(10, "Мінімум 10 цифр").max(15, "Максимум 15 цифр"),
  serviceType: z.string().min(1, "Оберіть тип запиту"),
});

type FormValues = z.infer<typeof formSchema>;

const serviceTypes = [
  { value: "beneficiary", label: "Отримати психологічну підтримку", icon: Heart },
  { value: "professional", label: "Приєднатися як фахівець", icon: Users },
  { value: "donor", label: "Стати донором / партнером", icon: Banknote },
  { value: "training", label: "Записатися на навчання", icon: GraduationCap },
  { value: "general", label: "Загальний запит", icon: CheckCircle2 },
];

export default function Referral() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      serviceType: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      await apiRequest("POST", "/api/referrals", data);
    },
    onSuccess: () => {
      toast({
        title: "Запит надіслано",
        description: "Ми зв'яжемося з вами протягом 48 годин.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Помилка",
        description: "Будь ласка, спробуйте ще раз або зверніться на info@feelagain.org",
        variant: "destructive",
      });
    },
  });

  return (
    <div>
      {/* Hero */}
      <section className="py-14 bg-gradient-to-br from-primary/5 to-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Реєстрація</Badge>
          <h1 className="text-4xl font-bold mb-3">Зробіть перший крок</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Заповніть форму — і наш менеджер зв'яжеться з вами протягом 48 годин
            для визначення наступних кроків.
          </p>
        </motion.div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Form */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Форма реєстрації</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                      className="space-y-5"
                    >
                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ім'я та прізвище *</FormLabel>
                              <FormControl>
                                <Input placeholder="Марія Іванова" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="name@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Телефон *</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="+380 XX XXX XX XX" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="serviceType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Тип запиту *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Оберіть тип запиту" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {serviceTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Опишіть ваш запит</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Розкажіть детальніше про вашу ситуацію, потреби або запитання..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="text-xs text-muted-foreground bg-slate-50 p-3 rounded-lg">
                        🔒 Ваші дані захищені (GDPR-комплаєнс). Ніхто не матиме доступу до
                        вашої особистої інформації без вашої згоди. Конфіденційність гарантована.
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={mutation.isPending}
                      >
                        {mutation.isPending ? "Надсилання..." : "Надіслати запит"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Info sidebar */}
            <div className="space-y-5">
              {/* Emergency */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <p className="font-bold text-red-700 mb-2 flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Потрібна допомога зараз?
                </p>
                <p className="text-sm text-red-600 font-bold mb-1">0 800 505 010</p>
                <p className="text-xs text-red-500">ТИ ЯК? · Безкоштовно · 24/7 · Анонімно</p>
              </div>

              {/* What happens next */}
              <Card>
                <CardContent className="pt-5">
                  <h3 className="font-bold mb-4">Що відбудеться далі</h3>
                  <ol className="space-y-3">
                    {[
                      "Ми отримаємо ваш запит (автоматично)",
                      "Менеджер зв'яжеться з вами протягом 48 годин",
                      "Визначимо оптимальний формат і наступний крок",
                      "Підключимо вас до програми або фахівця",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              {/* Quick links */}
              <Card>
                <CardContent className="pt-5">
                  <h3 className="font-bold mb-3">Дізнатися більше</h3>
                  <ul className="space-y-2 text-sm">
                    {serviceTypes.map((type) => (
                      <li key={type.value} className="flex items-center gap-2 text-muted-foreground">
                        <type.icon className="h-4 w-4 text-primary" />
                        <span>{type.label}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
