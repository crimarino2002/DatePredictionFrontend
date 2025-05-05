import { Injectable } from '@angular/core';
import { HttpClientService } from './HttpClientService';
import { PagedResponse } from '../models/response/PagedResponse';
import { Observable } from 'rxjs';
import { Employee } from '../models/entities/Employee';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private base = 'http://localhost:5027/api/Employees';

  constructor(private http: HttpClientService) {}

  getAll(page: number = 1, pageSize: number = 10, filter: string = ''): Observable<PagedResponse<Employee>> {
    const params: Record<string, string> = {
      page:     page.toString(),
      pageSize: pageSize.toString()
    };

    if (filter) {
      params['filter'] = filter;
    }

    return this.http.get<PagedResponse<Employee>>(
      `${this.base}/GetAll`,
      params
    );
  }
}