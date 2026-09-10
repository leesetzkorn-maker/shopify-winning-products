import { describe, expect, it } from 'vitest';
import { estimateGrossMargin } from './opportunity';

describe('estimateGrossMargin', () => {
  it('calculates landed commercial cost and gross margin', () => {
    const result = estimateGrossMargin({
      supplierPriceZar: 300,
      shippingZar: 80,
      dutiesImportZar: 40,
      paymentCostsZar: 30,
      platformCostsZar: 20,
      targetSellingPriceZar: 999,
      vatTreatment: 'inclusive',
    });

    expect(result?.totalCostZar).toBe(470);
    expect(result?.grossProfitZar).toBe(529);
    expect(result?.grossMarginPercent).toBeCloseTo(52.95, 2);
  });

  it('returns null when the commercial inputs are incomplete', () => {
    expect(
      estimateGrossMargin({ vatTreatment: 'unknown', supplierPriceZar: 300 }),
    ).toBeNull();
  });
});
