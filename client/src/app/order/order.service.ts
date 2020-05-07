import { IOrderToReturn } from './../shared/models/order';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = environment.apiUrl;
  constructor(private client: HttpClient) { }
  getOrders() {
    return this.client.get<IOrderToReturn[]>(this.baseUrl + 'order');
  }
  getOrder(id: number) {
    return this.client.get<IOrderToReturn>(this.baseUrl + 'order/' + id);
  }
}
