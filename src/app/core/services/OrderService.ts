import { Injectable } from '@angular/core';
import { HttpClientService } from './HttpClientService';
import { PagedResponse } from '../models/response/PagedResponse';
import { ApiResponse } from '../models/response/ApiResponse';
import { Order } from '../models/entities/Order ';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private base = 'http://localhost:5027/api/Orders';

  constructor(private http: HttpClientService) {}

  listByCustomer(id: number, page: number, pageSize : number): Observable<PagedResponse<Order>> {
    return this.http.get<PagedResponse<Order>>(`${this.base}/GetOrdersBy/${id}`, { page, pageSize });
  }

  create(order: Order): Observable<ApiResponse<Order>> {
    return this.http.post<ApiResponse<Order>>(`${this.base}/Create`, order);
  }
}
