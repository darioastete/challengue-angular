import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Router, NavigationExtras } from '@angular/router';
import { ModalConfirmationService } from '../../services/modal-confirmation.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() products: Product[] = [];

  isDropdownOpen:Boolean = false;
  activeProduct: any;

  constructor(private router:Router,
    private modalService :ModalConfirmationService){}

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

  toggleDropdown(event: MouseEvent, product: any) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
    this.activeProduct = product
  }
}
