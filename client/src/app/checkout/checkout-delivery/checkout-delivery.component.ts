import { BasketService } from 'src/app/basket/basket.service';
import { AccountService } from './../../account/account.service';
import { CheckoutService } from './../checkout.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDeliveryMethod } from 'src/app/shared/models/IDeliveryMethod';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkOutForm: FormGroup;
  deliveryMethods: IDeliveryMethod[];
  constructor(private service: CheckoutService, private basketService: BasketService) { }

  ngOnInit() {
    this.service.getDeilveryMethods().subscribe((dms) => this.deliveryMethods = dms);
  }
  updateDeliveryMethod(method: IDeliveryMethod) {
    this.basketService.setShippingCharge(method);
  }
}
