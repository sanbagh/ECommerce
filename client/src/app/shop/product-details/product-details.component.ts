import { IProduct } from './../../shared/models/product';
import { BasketService } from './../../basket/basket.service';
import { ShopService } from './../shop.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IBasketItem } from 'src/app/shared/models/basket-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 1;
  constructor(
    private service: ShopService,
    private activedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private bservice: BasketService
  ) {}

  ngOnInit() {
    this.getProduct(+this.activedRoute.snapshot.paramMap.get('id'));
  }
  getProduct(id: number) {
    this.service.getProduct(id).subscribe(
      (x) => {
        this.product = x;
        this.updateQuantity();
        this.bcService.set('@proudctDetails', this.product.name);
      },
      (err) => console.log(err)
    );
  }
  addItemToCart() {
    this.bservice.addItemToBasket(this.product, this.quantity);
  }
  incrementQuantity() {
     this.bservice.incrementQuantity(this.product.id);
     this.updateQuantity();
  }
  decrementQuantity(item: IBasketItem) {
    this.bservice.decrementQuantity(this.product.id);
    this.updateQuantity();
  }
  private updateQuantity() {
    const quantity = this.bservice.getItemQuantity(this.product.id);
    if (quantity) {
      this.quantity = quantity;
    } else {
      this.quantity = 1;
    }
  }
}
