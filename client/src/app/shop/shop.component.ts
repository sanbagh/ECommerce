import { IType } from './../shared/models/productTypes';
import { IBrands } from './../shared/models/brands';
import { ShopService } from './shop.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: IProduct[] = [];
  brands: IBrands[] = [];
  types: IType[] = [];
  @ViewChild('searchInput', { static: true }) searchTerm: ElementRef;
  params = new ShopParams();
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: low to high', value: 'priceAsc' },
    { name: 'Price high to low', value: 'priceDesc' },
  ];

  constructor(private service: ShopService) {}

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }
  getProducts() {
    this.service.getProducts(this.params).subscribe(
      (pagination) => {
        this.products = pagination.data;
        this.params.totalItems = pagination.count;
        this.params.pageSize = pagination.pageSize;
      },
      (err) => console.log(err)
    );
  }
  getBrands() {
    this.service.getBrands().subscribe(
      (brands) => {
        this.brands = [{ id: 0, name: 'All' }, ...brands];
      },
      (err) => console.log(err)
    );
  }
  getTypes() {
    this.service.getTypes().subscribe(
      (types) => {
        this.types = [{ id: 0, name: 'All' }, ...types];
      },
      (err) => console.log(err)
    );
  }
  onBrandChange(brandId: number) {
    this.params.brandId = brandId;
    this.params.pageIndex = 1;
    this.getProducts();
  }
  onTypeChange(typeId: number) {
    this.params.typeId = typeId;
    this.params.pageIndex = 1;
    this.getProducts();
  }
  onSortChange(sort: string) {
    this.params.sort = sort;
    this.getProducts();
  }
  onPageChanged(pageNumber: number) {
    if (this.params.pageIndex !== pageNumber) {
      this.params.pageIndex = pageNumber;
      this.getProducts();
    }
  }
  onSearch() {
    this.params.search = this.searchTerm.nativeElement.value;
    this.params.pageIndex = 1;
    this.getProducts();
  }
  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.params = new ShopParams();
    this.getProducts();
  }
}
