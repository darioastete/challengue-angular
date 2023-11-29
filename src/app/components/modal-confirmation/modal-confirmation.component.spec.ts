import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalConfirmationComponent } from './modal-confirmation.component';
import { ModalConfirmationService } from 'src/app/services/modal-confirmation.service';
import { ProductListService } from 'src/app/services/product-list.service';
import { Subject, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ModalConfirmationComponent', () => {
  let component: ModalConfirmationComponent;
  let fixture: ComponentFixture<ModalConfirmationComponent>;
  let modalService: ModalConfirmationService;
  let productListService: ProductListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfirmationComponent],
      providers: [ModalConfirmationService, ProductListService],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ModalConfirmationComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalConfirmationService);
    productListService = TestBed.inject(ProductListService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize productId on ngOnInit', () => {
    const productId = '123';
    const subject = new Subject<string>();

    modalService.getProductId = jest.fn(() => subject);

    fixture.detectChanges();

    subject.next(productId);

    expect(component.productId).toEqual(productId);
  });

  it('should cancel and hide modal on cancel()', () => {
    const hideModalSpy = jest.spyOn(modalService, 'hideModal');

    component.cancel();

    expect(hideModalSpy).toHaveBeenCalled();
  });

  it('should delete product, emit event, and hide modal on deleteProduct()', () => {
    const productId = '123';
    const deleteProductSpy = jest.spyOn(productListService, 'deleteProduct').mockReturnValue(of(undefined));
    const emitSpy = jest.spyOn(productListService.productDeleted, 'emit');
    const hideModalSpy = jest.spyOn(modalService, 'hideModal');

    component.productId = productId;
    component.deleteProduct();

    expect(deleteProductSpy).toHaveBeenCalledWith(productId);
    expect(emitSpy).toHaveBeenCalled();
    expect(hideModalSpy).toHaveBeenCalled();
  });
});
