# FEEL Again · Майстер-контекст проєкту
> Версія: 2026-07-02 · Статус: Active Build · Власник: ГО «Фундація Відкрите Суспільство»

---

## 1. POSITIONING & IDENTITY (абсолютні правила)

**FEEL Again** = цифрова інфраструктура гуманітарної координації MHPSS в Україні.
- НЕ платформа. НЕ стартап. НЕ сервіс-провайдер.
- **Implementing org** = ГО «Фундація Відкрите Суспільство» (NGO Foundation Open Society) — координатор і адміністратор.
- **Geha Mental Health Center · Clalit Health Services (Ізраїль)** — клінічний Excellence партнер, EMDR, Модуль 1 Train for Care.
- **USC ICT · Dr. Albert «Skip» Rizzo (США)** — клінічний Excellence партнер, BRAVEMIND VRET, Модуль 2 Train for Care.
- **IIPE КНУ ім. Тараса Шевченка** — Center of Excellence, науково-дослідний партнер. Контакти: Оля Запорожець, Оксана Сивак.
- **Dr. Jessica Stone · Virtual Sandtray (VSA)** — Train for Care expansion pack, нейродивергентні, підлітки, телехелс.

**⛔ КАТЕГОРИЧНО ЗАБОРОНЕНО** вказувати як партнерів: Інвент Глобал, Укргазбанк, будь-які комерційні банки.

**Слогани:**
- «Не платформа. Не стартап. Інституційна інфраструктура для кризи.»
- «Цифрова інфраструктура гуманітарної координації MHPSS в Україні.»

**Копірайт в футері:** `© YEAR ГО «Фундація Відкрите Суспільство» · Програма FEEL Again. Усі права захищені.`
**Субрядок:** `Geha Clalit Health Services · USC ICT · КНУ ім. Шевченка — партнери клінічного Excellence`

---

## 2. TARGET AUDIENCES (3 роздільні, не змішані)

| Аудиторія | Термін у системі | Кабінет |
|-----------|------------------|---------|
| Психологи/клініцисти | Фахівець · Провайдер | ProviderCabinet |
| Постраждалі | Бенефіціар · Клієнт · Пацієнт | BeneficiaryCabinet |
| Фінансові актори | Донор | DonorCabinet |

**Типи донорів:** Меценат · Роботодавець · SIB-інвестор · Гум. актор · Банк · Фонд

---

## 3. ТЕХНІЧНИЙ СТЕК

```
Frontend:  React + TypeScript + Vite
Backend:   Express (Node.js, tsx server/index.ts — НЕ ЗМІНЮВАТИ)
DB:        Drizzle ORM + PostgreSQL (Neon)
Routing:   Wouter (frontend)
Data:      TanStack Query v5 (object form only: useQuery({ queryKey: [...] }))
UI:        shadcn/ui + Tailwind CSS
Animation: framer-motion
Port:      5000 (Express + Vite proxy)
```

**Критичне правило:** `npm run dev` → `node_modules/.bin/tsx server/index.ts`. НЕ змінювати scripts в package.json.

**ENV vars на фронті:** `import.meta.env.VITE_*` (не `process.env.*`)

**Кольори бренду:**
```
NAVY = #0F2B46   (primary dark bg)
GOLD = #D4A017   (accent/highlight)
TEAL = #0D9488   (secondary action)
AMBER = #D97706  (warning/cta)
```

---

## 4. СТРУКТУРА ФАЙЛІВ (поточна)

```
client/src/
  App.tsx                          — роути
  pages/
    Home.tsx                       — лендінг
    portal/
      DonorCabinet.tsx             — 5 tabs: Дашборд, Програми, Скоринг, Калькулятор, Партнери
      ProviderCabinet.tsx          — tabs: Профіль, Сесії, Аналітика
      BeneficiaryCabinet.tsx       — tabs: Скринінг (ScreeningFlow), Сесії (SessionHandshake)
      AdminCabinet.tsx             — адмін-панель
  components/
    CirculationFolder.tsx          — спільний компонент (shared між Provider/Admin)
    SessionHandshake.tsx           — підпис сесії ДІЯ + розрахунок оплати
    diagnostic/
      ScreeningFlow.tsx            — PCL-5 + PHQ-9 + GAD-7 flow
      PCL5.tsx, PHQ9.tsx, GAD7.tsx — окремі опитувальники
    layout/
      Navbar.tsx, Footer.tsx, Logo.tsx, FeelAgainLogo.tsx
    RoleSwitcher.tsx               — демо-режим перемикання ролей
server/
  index.ts, routes.ts, storage.ts, db.ts, vite.ts
shared/
  schema.ts                        — Drizzle schema + Zod types
```

