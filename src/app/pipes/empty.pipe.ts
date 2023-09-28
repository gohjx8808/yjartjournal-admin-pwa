import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empty',
})
export class EmptyPipe implements PipeTransform {
  transform<T>(value: T | undefined | null): T | string {
    if (value === undefined || value === null || value === '') {
      return '-';
    }
    if (typeof value === 'number' && isNaN(value)) {
      return '-';
    }
    if (typeof value === 'object' && Object.keys(value).length === 0) {
      return '-';
    }
    return value;
  }
}
