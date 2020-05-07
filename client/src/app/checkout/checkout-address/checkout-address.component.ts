import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../../account/account.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss'],
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkOutForm: FormGroup;
  constructor(private service: AccountService, private toastr: ToastrService) {}

  ngOnInit() {}
  saveOrUpdateAddress() {
    this.service
      .updateAddress(this.checkOutForm.get('addressForm').value)
      .subscribe(() => this.toastr.success('Address updated successfully'), err => this.toastr.error(err.message));
  }
}
