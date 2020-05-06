import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  constructor(private service: AccountService, private acRoute: ActivatedRoute) { }

  ngOnInit() {
    this.createLoginForm();
    this.returnUrl = this.acRoute.snapshot.queryParamMap.get('returnUrl') || '/shop';
  }
  createLoginForm() {
   this.loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
    password: new FormControl('', Validators.required)
   });
  }
  onSubmit() {
    this.service.login(this.loginForm.value, this.returnUrl).subscribe();
  }
}
