import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AsyncValidatorFn } from '@angular/forms';
import { timer, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: string[];

  constructor(private fb: FormBuilder, private accountService: AccountService) { }

  ngOnInit() {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      displayName: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
      [this.validateEmailExists()]),
      password: this.fb.control(null, [Validators.required]),
    });
  }
  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe(() => {}, err => this.errors = err.errors);
  }
  validateEmailExists(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map( res =>  res ?  {emailExists: true} : null)
          );
        })
      );
    };
  }
}
