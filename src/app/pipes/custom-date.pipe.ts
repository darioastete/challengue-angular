import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: Date | string | null | undefined): string {
  if (!value) {
      return '';
  }

  const date = this.parseDate(value);

    if (isNaN(date.getTime())) {
      return '';
    }

  const year = date.getUTCFullYear();
  const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
  const day = ('0' + date.getUTCDate()).slice(-2);
  return `${day}/${month}/${year}`;
  }

  private parseDate(value: Date | string): Date {
    return typeof value === 'string' ? new Date(value) : value;
  }

}
