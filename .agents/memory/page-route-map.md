---
name: Page route map
description: Current route→component mapping; important renames and new pages added.
---

# Page Route Map

## New Routes (2026-07)
| Route | Component | Notes |
|---|---|---|
| /recipient | LandingRecipient | Standalone beneficiary landing page |
| /provider | LandingProvider | Standalone provider landing page |
| /patron | LandingPatron | Standalone patron/fundraising landing page |
| /consortium | Consortium | Partners page (FOS, Geha, USC, KNU) |

## Renamed Display Text (nav labels, cabinet headers)
- "Фахівцям" → "Надання допомоги" (in Navbar dropdown + mobile)
- "Донорам та КСВ" → "Фандрейзинг" (in Navbar dropdown + mobile)
- "Бенефіціарам" → "Отримання допомоги" (in Navbar dropdown + mobile)
- "Консорціум" added to Програма dropdown → /consortium
- "Кабінет донора" header → "Кабінет патрона" (in DonorCabinet.tsx)
- "Тип донора:" → "Тип патрона:" (in DonorCabinet.tsx)

## Cabinet Routes (unchanged URLs)
| Route | Component File | Export Name |
|---|---|---|
| /portal/donor | portal/DonorCabinet.tsx | PatronCabinet |
| /portal/provider | portal/ProviderCabinet.tsx | ProviderCabinet |
| /portal/beneficiary | portal/BeneficiaryCabinet.tsx | BeneficiaryCabinet |
| /portal/auditor | portal/AuditorCabinet.tsx | AuditorCabinet |

**Why:** DonorCabinet.tsx file kept same name to avoid Git churn, but export renamed PatronCabinet. App.tsx imports as PatronCabinet.

## Portal Quest Map
Portal.tsx has ThreePathsSection added between gateway cards and multi-role section. Shows 3 parallel user journey lanes (Отримувач/Надавач/Патрон), mobile=tabbed, desktop=3-column.
