import { BasketService } from 'src/app/basket/basket.service';
import { AccountService } from './../account/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IAddress } from '../shared/models/address';
import { IBasketTotal } from '../shared/models/basket';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  basketTotal$: Observable<IBasketTotal>;
  constructor(private fb: FormBuilder, private  basketService: BasketService, private service: AccountService) { 
    this.basketTotal$ = this.basketService.basketTotal$;
  }

  ngOnInit() {
    this.createCheckOutForm();
    this.populateAddress();
  }
  populateAddress() {
    this.service.getAddress().subscribe( (x) => { if (x) {
      this.checkoutForm.get('addressForm').patchValue(x);
    }});
  }
  createCheckOutForm() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: this.fb.control(null, [Validators.required]),
        lastName: this.fb.control(null, [Validators.required]),
        city: this.fb.control(null, [Validators.required]),
        country: this.fb.control(null, [Validators.required]),
        state: this.fb.control(null, [Validators.required]),
        street: this.fb.control(null, [Validators.required]),
        zipCode: this.fb.control(null, [Validators.required]),
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: this.fb.control(null, [Validators.required]),
      }),
      paymentForm: this.fb.group({
        nameOnCard: this.fb.control(null, [Validators.required]),
      })
    });
  }

}
