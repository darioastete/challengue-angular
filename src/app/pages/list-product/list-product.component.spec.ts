import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductComponent } from './list-product.component';
import { ProductListService } from 'src/app/services/product-list.service';
import { of, throwError } from 'rxjs';
import { Product } from 'src/app/models/product.model';

describe('ListProductComponent', () => {
  let component: ListProductComponent;
  let fixture: ComponentFixture<ListProductComponent>;
  let productListServiceSpy: jest.Mocked<ProductListService>;

  beforeEach(() => {
    productListServiceSpy = {
      getProducts: jest.fn(),
      searchProducts: jest.fn(),
    } as any;
    TestBed.configureTestingModule({
      declarations: [ListProductComponent],
      providers: [
        { provide: ProductListService, useValue: productListServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(ListProductComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get products on initialization', () => {
    const products = [
      { id: '1', name: 'Product 1', date_release: new Date(), date_revision: new Date() },
      { id: '2', name: 'Product 2', date_release: new Date(), date_revision: new Date() },
    ];
    productListServiceSpy.getProducts.mockReturnValue(of(products as Product[]));
    component.ngOnInit();
    expect(productListServiceSpy.getProducts).toHaveBeenCalled();
    expect(component.allProducts).toEqual(products);
    expect(component.products).toEqual(products.slice(0, component.recordsPerPage));
    expect(component.resultCount).toEqual(products.length);
  });

  // it('should handle error when getting products', () => {
  //   const error = new Error('Failed to get products');
  //   productListServiceSpy.getProducts.mockReturnValue(throwError({ error }));
  //   component.ngOnInit();
  //   expect(productListServiceSpy.getProducts).toHaveBeenCalled();
  //   expect(console.error).toHaveBeenCalledWith('Error al obtener productos:', error);
  // });


  it('should search for products', () => {
    const query = 'search query';
    const searchedProducts:Product[] = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: 'Logo 1', date_release: new Date(), date_revision: new Date() },
    ];
    productListServiceSpy.searchProducts.mockReturnValue(searchedProducts);
    component.onSearch(query);
    expect(productListServiceSpy.searchProducts).toHaveBeenCalledWith(component.allProducts, query);
    expect(component.products).toEqual(searchedProducts);
    expect(component.resultCount).toEqual(searchedProducts.length);
    expect(component.search).toBeTruthy();
  });

  it('should handle records per page change', () => {
    const recordsPerPage = 10;
    component.onRecordsPerPageChange(recordsPerPage);
    expect(component.recordsPerPage).toEqual(recordsPerPage);
    expect(component.products).toEqual(component.allProducts.slice(0, recordsPerPage));
  });
});
