# Premium Quality Gate

This project is intended to be a production-grade Shopify app, not a prototype.

## Platform compliance

- Embedded Shopify Admin experience.
- Latest Shopify App Bridge.
- Session-token based embedded authentication; no dependency on third-party cookies or localStorage for auth.
- GraphQL Admin API for new public-app functionality. REST is not used for new business logic.
- Least-privilege scopes only.
- Shopify webhooks verified server-side.
- Shopify checkout remains the source of truth for commerce transactions.

## Product intelligence quality

Every product opportunity must expose evidence, not just an AI-generated score:

1. Demand signal
2. Momentum / trend signal
3. Competition signal
4. Estimated landed-cost and margin signal
5. Shipping friction
6. Seasonality
7. South African market fit
8. Confidence level
9. Data freshness timestamp
10. Source attribution

A score without evidence is never presented as a guaranteed winner.

## South Africa first

The product model must support ZAR, VAT-aware calculations, local shipping friction, import/duties assumptions, supplier location, delivery-time estimates, and South African market-fit signals. These are decision inputs, not claims of guaranteed profitability.

## UX standard

- Fast first meaningful render.
- Clear loading, empty, error and retry states.
- Keyboard accessible.
- Responsive inside Shopify Admin.
- No dead-end screens.
- No fake metrics or fabricated supplier data.
- Destructive actions require explicit confirmation.
- Premium visual hierarchy without unnecessary animation.

## Engineering standard

- TypeScript strict mode.
- Runtime validation at external boundaries.
- Secrets only on the server.
- No credentials committed to Git.
- Idempotent webhook processing.
- Cursor pagination for Shopify connections.
- Cost-aware GraphQL queries.
- Retry/backoff for transient API failures.
- Automated tests for scoring and critical business logic.
- CI must run lint, typecheck and tests before release.

## App Store readiness

Before submission, verify the current Shopify App Store requirements, privacy requirements, data retention/deletion requirements, merchant-facing UI requirements, billing configuration, webhook handling, and Built for Shopify criteria.
