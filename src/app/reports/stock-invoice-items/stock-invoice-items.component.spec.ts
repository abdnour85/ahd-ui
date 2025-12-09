import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsStockInvoiceItemsComponent } from './stock-invoice-items.component';

describe('ReportsStockInvoiceItemsComponent', () => {
  let component: ReportsStockInvoiceItemsComponent;
  let fixture: ComponentFixture<ReportsStockInvoiceItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsStockInvoiceItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsStockInvoiceItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
