import { IBasketItem } from 'src/app/shared/models/basket-item';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../models/basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  $basket: Observable<IBasket>;
  @Input() isBasket  = true;
  @Output() increment = new EventEmitter<IBasketItem>();
  @Output() decrement = new EventEmitter<IBasketItem>();
  @Output() remove = new EventEmitter<IBasketItem>();
  constructor(private service: BasketService) { }

  ngOnInit() {
    this.$basket =  this.service.basket$;
  }
  incrementQuantity(item: IBasketItem) {
    this.increment.emit(item);
  }
  decrementQuantity(item: IBasketItem) {
    this.decrement.emit(item);
  }
  removeItem(item: IBasketItem) {
    this.remove.emit(item);
  }
}
