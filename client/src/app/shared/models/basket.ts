import { IBasketItem } from './basket-item';
import { v4 as uuidv4 } from 'uuid';
export interface IBasket {
  id: string;
  items: IBasketItem[];
  deliveryMethodId?: number;
  clientSecret?: string;
  paymentIntentId?: string;
}
export class Basket implements IBasket {
  id = uuidv4();
  items: IBasketItem[] = [];
}

export interface IBasketTotal {
  shippingCharge: number;
  subtotal: number;
  total: number;
}
