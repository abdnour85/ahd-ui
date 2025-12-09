import { Iindex } from "./Iindex";

export interface MissionServiceParameters{
    parent_id?: string;
    page: number;
    pageSize: number;
  }
  export interface MissionService {
    id?: string;
    service_code?: string;
    service_name?: string;
    serviceId?: string;
    quantity?: number;
    unitPrice?: number;
    price?: number;
    notes?: string
  }