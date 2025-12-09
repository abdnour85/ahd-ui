import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInvoicesListComponent } from './list.component';

describe('StockInvoicesListComponent', () => {
  let component: StockInvoicesListComponent;
  let fixture: ComponentFixture<StockInvoicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockInvoicesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockInvoicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
