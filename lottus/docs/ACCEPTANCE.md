# Acceptance and requirement evidence

Date: 2026-10-27. The master prompt defines a full platform, not just the public website. **The complete acceptance criteria have not all been achieved. This delivery must not be represented as production-ready.**

## Implemented and locally verified

- Responsive public portal with eleven product detail routes, search and category filters; original Dracula-inspired identity and conceptual visuals.
- Five localized route families and core content dictionaries; equivalent page switching and browser-persisted locale, independent billing country examples.
- PostgreSQL migrations with unapproved sample markets, separate identity/order/attempt/entitlement/credential/device/activation/inbox/outbox/audit models.
- Transactional licensing, authenticated encryption and lookup fingerprint; per-suite device counting and asymmetric receipt verification.
- Server-only ownership queries and role authorization foundation; shared limits on key/device APIs.
- Signature/token-authenticated durable webhook ingress and retrying inbox worker foundation. Partial Stripe SDK checks with the tagged local emulator, not official sandbox proof.
- No fabricated release, artifact, testimonial, purchase, Cloud backend or automatically granted login license.

## Master prompt acceptance matrix

| # | Required behavior | Implementation | Evidence / remaining work |
|---|---|---|---|
|1|Real NAJA login/logout, PKCE/session|openid-client auth routes, opaque sessions|BLOCKED: issuer unreachable, no client; federated logout/real run outstanding|
|2|Identity persists through email changes|issuer+subject unique, no email linking|PASS PostgreSQL identity test using synthetic names/emails|
|3|A cannot inspect B|Owner-scoped private queries, central role check|PASS key isolation domain test; full authenticated direct-route penetration tests outstanding|
|4|Five-language navigation/core flow|Dictionaries and equivalent localized routes|Public navigation implemented; real auth/commerce flow unvalidated|
|5|English + Brazil independent policy|Country selector separate from locale, server region|Demo UI can select BR in English; live BR checkout incomplete|
|6|Browser cannot set authoritative price|Strict checkout input + approved DB snapshot|Gate test passes; full provider tamper tests outstanding|
|7|Login never grants key|JIT identity separate from fulfillment|PASS no-license fixture and identity test|
|8|Stripe sandbox paid => one license/key|Provider adapter and fulfillment|Domain concurrency PASS; official sandbox and full app checkout not validated|
|9|Pending never grants; later confirmed grants|Worker paid state check|Reference code exists; async provider integration outstanding|
|10|Invalid Stripe signature rejected|SDK raw-body verification|PASS synthetic header alteration test, not external sandbox|
|11|Asaas sandbox Pix QR and confirmation|Token inbox + API reference worker|INCOMPLETE customer/billing/payment creation and QR UI; sandbox credentials absent|
|12|Asaas token distinct and checked|Constant-time token header validation|Implemented; real endpoint/sandbox tests outstanding|
|13|Concurrent duplicate events|Unique inbox namespace + transactional unique grants|PASS eight concurrent fulfillment calls, one entitlement/key/outbox|
|14|Out-of-order events|Paid terminal state guard|Foundation; full dispute/refund reconciliation outstanding|
|15|Checkout timeout recovery|Stable attempt Stripe idempotency key|Implemented; real timeout test and recovery UI outstanding|
|16|Forged return never grants|Return URL not read for grant|By design; authenticated browser test outstanding|
|17|No browser return needed|Worker grants from provider-confirmed inbox|Reference implementation; full end-to-end worker validation outstanding|
|18|Worker restart preserves grants/email|Durable inbox leases/outbox|Schema implemented; SMTP dispatch and crash/restart test incomplete|
|19|Failed inbox insert not acknowledged|await durable insert before 200|Implemented; fault injection route test outstanding|
|20|Reconciliation without webhook|Not implemented|INCOMPLETE scheduler and provider reconciliation|
|21|Persistent recoverable keys/no cache|AEAD ciphertext, no-store routes|PASS DB reveal/ciphertext tests; full backup/key restore evidence outstanding|
|22|Rotate preserves entitlement|Locked rotation, history and audit|PASS entitlement preserved, old key rejected, existing device retained|
|23|Two apps, one device slot|Device unique per entitlement/public key|PASS PostgreSQL activation test|
|24|Offline receipt tamper/scope|Ed25519 JWS kid/schema/suite scope, verifier CLI|PASS signature/tamper/scope tests; challenge-response not implemented|
|25|Atomic concurrent device limits|Entitlement row lock + explicit configured limit|Same-device/new-limit PASS; dedicated concurrent new-device test outstanding|
|26|Cloud refund not suite revocation|Separate Cloud entities, no generic revoke handler|Refund decision engine not implemented; events held for review|
|27|Duplicate purchase resolution|Marks duplicate_review, queues review|Implemented foundation; resolution/reimbursement workflow incomplete|
|28|Plugin quarantine/traversal/zip-bomb|Upload disabled; quarantine schema only|INCOMPLETE scanner/manifest/archive pipeline; no claim of malicious upload test|
|29|Role segregation/self-promotion|Server role lookup, no profile role assignment|Admin status read-only route; full mutations/RBAC acceptance incomplete|
|30|Searchable catalog/docs/version states|Client filtering, localized guides, development states|Catalog search checked; full docs/CMS version publishing incomplete|
|31|No false releases, hash/manifest|No public artifacts or fake downloads|Unavailable state correct; upload/hash/signed manifest pipeline incomplete|
|32|Cloud cannot sell absent backend|No checkout/approved plans|Disabled public page/API; real backend absent|
|33|Cloud cancellation preserves suite|Separate data models, no Cloud revocation coupling|Cancellation/export/retention workflow incomplete|
|34|Keyboard/mobile/accessibility|Responsive menu, focus, reduced motion, semantic links|Browser verification and axe recorded in workspace validation record|
|35|Isolated full backup recovery|Operations procedure provided|PASS isolated PostgreSQL dump/restore recovered the same order, entitlement and key digest using separately retained encryption keys; object artifact restore remains incomplete|
|36|Production Compose|Multi-stage images + web/worker/db/migration Compose|Local standalone Next production build/start PASS and Compose syntax PASS; full Compose deployment not verified|
|37|Reject production mocks/defaults|Explicit deployment-env assertion/HTTPS/no overrides|Implemented guard; complete runtime/secret policy tests outstanding|

## External configuration and owner decisions

NAJA issuer reachability/client registration, provider sandbox credentials, live merchant approvals, approved commercial policies/terms/tax treatment, device limits, Cloud prices/quotas/backend/retention, production domain, S3/R2 bucket and SMTP delivery are not supplied. They are separate from the unfinished engineering listed above. No real charge is authorized by the sample prices.

## Validation categories

- **Implemented:** public portal and licensing foundation described above.
- **Validated in local tests:** see named tests and workspace validation record, including failures corrected during development.
- **Validated in official provider sandbox:** none.
- **Blocked by credentials:** real NAJA/Stripe/Asaas flows.
- **Awaiting commercial decisions:** real prices, tax/refunds, device limits, Cloud quotas/plans, legal publishing.
- **Not yet implemented:** explicitly listed module work; it is not solely a credentials blocker.
- **Ready for production:** no.
