import { IBasket } from 'src/app/shared/models/basket';
import { element } from 'protractor';
import { IOrderToReturn } from './../../shared/models/order';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from './../checkout.service';
import { BasketService } from 'src/app/basket/basket.service';
import { FormGroup } from '@angular/forms';
import { Component, AfterViewInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { IOrderToCreate } from 'src/app/shared/models/order';
declare var Stripe;
@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy {
  @Input() checkOutForm: FormGroup;
  @ViewChild('cardNumber', {static: true}) cardNumberEle: ElementRef;
  @ViewChild('cardExpiry', {static: true}) cardExpiryEle: ElementRef;
  @ViewChild('cardCVC', {static: true}) cardCVCEle: ElementRef;
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;
  cardHandler  = this.onChange.bind(this);
  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.stripe = Stripe('pk_test_YEfHQylkPMALkPcJWEWDxbmX00nSl3S2wl');
    const elements = this.stripe.elements();
    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberEle.nativeElement);
    this.cardNumber.addEventListener('change', this.cardHandler);

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryEle.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandler);

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCVCEle.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler);
  }
  ngOnDestroy() {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }
  onChange({error}) {
    if (error) {
      this.cardErrors = error.message;
    } else {
        this.cardErrors = null;
    }
  }
  submitOrder() {
    const order: IOrderToCreate = {
      basketId: localStorage.getItem('bskid'),
      deliveryMethodId: +this.checkOutForm
        .get('deliveryForm')
        .get('deliveryMethod').value,
      shippingAddress: this.checkOutForm.get('addressForm').value
    };
    this.checkoutService.createOrder(order).subscribe(
      (x: IOrderToReturn) => {
        const basket = this.basketService.getCurrentValue();
        if (basket) {
        this.stripe.confirmCardPayment(basket.clientSecret, {
          payment_method: {
           card: this.cardNumber,
           billing_details: {
             name: this.checkOutForm.get('paymentForm').get('nameOnCard').value
           }
          }
        }).then(result => {
          if (result.paymentIntent) {
            this.basketService.removeLocalBasket();
            const extra: NavigationExtras = {state: x};
            this.router.navigateByUrl('checkout/success', extra);
          } else {
            this.toastr.error('Payment Error');
          }
        });

      } else { this.toastr.error('No basket...'); }},
      (err) => this.toastr.error(err.message)
    );
  }
}
