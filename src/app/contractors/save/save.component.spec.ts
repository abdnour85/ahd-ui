import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorsSaveComponent } from './save.component';

describe('ContractorsSaveComponent', () => {
  let component: ContractorsSaveComponent;
  let fixture: ComponentFixture<ContractorsSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractorsSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorsSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
