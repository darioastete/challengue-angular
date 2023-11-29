import { Component } from '@angular/core';
import { ModalConfirmationService } from 'src/app/services/modal-confirmation.service';
import { ProductListService } from 'src/app/services/product-list.service';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss']
})
export class ModalConfirmationComponent {
  isModalOpen = this.modalService.getModalVisibility();
  productId:string = '';
  constructor(public modalService: ModalConfirmationService, private readonly productListService:ProductListService) {}

  ngOnInit(): void {
    this.modalService.getProductId().subscribe({
      next: (value)=> {
        this.productId = value
      }, error(err) {
          console.log(err);
      }, complete() {
      },
    })
  }

  cancel(): void {
    this.modalService.hideModal();
  }

  deleteProduct(): void {
    this.productListService.deleteProduct(this.productId).subscribe({
      next: (_value)=> {
        this.productListService.productDeleted.emit();
      }, error: (err) => {},complete: () =>{
        this.modalService.hideModal();
      },
    })
  }

}
