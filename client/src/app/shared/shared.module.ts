import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationHeaderComponent } from './components/pagination-header/pagination-header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';

@NgModule({
  declarations: [
    PaginationHeaderComponent,
    PaginationComponent,
    OrderTotalsComponent,
    TextInputComponent,
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    RouterModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    PaginationModule,
    PaginationHeaderComponent,
    PaginationComponent,
    CarouselModule,
    OrderTotalsComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent
  ],
})
export class SharedModule {}