---

## 5. GITHUB REPOS (попередні версії — ПУБЛІЧНІ)

### AlexezavGit/DigitalBus та AlexezavGit/ServiceAdmin
**Структура:** Ідентичні репозиторії (копії одного проєкту).
**Стек:** Той самий (Wouter, TanStack Query, shadcn, Drizzle).
**Реплітовська аутентифікація:** `replitAuth.ts` + `/api/login` → `/api/logout`
**Сайдбар:** Overview / Funding Programs / Feel Again / Projects & Organizations / Monitoring & Control / Donations / Transparency / Reports
**Живі метрики API:** `/api/stream/live-metrics` (refetchInterval: 5000ms)
**Живі метрики fields:** `humanitarian_composite_index`, `total_beneficiaries_served`, `organizations_using_stream`, `total_aid_volume`, `feel_again.active_beneficiaries`, `blockchain_verifications`, `real_time_transactions`
**Header pattern:** useAuth hook → user.firstName/lastName/profileImageUrl → Dropdown з logout

**⚠️ ПОРУШЕННЯ ANTIHALTURA в DigitalBus/dashboard.tsx:**
`Math.random()` для "+N in the last hour" — ЗАБОРОНЕНО. При інтеграції виключити або замінити на детерміновані дані з API.

### AlexezavGit/terminal
**Стек:** Next.js (App Router) + Tailwind
**Компоненти для інтеграції:**
- `ImpactCalculator.tsx` — **зрілий** компонент з реальними формулами (⚠️ адаптувати, виключивши Next.js-специфіку)
- `components/Charts.tsx` — графіки результатів
- `components/FlipNumber.tsx` — анімовані числа
- `lib/data.ts` — датасет транзакцій та клініцистів

**ImpactCalculator — канонічні константи (ПЕРЕВІРЕНІ):**
```
TRAINING_GROUP_SIZE = 20 (психологів на групу)
TRAINING_GROUP_COST = €48,025 (вартість навчання групи)
PRO_BONO_HOURS_PER_STUDENT = 120 год
SESSIONS_PER_BENEFICIARY_INTERNAL = 12 (EMDR & VR)
SESSIONS_PER_BENEFICIARY_MARKET = 16 (WHO стандарт)
MARKET_HOUR_RATE = €50/год
MARKET_COURSE_VALUE = 16 × €50 = €800 (ринкова ціна курсу)
```

**Формула ефективності:**
`Total Efficiency = Total Market Value / User Contribution`
`Effective Cost Per Beneficiary = Total Actual Cost / Total Beneficiaries`

**Funding distribution (blended finance):**
- Crowdfunding: 10% від other funding
- Corporate: 25% від other funding
- Donors: 65% від other funding

---

## 6. FIGMA DESIGNS (⚠️ ПОТРЕБУЄ ДОСТУПУ)

**Статус:** Figma вимагає автентифікацію. Агент НЕ МАЄ доступу без логіну або публічного посилання.

Надані посилання:
1. `https://www.figma.com/design/7Wqd8AsNm4GQymzZ6PjLSP/Psy-web-app--Copy-` — застосунок для психологів
2. `https://www.figma.com/design/riNpzgmEynWRnbsp4ndi7D/Stream-1.0-UX-UI--Copy-` — Stream 1.0 UX/UI (попередній сервіс для гуманітарки)

**Для отримання доступу (вибрати один варіант):**
- A) Зробити файл публічним у Figma (Share → Anyone with link → Can view)
- B) Експортувати фрейми як PNG/PDF через Figma Export
- C) Надати Figma access token

