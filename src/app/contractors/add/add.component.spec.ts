import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorsAddComponent } from './add.component';

describe('ContractorsAddComponent', () => {
  let component: ContractorsAddComponent;
  let fixture: ComponentFixture<ContractorsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractorsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
