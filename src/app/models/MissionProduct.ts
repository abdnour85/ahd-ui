import { Iindex } from "./Iindex";
import { Mission } from "./Mission";

export interface MissionProductParameters{
    parent_id?: string;
    page: number;
    pageSize: number;
  }
  export interface MissionProduct {
    id?: string;
    product_name?: string;
    productId?: string;
    product_status?: string;
    quantity?: number;
    inStore?: number;
    status?: string;
    notes?: string
  }