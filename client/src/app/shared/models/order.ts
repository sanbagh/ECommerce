import { IAddress } from './address';
export interface IOrderToCreate {
    basketId: string;
    deliveryMethodId: number;
    shippingAddress: IAddress;
}
export interface IOrderToReturn {
    id: number;
    buyerEmail: string;
    orderDate: string;
    orderedItems: IOrderedItem[];
    subTotal: number;
    shippingAddress: IAddress;
    deliveryMethod: string;
    shippingPrice: number;
    total: number;
    orderStatus: string;
}
export interface IOrderedItem {
    productItemId: number;
    productName: string;
    photoUrl: string;
    price: number;
    quantity: number;
}
