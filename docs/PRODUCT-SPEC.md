# Product Specification

## Working name

**Winning Products Intelligence**

## Core problem

Most product-research tools present large lists of products and weak, opaque "winning product" labels. Merchants still have to decide whether demand is rising, whether competition is manageable, whether a product can be sold profitably, and whether the product makes sense in their market.

## Differentiation

The app will optimize for **decision quality**, not list size.

A recommendation should answer:

> "Is this product worth testing in my store, at my target price, in my market, and why?"

## Opportunity score v1

The score is intentionally explainable:

- Demand: 25%
- Momentum: 15%
- Competition: 15%
- Gross-margin potential: 20%
- Shipping/fulfillment friction: 10%
- Seasonality: 5%
- Market fit: 10%

The weighted model is a starting point, not a claim of statistical truth. We will calibrate the weights using observed merchant outcomes.

## Evidence model

Each signal should store:

- source/provider
- observed_at
- geographic scope
- confidence
- raw value
- normalized value
- freshness

The scoring engine must distinguish between measured signals and estimates.

## South Africa first

Default merchant settings:

- currency: ZAR
- VAT mode: configurable
- target gross margin: configurable
- shipping region: South Africa
- delivery-time tolerance: configurable

The product should support global markets later without hard-coding South Africa into the scoring engine.

## MVP

### Must ship

- Shopify installation/authentication
- embedded dashboard
- merchant onboarding
- store economic settings
- product opportunity feed
- score explanation
- product detail page
- save/watchlist
- import/create selected products in Shopify
- background refresh architecture
- audit-friendly signal records

### Explicitly out of scope for MVP

- AI-generated ad creatives
- social-media auto-posting
- multi-supplier marketplace integrations
- automatic paid-ad bidding
- mobile app
- complex forecasting models

## Success metrics

Primary:

- percentage of installed merchants who save at least one opportunity
- percentage who import/test a recommended product
- 30-day retained merchants

Secondary:

- time from install to first saved product
- score-to-test conversion
- recommendation feedback rate
- recommendation accuracy after enough outcome data exists

## Product principle

Never call a product "guaranteed winning". Use evidence-backed language such as **High Opportunity**, **Promising**, **Needs Validation**, or **High Risk**.
