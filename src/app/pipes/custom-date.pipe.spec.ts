import { TestBed } from '@angular/core/testing';
import { CustomDatePipe } from './custom-date.pipe';

describe('CustomDatePipe', () => {
  let pipe: CustomDatePipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomDatePipe],
    });

    // Crea una instancia del pipe a través de TestBed
    pipe = TestBed.inject(CustomDatePipe);
  });


  it('create an instance', () => {
    const pipe = new CustomDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform a valid date string to the custom format', () => {
    const inputDate = '2023-01-15T12:34:56.789Z';
    const expectedOutput = '15/01/2023';

    const result = pipe.transform(inputDate);

    expect(result).toBe(expectedOutput);
  });

  it('should transform a Date object to the custom format', () => {
    const inputDate = new Date('2023-01-15T12:34:56.789Z');
    const expectedOutput = '15/01/2023';

    const result = pipe.transform(inputDate);

    expect(result).toBe(expectedOutput);
  });

  it('should return an empty string for null or undefined input', () => {
    const resultForNull = pipe.transform(null);
    const resultForUndefined = pipe.transform(undefined);

    expect(resultForNull).toBe('');
    expect(resultForUndefined).toBe('');
  });

  it('should handle invalid date input gracefully', () => {
    const invalidDate = 'InvalidDate';
    const result = pipe.transform(invalidDate);

    expect(result).toBe('');
  });
});
