# Architecture

The application is an independent modular Next.js 16.4.3 / React 19.3.1 / Node 24 project in `lottus/`. The original Java repository is preserved. Strict TypeScript; PostgreSQL via parameterized pg queries and versioned SQL migrations. Browser code cannot import provider credentials or database modules. UI content is centralized in `src/lib/i18n.ts`, `catalog.ts`, `docs.ts` and `account-i18n.ts`.

## Boundaries

- Identity: openid-client Authorization Code + PKCE + state + nonce, verified tokens, encrypted 10 minute flow cookie, opaque server-side sessions (only token hashes persisted), JIT identity by issuer+subject. No password store or automatic email linking.
- Catalog: eleven stable IDs, localized descriptions, all in development. Original SVG concept artwork is never represented as a desktop screenshot.
- Commerce: PostgreSQL price snapshots, capability and price approval gates, authenticated owner fixed server-side, idempotent Stripe checkout creation. Localized demonstration price cards are deliberately not sale offers.
- Licensing: paid order transaction locks, unique entitlement per user and purchase, unique current credential, AEAD ciphertext with entitlement AAD, separate keyed fingerprint, append-only audit, durable notification outbox.
- Activation: row lock on suite entitlement, device uniqueness across apps, configurable device limit with no invented default, Ed25519 JWS receipts with kid/schema/suite scope. Receipt has no expiry; offline revocation cannot be immediate. Device deactivation affects future server activation, never erases projects.
- Worker: durable PostgreSQL inbox, lease recovery, SKIP LOCKED, backoff and dead letter. Provider state is re-fetched before granting. No browser return parameter grants a license. Notifications are enqueued but delivery is not implemented.

## Explicitly incomplete modules

Asaas customer/Pix creation, checkout recovery UI, full provider refund/dispute policy, provider reconciliation scheduler, SMTP delivery, offline challenge-response, signing/encryption keyring rotation, S3/R2 uploads and manifest publication, package quarantine inspection/moderation workflow, content CMS/history UI, full admin mutation panels, Cloud team APIs and support tracking UI are not complete. Tables and disabled UI states do not mean these behaviors are implemented. See ACCEPTANCE.md before deployment.

All local tests use synthetic data. No production provider or customer data is accessed. The Stripe emulator supports a narrower checkout shape than the production adapter; integration tests use pre-created prices for provider contract checks, not as proof the inline-price application flow passed end to end.
