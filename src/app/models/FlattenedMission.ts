export interface FlattenedMissionProduct {
  index: number;
  date: string;
  serialNo: number;
  workType_name: string;
  swatNo: string;
  name: string;
  product_name: string;
  quantity: number;
  taskState_name: string;
}

export interface FlattenedMissionService {
  index: number;
  date: string;
  serialNo: number;
  workType_name: string;
  swatNo: string;
  name: string;
  contractor_name: string;
  service_name: string;
  quantity: number;
  taskState_name: string;
}