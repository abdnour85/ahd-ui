import { MissionAdjustment } from "./MissionAdjustment";
import { MissionServiceContract } from "./MissionServiceContract";
import { MissionStage } from "./MissionStage";
import { createStockInvoice, StockInvoice } from "./StockInvoice";

export interface MissionParameters {
  name?: string;
  swatNo?: string;
  serialNo?: number;
  workTypeId?: string;
  taskStateId?: string;
  nextStage_stage_id?: string;
  nextStage_assignedTo_id?: string;
  nextStage_status?: string;
  needsFollowup?: boolean
  pageNumber: number;
  pageSize: number;
}
export interface Mission {
  checked?: boolean;
  id?: string;
  serialNo?: number;
  date?: string;
  workType_name?: string;
  workTypeId?: string;
  swatNo?: string;
  name?: string;
  price?: number;
  additions?: number;
  deductions?: number;
  total?: number;
  taskState_name?: string;
  taskStateId?: string;
  stockInvoice: StockInvoice;
  //products: StockInvoiceItem[]
  contracts: MissionServiceContract[]
  stages: MissionStage[]
  //adjustments: MissionAdjustment[];  //moved to MissionServiceContract
  notes?: string
  showInMissions?: boolean
  showInFollowups?: boolean
  nextStageId?: string
  nextStage_stage_id?: string;
  nextStage_stage_name?: string
  nextStage_assignedTo_name?: string
  nextStage_status?: string
  nextStage_status_name?: string;
}

export function createMission(
  data: Partial<Mission> = {}
): Mission {
  return {
    stockInvoice: createStockInvoice(),
    contracts: [],
    stages: [],
    ...data, // override defaults if user provides
  };
}


/*export interface MissionDto {
  checked?: boolean;
  id?: string;
  serialNo?: number;
  date?: string;
  workType_name?: string;
  workTypeId?: string;
  swatNo?: string;
  name?: string;
  price?: number;
  discount?: number;
  total?: number;
  taskState_name?: string;
  taskStateId?: string;
  stockInvoice: StockInvoice;
  //products: StockInvoiceItem[]
  contracts: MissionServiceContract[]
  //stages: MissionStage[]
  notes?: string
  showInMissions?: boolean
  showInFollowups?: boolean
  nextStageId?: string
  nextStage_stage_id?: string;
  nextStage_stage_name?: string
  nextStage_assignedTo_name?: string
  nextStage_status?: string
  nextStage_status_name?: string;
}*/