---

## 7. ЯКІСНІ СТАНДАРТИ (ANTIHALTURA PROTOCOL)

**Джерело:** `attached_assets/instructions_1782958597668.md`

### Абсолютні заборони
- `Math.random()` — ЗАБОРОНЕНО. Замінювати детермінованими даними або серверним API.
- Хардкодовані масиви-заглушки — ЗАБОРОНЕНО.
- Видалення існуючої логіки заради вирішення конфліктів збірки — ЗАБОРОНЕНО.
- Суміш даних різних одиниць (люди vs сесії) — ЗАБОРОНЕНО без явної конвертації.

### Мінімальні одиниці (для всіх розрахунків)
Формула: `Quantity × Rate × Period`. НЕ хардкодити підсумки.

### Позначки припущень
- ✅ Перевірено (2+ джерела): без позначки
- ⚠️ ПРИПУЩЕННЯ: явна позначка

### Порядок роботи над кожним завданням
1. Зібрати дані/вимоги → показати що відомо, що відсутнє
2. Мінімальний viable розділ → показати → отримати підтвердження
3. Виправити помилки → тільки потім рухатись далі
4. Self-check перед подачею

---

## 8. ЧЕРГА ЗАВДАНЬ (WORK QUEUE)

### ✅ ЗАВЕРШЕНО
- [x] ScreeningFlow (PCL-5 + PHQ-9 + GAD-7) → BeneficiaryCabinet "скринінг" tab
- [x] SessionHandshake → BeneficiaryCabinet "сесія" tab + ProviderCabinet "сесія" tab
- [x] CirculationFolder → shared компонент
- [x] DonorCabinet 5 tabs: Дашборд (KPI × donor type), Програми (Train for Care), Скоринг, Калькулятор (SROI), Партнери
- [x] Donor type switcher (5 типів → контекстні KPI)
- [x] Partners tab: видалено Інвент Глобал + Укргазбанк; додано клінічних партнерів + placeholder honor board
- [x] Footer copyright → ГО «Фундація Відкрите Суспільство»

### 🔴 КРИТИЧНИЙ ПРІОРИТЕТ (P0)
- [ ] **P0-A: ImpactCalculator rebuild** — Перенести з `terminal/components/ImpactCalculator.tsx` у React/shadcn. Використати канонічні константи зверху. Виключити `Math.random()` і Next.js-специфіку. Цей калькулятор замінює поточний placeholder у DonorCabinet → "Калькулятор" tab.
- [ ] **P0-B: Provider Compliance Journey** — «Шлях до справедливої оплати» — ранкінг провайдерів 0→1→2→3. Нові вкладка у ProviderCabinet. Кожен рівень: вимоги, поточний статус, кроки до апгрейду, різниця в тарифах.

### 🟠 ВИСОКИЙ ПРІОРИТЕТ (P1)
- [ ] **P1-A: Landing page redesign** — Інтегрувати дизайн-мову з DigitalBus/ServiceAdmin repos. Окрема hero-секція для кожної аудиторії (провайдер / бенефіціар / донор). Реєстрація inline (не модальне вікно). Blurred preview locked features. Mobile-first.
- [ ] **P1-B: Navigation redesign** — Sidebar-навігація за зразком DigitalBus (Overview, Impact Financing Hub, Monitoring & Control, Donations, Transparency, Reports & Standards). Sticky, collapsible, role-aware.
- [ ] **P1-C: Per-user-type onboarding flows** — 3 окремих потоки реєстрації (Provider / Beneficiary / Donor) з role selection на першому кроці.
- [ ] **P1-D: Live metrics integration** — Замінити static mock numbers у DonorCabinet Dashboard на `/api/stream/live-metrics` запити (TanStack Query, refetchInterval: 30000). Виключити Math.random().

