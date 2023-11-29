import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductListService } from './product-list.service';
import { environment } from './../../environments/environment';
import { Product } from '../models/product.model';
describe('ProductListService', () => {
  let service: ProductListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductListService],
    });
    service = TestBed.inject(ProductListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve products via GET', () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Test Product',
        description: 'Description 1',
        logo: 'logo1.png',
        date_release: new Date('2021-01-01'),
        date_revision: new Date('2021-06-01'),
      },
    ];

    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(1);
      expect(products).toEqual(mockProducts);
    });

    const request = httpMock.expectOne(`${environment.apiUrl}/bp/products`);
    expect(request.request.method).toBe('GET');
    request.flush(mockProducts);
  });

  it('should create a product and return it', () => {
    const newProduct: Product = {
      id: '2',
      name: 'New Product',
      description: 'Description 2',
      logo: 'logo2.png',
      date_release: new Date('2022-01-01'),
      date_revision: new Date('2022-06-01'),
    };

    service.createProduct(newProduct).subscribe((product) => {
      expect(product).toEqual(newProduct);
    });

    const request = httpMock.expectOne(`${environment.apiUrl}/bp/products`);
    expect(request.request.method).toBe('POST');
    request.flush(newProduct);
  });

  it('should delete a product', () => {
    const productId = '2';

    service.deleteProduct(productId).subscribe((res) => {
      expect(res).toBeUndefined();
    });

    const request = httpMock.expectOne(
      `${environment.apiUrl}/bp/products?id=${productId}`,
    );
    expect(request.request.method).toBe('DELETE');
    request.flush({});
  });
});
