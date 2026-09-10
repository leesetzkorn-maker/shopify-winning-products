# Shopify Winning Products

Production-ready Shopify app foundation for **product opportunity intelligence** with a South African merchant focus.

## Product thesis

This app should not be another static "winning products" list. It will score product opportunities using a transparent opportunity model that combines:

- demand signals
- trend momentum
- competition intensity
- estimated selling price
- estimated landed cost and margin
- shipping friction
- seasonality
- South African market fit
- confidence / evidence quality

## Initial product direction

### Opportunity Score

Every product candidate will receive a 0–100 score with an explanation of *why* it scored that way.

### South Africa Lens

The roadmap prioritizes signals useful to South African merchants, including:

- ZAR pricing
- VAT-aware margin calculations
- local shipping considerations
- local demand and seasonality
- supplier/landed-cost inputs
- import-risk and delivery-time considerations

### MVP dashboard

1. Opportunity feed
2. Product detail + score breakdown
3. Saved products/watchlist
4. Store profile and target margin settings
5. Shopify product import/create workflow

## Architecture target

- Shopify embedded app
- Modern Shopify authentication
- Shopify Admin GraphQL API
- Server-side data services
- Relational database for merchants, stores, product signals and scoring snapshots
- Background jobs for signal refreshes
- Explicit separation between raw signals, normalized metrics and recommendation scores

## Security principles

- Secrets remain server-side.
- No Shopify API secret in browser code.
- Least-privilege Admin API scopes.
- Verify Shopify webhook authenticity.
- Validate and normalize all external data before scoring.
- Do not treat a single trend source as proof of product viability.

## Development status

Repository initialized. Next steps are the application scaffold, authentication, data model, scoring engine, dashboard, CI checks and deployment configuration.
