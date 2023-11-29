import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProductSearchComponent } from './product-search.component';

describe('ProductSearchComponent', () => {
  let component: ProductSearchComponent;
  let fixture: ComponentFixture<ProductSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductSearchComponent]
    });
    fixture = TestBed.createComponent(ProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should emit searchQuery event on onSearch', () => {
    const inputValue = 'search term';
    const emitSpy = jest.spyOn(component.searchQuery, 'emit');
    component.onSearch({ target: { value: inputValue } });
    expect(emitSpy).toHaveBeenCalledWith(inputValue);
  });

  it('should not emit searchQuery event if no value is provided', () => {
    const emitSpy = jest.spyOn(component.searchQuery, 'emit');
    component.onSearch({ target: {} });
    expect(emitSpy).not.toHaveBeenCalled();
  });

});
