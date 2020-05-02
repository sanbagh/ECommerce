import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationHeaderComponent } from './components/pagination-header/pagination-header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { OrderTotalsComponent } from './order-totals/order-totals.component';

@NgModule({
  declarations: [PaginationHeaderComponent, PaginationComponent, OrderTotalsComponent],
  imports: [CommonModule, PaginationModule.forRoot(), CarouselModule.forRoot(), RouterModule],
  exports: [PaginationModule, PaginationHeaderComponent, PaginationComponent, CarouselModule, OrderTotalsComponent],
})
export class SharedModule {}
