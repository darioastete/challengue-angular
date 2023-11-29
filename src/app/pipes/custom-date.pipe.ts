import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: Date | string | null | undefined): string {
  if (!value) {
      return '';
  }

  const date = typeof value === 'string' ? new Date(value) : value;
  const year = date.getUTCFullYear();
  const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
  const day = ('0' + date.getUTCDate()).slice(-2);
  // return `${year}/${month}/${day}`;
  return `${day}/${month}/${year}`;
  }

}
