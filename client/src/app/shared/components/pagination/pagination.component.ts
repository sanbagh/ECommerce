import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() totalItems = 0;
  @Input() pageSize = 6;
  @Output() pageChanged = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {}
  onPageChanged(pageData: PageChangedEvent) {
    this.pageChanged.emit(pageData.page);
  }
}
