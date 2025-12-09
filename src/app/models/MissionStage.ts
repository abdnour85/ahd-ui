import { Contractor, User } from "./User";
import { Iindex } from "./Iindex";
import { Mission } from "./Mission";

export interface MissionStageParameters {
  parent_id?: string;
  page: number;
  pageSize: number;
}
export interface MissionStage {
  id?: string;
  order?: number;
  stage_name?: string;
  stageId?: string;
  assignedTo_name?: string
  assignedToId?: string
  stage_assignedToRole_id?: string
  stage_followupToRole_id?: string;
  status?: string;
  //--helper properties
  checked?: boolean;
  disabled?: boolean;
  assignedToUsers?: User[];
  followupToUsers?: User[];
  statuses: StageStatus[];
}

export function createMissionStage(
  data: Partial<MissionStage> = {}
): MissionStage {
  return {
    assignedToUsers: [],
    followupToUsers: [],
    statuses: [],
    ...data, // merge user-supplied data
  };
}

export interface Stage {
  id?: string;
  order?: number;
  name?: string;
  assignedToRole_id?: string;
  followupToRole_id?: string;
}

export interface StageStatus {
  id: string
  name: string
}

export interface StageStatuses {
  stage_id: string
  statuses: StageStatus[]
}