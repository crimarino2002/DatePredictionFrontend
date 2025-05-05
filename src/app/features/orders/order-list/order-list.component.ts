import { Component, ViewChild }   from '@angular/core';
import { CommonModule }                   from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MatTableModule }                 from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule }                from '@angular/material/button';
import { MatTableDataSource }             from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

import { Order } from '../../../core/models/entities/Order ';
import { OrderService }                from '../../../core/services/OrderService';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent {
  customerId!: number;
  dataSource = new MatTableDataSource<Order>();
  metadata = {
    totalItems: 0,
    page: 1,
    pageSize: 10
  };
  displayedColumns = ['id', 'name', 'shippedDate','shipName','shipAddress','shipCity'];

@ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private orderService: OrderService,
    private route: Router,
    private activatedRoute : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.customerId = id;
      this.load(id, this.metadata.page, this.metadata.pageSize);
    });
  } 

  load(id: number, page: number, size: number): void {
    this.orderService.listByCustomer(id, page, size).subscribe(res => {
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
    this.load(this.customerId, page, size);
  }

  goBack(): void {
    this.route.navigate(['/']);
  }
}
 