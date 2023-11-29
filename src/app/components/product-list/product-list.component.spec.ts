import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductListComponent } from './product-list.component';
import { Router, NavigationExtras } from '@angular/router';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ModalConfirmationService } from 'src/app/services/modal-confirmation.service';
import { NgZone } from '@angular/core';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let router: Router;
  let modalService: ModalConfirmationService;

  let ngZone: NgZone;
  beforeEach(() => {
    ngZone = TestBed.inject(NgZone);
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [ModalConfirmationService],
      imports: [RouterTestingModule],
    });

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    modalService = TestBed.inject(ModalConfirmationService);
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call modalService.showModal when delete is called', () => {
    // Arrange
    const id = '123';
    const showModalSpy = jest.spyOn(modalService, 'showModal');

    // Act
    component.delete(id);

    // Assert
    expect(showModalSpy).toHaveBeenCalledWith(id);
  });

  it.only('should navigate to edit-product route when edit is called', () => {
    // Arrange
    const product: Product = {
      id: '123',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'test_logo.png',
      date_release: new Date(),
      date_revision: new Date(),
    };
    const navigationExtras: NavigationExtras = {
      state: {
        productData: product,
      },
    };

    const navigateSpy = jest.spyOn(router, 'navigate');

    // Act
    component.edit(product);

    // Assert
    expect(navigateSpy).toHaveBeenCalledWith(['/edit-product', product.id], navigationExtras);
  });
});
