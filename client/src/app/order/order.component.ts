import { Router } from '@angular/router';
import { IOrderToReturn } from './../shared/models/order';
import { OrderService } from './order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: IOrderToReturn[];

  constructor(private service: OrderService) { }

  ngOnInit() {
    this.service.getOrders().subscribe(x => this.orders = x);
  }
}
