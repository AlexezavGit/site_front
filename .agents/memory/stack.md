---
name: Stack and dev server conventions
description: Critical runtime/build setup that must not be changed
---

## Rule
- Dev command: `node_modules/.bin/tsx server/index.ts` — do NOT change to ts-node or anything else.
- Port: 5000 (Express) + Vite proxy on same port.
- Never edit package.json scripts without explicit user approval.
- Frontend env vars must use `import.meta.env.VITE_*`, not `process.env`.

**Why:** Replit environment is pre-configured; deviating breaks the workflow.
