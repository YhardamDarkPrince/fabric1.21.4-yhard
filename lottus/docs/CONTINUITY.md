# Continuity

The master prompt is staged outside Git under inputs/coding-agent-attachments. This implementation lives entirely in lottus/ plus a root GitHub workflow; the Java plugin is untouched.

Current public preview: npm start (standalone production bundle) on port 3000, registered as lottus-web. PostgreSQL 17 is running locally in Docker `lottus-db`, using the task-local daemon socket. `.env.local` contains local generated secrets, never tracked. The extra lottus_test database contains only synthetic tests. The tagged Stripe emulator runs on port 4100 with ephemeral state. Stop/restart only task-owned services.

Working public areas: home, eleven app detail pages, suite, filter/search, demonstration price selector, downloads availability, Cloud planning, empty community tabs, docs/search/topics, developer API links, FAQ, legal preparation states, account connection state; five route locales. Identity authentication code exists but the actual NAJA discovery was not reachable and no client was provided. Never add fake login as a workaround.

Next engineering priorities: complete real NAJA login/logout/step-up validation; Asaas billing/customer/Pix/hosted-card adapter and exact decimal money; actual application checkout integration test against Stripe sandbox; reconciliation/outbox SMTP/alerts; keyrings and offline challenges; approved release artifacts and S3 pipeline; safe community upload/moderation; editable CMS and full admin workflows; support tracking; privacy workflow and complete production restore/Compose acceptance.

A schema row, API stub, disabled state or README paragraph is not completion evidence. Read ACCEPTANCE.md and the workspace validation record before choosing the next checks. The original request explicitly requires the full platform, not only a landing page; substantial backend/module work remains and is documented without marking it complete.
