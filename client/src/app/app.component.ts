import { BasketService } from './basket/basket.service';
import { IPagination } from './shared/models/pagination';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './shared/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ECommerce';
  constructor(private service: BasketService) {}
  ngOnInit(): void {
    const id = localStorage.getItem('bskid');
    if (id) {
      this.service.getBasket(id).subscribe(
        () => {
          console.log('basket initalized');
        },
        (err) => console.log(err)
      );
    }
  }
}
