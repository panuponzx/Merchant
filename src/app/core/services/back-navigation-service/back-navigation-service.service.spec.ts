import { TestBed } from '@angular/core/testing';

import { BackNavigationServiceService } from './back-navigation-service.service';

describe('BackNavigationServiceService', () => {
  let service: BackNavigationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackNavigationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
