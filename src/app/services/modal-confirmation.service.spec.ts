import { TestBed } from '@angular/core/testing';

import { ModalConfirmationService } from './modal-confirmation.service';

describe('ModalConfirmationService', () => {
  let service: ModalConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalConfirmationService],
    });
    service = TestBed.inject(ModalConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show modal and emit product ID', () => {
    const productId = '1';

    service.getModalVisibility().subscribe((isVisible) => {
      expect(isVisible).toBe(true);
    });

    service.getProductId().subscribe((id) => {
      expect(id).toBe(productId);
    });

    service.showModal(productId);
  });

  it('should hide modal', () => {
    service.getModalVisibility().subscribe((isVisible) => {
      expect(isVisible).toBe(false);
    });

    service.hideModal();
  });
});
