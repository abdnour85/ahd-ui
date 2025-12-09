import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionPaymentDistributionsComponent } from './payment-distributions.component';

describe('MissionPaymentDistributionsComponent', () => {
  let component: MissionPaymentDistributionsComponent;
  let fixture: ComponentFixture<MissionPaymentDistributionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionPaymentDistributionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionPaymentDistributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
