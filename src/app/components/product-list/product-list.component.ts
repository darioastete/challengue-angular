import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ModalConfirmationService } from 'src/app/services/modal-confirmation.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() products: Product[] = [];

  constructor(private router:Router, private modalService:ModalConfirmationService){}

  ngOnInit(){}

  delete(id:string){
    this.modalService.showModal(id);
  }

  edit(product:Product){
    const navigationExtras: NavigationExtras = {
      state: {
        productData:product
      }
    }

    this.router.navigate(['/edit-product', product.id], navigationExtras);
  };


}
