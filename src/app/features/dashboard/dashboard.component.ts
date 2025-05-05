import { Component, OnInit, ViewChild }   from '@angular/core';
import { CommonModule }                   from '@angular/common';
import { Router }                         from '@angular/router';
import { MatTableModule }                 from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule }                from '@angular/material/button';
import { MatTableDataSource }             from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { NewOrderComponent } from '../orders/new-order/new-order.component';

import { CustomerService }                from '../../core/services/CustomerService';
import { Customer }                       from '../../core/models/entities/Customer';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  dataSource = new MatTableDataSource<Customer>();
  displayedColumns = ['name','lastOrderDate','nextPredictedOrder','actions'];

  metadata = {
    totalItems: 0,
    page: 1,
    pageSize: 10
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load(this.metadata.page, this.metadata.pageSize);
  }

  load(page: number, size: number): void {
    this.customerService.getAll(page, size).subscribe(res => {
      this.dataSource.data = res.data;
      this.metadata = {
        ...this.metadata,
        ...res.metadata
      };
    });
  }

  onPage(event: PageEvent): void {
    const page = event.pageIndex + 1;
    const size = event.pageSize;
    this.load(page, size);
  }

  viewOrders(c: Customer) {
    this.router.navigate(['orders', c.id]);
  }
  
  createOrders(customer: Customer): void {
    this.dialog.open(NewOrderComponent, {
      width: '700px',
      data: { customerId: customer.id }
    });
  }
}
