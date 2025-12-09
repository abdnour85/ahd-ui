import { Iindex } from "./Iindex";

export interface StockInvoiceItemParameters{
    parent_id?: string;
    page: number;
    pageSize: number;
  }
  export interface StockInvoiceItem {
    id?: string;
    invoiceId?: string;
    invoice_type?: string;
    invice_date?: string;
    invoice_serialNo?: string;
    product_name?: string;
    productId?: string;
    product_code?: string;
    product_status?: string;
    inStore?: number;
    quantity?: number;
    notes?: string
  }

    export interface CreateStockInvoiceItem {
    invoiceId?: string;
    productId?: string;
    inStore?: number;
    quantity?: number;
    notes?: string
  }

    export interface UpdateStockInvoiceItem {
    id?: string;
    invoiceId?: string;
    productId?: string;
    inStore?: number;
    quantity?: number;
    notes?: string
  }