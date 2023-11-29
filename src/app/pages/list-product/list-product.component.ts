import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductListService } from 'src/app/services/product-list.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent {
  allProducts: Product[] = [];
  products: Product[] = [];
  recordsPerPage:number = 5;
  resultCount:number = 0;
  search = false;

  constructor (private readonly productListService:ProductListService){}

  ngOnInit():void{
    if (this.productListService.productDeleted) {
      this.productListService.productDeleted.subscribe(() => {
        this.getProducts();
      });
    }
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
      // complete: ()=>
    })
  }

  formatDate(date:Date):string{
    return date.toISOString().split('T')[0];
  }

  onSearch(query:string) {
    this.search = true;
    this.products = this.productListService.searchProducts(this.allProducts,query);
    this.resultCount = this.products.length;
    this.updateDisplayedProducts();
  }

  onRecordsPerPageChange(recordsPerPage: number) {
    this.recordsPerPage = recordsPerPage;
    this.updateDisplayedProducts();
  }

  private updateDisplayedProducts(){
    if (this.search) {
      this.products = this.products.slice(0, this.recordsPerPage);
    }else {
      this.products = this.allProducts.slice(0, this.recordsPerPage);
    }
  }


}
