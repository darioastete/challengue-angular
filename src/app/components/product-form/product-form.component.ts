import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { ProductListService } from 'src/app/services/product-list.service';
import { Observable, map, catchError, of} from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  @Output() addProduct = new EventEmitter<any>();
  productForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private productList:ProductListService){
    this.productForm = this.buildProductForm();
  }


  ngOnInit(){
    this.productForm.get('date_release')?.valueChanges.subscribe(() => {
      this.validateDateFields();
    });
  }

  private validateDateFields(): void {
    const dateReleaseControl = this.productForm.get('date_release');
    const dateRevisionControl = this.productForm.get('date_revision');

    dateReleaseControl?.setValidators([Validators.required, this.validateReleaseDate.bind(this)]);
    dateRevisionControl?.setValidators([Validators.required, this.validateReviewDate.bind(this)]);

    dateReleaseControl?.updateValueAndValidity();
    dateRevisionControl?.updateValueAndValidity();
  }



  validateReleaseDate(control: AbstractControl) {
    let releaseDate = control.value;

    if (!releaseDate) {
      return null; // Manejar el caso en que reviewDate no esté presente
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

    const releaseDate = new Date(this.productForm.get('date_release')!.value + 'T00:00:00');
    const oneYearAfterRelease = new Date(releaseDate);
    oneYearAfterRelease.setFullYear(releaseDate.getFullYear() + 1);

    return reviewDate === oneYearAfterRelease.toISOString().split('T')[0]
    ? null
    : { invalidReviewDate: true };
  }


  onSubmit() {
    if (this.productForm.valid) {
      this.addProduct.emit(this.productForm.value);
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


  private validateProductId(control: AbstractControl): Observable<ValidationErrors | null> {
    const id = control.value;
    return this.productList.verifyProductId(id).pipe(
      map((exists: boolean) => (exists ? { productIdExists: true } : null)),
      catchError(() => of(null))
    );
  }
}
