---
name: Demo auth gate
description: How the passwordless demo auth is gated; required for production safety.
---

# Demo Auth Gate

## The Rule
Password bypass (any password accepted) is ONLY active when `DEMO_AUTH=true` is set as an environment variable.

**Why:** The platform captures real audience emails during demo sessions. Removing password friction increases registration rate. But the bypass must be fail-closed — if DEMO_AUTH is unset or false, full scrypt comparison runs.

## Implementation (server/auth.ts)
```typescript
const isDemoMode = process.env.DEMO_AUTH === "true";

// Inside LocalStrategy:
if (isDemoMode) {
  return done(null, user);  // any password accepted
}
if (!(await comparePasswords(password, user.password))) {
  return done(null, false, { message: "Невірний логін або пароль" });
}
```

## How to Apply
- Development/demo: set DEMO_AUTH=true in Replit Secrets/env vars (currently set in shared environment)
- Production deployment: do NOT set DEMO_AUTH — omitting it automatically enforces real password check
- Login also accepts email as username (lookup by username first, then by email fallback)
