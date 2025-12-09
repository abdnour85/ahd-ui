import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorBusinessStatementComponent } from './contractor-business-statement.component';

describe('ContractorBusinessStatementComponent', () => {
  let component: ContractorBusinessStatementComponent;
  let fixture: ComponentFixture<ContractorBusinessStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractorBusinessStatementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorBusinessStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
