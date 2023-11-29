import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {

  product:Product | null = null;
  state:any;
  constructor(private router:Router, private route:ActivatedRoute){
    const state = this.router.getCurrentNavigation()?.extras.state as {productData : any};
    if (state) {
      this.product = state.productData;
    }else {
      router.navigate(['/']);
    }

  }

  ngOnInit():void {
  }
  onEditProduct(product:Product){
    console.log('EDITTTTTT',product);
  }
}
