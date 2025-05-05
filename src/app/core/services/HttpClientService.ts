import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpClientService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, params?: Record<string, any>): Observable<T> {
    let p = new HttpParams();
    if (params) Object.entries(params).forEach(([k,v]) => p = p.set(k, v));
    return this.http.get<T>(url, { params: p });
  }
  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body);
  }
}
