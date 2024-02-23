import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tabGuard } from './tab.guard';

describe('tabGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tabGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
