import { TestBed } from '@angular/core/testing';

import { UserManagementApiService } from './user-management-api.service';

describe('UserManagementApiService', () => {
  let service: UserManagementApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserManagementApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
