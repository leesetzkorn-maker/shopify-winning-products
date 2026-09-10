# Architecture

## Target stack

- TypeScript
- Next.js App Router
- Shopify embedded app using App Bridge
- Shopify Admin GraphQL API
- PostgreSQL
- Prisma ORM
- Background jobs via a queue-compatible worker layer
- Vitest for unit tests
- Playwright for end-to-end tests

## Repository structure

```text
app/
  api/
  auth/
  dashboard/
  products/
components/
lib/
  scoring/
  shopify/
  data/
prisma/
docs/
tests/
```

## Request flow

```text
Shopify Admin
   -> Embedded App
   -> Server route
   -> Shopify authentication/session validation
   -> Domain service
   -> Database and/or Shopify Admin GraphQL
   -> Typed response
   -> UI
```

## Data pipeline

```text
External signals
   -> raw_signal
   -> normalization
   -> product_signal
   -> opportunity_score
   -> recommendation
```

Never mix raw provider data directly into UI scoring logic.

## Shopify API policy

Use Admin GraphQL for new business logic. Keep API access on the server. Use cursor pagination and select only required fields. Large datasets should use Shopify bulk operations rather than repeatedly paging thousands of records where appropriate.

## Authentication policy

Use Shopify's current supported embedded-app authentication approach. Tokens/session data are server-side only. Browser code receives application data, not Shopify client secrets or raw Admin API credentials.

## Scoring service contract

The scoring engine should be deterministic for the same input snapshot.

```ts
export interface OpportunityInputs {
  demand: number;
  momentum: number;
  competition: number;
  marginPotential: number;
  shippingFriction: number;
  seasonality: number;
  marketFit: number;
}

export interface OpportunityScore {
  score: number;
  tier: 'HIGH_OPPORTUNITY' | 'PROMISING' | 'NEEDS_VALIDATION' | 'HIGH_RISK';
  reasons: string[];
}
```

## Observability

Every external signal fetch should be traceable by provider, timestamp, status and data freshness. Recommendation scoring should expose enough metadata to reproduce why the app reached a conclusion.

## Deployment principles

- Production secrets only through platform secret management.
- Separate development and production databases.
- Database migrations reviewed before deployment.
- CI must run typecheck, lint, unit tests and build.
- No production deployment from an unreviewed local-only change.
