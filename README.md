# Shopify Winning Products

**Evidence-first product opportunity intelligence for Shopify merchants, built with a South African lens.**

The product is deliberately not a generic “winning products” list. The market is crowded — Shopify’s South Africa dropshipping category currently contains roughly 590 apps, including products already positioning around AI product research and winner discovery. citeturn0search4turn0search0

Our differentiation is **explainable opportunity intelligence**:

- evidence before score
- confidence and data freshness
- demand and momentum signals
- competition opportunity rather than a raw saturation penalty
- ZAR landed-cost and margin modelling
- shipping and fulfilment friction
- South African market fit
- transparent score breakdown
- watchlist and product-decay alerts on the roadmap

## Product thesis

Every opportunity should answer four questions:

1. **Is there evidence people want this?**
2. **Is the opportunity still moving?**
3. **Can a merchant make realistic money after costs?**
4. **Does the product make sense for South African customers and fulfilment?**

The app must never manufacture market numbers or present an estimate as an observed fact.

## Current foundation

- Next.js 16.3.4 + React 19.3.0 foundation.
- Shopify App Bridge script integrated into the application shell.
- Responsive premium dashboard shell with evidence-first empty states.
- Explainable 0–100 opportunity scoring engine.
- Confidence scoring based on source diversity, evidence quality and freshness.
- ZAR commercial model with supplier cost, shipping, import costs, payment/platform costs and gross-margin calculation.
- South Africa-specific opportunity domain model.
- Vitest unit tests for scoring and commercial calculations.
- GitHub Actions quality workflow for typecheck, tests and production build.

## Shopify architecture target

The application will follow current Shopify requirements: embedded admin experience, latest App Bridge, GraphQL Admin API for new public-app functionality, and session-token-based authentication. Shopify currently documents Admin GraphQL 2026-07 as the latest stable API version. citeturn0search13turn0search12

Authentication and merchant data will remain server-side. Secrets will never be shipped to browser code. Webhooks will be verified server-side and implemented idempotently.

## Data model principles

Raw evidence, normalized metrics, merchant assumptions and model scores remain separate. Every recommendation should retain:

- source and attribution
- observation timestamp
- freshness
- evidence quality
- confidence
- commercial assumptions
- market assumptions
- score breakdown

## South Africa first

The commercial model uses **ZAR** and is designed to account for:

- VAT treatment
- supplier price
- shipping
- estimated duties/import costs
- payment/platform costs
- target selling price
- delivery-time bands
- local supplier availability
- local demand
- price sensitivity
- local seasonality

## Development status

**Foundation phase complete.** Next implementation phase: real Shopify authentication, persistent merchant/session storage, GraphQL data service, product-opportunity ingestion adapters, database migrations, dashboard data loading, watchlists, webhooks and App Store readiness.

The app is not yet claimed to be production-deployable or App Store-ready until those integrations and automated checks are actually implemented and verified.
