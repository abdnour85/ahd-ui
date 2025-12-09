import { Iindex } from "./Iindex";
import { MissionAdjustment } from "./MissionAdjustment";
import { MissionService } from "./MissionService";
import { createGroupedPayDest, GroupedPayDest, PaymentDistribution } from "./PaymentDistribution";

export interface MissionServiceContractParameters {
  parent_id?: string;
  page: number;
  pageSize: number;
}
export interface MissionServiceContract {
  id?: string;
  contractor_name?: string;
  contractorId?: string;
  price?: number;
  total?: number;
  additions?: number;
  deductions?: number;
  notes?: string;
  status?: string;
  services: MissionService[];
  paymentDistributions: PaymentDistribution[];
  adjustments: MissionAdjustment[];
  groupedPayDest: GroupedPayDest
}

export function createMissionServiceContract(
  data: Partial<MissionServiceContract> = {}
): MissionServiceContract {
  return {
    services: [],
    paymentDistributions: [],
    adjustments: [],
    groupedPayDest: createGroupedPayDest(),
    ...data,
  };
}