import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

import { PagedResponse } from '../../../core/models/response/PagedResponse';
import { Employee } from '../../../core/models/entities/Employee';
import { Order } from '../../../core/models/entities/Order ';
import { OrderService } from '../../../core/services/OrderService';
import { EmployeeService } from '../../../core/services/EmployeeService';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})

export class NewOrderComponent implements OnInit {
  orderForm: FormGroup;
  customerId!: number;

  employees$!: Observable<Employee[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { customerId: number },
    private dialogRef: MatDialogRef<NewOrderComponent>,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private orderService: OrderService
  ) {
    this.customerId = data.customerId;

    this.orderForm = this.fb.group({
      empName: [''],
      empId: [null],
      shipperId: [null],
      shipName: [''],
      shipAddress: [''],
      shipCity: [''],
      orderDate: [''],
      requiredDate: [''],
      shippedDate: [''],
      freight: [null],
      shipCountry: [''],
      productId: [null],
      unitPrice: [null],
      qty: [null],
      discount: [null]
    });
  }

  ngOnInit(): void {
    this.setupEmployeeSearch();
  }

  private setupEmployeeSearch(): void {
    this.employees$ = this.orderForm.get('empName')!
      .valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((name: string) => {
          if (!name || name.length < 2) {
            return of<Employee[]>([]);
          }
          return this.employeeService.getAll(1, 10, name)
            .pipe(
              map((res: PagedResponse<Employee>) => res.data)
            );
        })
      );
  }
  
  onEmployeeSelected(emp: Employee) {
    this.orderForm.patchValue({
      empId: emp.id,
      empName: emp.name
    });
  } 

  submit(): void {
    if (this.orderForm.valid) {
      const formValue = this.orderForm.value;
      const newOrder: Order = {
        id: 0,
        custId: this.customerId,
        empId: formValue.empId,
        shipperId: formValue.shipperId,
        productId: formValue.productId,
        orderDate: formValue.orderDate,
        requiredDate: formValue.requiredDate,
        shippedDate: formValue.shippedDate,
        shipName: formValue.shipName,
        shipAddress: formValue.shipAddress,
        shipCity: formValue.shipCity,
        freight: formValue.freight,
        shipCountry: formValue.shipCountry,
        unitPrice: formValue.unitPrice,
        qty: formValue.qty,
        discount: formValue.discount
      };

      this.orderService.create(newOrder).subscribe(res => {
        this.dialogRef.close(res.data);
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
