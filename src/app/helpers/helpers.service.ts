import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  getCheckedId(list: globalType.checkboxOption[]) {
    return list.filter(item => item.checked).map(({ id }) => id);
  }

  formatDate(date: Date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }
}
