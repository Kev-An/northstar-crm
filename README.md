# Northstar CRM

A reusable CRM starter and portfolio demo for sales teams. The first slice includes a responsive overview dashboard, seeded records, searchable contacts/leads/companies/deals, a deal pipeline, activity timeline, CSV export, and working contact/deal creation dialogs.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The current demo uses in-memory state and resets on page reload. It does not yet include authentication, database persistence, or multi-tenant enforcement.

## Project structure

- `src/config/brand.ts` — white-label name, workspace, tagline, and accent color.
- `src/lib/demo-data.ts` — typed starter records and shared CRM formatting helpers.
- `src/components/crm-shell.tsx` — navigation, page views, demo interactions, and record forms.
- `src/app/globals.css` — design tokens, responsive layout, components, and theme styling.

## Product direction

Keep the initial system a modular monolith. Before using real customer data, add PostgreSQL, versioned schema migrations, server-side tenant authorization, authentication and workspace roles, audit events, and a job queue for imports/exports and notifications. Every tenant-owned record should carry a workspace ID, with workspace scoping enforced by the application and reinforced by database policies where appropriate.

Keep client-specific branding and feature choices in configuration. Add vertical-specific data through focused extensions and migrations instead of scattering client checks through shared screens.

## Next milestones

1. Persist organizations, memberships, contacts, companies, deals, and activities in PostgreSQL.
2. Add authentication, invitations, tenant isolation, and permission-aware actions.
3. Complete record detail pages, saved views, CSV import, and audit history.
4. Add background jobs, observability, and deployment configuration.
