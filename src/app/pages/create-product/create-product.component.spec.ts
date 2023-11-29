import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductComponent } from './create-product.component';
import { ProductListService } from 'src/app/services/product-list.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductFormComponent } from 'src/app/components/product-form/product-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let productListService: ProductListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProductComponent, ProductFormComponent],
      imports:[HttpClientTestingModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers:[ProductListService]
    });
    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    productListService = TestBed.inject(ProductListService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createProduct method on onAddProduct', () => {
    const mockProduct: Product = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: new Date(),
      date_revision: new Date()
    };

    jest.spyOn(productListService, 'createProduct').mockReturnValue(of(mockProduct));
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    component.onAddProduct(mockProduct);

    expect(productListService.createProduct).toHaveBeenCalledWith(mockProduct);
    expect(consoleSpy).toHaveBeenCalledWith('complete');
  });
});
