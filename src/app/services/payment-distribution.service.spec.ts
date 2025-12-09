import { TestBed } from '@angular/core/testing';

import { PaymentDistributionService } from './payment-distribution.service';

describe('PaymentDistributionService', () => {
  let service: PaymentDistributionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentDistributionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
