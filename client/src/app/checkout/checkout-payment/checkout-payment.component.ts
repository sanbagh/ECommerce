import { IBasket } from 'src/app/shared/models/basket';
import { element } from 'protractor';
import { IOrderToReturn } from './../../shared/models/order';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from './../checkout.service';
import { BasketService } from 'src/app/basket/basket.service';
import { FormGroup } from '@angular/forms';
import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { IOrderToCreate } from 'src/app/shared/models/order';
declare var Stripe;
@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy {
  @Input() checkOutForm: FormGroup;
  @ViewChild('cardNumber', { static: true }) cardNumberEle: ElementRef;
  @ViewChild('cardExpiry', { static: true }) cardExpiryEle: ElementRef;
  @ViewChild('cardCVC', { static: true }) cardCVCEle: ElementRef;
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;
  cardHandler = this.onChange.bind(this);
  loading = false;
  cardNumberValid = false;
  cardExpiryValid = false;
  cardCvcValid = false;
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
  onChange(event) {
    if (event.error) {
      this.cardErrors = event.error.message;
    } else {
      this.cardErrors = null;
    }
    switch (event.elementType) {
      case 'cardNumber':
      this.cardNumberValid = event.complete; break;
      case 'cardExpiry':
      this.cardExpiryValid = event.complete; break;
      case 'cardCvc':
      this.cardCvcValid = event.complete; break;
    }
  }
  async submitOrder() {
    this.loading = true;
    const order: IOrderToCreate = this.createOrderObject();
    try {
      const orderReturnedFromAPI: IOrderToReturn = await this.createOrderAPI(
        order
      );
      const basket: IBasket = this.basketService.getCurrentValue();
      const paymentResult = await this.createStripePayment(basket);
      if (paymentResult === null) {
        this.toastr.error('Basket is empty');
      } else if (paymentResult.paymentIntent) {
        this.basketService.removeBasket(basket.id);
        const extra: NavigationExtras = { state: orderReturnedFromAPI };
        this.router.navigateByUrl('checkout/success', extra);
      } else {
        this.toastr.error(paymentResult.error.message);
      }
      this.loading = false;
    } catch (err) {
      this.toastr.error(err.message);
      this.loading = false;
    }
  }
  private async createStripePayment(basket) {
    if (basket) {
      return this.stripe.confirmCardPayment(basket.clientSecret, {
        payment_method: {
          card: this.cardNumber,
          billing_details: {
            name: this.checkOutForm.get('paymentForm').get('nameOnCard').value,
          },
        },
      });
    } else {
      return null;
    }
  }
  private async createOrderAPI(order: IOrderToCreate) {
    return this.checkoutService.createOrder(order).toPromise();
  }

  private createOrderObject(): IOrderToCreate {
    return {
      basketId: localStorage.getItem('bskid'),
      deliveryMethodId: +this.checkOutForm
        .get('deliveryForm')
        .get('deliveryMethod').value,
      shippingAddress: this.checkOutForm.get('addressForm').value,
    };
  }
}
