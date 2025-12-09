import { TestBed } from '@angular/core/testing';

import { StockInvoiceService } from './stock-invoice.service';

describe('StockInvoiceService', () => {
  let service: StockInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
