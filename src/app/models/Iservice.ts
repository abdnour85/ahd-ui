export interface IserviceParameters{
    parent_id?: string;
    page: number;
    pageSize: number;
  }
  export interface Iservice {
    id?: string;
    code?: string;
    name?: string;
    price?: number;
    createDate?: number;
  }