import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ProductListService } from 'src/app/services/product-list.service';

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

    reviewDate = new Date(control.value + 'T00:00:00');

    const releaseDate = new Date(this.productForm.get('releaseDate')?.value + 'T00:00:00');

    const oneYearAfterRelease = new Date(releaseDate);
    oneYearAfterRelease.setFullYear(releaseDate.getFullYear() + 1);

    return reviewDate.getTime() === oneYearAfterRelease.getTime()
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


  private buildProductForm(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: [ '', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      releaseDate: ['', [Validators.required, this.validateReleaseDate.bind(this)]],
      reviewDate: ['', [Validators.required, this.validateReviewDate.bind(this)]]
    });
  }
}
