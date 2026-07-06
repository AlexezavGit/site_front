---
name: Figma access from sandbox vs bash
description: FIGMA_ACCESS_TOKEN environment secret is not accessible from the code_execution sandbox; use bash/node directly.
---

`FIGMA_ACCESS_TOKEN` is set as an environment secret and works correctly when calling the Figma API via `bash` (e.g. `node` script invoked through the bash tool). It is NOT accessible inside the `code_execution` tool's sandbox environment (separate Node.js notebook) — calls there fail to see the secret.

**Why:** the code_execution sandbox is a separate execution environment from the main project's shell/process environment, so project env vars set via the environment-secrets skill don't propagate into it.

**How to apply:** for any task requiring Figma API access (or other project-scoped secrets), write and run a small Node script via the `bash` tool, not via `code_execution`.
