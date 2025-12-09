import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsContractorContractsComponent } from './contracts.component';

describe('ReportsContractorContractsComponent', () => {
  let component: ReportsContractorContractsComponent;
  let fixture: ComponentFixture<ReportsContractorContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsContractorContractsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsContractorContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
