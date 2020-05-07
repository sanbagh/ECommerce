import { SharedModule } from './../shared/shared.module';
import { OrderRouteModule } from './order-route.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';



@NgModule({
  declarations: [OrderComponent, OrderDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    OrderRouteModule
  ]
})
export class OrderModule { }
