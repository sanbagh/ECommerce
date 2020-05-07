import { OrderService } from './../order.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrderToReturn } from 'src/app/shared/models/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: IOrderToReturn;

  constructor(
    private service: OrderService,
    private activedRoute: ActivatedRoute,
    private bcService: BreadcrumbService) { }

  ngOnInit() {
    this.getOrder(+this.activedRoute.snapshot.paramMap.get('id'));
  }
  getOrder(id: number) {
    this.service.getOrder(id).subscribe(
      (x) => {
        this.order = x;
        this.bcService.set('@orderDetails', 'Order #' + this.order.id + '- ' + this.order.orderStatus);
      },
      (err) => console.log(err.messsage)
    );
  }

}
