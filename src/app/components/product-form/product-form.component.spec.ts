import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProductFormComponent } from './product-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductListService } from 'src/app/services/product-list.service';
import { of } from 'rxjs';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let formBuilder: FormBuilder;
  let productListService: ProductListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: ProductListService,
          useValue: {
            verifyProductId: jest.fn(() => of(false)), // Mocking ProductListService method
          },
        },
      ],
    });
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    productListService = TestBed.inject(ProductListService);


    component.productForm = formBuilder.group({
      id: ['testId', [/* Validators here */]],
      name: ['testName', [/* Validators here */]],
      description: ['testDescription', [/* Validators here */]],
      logo: ['testLogo', [/* Validators here */]],
      date_release: ['2023-01-01', [/* Validators here */]],
      date_revision: ['2024-01-01', [/* Validators here */]],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should validate product ID asynchronously', fakeAsync(() => {
  //   // Arrange
  //   const productIdControl = component.productForm.get('id');

  //   // Set a value to trigger validation
  //   productIdControl?.setValue('existingId');

  //   // Simulate async validation completion
  //   tick();

  //   // Assert
  //   expect(productListService.verifyProductId).toHaveBeenCalledWith('existingId');
  //   expect(productIdControl?.hasError('productIdExists')).toBe(true);
  // }));

  it('should not validate product ID for initial values', fakeAsync(() => {
    // Arrange
    const productIdControl = component.productForm.get('id');

    // Set a value to trigger validation
    productIdControl?.setValue('existingId');

    // Set initial values to trigger the check for existing product ID
    component.initialValues = { /* Your initial values here */ };

    // Simulate async validation completion
    tick();

    // Assert
    expect(productListService.verifyProductId).not.toHaveBeenCalled();
    expect(productIdControl?.hasError('productIdExists')).toBe(false);
  }));
});
