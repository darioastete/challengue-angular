import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductListService } from 'src/app/services/product-list.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {


  constructor(private readonly productListService : ProductListService, private datePipe: DatePipe){
  }


  ngOnInit(){
  }

  onAddProduct(product:Product){

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


  onSubmit(){}



}
