export interface ProductParameters{
    parent_id?: string;
    page: number;
    pageSize: number;
  }
  export interface Product {
    id?: string;
    code?: string;
    name?: string;
    openingQuantity?: number;
    quantity?: number;
    createDate?: number;
  }