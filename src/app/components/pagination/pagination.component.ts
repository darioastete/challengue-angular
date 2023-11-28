import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() resultsCount:number = 0;
  @Output() recordsPerPageChange: EventEmitter<number> = new EventEmitter<number>();
}
