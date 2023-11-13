import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  getCheckedId(list: globalType.checkboxOption[]) {
    return list.filter(item => item.checked).map(({ id }) => id);
  }
}
