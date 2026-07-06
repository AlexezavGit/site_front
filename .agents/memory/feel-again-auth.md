---
name: Feel Again auth pattern
description: How email+password auth and role-based cabinet access is implemented in this project
---

Auth uses the standard Replit fullstack pattern: `passport-local` + `express-session` + `connect-pg-simple` (session table auto-created), password hashing via Node's built-in `crypto.scrypt` (not bcrypt, to avoid native compile issues).

**Roles vs. users:** `users` table holds one login identity (username/email/password/name). Role assignment (provider/beneficiary/donor/supervisor) is a separate `userRoles` join table, not a column on `users` — a user can hold multiple roles later even though registration only asks for one role today.

**Why:** cabinets (Provider/Beneficiary/Donor/Auditor=Supervisor) are gated per-role, and the org wants room to let one person hold more than one role without a schema change.

**How to apply:** client `ProtectedRoute` component checks `user.roles.some(r => r.role === requiredRole)` and redirects to `/portal` (the role-selection gateway) if the logged-in user lacks the role for a given cabinet route, or to `/auth` if not logged in at all. New cabinet types should follow the same `role` prop pattern on `ProtectedRoute`, not ad hoc checks in each cabinet page.
