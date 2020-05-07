import { IBasketItem } from './../shared/models/basket-item';
import { BasketService } from './basket.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IBasket, IBasketTotal } from '../shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  $basket: Observable<IBasket>;
  basketTotal$: Observable<IBasketTotal>;
  constructor(private service: BasketService) { }

  ngOnInit() {
    this.$basket =  this.service.basket$;
    this.basketTotal$ = this.service.basketTotal$;
  }
  incrementQuantity(id: number) {
    this.service.incrementQuantity(id);
  }
  decrementQuantity(id: number) {
    this.service.decrementQuantity(id);
  }
  removeItem(id: number) {
    this.service.removeItem(id);
  }
}