### 🟡 СЕРЕДНІЙ ПРІОРИТЕТ (P2)
- [ ] **P2-A: Monitoring & Control page** — AI/Automation, Blockchain Monitor, Anomalies, NLP Interface (за зразком DigitalBus sidebar item).
- [ ] **P2-B: Transparency page** — Solana реєстр, відкриті дані, Grand Bargain compliance.
- [ ] **P2-C: Reports & Standards page** — Grand Bargain, IATI Standard, Ukraine-Specific звіти.
- [ ] **P2-D: Dark mode toggle** — Підтримка тем. Terminal repo uses `bg-[#050A15]` dark theme — можна використати як базу для темної теми.
- [ ] **P2-E: Mobile-first optimization** — Переробити layout на mobile-first. GSM connectivity first (lazy loading, skeleton states, мінімальний bundle).

### 🔵 НИЖНІЙ ПРІОРИТЕТ (P3)
- [ ] **P3-A: API documentation** — Документація всіх `/api/*` endpoints у форматі OpenAPI.
- [ ] **P3-B: Disclaimers & legal** — Terms of use, Privacy policy, disclaimer MHPSS.
- [ ] **P3-C: Infographic conversions** — Перетворити текстові блоки на інтерактивну інфографіку (AntV або React charts).
- [ ] **P3-D: Figma designs integration** — Залежить від отримання доступу до Figma файлів.

---

## 9. DONOR JOURNEY MAP (D1–D6)

**Джерело:** `attached_assets/FEEL_Donor_Journey_Map_1782927689798.html`

| Крок | Touchpoint | URL |
|------|------------|-----|
| D1 | NBU-аналіз ПТСР | `nbu-analysis.pages.dev` |
| D2 | Аналітичний дашборд | `dashboard.feelagain.me` |
| D3 | FEEL Again сайт | `feelagain.me` |
| D4 | Онбординг | Реєстраційний flow |
| D5 | Кабінет донора | DonorCabinet → 5 tabs |
| D6 | Дошка пошани | Partners tab → Honor Board |

---

## 10. ДАНІ ДЛЯ ДЕМО (CANONICAL DATASET v1.0)

**Джерело:** `shared/lib/data.ts` (terminal repo)

```typescript
// Транзакції (SETTLED/PENDING)
{id:'0x8a...4b2c', doc:'UA-MED-8492', clinicianName:'Dr. Olena Kovalenko', protocol:'mhGAP Session 4', amount:'$85.00', status:'SETTLED'}
{id:'0x3f...9e1a', doc:'UA-MED-1104', clinicianName:'Dr. Serhiy Morozov', protocol:'Bravemind VR', amount:'$120.00', status:'PENDING'}
{id:'0x7d...2c8f', doc:'UA-MED-9932', clinicianName:'Dr. Iryna Shevchenko', protocol:'PTSD Initial', amount:'$65.00', status:'SETTLED'}
{id:'0x1b...6d4e', doc:'UA-MED-3321', clinicianName:'Dr. Dmytro Bondarenko', protocol:'mhGAP Session 1', amount:'$45.00', status:'SETTLED'}

// Клініцисти (всі DIIA_VERIFIED)
{id:'UA-MED-8492', name:'Dr. Olena Kovalenko', spec:'PTSD Specialist', sessions:1240}
{id:'UA-MED-1104', name:'Dr. Serhiy Morozov', spec:'VR Therapy', sessions:842}
{id:'UA-MED-9932', name:'Dr. Iryna Shevchenko', spec:'CBT Expert', sessions:2150}
{id:'UA-MED-3321', name:'Dr. Dmytro Bondarenko', spec:'Crisis Psych', sessions:530}
{id:'UA-MED-5542', name:'Dr. Anna Lysenko', spec:'Trauma Care', sessions:1120}
{id:'UA-MED-7721', name:'Dr. Natalia Petrenko', spec:'EMDR Specialist', sessions:940}
{id:'UA-MED-4409', name:'Dr. Viktor Melnyk', spec:'Military Psych', sessions:1860}

// Symptom reduction curve (PCL-5 score по тижнях)
Week 1: 85 → Week 2: 78 → Week 4: 62 → Week 6: 45 → Week 8: 32 → Week 12: 24
```

---

## 11. LIVEMETRICS API SCHEMA

