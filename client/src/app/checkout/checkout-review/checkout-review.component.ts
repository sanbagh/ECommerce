import { IBasketItem } from 'src/app/shared/models/basket-item';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { Component, OnInit, Input } from '@angular/core';
import { IBasket } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
  @Input() appSteper;
  $basket: Observable<IBasket>;
  constructor(private service: BasketService) { }

  ngOnInit() {
    this.$basket = this.service.basket$;
  }
  createOrUpdatePaymentIntent() {
    this.service.createOrUpdatePaymentIntent().subscribe(() => this.appSteper.next());
  }
}
