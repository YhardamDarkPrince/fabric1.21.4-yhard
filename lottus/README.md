# LOTTUS Creative Services

A Portuguese-first, five-language creative suite portal built with Next.js 16, TypeScript and PostgreSQL. The eleven applications are in development. No real sales or downloads are enabled.

## Run

```sh
npm ci
cp .env.example .env.local
# Configure PostgreSQL and independent local keys as described in docs/OPERATIONS.md
npm run db:migrate
npm run dev
```

Open http://localhost:3000. Public pages can be explored without identity/payment credentials. The account flow uses NAJA ID only; no mock password/login or automatically granted license is provided.

```sh
npm run typecheck
npm test
npm run build
npm start
```

For database integration tests create an isolated `lottus_test` database, set DATABASE_URL accordingly in `.env.test.local`, migrate it with `node --env-file=.env.test.local --import tsx scripts/migrate.ts`, and run `npm run test:integration`. The test database guard prevents tests from using the main database. Optional Stripe emulator requires STRIPE_API_BASE and a synthetic test key, see OPERATIONS.

## Included

Responsive Dracula-inspired interface, original SVG concept artwork, localized catalog/detail pages, search/category filters, locale-preserving navigation, demonstration pricing by billing country, releases/community/Cloud availability states, searchable localized documentation, FAQ, NAJA OIDC code flow, private account/key/device APIs, PostgreSQL schema, transactional idempotent licensing, signed activation receipts, durable webhook inbox worker, basic admin overview and deployment scaffolding.

## Delivery status

This is a working portal and a tested foundation for the licensing domain. It is **not the complete production platform described in the master prompt**. Integrations and mandatory behaviors that remain incomplete are explicitly tracked; do not infer completion from schema tables, a successful frontend build or a disabled UI.

- [Architecture](docs/ARCHITECTURE.md)
- [Decisions](docs/DECISIONS.md)
- [Security](docs/SECURITY.md)
- [Integration and operations](docs/OPERATIONS.md)
- [Acceptance matrix](docs/ACCEPTANCE.md)
- [Continuity](docs/CONTINUITY.md)
- [Asset licenses](docs/ASSETS.md)
- [Public OpenAPI](public/openapi.json)

The original MCreator plugin outside this directory is preserved. No Java build or behavior was changed.
