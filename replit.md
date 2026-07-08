# FEEL Again

## Overview
FEEL Again is a full-stack digital infrastructure platform for Ukraine's mental health (MHPSS) sector. It connects three previously disconnected provider sectors with beneficiaries through a shared, trusted digital layer — acting as financial rails for the sector rather than a marketplace. Includes role-based cabinets (donor, provider, beneficiary, admin) and public-facing pages about the program, partners, and specialists.

See `docs/` for the master context, glossary, and project status docs.

## Tech Stack
- **Frontend**: React + Vite, wouter for routing, TanStack Query, Tailwind + shadcn/ui, Framer Motion
- **Backend**: Express (TypeScript, run via `tsx`), Passport (local strategy, scrypt password hashing), express-session with PG-backed store
- **Database**: PostgreSQL via Drizzle ORM (`drizzle-kit push` to sync schema)
- **Language**: Ukrainian-language UI (public site + cabinets)

## Running the Project
- `npm run dev` starts the Express server (serves the Vite dev server in middleware mode) on port 5000 — bound to the "Start application" workflow.
- `npm run build` builds the client and bundles the server for production; `npm start` runs the production build.
- `npm run check` runs the TypeScript compiler.
- `npm run db:push` pushes the Drizzle schema to the database.
- Requires `DATABASE_URL` (already provisioned) and `SESSION_SECRET` (set) as environment secrets — the server fails fast at startup if either is missing.

## User Preferences
None recorded yet.
