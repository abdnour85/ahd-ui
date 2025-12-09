import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDestributionsPopulateComponent } from './populate.component';

describe('PaymentDestributionsPopulateComponent', () => {
  let component: PaymentDestributionsPopulateComponent;
  let fixture: ComponentFixture<PaymentDestributionsPopulateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentDestributionsPopulateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentDestributionsPopulateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
