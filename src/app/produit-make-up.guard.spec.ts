import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { produitMakeUpGuard } from './produit-make-up.guard';

describe('produitMakeUpGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => produitMakeUpGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
