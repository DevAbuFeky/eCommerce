import { TestBed } from '@angular/core/testing';

import { MainShopFormService } from './main-shop-form.service';

describe('MainShopFormService', () => {
  let service: MainShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
