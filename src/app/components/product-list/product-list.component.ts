import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductListService } from 'src/app/services/product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() products: Product[] = [];

  constructor(private readonly productListService:ProductListService){}

}
