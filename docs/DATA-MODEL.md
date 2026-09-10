# Product Intelligence Data Model

## ProductOpportunity

- `id`: internal UUID
- `canonicalKey`: normalized product identity
- `title`
- `category`
- `market`: ISO market code; MVP includes ZA
- `currency`: ZAR for the SA experience
- `score`: 0–100 explainable opportunity score
- `confidence`: 0–100 evidence confidence
- `status`: candidate | watch | validated | rejected
- `firstSeenAt`
- `lastObservedAt`
- `dataFreshAt`

## Evidence

Every score component is backed by one or more evidence records:

- `sourceType`
- `sourceName`
- `sourceUrl`
- `observedAt`
- `value`
- `unit`
- `quality`

## Commercial inputs

- supplier price
- estimated shipping
- estimated duties/import costs where applicable
- VAT treatment
- target selling price
- payment/platform costs
- estimated gross margin
- margin confidence

## SA market-fit inputs

- local demand signal
- local supplier availability
- delivery-time band
- shipping-risk band
- price sensitivity
- seasonal/local-event relevance

## Guardrail

No component may imply guaranteed sales or profit. The UI should distinguish observed facts, estimates, model-derived scores and merchant-entered assumptions.
