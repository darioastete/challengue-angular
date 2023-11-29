import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() resultsCount:number = 0;
  @Input() recordsPerPage:number = 5;
  @Output() recordsPerPageChange = new EventEmitter<number>();

  availableRecordsPerPage: number[] = [5, 10, 20];

  onRecordsPerPageChange(event: any) {
    const selectedValue = event?.target?.value;
    if (selectedValue) {
      this.recordsPerPageChange.emit(+selectedValue);
    }
  }
}
