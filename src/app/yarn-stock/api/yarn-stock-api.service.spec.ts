import { TestBed } from '@angular/core/testing';

import { YarnStockApiService } from './yarn-stock-api.service';

describe('YarnStockApiService', () => {
  let service: YarnStockApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YarnStockApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
