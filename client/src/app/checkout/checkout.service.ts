import { IOrderToCreate, IOrderToReturn } from './../shared/models/order';
import { IDeliveryMethod } from './../shared/models/IDeliveryMethod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;
  constructor(private client: HttpClient) { }

 createOrder(order: IOrderToCreate) {
   return this.client.post<IOrderToReturn>(this.baseUrl + 'order', order);
 }
  getDeilveryMethods() {
    return this.client.get(this.baseUrl + 'order/deliverymethods').pipe( map((dms: IDeliveryMethod[]) => {
      return dms;
    }));
  }

}
