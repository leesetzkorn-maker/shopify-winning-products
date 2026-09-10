import { describe, expect, it } from 'vitest';
import { calculateOpportunityScore } from './opportunityScore';

describe('calculateOpportunityScore', () => {
  it('returns a high opportunity score for strong inputs', () => {
    const result = calculateOpportunityScore({
      demand: 95,
      momentum: 90,
      competitionOpportunity: 85,
      marginPotential: 90,
      shippingEase: 85,
      seasonality: 80,
      marketFit: 95,
    });

    expect(result.score).toBeGreaterThanOrEqual(80);
    expect(result.tier).toBe('HIGH_OPPORTUNITY');
    expect(result.breakdown).toHaveLength(7);
  });

  it('treats lower competition and easier shipping as better inputs', () => {
    const strong = calculateOpportunityScore({
      demand: 80,
      momentum: 80,
      competitionOpportunity: 90,
      marginPotential: 80,
      shippingEase: 90,
      seasonality: 70,
      marketFit: 80,
    });
    const weak = calculateOpportunityScore({
      demand: 80,
      momentum: 80,
      competitionOpportunity: 20,
      marginPotential: 80,
      shippingEase: 20,
      seasonality: 70,
      marketFit: 80,
    });

    expect(strong.score).toBeGreaterThan(weak.score);
  });

  it('clamps out-of-range and non-finite inputs', () => {
    const result = calculateOpportunityScore({
      demand: 200,
      momentum: -10,
      competitionOpportunity: Number.NaN,
      marginPotential: 200,
      shippingEase: -50,
      seasonality: Number.POSITIVE_INFINITY,
      marketFit: 200,
    });

    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.breakdown.every((item) => item.input >= 0 && item.input <= 100)).toBe(true);
  });

  it('returns an explanatory reason when evidence is mixed', () => {
    const result = calculateOpportunityScore({
      demand: 30,
      momentum: 30,
      competitionOpportunity: 30,
      marginPotential: 40,
      shippingEase: 30,
      seasonality: 40,
      marketFit: 30,
    });

    expect(result.reasons).toContain('Evidence is mixed; validate before investing heavily');
  });
});
