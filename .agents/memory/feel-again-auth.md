---
name: Feel Again auth pattern
description: Email+password auth pattern for FEEL Again, and hard secret requirements
---

Email+password auth with role-based cabinet access; scrypt + passport-local + PG-backed sessions (`connect-pg-simple`).

`server/auth.ts`'s `setupAuth` fails fast if `SESSION_SECRET` is unset (mirrors `server/db.ts`'s `DATABASE_URL` check) — no hardcoded dev fallback. `SESSION_SECRET` and `DATABASE_URL` must both be present as secrets for the app to boot.

**Why:** an earlier import had a hardcoded `SESSION_SECRET` fallback, which silently weakens session signing if the secret is ever missing.

**How to apply:** when re-importing or forking this project, always provision both secrets before expecting the server to start; don't reintroduce a fallback default.
