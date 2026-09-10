export interface OpportunityInputs {
  /** Higher = stronger observed demand. */
  demand: number;
  /** Higher = stronger recent acceleration/trend momentum. */
  momentum: number;
  /** Higher = less saturated / easier to compete in. */
  competitionOpportunity: number;
  /** Higher = better estimated gross-margin potential. */
  marginPotential: number;
  /** Higher = easier, faster, and more reliable fulfilment. */
  shippingEase: number;
  /** Higher = more favourable current timing. */
  seasonality: number;
  /** Higher = stronger fit for the target market. */
  marketFit: number;
}

export type OpportunityTier =
  | 'HIGH_OPPORTUNITY'
  | 'PROMISING'
  | 'NEEDS_VALIDATION'
  | 'HIGH_RISK';

export interface ScoreBreakdownItem {
  key: keyof OpportunityInputs;
  input: number;
  weight: number;
  contribution: number;
}

export interface OpportunityScore {
  score: number;
  tier: OpportunityTier;
  reasons: string[];
  breakdown: ScoreBreakdownItem[];
}

const WEIGHTS: Record<keyof OpportunityInputs, number> = {
  demand: 0.25,
  momentum: 0.15,
  competitionOpportunity: 0.15,
  marginPotential: 0.20,
  shippingEase: 0.10,
  seasonality: 0.05,
  marketFit: 0.10,
};

function clamp(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

function tierFor(score: number): OpportunityTier {
  if (score >= 80) return 'HIGH_OPPORTUNITY';
  if (score >= 65) return 'PROMISING';
  if (score >= 45) return 'NEEDS_VALIDATION';
  return 'HIGH_RISK';
}

export function calculateOpportunityScore(
  inputs: OpportunityInputs,
): OpportunityScore {
  const keys = Object.keys(WEIGHTS) as Array<keyof OpportunityInputs>;
  const normalized = Object.fromEntries(
    keys.map((key) => [key, clamp(inputs[key])]),
  ) as OpportunityInputs;

  const breakdown = keys.map((key) => ({
    key,
    input: normalized[key],
    weight: WEIGHTS[key],
    contribution: Math.round(normalized[key] * WEIGHTS[key] * 100) / 100,
  }));

  const score = Math.round(
    breakdown.reduce((total, item) => total + item.contribution, 0) * 100,
  ) / 100;

  const reasons: string[] = [];
  if (normalized.demand >= 75) reasons.push('Strong demand signal');
  if (normalized.momentum >= 75) reasons.push('Positive momentum');
  if (normalized.competitionOpportunity >= 65) reasons.push('Favourable competition profile');
  if (normalized.marginPotential >= 75) reasons.push('Strong margin potential');
  if (normalized.shippingEase >= 65) reasons.push('Low fulfilment friction');
  if (normalized.marketFit >= 75) reasons.push('Strong target-market fit');
  if (reasons.length === 0) {
    reasons.push('Evidence is mixed; validate before investing heavily');
  }

  return {
    score,
    tier: tierFor(score),
    reasons,
    breakdown,
  };
}
