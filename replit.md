# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Project: EduEquity India

A full-stack informational website about Education for Unprivileged Communities in India. Features data visualizations, case studies, barriers, interventions, funding mechanisms, and a donation/contact form.

### Artifacts
- **edu-india** (React + Vite, path `/`) — Frontend website with 7 pages
- **api-server** (Express 5, path `/api`) — Backend serving all education data

### Frontend Pages
- `/` — Hero with animated stats, navigation to all sections
- `/overview` — Scope & demographics with dropout rate bar chart and enrollment line chart
- `/barriers` — 11 detailed educational barriers by category and severity
- `/interventions` — 10 evidence-based interventions by education level
- `/case-studies` — 10 real India case studies with costs and outcomes
- `/funding` — 6 funding mechanisms with examples and scale
- `/get-involved` — Donation pledge form + volunteer/partner contact form

### Database Tables
- `donations` — Donation pledges (name, email, amount, currency, message)
- `contacts` — Contact/volunteer inquiries (name, email, subject, message, type)

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
