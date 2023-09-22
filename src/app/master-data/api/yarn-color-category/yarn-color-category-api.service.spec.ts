import { TestBed } from '@angular/core/testing';

import { YarnColorCategoryApiService } from './yarn-color-category-api.service';

describe('YarnColorCategoryApiService', () => {
  let service: YarnColorCategoryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YarnColorCategoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
