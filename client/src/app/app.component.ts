import { IPagination } from './models/pagination';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ECommerce';
  products: IProduct[] = [];
  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
    this.httpClient
      .get('https://localhost:5001/api/products?pageSize=50')
      .subscribe(
        (res: IPagination) => {
          this.products = res.data;
        },
        (err) => console.log(err)
      );
  }
}
