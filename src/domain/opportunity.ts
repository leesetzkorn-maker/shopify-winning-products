export type MarketCode = 'ZA';
export type OpportunityStatus = 'candidate' | 'watch' | 'validated' | 'rejected';
export type EvidenceQuality = 'high' | 'medium' | 'low';
export type VatTreatment = 'inclusive' | 'exclusive' | 'unknown';

export interface EvidenceItem {
  id: string;
  sourceType: string;
  sourceName: string;
  sourceUrl?: string;
  observedAt: string;
  value: number | string;
  unit: string;
  quality: EvidenceQuality;
}

export interface CommercialInputs {
  supplierPriceZar?: number;
  shippingZar?: number;
  dutiesImportZar?: number;
  vatTreatment: VatTreatment;
  targetSellingPriceZar?: number;
  paymentCostsZar?: number;
  platformCostsZar?: number;
}

export interface SouthAfricaFit {
  localDemand: number;
  localSupplierAvailability: number;
  deliveryTimeDaysMin?: number;
  deliveryTimeDaysMax?: number;
  shippingRisk: number;
  priceSensitivity: number;
  seasonalRelevance: number;
}

export interface ProductOpportunity {
  id: string;
  canonicalKey: string;
  title: string;
  category: string;
  market: MarketCode;
  currency: 'ZAR';
  score: number;
  confidence: number;
  status: OpportunityStatus;
  firstSeenAt: string;
  lastObservedAt: string;
  dataFreshAt: string;
  evidence: EvidenceItem[];
  commercial: CommercialInputs;
  southAfricaFit: SouthAfricaFit;
}

export interface MarginEstimate {
  revenueZar: number;
  totalCostZar: number;
  grossProfitZar: number;
  grossMarginPercent: number;
}

export function estimateGrossMargin(input: CommercialInputs): MarginEstimate | null {
  if (
    input.targetSellingPriceZar == null ||
    input.supplierPriceZar == null ||
    input.shippingZar == null
  ) {
    return null;
  }

  const revenueZar = Math.max(0, input.targetSellingPriceZar);
  const totalCostZar = Math.max(
    0,
    input.supplierPriceZar +
      input.shippingZar +
      (input.dutiesImportZar ?? 0) +
      (input.paymentCostsZar ?? 0) +
      (input.platformCostsZar ?? 0),
  );
  const grossProfitZar = revenueZar - totalCostZar;
  const grossMarginPercent = revenueZar === 0 ? 0 : (grossProfitZar / revenueZar) * 100;

  return {
    revenueZar,
    totalCostZar,
    grossProfitZar,
    grossMarginPercent: Math.round(grossMarginPercent * 100) / 100,
  };
}
