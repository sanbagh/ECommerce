import { IProduct } from 'src/app/shared/models/product';
import { IType } from './../shared/models/productTypes';
import { IBrands } from './../shared/models/brands';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPagination } from '../shared/models/pagination';
import { ShopParams } from '../shared/models/shopParams';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = environment.apiUrl;
  constructor(private client: HttpClient) {}
  getProducts(shopParams: ShopParams): Observable<IPagination> {
    let params = new HttpParams();

    params = params.append('pageSize', shopParams.pageSize.toString());
    params = params.append('pageIndex', shopParams.pageIndex.toString());
    params = params.append('sort', shopParams.sort);

    if (shopParams.brandId !== 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }
    if (shopParams.typeId !== 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }
    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }
    return this.client
      .get<IPagination>(this.baseUrl + 'products', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }
  getProduct(id: number) {
    return this.client.get<IProduct>(this.baseUrl + 'products/' + id);
  }
  getBrands(): Observable<IBrands[]> {
    return this.client.get<IBrands[]>(this.baseUrl + 'products/brands');
  }
  getTypes(): Observable<IType[]> {
    return this.client.get<IType[]>(this.baseUrl + 'products/types');
  }
}
