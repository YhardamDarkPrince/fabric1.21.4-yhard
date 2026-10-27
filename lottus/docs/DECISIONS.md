# Decisions (ADRs)

1. **Preserve the existing repository.** The attached request introduces a web product into a Java plugin repository. Place all web implementation in `lottus/`; do not replace existing source or setup.
2. **Modular monolith.** Next routes, pg domain modules and one worker share a database. This keeps atomic licensing invariants simple. No unnecessary microservices.
3. **Typed SQL rather than Prisma.** Small explicit migrations, parameterized pg calls, transaction boundaries visible at fulfillment and activation. Zod validates route inputs. Database rows require further typed mapping before expanding administration.
4. **openid-client instead of Auth.js.** Direct standards-based maintained library provides discovery, PKCE, token validation and code-grant checks with a minimal opaque session store. No password identity, refresh token store or email linking. Local logout implemented; federated logout remains unvalidated.
5. **PostgreSQL inbox/outbox.** No extra queue dependency. Webhook acknowledgement follows durable insert; jobs use leases and row locks. Outbox dispatch and reconciliation remain separate unfinished delivery work.
6. **No commercial inventions.** Three examples are unapproved seeds; all sales remain disabled. No device default, Cloud plan, quota, legal refund deadline or per-seat price. Lack of configuration is explicit, never silently mocked.
7. **Permanent offline receipt.** Reference receipt preserves local use without periodic paid renewal. Previously issued receipts remain valid offline after server revocation. Key rotation preserves existing activations. A full keyring and challenge-response protocol remain required before desktop integration.
8. **Localization.** Five explicit dictionaries, exact equivalent routes, locale cookie, canonical/hreflang. Search folds diacritics and uses substring matching for Japanese. No stemming or semantic search. Legal content is marked as preparation, not approved translation.
9. **Original artwork.** Editable temporary lotus wordmark and code-native SVG concepts. No third-party product screenshots, invented users, metrics, reviews or shipped releases.
