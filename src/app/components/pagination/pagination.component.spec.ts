import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    });
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit recordsPerPageChange event on onRecordsPerPageChange', () => {
    const selectedValue = '10';

    jest.spyOn(component.recordsPerPageChange, 'emit');
    component.onRecordsPerPageChange({ target: { value: selectedValue } });

    expect(component.recordsPerPageChange.emit).toHaveBeenCalledWith(+selectedValue);
  });

  it('should not emit recordsPerPageChange event if no value is selected', () => {
    jest.spyOn(component.recordsPerPageChange, 'emit');
    component.onRecordsPerPageChange({ target: { value: null } });

    expect(component.recordsPerPageChange.emit).not.toHaveBeenCalled();
  });
});
