import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination-header',
  templateUrl: './pagination-header.component.html',
  styleUrls: ['./pagination-header.component.scss']
})
export class PaginationHeaderComponent implements OnInit {
 @Input() totalItems = 0 ;
 @Input() pageIndex = 1;
 @Input() pageSize = 6;
  constructor() { }

  ngOnInit() {
  }

}
