import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductComponent } from './edit-product.component';
import { Router } from '@angular/router';
import { ProductListService } from 'src/app/services/product-list.service';
import { Product } from 'src/app/models/product.model';
import { of, throwError } from 'rxjs';

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let routerSpy: jest.Mocked<Router>;
  let productListServiceSpy: jest.Mocked<ProductListService>;

  beforeEach(() => {
    routerSpy = {
      navigate: jest.fn(),
    } as any;

    productListServiceSpy = {
      editProduct: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      declarations: [EditProductComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ProductListService, useValue: productListServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('onEditProduct', () => {
    it('should navigate to "/" on successful edit', () => {
      const product: Product = { id: '1', name: 'Product', description: 'Description', logo: 'Logo', date_release: new Date(), date_revision: new Date() };
      productListServiceSpy.editProduct.mockReturnValue(of(product));
      component.onEditProduct(product);
      expect(productListServiceSpy.editProduct).toHaveBeenCalledWith(product);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });

    // it('should log an error on edit failure', () => {
    //   // Arrange
    //   const product: Product = { id: '1', name: 'Product', description: 'Description', logo: 'Logo', date_release: new Date(), date_revision: new Date() };
    //   const error = new Error('Edit failed');
    //   productListServiceSpy.editProduct.mockReturnValue(throwError({ error, value: null }));
    //   const consoleErrorSpy = jest.spyOn(console, 'error');

    //   // Act
    //   component.onEditProduct(product);

    //   // Assert
    //   expect(productListServiceSpy.editProduct).toHaveBeenCalledWith(product);
    //   expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);

    //   expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    // });

    // it('should navigate to "/" when state is falsy in constructor', () => {
    //   // Arrange
    //   const product: Product = { id: '1', name: 'Product', description: 'Description', logo: 'Logo', date_release: new Date(), date_revision: new Date() };
    //   const navigateSpy = jest.spyOn(routerSpy, 'navigate');
    //   jest.spyOn(routerSpy, 'getCurrentNavigation').mockReturnValue({ extras: { state: null } } as any);

    //   // Act
    //   component = new EditProductComponent(routerSpy, productListServiceSpy);

    //   // Assert
    //   expect(navigateSpy).toHaveBeenCalledWith(['/']);
    // });
  });
});
