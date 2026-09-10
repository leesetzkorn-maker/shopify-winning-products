import type { EvidenceItem } from '../domain/opportunity';

export interface ConfidenceInput {
  evidence: EvidenceItem[];
  freshestEvidenceAgeHours: number;
}

export interface ConfidenceResult {
  confidence: number;
  label: 'HIGH' | 'MEDIUM' | 'LOW';
  reasons: string[];
}

export function calculateConfidence(input: ConfidenceInput): ConfidenceResult {
  if (input.evidence.length === 0) {
    return { confidence: 0, label: 'LOW', reasons: ['No supporting evidence is available'] };
  }

  const uniqueSources = new Set(input.evidence.map((item) => item.sourceName)).size;
  const qualityPoints = input.evidence.reduce((sum, item) => {
    if (item.quality === 'high') return sum + 1;
    if (item.quality === 'medium') return sum + 0.6;
    return sum + 0.3;
  }, 0);

  const sourceScore = Math.min(30, uniqueSources * 10);
  const qualityScore = Math.min(45, qualityPoints * 15);
  const freshnessPenalty = Math.min(25, Math.max(0, input.freshestEvidenceAgeHours / 24) * 2.5);
  const confidence = Math.round(Math.max(0, Math.min(100, sourceScore + qualityScore - freshnessPenalty)));

  const reasons: string[] = [];
  reasons.push(uniqueSources >= 3 ? 'Multiple independent sources' : 'Limited source diversity');
  reasons.push(qualityPoints >= 2 ? 'Evidence quality is reasonably strong' : 'Evidence quality is limited');
  reasons.push(freshnessPenalty < 10 ? 'Evidence is reasonably fresh' : 'Older evidence reduces confidence');

  return {
    confidence,
    label: confidence >= 75 ? 'HIGH' : confidence >= 50 ? 'MEDIUM' : 'LOW',
    reasons,
  };
}
