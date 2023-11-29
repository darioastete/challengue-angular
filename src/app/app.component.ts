import { Component } from '@angular/core';
import { Product } from './models/product.model';
import { ProductListService } from './services/product-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Challengue';
}
