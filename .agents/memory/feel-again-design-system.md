---
name: FEEL Again design system (bunker palette)
description: Canonical color/typography system for FEEL Again landing pages and the rule that heroes must be structurally distinct per role, not just recolored.
---

Canonical "bunker" background: `#050C16`. Role-based color groups (from `FEEL_Again_-_Design_System_Canvas_01` doc):
- Royal Blue (`#0E4D63`/`#2E89A6`) = Donors, ~20% usage
- Teal (`#1C5A52`/`#3E91A2`) = Providers, ~42% usage
- Orange = Operational/process, ~22% usage
- Gold (`#D4A017`) = unifying/brand accent, ~8% usage
- Cream/Sand (`#F2EADB`/`#E9DEC9`/`#123C3A` ink) = Beneficiaries, light "LIGHT & CARE" treatment, ~6%
- Collision Red = alerts, <2%

Typography reference calls for Archivo/Source Sans 3/Spline Mono, but the app's existing convention (established in `Home.tsx`) uses system fonts with `font-weight: 300` for large headlines and inline hex styles rather than Tailwind theme tokens — kept consistent with that instead of introducing new fonts, to avoid scope creep.

**Rule:** each page's hero must differ in structure (layout, content composition), not just background color — e.g. split hero + role-specific metrics panel for Donors/Providers (dark), centered warm hero for Beneficiaries (light), editorial bordered-plaque hero for About, process-flow hero for Methodology.

**Why:** user explicitly flagged that all landing page heroes looked like the same template (badge+h1+p+buttons on a pastel gradient) just recolored — this was rejected as wrong even though page sections themselves were split correctly.

**How to apply:** when adding/redesigning any FEEL Again page hero, pick the correct role color group first, then design a distinct composition (split with metrics widget, centered plaque, process timeline, etc.) rather than reusing the generic template.
