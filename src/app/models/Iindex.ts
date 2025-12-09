export interface IindexParameters{
    parent_id?: string;
    page: number;
    pageSize: number;
  }
  export interface Iindex {
    id?: string;
    parent_id?: string;
    key?: string;
    name?: string;
    edit?: boolean;
  }