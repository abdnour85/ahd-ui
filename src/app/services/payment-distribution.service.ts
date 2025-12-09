import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentDistribution, PaymentDistributionResult } from '../models/PaymentDistribution';
import { environment } from '../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PaymentDistributionService {
  private apiUrl = `${environment.api_url}/PaymentDistributions`;

  constructor(private http: HttpClient) {}

  // GET: /api/PaymentDistributions/ByContractorAndDate
  getByContractorAndDate(contractorId: string, fromDate: string, toDate: string): Observable<PaymentDistribution[]> {
    const params = new HttpParams()
      .set('contractorId', contractorId)
      .set('fromDate', fromDate)
      .set('toDate', toDate);

    return this.http.get<PaymentDistribution[]>(`${this.apiUrl}/ByContractorAndDate`, { params });
  }

  // GET: /api/PaymentDistributions/contract/{contractId}
  getByContract(contractId: string): Observable<PaymentDistribution[]> {
    return this.http.get<PaymentDistribution[]>(`${this.apiUrl}/contract/${contractId}`);
  }

  // GET: /api/PaymentDistributions/{id}
  get(id: string): Observable<PaymentDistribution> {
    return this.http.get<PaymentDistribution>(`${this.apiUrl}/${id}`);
  }

  // POST: /api/PaymentDistributions
  create(dto: PaymentDistribution): Observable<PaymentDistribution> {
    return this.http.post<PaymentDistribution>(this.apiUrl, dto);
  }

  // PUT: /api/PaymentDistributions/{id}
  update(id: string, dto: PaymentDistribution): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  // DELETE: /api/PaymentDistributions/{id}
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // POST: /api/PaymentDistributions/GeneratePaymentDistributions
  generatePaymentDistributions(fromDate: string, toDate: string): Observable<PaymentDistributionResult> {
    const params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate);

    return this.http.post<PaymentDistributionResult>(`${this.apiUrl}/GeneratePaymentDistributions`, null, { params });
  }

  // POST: /api/PaymentDistributions/populate-distributions
  populateDistributions(fromDate: string, toDate: string): Observable<{ message: string }> {
    const params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate);

    return this.http.post<{ message: string }>(`${this.apiUrl}/populate-distributions`, null, { params });
  }
}
