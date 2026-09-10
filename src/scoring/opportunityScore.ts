export interface OpportunityInputs {
  demand: number;
  momentum: number;
  competition: number;
  marginPotential: number;
  shippingFriction: number;
  seasonality: number;
  marketFit: number;
}

export type OpportunityTier =
  | 'HIGH_OPPORTUNITY'
  | 'PROMISING'
  | 'NEEDS_VALIDATION'
  | 'HIGH_RISK';

export interface OpportunityScore {
  score: number;
  tier: OpportunityTier;
  reasons: string[];
}

const WEIGHTS: Record<keyof OpportunityInputs, number> = {
  demand: 0.25,
  momentum: 0.15,
  competition: 0.15,
  marginPotential: 0.20,
  shippingFriction: 0.10,
  seasonality: 0.05,
  marketFit: 0.10,
};

function clamp(value: number): number {
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
  const normalized = Object.fromEntries(
    Object.entries(inputs).map(([key, value]) => [key, clamp(value)]),
  ) as OpportunityInputs;

  const weightedScore = (Object.keys(WEIGHTS) as Array<keyof OpportunityInputs>)
    .reduce((total, key) => total + normalized[key] * WEIGHTS[key], 0);

  const score = Math.round(weightedScore * 100) / 100;
  const reasons: string[] = [];

  if (normalized.demand >= 75) reasons.push('Strong demand signal');
  if (normalized.momentum >= 75) reasons.push('Positive momentum');
  if (normalized.competition <= 35) reasons.push('Relatively low competition');
  if (normalized.marginPotential >= 75) reasons.push('Strong margin potential');
  if (normalized.shippingFriction <= 35) reasons.push('Low shipping friction');
  if (normalized.marketFit >= 75) reasons.push('Strong market fit');

  if (reasons.length === 0) {
    reasons.push('Evidence is mixed; validate before investing heavily');
  }

  return {
    score,
    tier: tierFor(score),
    reasons,
  };
}
