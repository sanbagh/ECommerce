import { IUser } from './../shared/models/user';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  loginSource = new BehaviorSubject<IUser>(null);
  user$ = this.loginSource.asObservable();
  constructor(private client: HttpClient, private router: Router) {}

  loadCurrentUser(token: string) {
    let header = new HttpHeaders();
    header = header.set('Authorization', `Bearer ${token}`);
    return this.client.get(this.baseUrl + 'account', { headers: header }).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.loginSource.next(user);
        }
      })
    );
  }
  login(values: any, returnUrl?: string) {
    return this.client.post(this.baseUrl + 'account/login', values).pipe(
      map((x: IUser) => {
        if (x) {
          localStorage.setItem('token', x.token);
          this.loginSource.next(x);
          this.router.navigateByUrl(returnUrl);
        }
      })
    );
  }
  register(values: any) {
    return this.client.post(this.baseUrl + 'account/register', values).pipe(
      map((x: IUser) => {
        if (x) {
          console.log(x);
          localStorage.setItem('token', x.token);
          this.loginSource.next(x);
          this.router.navigateByUrl('/shop');
        }
      })
    );
  }
  logout() {
    localStorage.removeItem('token');
    this.loginSource.next(null);
    this.router.navigateByUrl('/');
  }
  checkEmailExists(email: string) {
    return this.client.get(this.baseUrl + 'account/emailexists?email=' + email);
  }
}
