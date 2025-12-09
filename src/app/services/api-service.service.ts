import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { ListResponse, ResultResponse } from '../models/ListResponse';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private api_url = environment.api_url;

  constructor(private http: HttpClient) { }

  public get<T>(path: string, parameters: Params, authorize: boolean): Observable<any> {
      return this.http.get<ListResponse<any>>(
        `${this.api_url}${path}`,
        {
          params: parameters,
          headers: new HttpHeaders({
            'Authorization': 'Bearer '.concat(localStorage.getItem('jwt') || '')
          })
        }
      );
    }
  
    public put<T>(path: string, body: Record<string, any> = {}): Observable<any> {
      return this.http.put(`${this.api_url}${path}`, body);
    }
  
    public post<T>(path: string, parameters: HttpParams, authorize: boolean): Observable<any> {
      return this.http.post<ResultResponse>(
        `${this.api_url}${path}`, parameters,
        {
          headers: new HttpHeaders({
            'Authorization': 'Bearer '.concat(localStorage.getItem('jwt') || '')
          })
        }
      );
    }
  
    public delete<T>(path: string, id: string): Observable<any> {
      return this.http.delete<ResultResponse>(
        `${this.api_url}${path}?id=${id}`,
        {
          headers: new HttpHeaders({
            'Authorization': 'Bearer '.concat(localStorage.getItem('jwt') || '')
          })
        }
      );
      //return this.http.delete(`${this.api_url}${path}`);
    }
  
    upload(file: File): Observable<HttpEvent<any>> {
      const formData: FormData = new FormData();
  
      formData.append('afile', file);
  
      const req = new HttpRequest('POST', `${this.api_url}/api/attachments/upload`, formData, {
        reportProgress: true,
        responseType: 'json'
      });
  
      return this.http.request(req);
    }
}
