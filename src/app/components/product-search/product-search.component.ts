import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent {
  @Output() searchQuery = new EventEmitter<string>();

  onSearch(event:any){
    const selectedValue = event?.target?.value;
    if (selectedValue !== undefined) {
      this.searchQuery.emit(selectedValue);
    }
  }
}
