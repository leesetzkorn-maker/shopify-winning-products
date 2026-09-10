import { describe, expect, it } from 'vitest';
import { calculateOpportunityScore } from './opportunityScore';

describe('calculateOpportunityScore', () => {
  it('returns a high opportunity score for strong inputs', () => {
    const result = calculateOpportunityScore({
      demand: 95,
      momentum: 90,
      competition: 15,
      marginPotential: 90,
      shippingFriction: 15,
      seasonality: 80,
      marketFit: 95,
    });

    expect(result.score).toBeGreaterThanOrEqual(80);
    expect(result.tier).toBe('HIGH_OPPORTUNITY');
  });

  it('clamps out-of-range inputs', () => {
    const result = calculateOpportunityScore({
      demand: 200,
      momentum: -10,
      competition: -20,
      marginPotential: 200,
      shippingFriction: -50,
      seasonality: 200,
      marketFit: 200,
    });

    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.score).toBeGreaterThanOrEqual(0);
  });

  it('returns an explanatory reason when evidence is mixed', () => {
    const result = calculateOpportunityScore({
      demand: 30,
      momentum: 30,
      competition: 70,
      marginPotential: 40,
      shippingFriction: 60,
      seasonality: 40,
      marketFit: 30,
    });

    expect(result.reasons.length).toBeGreaterThan(0);
  });
});
