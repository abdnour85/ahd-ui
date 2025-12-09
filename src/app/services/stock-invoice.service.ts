import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateStockInvoice, StockInvoice, UpdateStockInvoice } from '../models/StockInvoice';
import { PagedResult } from '../models/PagedResult';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockInvoiceService {
  private baseUrl = `${environment.api_url}/StockInvoices`;

  constructor(private http: HttpClient) { }

  getStockInvoices(
    page: number = 1,
    pageSize: number = 10,
    sortBy: string = 'date',
    sortOrder: string = 'desc',
    accountId: string = '',
    type: string = 'i',
    fromDate?: string,
    toDate?: string
  ): Observable<PagedResult<StockInvoice>> {
    let params = new HttpParams()
      .set('type', type)
      .set('page', page)
      .set('pageSize', pageSize)
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder)
      .set('accountId', accountId);

    if (fromDate) params = params.set('fromDate', fromDate);
    if (toDate) params = params.set('toDate', toDate);

    return this.http.get<PagedResult<StockInvoice>>(this.baseUrl, { params });
  }

  getById(id: string): Observable<StockInvoice> {
    return this.http.get<StockInvoice>(`${this.baseUrl}/${id}`);
  }

  createStockInvoice(dto: CreateStockInvoice): Observable<StockInvoice> {
    return this.http.post<StockInvoice>(this.baseUrl, dto);
  }

  updateStockInvoice(id: string, dto: UpdateStockInvoice): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dto);
  }

  deleteStockInvoice(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}