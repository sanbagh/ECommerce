import { IBasketItem } from './../shared/models/basket-item';
import { IProduct } from 'src/app/shared/models/product';
import { Basket, IBasket, IBasketTotal } from './../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private subject = new BehaviorSubject(null);
  basket$ = this.subject.asObservable();
  private subjectTotal = new BehaviorSubject(null);
  basketTotal$ = this.subjectTotal.asObservable();
  constructor(private client: HttpClient) {}

  getBasket(id: string) {
    return this.client.get<IBasket>(this.baseUrl + 'basket?id=' + id).pipe(
      map((basket) => {
        this.subject.next(basket);
        this.calculateTotal();
      })
    );
  }
  updateBasket(basket: IBasket) {
    return this.client
      .post<IBasket>(this.baseUrl + 'basket', basket)
      .subscribe((x) => {
        this.subject.next(x);
        this.calculateTotal();
      });
  }
  incrementQuantity(id: number) {
    const basket: IBasket = this.getCurrentValue();
    if (basket === null || basket.items.length === 0) {
      return;
    }
    const item = basket.items.find((x) => x.id === id);
    if (item === null) {
      return;
    }
    item.quantity += 1;
    this.updateBasket(basket);
  }
  decrementQuantity(id: number) {
    const basket: IBasket = this.getCurrentValue();
    if (basket === null || basket.items.length === 0) {
      return;
    }
    const item = basket.items.find((x) => x.id === id);
    if (item === null) {
      return;
    }
    if (item.quantity <= 1) {
      basket.items = basket.items.filter((x) => x.id !== id);
    } else {
      item.quantity -= 1;
    }
    if (basket.items.length > 0) {
      this.updateBasket(basket);
    } else {
      this.removeBasket(basket.id);
    }
  }
  getItemQuantity(id: number) {
    const basket: IBasket = this.getCurrentValue();
    if (basket === null || basket.items.length === 0) {
      return;
    }
    const item = basket.items.find((x) => x.id === id);
    if (item === null) { return; }
    return item.quantity;
  }
  removeItem(id: number) {
    const basket: IBasket = this.getCurrentValue();
    if (basket === null || basket.items.length === 0) {
      return;
    }
    const item = basket.items.find((x) => x.id === id);
    if (item === null) { return; }
    basket.items = basket.items.filter((x) => x.id !== id);

    if (basket.items.length > 0) {
      this.updateBasket(basket);
    } else {
      this.removeBasket(basket.id);
    }
  }
  removeBasket(id: string) {
    this.client.delete(this.baseUrl + 'basket?id=' + id).subscribe( () => {
      this.subject.next(null);
      this.subjectTotal.next(null);
      localStorage.removeItem('bskid');
    });
  }
  getCurrentValue() {
    return this.subject.value;
  }
  calculateTotal() {
    const basket: IBasket = this.getCurrentValue();
    if (basket === null || basket.items.length === 0) {
      return 0;
    }
    const subtotal = basket.items.reduce(
      (pre, cur) => cur.price * cur.quantity + pre,
      0
    );
    const shippingCharge = 0;
    const total = shippingCharge + subtotal;
    this.subjectTotal.next({ shippingCharge, subtotal, total });
  }
  addItemToBasket(item: IProduct, quantity = 1) {
    const bskitem: IBasketItem = this.mapProductToBasketItem(item, quantity);
    let basket = this.getCurrentValue();
    if (basket === null) {
      basket = this.createBasket();
    }
    basket.items = this.addOrUpdateItem(basket.items, bskitem, quantity);
    this.updateBasket(basket);
  }
  private addOrUpdateItem(
    items: IBasketItem[],
    bskitem: IBasketItem,
    quantity: number
  ) {
    const item = items.find((x) => x.id === bskitem.id);
    if (item) {
      item.quantity += quantity;
    } else {
      bskitem.quantity = quantity;
      items.push(bskitem);
    }
    return items;
  }
  private createBasket() {
    const basket = new Basket();
    localStorage.setItem('bskid', basket.id);
    return basket;
  }
  private mapProductToBasketItem(item: IProduct, quantity: number) {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      photoUrl: item.photoUrl,
      brand: item.productBrand,
      type: item.producType,
    };
  }
}
