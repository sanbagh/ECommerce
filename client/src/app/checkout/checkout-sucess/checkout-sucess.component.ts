import { IOrderToReturn } from './../../shared/models/order';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-sucess',
  templateUrl: './checkout-sucess.component.html',
  styleUrls: ['./checkout-sucess.component.scss']
})
export class CheckoutSucessComponent implements OnInit {
  order: IOrderToReturn;

  constructor(private router: Router) {
    const url = this.router.getCurrentNavigation();
    const state = url && url.extras && url.extras.state;
    if (state) {
      this.order  = state as IOrderToReturn;
    }
  }

  ngOnInit() {
  }

}
