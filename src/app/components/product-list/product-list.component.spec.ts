import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductListComponent } from './product-list.component';
import { Router, NavigationExtras } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ModalConfirmationService } from 'src/app/services/modal-confirmation.service';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgZone,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let router: Router;
  let modalService: ModalConfirmationService;
  let ngZone: NgZone;

  @Pipe({ name: 'customDate' })
  class MockCustomDatePipe implements PipeTransform {
    transform(value: any): any {
      return value;
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent, MockCustomDatePipe],
      providers: [ModalConfirmationService],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    modalService = TestBed.inject(ModalConfirmationService);
    ngZone = TestBed.inject(NgZone);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display products from @Input', () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        logo: 'logo1.png',
        date_release: new Date(),
        date_revision: new Date(),
      },
    ];

    component.products = mockProducts;
    fixture.detectChanges();
    expect(component.products).toEqual(mockProducts);
  });

  it('should call modalService.showModal when delete is called', () => {
    const id = '123';
    const showModalSpy = jest.spyOn(modalService, 'showModal');
    component.delete(id);
    expect(showModalSpy).toHaveBeenCalledWith(id);
  });

  it('should navigate to edit-product route when edit is called', () => {
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

    ngZone.run(() => {
      component.edit(product);
    });
    expect(navigateSpy).toHaveBeenCalledWith(
      ['/edit-product', product.id],
      navigationExtras,
    );
  });
});