**Endpoint:** `GET /api/stream/live-metrics`
**Refetch interval:** 5000ms (real-time) або 30000ms (донорський кабінет)

```typescript
{
  humanitarian_composite_index: number,    // MHPSS Support Index
  total_beneficiaries_served: number,      // Beneficiaries Supported
  organizations_using_stream: number,      // Participating Organizations
  total_aid_volume: number,                // Total Support Volume ($)
  feel_again: {
    active_beneficiaries: number,          // Active Sessions
  },
  blockchain_verifications: number,        // Clinical Verifications
  real_time_transactions: number,          // Real-time Transactions
  last_updated: string,                    // ISO timestamp
}
```

---

## 12. ПРАВИЛА РОЗРОБКИ (ОБОВ'ЯЗКОВІ)

1. Кожен PR/commit — перевірити, що `npm run dev` стартує без помилок.
2. Всі інтерактивні елементи HTML — атрибут `data-testid` (формат: `{action}-{target}`).
3. Форми — `useForm` + `zodResolver` + shadcn Form + default values.
4. Мутації — `apiRequest` з `@lib/queryClient` + `queryClient.invalidateQueries`.
5. Loading states — скелетон або spinner для всіх запитів (`.isLoading` / `.isPending`).
6. Жодних жорстко закодованих масивів для live-даних — тільки API або канонічний датасет.
7. Текст — 100% українською мовою в UI (виключення: технічні терміни train for care, EMDR, BRAVEMIND, DIIA).
8. Компоненти — розбивати якщо файл > 300 рядків.

---

## 13. ПИТАННЯ ДЛЯ УТОЧНЕННЯ (⚠️ ЗАБЛОКОВАНІ ЗАВДАННЯ)

### Q1: Figma доступ
P3-D (Figma integration) заблоковано. Потрібно:
- Зробити Figma файли публічними (Share → Anyone with link → Can view), АБО
- Експортувати як PNG/PDF/HTML

### Q2: Реплітовська авторизація vs власна
DigitalBus/ServiceAdmin використовують Replit Auth (`/api/login`). Поточний проєкт — demo режим без auth.
- Інтегрувати Replit Auth для продакшну? (так / ні)

### Q3: База даних з реальними даними
Поточний проєкт — Drizzle schema є, але таблиці пусті.
- Потрібно seed реальні демо-дані (canonical dataset v1.0)? (так / ні)

---

## 14. BENCHMARK FINTECH TOP-5 (вимога #2, #3, #9)

**Цільовий рівень якості:** Кращі практики з:
1. **Revolut** — onboarding UX, real-time updates, card-based UI
2. **N26** — clean dashboard, spending insights, mobile-first
3. **Monzo** — transparent flows, notifications, color coding
4. **Stripe Dashboard** — data tables, filters, export, API docs
5. **Robinhood** — impact metrics, progress bars, visual storytelling

**Конкретні елементи для реалізації:**
- Skeleton loading states (Revolut pattern)
- Real-time metric updates без перезавантаження сторінки (Monzo pattern)
- Drilldown з summary → detail (Stripe pattern)
- Interactive charts з hover tooltips (N26 pattern)
- Progress-to-goal visualization (Robinhood pattern)

---

## 15. ВАЖЛИВІ ЗАЛЕЖНОСТІ ТА ЗАСТЕРЕЖЕННЯ

**framer-motion** — вже встановлена, використовується для анімацій.
**shadcn/ui** — всі компоненти з `@/components/ui/`.
**TanStack Query v5** — ТІЛЬКИ object form: `useQuery({ queryKey: [...] })`.
**`<SelectItem>`** — ЗАВЖДИ потрібен `value` prop.
**`useToast`** — імпортувати з `@/hooks/use-toast` (не з shadcn напряму).
**React** — НЕ імпортувати явно (Vite JSX transformer автоматично).
**CSS змінні** — формат: `H S% L%` (без `hsl()` обгортки).
**DialogContent** — ЗАВЖДИ потрібен `DialogTitle` для accessibility.

---
*Цей файл оновлюється після кожного сеансу роботи. Черга завдань дописується з новими вимогами.*
