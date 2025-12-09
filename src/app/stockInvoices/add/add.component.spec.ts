import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInvoicesAddComponent } from './add.component';

describe('StockInvoicesAddComponent', () => {
  let component: StockInvoicesAddComponent;
  let fixture: ComponentFixture<StockInvoicesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockInvoicesAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockInvoicesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
