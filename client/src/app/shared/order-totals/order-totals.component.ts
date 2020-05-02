import { BasketService } from './../../basket/basket.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IBasketTotal } from '../models/basket';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {
basketTotal$: Observable<IBasketTotal>;
  constructor(private service: BasketService) { }

  ngOnInit() {
    this.basketTotal$ = this.service.basketTotal$;
  }

}
