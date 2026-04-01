# FEEL Again — Сайт для стейкхолдерів і учасників програми

## Про проєкт
Публічний сайт гуманітарної програми FEEL Again — цифрової інфраструктури гуманітарної координації MHPSS в Україні.

## Аудиторії (4 основні)
1. **Фахівці та практиканти** — вихід із тіні, сертифікація, дохід
2. **Донори та гуманітарні актори** — де-ризиковане спів-фінансування, авто-звітність
3. **Громади та КСВ** — Train for Care, P2P-кампанії
4. **Бенефіціари** — рівний доступ, ступенева допомога

## Навігація / Маршрути
- `/` — Головна: executive summary, canonical stats, value props, 6 gaps
- `/pro` — Фахівцям: 3 сектори, 8 потоків, переваги
- `/training` — Підвищення кваліфікації: Train for Care, 4 треки, клін. інструменти
- `/donors` — Донорам та КСВ: 3 аудиторії, Reverse Waterfall, прецеденти
- `/beneficiaries` — Бенефіціарам: ступенева допомога, шлях у програмі
- `/about` — Про програму: що є/не є, 6 шарів, 3 кластери, чому Україна
- `/methodology` — Методологія: шлях бенефіціара, Payment for Result, 5 шарів платформи
- `/data` — Відкриті дані: Canonical Dataset, Killer Table, фін. потоки
- `/referral` — Реєстрація: форма для всіх типів учасників

## Ключові канонічні дані (Doc 4)
Всі цифри беруться з Canonical Dataset v1.0:
- 9.6M — у зоні ризику (WHO, 2025)
- 74% — treatment gap IDPs (IOM/UNHCR 2023)
- 117,652 — mhGAP сертифікатів (WHO Dashboard)
- 42 — практикують під супервізією (PMC 2020, 6% конверсія)
- $8B/рік — втрати ВВП (OECD methodology)
- $137M/рік — гуманітарні потоки (OCHA FTS + bilateral)
- $1,945K — Unified Program Matrix
- 7→3% — дегресивна комісія платформи (CANONICAL)
- €75,605 — Train for Care когорта 20 осіб, ROI 2.22×

## Стек
- Frontend: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- Backend: Express + Node.js + PostgreSQL (Drizzle ORM)
- Бібліотеки: framer-motion, recharts, lucide-react, tanstack-query, wouter

## Файли БД
`shared/schema.ts` — схема: users, professionals, trainings, impactMetrics, referrals, donors

## Розгортання
Workflow "Start application" → `npm run dev` → порт 5000
