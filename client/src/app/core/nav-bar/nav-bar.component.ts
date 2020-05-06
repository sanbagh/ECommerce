import { AccountService } from './../../account/account.service';
import { Observable } from 'rxjs';
import { BasketService } from './../../basket/basket.service';
import { Component, OnInit } from '@angular/core';
import { IBasket } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  basket$: Observable<IBasket>;
  user$: Observable<IUser>;
  constructor(private service: BasketService, private accountService: AccountService) { }

  ngOnInit() {
    this.basket$ = this.service.basket$;
    this.user$ = this.accountService.user$;
  }
  logout() {
    this.accountService.logout();
  }
}
