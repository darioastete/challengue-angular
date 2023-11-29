import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductListService } from 'src/app/services/product-list.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {

  product:Product | null = null;
  state:any;
  constructor(private router:Router, private productListService:ProductListService){
    const state = this.getCurrentNavigationExtras();
    if (state) {
      this.product = state.productData;
    }else {
      router.navigate(['/']);
    }

  }

  onEditProduct(product:Product){
    this.productListService.editProduct(product).subscribe({
      next: (value) => {
        this.router.navigate(['/'])
      }, error: (err) => {
        console.log(err);

      },
    })
  }

  private getCurrentNavigationExtras(): { productData: any } | null {
    if (this.router.getCurrentNavigation) {
      return this.router.getCurrentNavigation()?.extras.state as { productData: any } | null;
    }
    return null;
  }
}
