import { CreateStockInvoiceItem, StockInvoiceItem, UpdateStockInvoiceItem } from "./StockInvoiceItem";

export interface StockInvoiceParameters {
    type?: string;
    fromDate?: string;
    toDate?: string;
    productId?: string;
    notes?: string;
    pageNumber: number;
    pageSize: number;
}
export interface StockInvoice {
    id?: string;
    serialNo?: number;
    type: string;
    date?: string;
    account_name?: string;
    accountId?: string;
    items: StockInvoiceItem[];
    notes?: string
    createDate?: string
}

export interface CreateStockInvoice {
    serialNo?: number;
    type: string;
    date?: string;
    accountId?: string;
    items: CreateStockInvoiceItem[];
    notes?: string
    createDate?: string
}

export interface UpdateStockInvoice {
    id?: string;
    serialNo?: number;
    type: string;
    date?: string;
    accountId?: string;
    items: UpdateStockInvoiceItem[];
    notes?: string
    createDate?: string
}

export function createStockInvoice(
  data: Partial<StockInvoice> = {}
): StockInvoice {
  return {
    type: '', // required property with no `?`, so give default
    items: [],
    ...data, // merge user-supplied data
  };
}

export function validateStockInvoice(stockInvoice: StockInvoice): string[] {
    const errors: string[] = [];

    // Check required string fields
    const requiredFields = [
        { name: 'type', name_ar: 'النوع' },
        { name: 'date', name_ar: 'التاريخ' },
        { name: 'accountId', name_ar: 'رقم الحساب' }
    ] as const;

    const requiredFields_items = [
        { name: 'productId', name_ar: 'اسم الصنف' },
        { name: 'quantity', name_ar: 'الكمية' }
    ] as const;

    for (const field of requiredFields) {
        if (!stockInvoice[field.name]) {
            errors.push(`${field.name_ar} مطلوب.`);
        }
    }

    // Check items
    if (!Array.isArray(stockInvoice.items) || stockInvoice.items.length === 0) {
        errors.push('يجب إضافة صنف واحد على الأقل.');
    }
    else
        for (const fmember of stockInvoice.items)
            for (const field of requiredFields_items) {
                if (!fmember[field.name]) {
                    let err = `${field.name_ar} مطلوب.`
                    if (!errors.includes(err))
                        errors.push(err);
                }
            }


    return errors;
}