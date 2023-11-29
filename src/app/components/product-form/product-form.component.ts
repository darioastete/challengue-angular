import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { ProductListService } from 'src/app/services/product-list.service';
import { Observable, map, catchError, of} from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  @Input() initialValues: any;
  @Output() sendProduct = new EventEmitter<any>();
  productForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private productList:ProductListService){
    this.productForm = this.buildProductForm();
  }


  ngOnInit(){
    if (this.initialValues) {
      this.initialValues.date_release = new Date(this.initialValues.date_release).toISOString().split('T')[0];
      this.initialValues.date_revision = new Date(this.initialValues.date_revision).toISOString().split('T')[0];
      this.productForm.patchValue(this.initialValues);
      this.productForm.markAllAsTouched();
    }

    this.productForm.get('date_release')?.valueChanges.subscribe(() => {
      this.validateDateFields();
    });
  }

  private validateDateFields(): void {
    const dateRevisionControl = this.productForm.get('date_revision');
    dateRevisionControl?.updateValueAndValidity();
  }



  validateReleaseDate(control: AbstractControl) {
    let releaseDate = control.value;

    if (!releaseDate) {
      return null;
    }
    releaseDate = new Date(control.value + 'T00:00:00');
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return releaseDate.getTime() >= currentDate.getTime() ? null : { invalidReleaseDate: true };
  }

  validateReviewDate(control: AbstractControl) {
    let reviewDate = control.value;

    if (!reviewDate) {
      return null;
    }

    reviewDate = new Date(control.value + 'T00:00:00');

    const releaseDate = new Date(this.productForm.get('date_release')?.value + 'T00:00:00');

    const oneYearAfterRelease = new Date(releaseDate);
    oneYearAfterRelease.setFullYear(releaseDate.getFullYear() + 1);

    return reviewDate.getTime() === oneYearAfterRelease.getTime()
      ? null
      : { invalidReviewDate: true };
  }


  onSubmit() {
    if (this.productForm.valid) {
      this.sendProduct.emit(this.productForm.value);
      this.productForm.reset();
    }
  }


  shouldShowError(controlName: string, errorType: string) {
    const control = this.productForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched) && control?.hasError(errorType);
  }

  resetForm() {
    this.productForm.reset();
  }

  canResetForm() {
    return Object.values(this.productForm.controls).some(control => control.dirty || control.touched);
  }


  private buildProductForm(): FormGroup {
    return this.formBuilder.group({
      id: ['', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        asyncValidators: [this.validateProductId.bind(this)],
        updateOn: 'blur'
      }],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: [ '', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required, this.validateReleaseDate.bind(this)]],
      date_revision: ['', [Validators.required, this.validateReviewDate.bind(this)]]
    });
  }


  validateProductId(control: AbstractControl): Observable<ValidationErrors | null> {
    if (this.initialValues) {
      return of(null);
    }
    const id = control.value;
    return this.productList.verifyProductId(id).pipe(
      map((exists: boolean) => (exists ? { productIdExists: true } : null)),
      catchError(() => of(null))
    );
  }
}
