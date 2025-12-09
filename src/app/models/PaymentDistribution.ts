import { MissionServiceContract } from "./MissionServiceContract";

export interface PaymentDistribution {
  id?: string;

  // contract
  contractId: string;
  price: number;
  additions: number;
  deductions: number;
  total: number;
  contractorName: string;

  // adjustment
  adjustmentId?: number;
  type: 'Addition' | 'Deduction';
  adjustmentNotes: string;
  adjustmentAmount?: number;

  // user
  userId: string;
  userName: string;
  date: string;
  percentage: number;
  amount: number;

  // contract.mission
  serialNo: number;
  swatNo: string;
  name: string;
  workTypeName: string;
}

export interface GroupedPayDest{
  contract: ContractPayDist, //
  additions: ContractAdditionPayDist[],
  deductions: ContractDeductionPayDist[],
}
export function createGroupedPayDest(
  data: Partial<GroupedPayDest> = {}
): GroupedPayDest {
  return {
    contract: createContractPayDist(),
    additions: [],
    deductions: [],
    ...data,
  };
}


export interface PayDest {
  userName: string;
  amount: number;
}

export interface ContractPayDist {
  price: number;
  additions: number;
  deductions: number;
  items: PayDest[]
}
export function createContractPayDist(
  data: Partial<ContractPayDist> = {}
): ContractPayDist {
  return {
    price: 0,
    additions: 0,
    deductions: 0,
    items: [],
    ...data,
  };
}


export interface ContractAdditionPayDist {
  date: string;
  amount: number;
  note: string;
  items: PayDest[]
}
export function createContractAdditionPayDist(
  data: Partial<ContractAdditionPayDist> = {}
): ContractAdditionPayDist {
  return {
    date: '',
    amount: 0,
    note: '',
    items: [],
    ...data,
  };
}


export interface ContractDeductionPayDist {
  date: string;
  amount: number;
  note: string;
  items: PayDest[]
}
export function createContractDeductionPayDist(
  data: Partial<ContractDeductionPayDist> = {}
): ContractDeductionPayDist {
  return {
    date: '',
    amount: 0,
    note: '',
    items: [],
    ...data,
  };
}

export interface PaymentDistributionResult {
  success: boolean;
  message: string;
  distributions?: PaymentDistribution[];
  totalCreated?: number;
}