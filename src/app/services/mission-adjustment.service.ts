import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MissionAdjustment } from '../models/MissionAdjustment';
import { environment } from '../environments/environment';
import { Mission } from '../models/Mission';

@Injectable({
  providedIn: 'root',
})
export class MissionAdjustmentService {
  private apiUrl = `${environment.api_url}/missionadjustments`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<MissionAdjustment[]> {
    return this.http.get<MissionAdjustment[]>(this.apiUrl);
  }

  getById(id: number): Observable<MissionAdjustment> {
    return this.http.get<MissionAdjustment>(`${this.apiUrl}/${id}`);
  }

  getMissionById(missionId: string): Observable<Mission> {
    return this.http.get<Mission>(`${this.apiUrl}/mission/${missionId}`);
  }

  create(adjustment: MissionAdjustment): Observable<MissionAdjustment> {
    return this.http.post<MissionAdjustment>(this.apiUrl, adjustment);
  }

  update(adjustment: MissionAdjustment): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${adjustment.id}`, adjustment);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateBulk(adjustments: MissionAdjustment[]): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/bulk`, adjustments);
  }
}
