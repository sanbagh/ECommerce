import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from './../checkout.service';
import { BasketService } from 'src/app/basket/basket.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { IOrderToCreate } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkOutForm: FormGroup;
  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {}
  submitOrder() {
    const order: IOrderToCreate = {
      basketId: localStorage.getItem('bskid'),
      deliveryMethodId: +this.checkOutForm
        .get('deliveryForm')
        .get('deliveryMethod').value,
      shippingAddress: this.checkOutForm.get('addressForm').value
    };
    this.checkoutService.createOrder(order).subscribe(
      (x) => {
        this.toastr.success('Order Placed Successfully');
        this.basketService.removeLocalBasket();
        const extra: NavigationExtras = {state: x};
        this.router.navigate(['checkout/success'], extra);
      },
      (err) => this.toastr.error(err.message)
    );
  }
}
