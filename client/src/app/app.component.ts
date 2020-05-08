import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ECommerce';
  constructor(private service: BasketService, private accountService: AccountService) {}
  ngOnInit(): void {
    this.loadBasket();
    this.loadUser();
  }

  loadUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.accountService.loadCurrentUser(token).subscribe();
    }
  }

  private loadBasket() {
    const id = localStorage.getItem('bskid');
    if (id) {
      this.service.getBasket(id).subscribe(() => {
      }, (err) => console.log(err));
    }
  }
}
