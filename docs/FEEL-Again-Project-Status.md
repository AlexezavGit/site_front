# FEEL Again · Статус проєкту та план продовження

> Останнє оновлення: 2026-07-06 (кінець сесії, завершено 3 завдання P0-P1).
> Для термінології — `docs/FEEL-Again-Glossary.md`. Для стеку/структури/правил — `docs/FEEL-Again-Master-Context.md`.
> Для довгострокової пам’яті — `.agents/memory/MEMORY.md`.

---

## Що зроблено в цій сесії (2026-07-06)

### ✅ T101 · ImpactCalculator перероблено (P0-A)
- Кабінет донора → вкладка "Калькулятор"
- Додано blended-finance панель: краудфандинг 10% / корпоративні 25% / донори 65%
- Total efficiency, effective cost per beneficiary, додаткові бенефіціари через тренінг
- Pro bono slider (120–140 годин/абітурієнт)
- Mobile-first: `grid-cols-1 sm:grid-cols-2`, адаптивні паддінги, test IDs
- Файл: `client/src/pages/portal/DonorCabinet.tsx`, рядки ~435–517 (ImpactCalculator)

### ✅ T102 · Provider Compliance Journey (P0-B)
- Кабінет фахівця → нова вкладка "Шлях"
- 4 рівні: 0→Універсал (€18/год) → 1→Апробований (€35/год) → 2→Вартий резидент (€55/год) → 3→Експерт (€85/год)
- Кожен рівень: статус, годинний тариф, вимоги, наступні кроки
- Mobile-first: `grid-cols-1 md:grid-cols-2`, test IDs (`compliance-level-${id}`)
- Файл: `client/src/pages/portal/ProviderCabinet.tsx`, рядки ~633–730 (ComplianceJourney)

### ✅ T103 · Live metrics endpoint + DonorCabinet wiring (P1-D)
- Backend: `GET /api/stream/live-metrics` у `server/routes.ts` (рядки 228–267)
- Primary: DB aggregates (users, programs, referrals, projects, reports) через `Promise.all`
- Graceful fallback: канонічний датасет v1.0 (без Math.random — ANTIHALTURA)
- Frontend: `useQuery<LiveMetrics>` з `refetchInterval: 30000`, `staleTime: 25000`
- KPI донорського дашборду динамічно оновлюються (бенефіціари, сеанси, організації, aid volume)

### ✅ Auth fix
- Тестовий логін: **юзернейм** `test` (не email!), пароль `Test123!`
- Пароль скинуто через scrypt + neon serverless driver
- Форма логіну надсилає `username` поле (passport-local), не email

---

## ⚠️ Нереалізовано — велика хвиля вимог (2026-07-06)

### 1. Три тейлор-мейд лендінги (P1-A)
- 3 окремі сторінки-входи (Provider / Beneficiary / Donor), кожна зі своїм "сленгом", акцентами та аргументами.
- Контент з репо **Front** (`https://replit.com/@alexezav/Front`) — не досліджено ще. Необхідно: відкрити, проаналізувати 3 кабінети/калькулятори, перенести їх контент як лендінг-сторінки, комбінуючи з поточним Home.tsx.
- Кнопка реєстрації — всюди зверху, окрім дашборду (окрема система).
- Перед реєстрацією — вибір: публічний контроль / сайт про програму (feelagain.me) / дашборд з даними.

### 2. Інфографіка "шлях користувача" (P3-C / нова вимога)
- 3 вертикальні доріжки (Provider / Beneficiary / Donor), перетинаються горизонтально через тригери.
- Зворотний водоспад: громада → діагностика → сеанси → зворотний зв'язок.

### 3. Перерозподіл моніторингу/транспарентності/звітності по кабінетах (P2-A/B/C)
- **ProviderCabinet** → формування звітів (генерація)
- **DonorCabinet** → перевірка звітності + запит зворотного зв'язку
- **Supervisor / Публічний контроль** → Monitoring & Control (AI, Blockchain, Anomalies) — такої ролі/сторінки НЕМАЄ, треба створити
- Джерело: ServiceAdmin repo (sidebar, AI Modules, Transparency, Reports) — вилучити Math.random(), адаптувати під bunker palette

### 4. Provider Onboarding — повний флоу (P0-B продовження)
- Compliance Journey — є, але це лише візуальна картка. Потрібен повний онбординг: верифікація диплому (ДІЯ), доступ до циркуляційного фолдера, блокування періоду прийому бенефіціарів під час підвищення кваліфікації, підрахунок pro-bono годин.
- Існуючий AdminCabinet.tsx має бути розформований, його функціонал переїжджає у Provider/Donor/Supervisor.

### 5. Оновлені канонічні константи (потребують звірки)
- `TRAINING_GROUP_COST`: було €48,025 → користувач каже €90k. Зараз використовано €90k у DonorCabinet.tsx. **Потрібне підтвердження** — це заміна чи інша метрика?
- `PRO_BONO_HOURS`: було 120 фіксовано → тепер діапазон 120–140 годин.

---

## Рекомендований порядок наступної сесії

1. **Найвищий пріоритет (T104):** 3 тейлор-лендінги — найконкретніше завдання, потребує дослідження репо Front.
2. **Перерозподіл Monitoring/Transparency/Reports (T105):** розподілити контент ServiceAdmin по кабінетах, вилучити Math.random.
3. **Provider Onboarding флоу (T102-extended):** верифікація, циркуляційний фолдер, pro-bono блок, підвищення.
4. **Інфографіка шляху користувача (T106):** 3 паралельні доріжки з тригерами та зворотним водоспадом.
5. **Sidebar redesign (T104-extended):** спільний CabinetLayout з навігацією Overview/Funding/Monitoring/Donations/Transparency/Reports.

---

## Питання, що чекають відповіді користувача

- **Q1 (Master-Context):** Figma-доступ — файли публічні? (Токен роботий через bash.)
- **Q2:** Replit Auth чи власна автентифікація для продакшну?
- **Q3:** Seed демо-даних (canonical dataset v1.0) у БД?
- **Q4 (NEW):** `TRAINING_GROUP_COST` — €90k заміняє €48,025 чи це інша метрика?
- **Q5 (NEW):** Існуючий AdminCabinet — розформувати в окрему Supervisor кабінет?
