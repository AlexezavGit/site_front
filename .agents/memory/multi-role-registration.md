---
name: Multi-role registration
description: All new users get all 4 roles on registration; how username is auto-generated.
---

# Multi-Role Registration Pattern

## The Rule
Every user registered via `POST /api/register` gets ALL 4 roles simultaneously:
`["donor", "provider", "beneficiary", "supervisor"]`

**Why:** Demo mode — every viewer who registers should access all 4 cabinets immediately without additional setup. The `isPrimary` flag is set on the role matching the optional `role` field in the request (defaults to "donor").

## Implementation (server/routes.ts)
```typescript
const allRoles = ["donor", "provider", "beneficiary", "supervisor"] as const;
await Promise.all(
  allRoles.map((r) =>
    storage.createUserRole({ userId: user.id, role: r, isPrimary: r === role })
  )
);
```

## Username Auto-Generation
If username field is empty string (client default):
```typescript
const base = userData.email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "_");
userData.username = `${base}_${Date.now().toString(36)}`;
```

## Schema
`shared/schema.ts` registerUserSchema:
- `username`: optional, default "" (empty triggers auto-generation server-side)
- `password`: optional, default "feel-again-demo" (overridden by demo auth gate)
- `role`: optional, default "donor"

## Existing Users
Test user (id=1, username=test) had roles added manually:
```sql
INSERT INTO user_roles (user_id, role, is_primary) VALUES (1,'provider',false),(1,'beneficiary',false),(1,'supervisor',false) ON CONFLICT DO NOTHING;
```
