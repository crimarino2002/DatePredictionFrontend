import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { OrderListComponent } from './features/orders/order-list/order-list.component';
import { NewOrderComponent } from './features/orders/new-order/new-order.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'orders/:id', component: OrderListComponent },
  { path: 'newOrder', component: NewOrderComponent },
  { path: '**', redirectTo: '' }
];
