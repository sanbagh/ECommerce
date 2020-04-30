import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from './../shop.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  constructor(private service: ShopService, private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getProduct(+this.activedRoute.snapshot.paramMap.get('id'));
  }
  getProduct(id: number) {
    this.service.getProduct(id).subscribe( x => {
      this.product = x;
    }, err => console.log(err));
  }
}
