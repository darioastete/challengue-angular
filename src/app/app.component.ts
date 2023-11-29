import { Component } from '@angular/core';
import { Product } from './models/product.model';
import { ProductListService } from './services/product-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'challengue';
  allProducts: Product[] = [];
  products: Product[] = [];
  recordsPerPage:number = 5;
  resultCount:number = 0;

  constructor (private readonly productListService:ProductListService){}

  ngOnInit(){
    this.getProducts();
  }

  getProducts(){
    this.productListService.getProducts().subscribe({
      next: (value:Product[]) => {
        this.allProducts = value;
        this.resultCount = value.length;
        this.products = value.slice(0, this.recordsPerPage)
      },
      error: err => { console.log(err);},
      complete: ()=> console.log('complete')
    })
  }

  onSearch(query:string) {
    this.products = this.productListService.searchProducts(this.allProducts,query);
    this.resultCount = this.products.length;
    this.updateDisplayedProducts();
  }

  onRecordsPerPageChange(recordsPerPage: number) {
    this.recordsPerPage = recordsPerPage;
    this.updateDisplayedProducts();
  }

  private updateDisplayedProducts(){
    this.products = this.products.slice(0, this.recordsPerPage);
  }

  onAddProduct(product:Product){
    console.log('',product);
    this.productListService.createProduct(product).subscribe({
      next(value) {
          console.log(value);

      },
      error(err) {
          console.log(err);

      },
      complete() {
          console.log('complete');

      },
    })
  }
}
