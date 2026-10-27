# Setup, integrations and operations

## Local web

Node 24; `npm ci`; copy `.env.example` to `.env.local` and fill the database and independent local encryption secrets. Start PostgreSQL 17, then `npm run db:migrate`, `npm run dev`. The portal runs on http://localhost:3000. Public pages work without external credentials, and unavailable integrations are clearly labeled. `npm run build && npm start` runs the production bundle locally.

The task sandbox database uses a task-local Docker socket and host networking, bound to 127.0.0.1. It uses trust auth exclusively for disposable synthetic data; never copy that configuration to a server. Normal deployment uses the password-protected Compose database.

## NAJA ID / ZITADEL

Create a separate development OIDC web client in the existing NAJA ID deployment. Do not reinstall ZITADEL or change global policies. Issuer discovery must succeed at `<OIDC_ISSUER>/.well-known/openid-configuration`; the supplied `https://auth.najacorp.com` was unreachable from this sandbox. Fill exact client ID and client secret from the identity administrator. Configure Authorization Code, PKCE S256 and `openid profile`; no email dependency or offline_access required. Development callback: `http://localhost:3000/api/auth/callback`. Production callback: `${PUBLIC_URL}/api/auth/callback`, with exact approved HTTPS origin. The implementation checks state/nonce/issuer/audience/signature through openid-client. Local logout is POST `/api/auth/logout`, with trusted Origin. Federated logout needs provider support validation; no fake provider logout endpoint is invented. Buyer roles are not trusted from arbitrary profile fields. The admin role must be assigned separately by an audited server process; no default admin exists.

## Stripe

Use a test-mode account first, set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET. Register `/api/webhooks/stripe` for checkout completion, async success/failure, expiry, refunds and disputes. Raw-body signatures and livemode/environment checks are enforced. Checkout is `mode=payment`, price selected server-side. Webhooks persist before acknowledgement. Worker refetches the checkout and compares provider ID/amount/currency/environment/order. `npm run worker` uses `.env.local`. Refund/dispute events require review because policy is not approved. Sales must not be enabled until complete acceptance evidence and release/legal approval exist.

For local synthetic provider checks the tagged CodeRabbit Emulate v0.0.1 source was built with the provided checksum, Node24/pnpm11. Its internal CLI reports v0.10.0. Start `node "$HOME/runtime/emulate/v0.0.1/dist/index.js" start --service stripe --port 4100`, then point only the application test process at STRIPE_API_BASE=http://127.0.0.1:4100 with a synthetic key. This override is rejected for production. The catalog has no Asaas or ZITADEL; other identity providers do not prove NAJA interoperability. State is in-memory. No provider credentials are reused.

## Asaas

ASAAS_API_KEY and ASAAS_WEBHOOK_TOKEN are distinct. The token header is `asaas-access-token`, compared in constant time. API base is selected by PAYMENT_ENV: `https://api-sandbox.asaas.com/v3` or `https://api.asaas.com/v3`. PIX grant policy in the reference worker requires authoritative RECEIVED state and billingType PIX, not CREATED or CONFIRMED alone. Customer creation, verified billing, QR generation/recovery and hosted card flow remain incomplete; Brazil checkout returns a stable blocked code. Never enable BR sales until the full sandbox flow and decimal-money mapping are implemented and verified.

## R2/S3, SMTP and release publication

Environment slots are reserved, but storage upload, signed release manifests, package quarantine, retention and SMTP delivery are not wired. Do not publish or promise available binaries, backups or Cloud plans. The outbox safely retains license_available jobs while email delivery is unavailable. Fulfillment does not depend on email.

## Deployment

`POSTGRES_PASSWORD=<local-secret> docker compose config -q`; then `docker compose up --build -d`. Set DEPLOYMENT_ENV deliberately and honor all production gates. Compose includes web, migrations, worker and PostgreSQL; object storage/mail are not provisioned because those adapters remain incomplete. No official domain was invented.

Put a trusted TLS reverse proxy before the loopback web port, preserve Host and X-Forwarded-Proto only from that proxy, and configure PUBLIC_URL to the exact public origin. Suggested Caddy template: `{$LOTTUS_DOMAIN} { reverse_proxy 127.0.0.1:3000 }`. Do not expose PostgreSQL or the worker. Full VPS/Compose production deployment has not been executed in this sandbox.

## Backup / restore / rollback

Stop writers or take a consistent pg_dump snapshot; back up object artifacts (once integrated) and all encryption/lookup/signing keys separately with access restrictions. Restore into a separate database and verify orders, entitlements and decryptability before switching. Example: `pg_dump -Fc "$DATABASE_URL" > backup.dump`, `createdb lottus_restore`, `pg_restore --dbname "$RESTORE_DATABASE_URL" backup.dump`. Database-only restore does not recover credentials without their keys. Never print the keys or populated connection strings.

Rollback web and worker together to a compatible image. Migrations are additive, explicitly versioned and applied once; do not delete financial rows or run destructive rollback SQL. Monitor inbox pending/processing/dead_letter/review_required, paid-without-entitlement, duplicate_review, stopped outbox and auth/activation failures. Reconciliation, alerts, pruning, replay UI and SMTP retry delivery remain outstanding.
