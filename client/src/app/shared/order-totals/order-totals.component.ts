import { BasketService } from './../../basket/basket.service';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { IBasketTotal } from '../models/basket';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {
  @Input() totals: any;
  @Input() isOrder = false;
  constructor() { }

  ngOnInit() {
  }

}
