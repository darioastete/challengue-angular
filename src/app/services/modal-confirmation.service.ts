import { Injectable, EventEmitter} from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ModalConfirmationService {

  private isModalVisible = new Subject<boolean>();
  private productIdSource = new Subject<string>();

  showModal(id:string): void {
    this.productIdSource.next(id);
    this.isModalVisible.next(true);
  }

  hideModal(): void {
    this.isModalVisible.next(false);
  }

  getModalVisibility(): Subject<boolean> {
    return this.isModalVisible;
  }

  getProductId(): Subject<string> {
    return this.productIdSource;
  }
}
