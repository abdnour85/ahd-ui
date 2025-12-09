export interface MissionAdjustment {
  id: number;
  missionServiceContractId: string;
  effectiveDate: string; // ISO format (e.g., "2025-06-02")
  amount: number;
  type: 'Addition' | 'Deduction';
  notes: string
}