import { Injectable } from '@angular/core';
import { HttpClientService } from './HttpClientService';
import { PagedResponse } from '../models/response/PagedResponse';
import { Customer } from '../models/entities/Customer';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private base = 'http://localhost:5027/api/Customers';
  constructor(private http: HttpClientService) {}
  getAll(page = 1, pageSize = 10, filter = ''): Observable<PagedResponse<Customer>> {
    return this.http.get<PagedResponse<Customer>>(`${this.base}/GetAll`, { page, pageSize, filter });
  }
}