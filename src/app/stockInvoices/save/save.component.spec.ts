import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInvoicesSaveComponent } from './save.component';

describe('StockInvoicesSaveComponent', () => {
  let component: StockInvoicesSaveComponent;
  let fixture: ComponentFixture<StockInvoicesSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockInvoicesSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockInvoicesSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
