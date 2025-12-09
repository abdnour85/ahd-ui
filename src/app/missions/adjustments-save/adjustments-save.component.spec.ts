import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsAdjustmentsSaveComponent } from './adjustments-save.component';

describe('MissionsAdjustmentsSaveComponent', () => {
  let component: MissionsAdjustmentsSaveComponent;
  let fixture: ComponentFixture<MissionsAdjustmentsSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionsAdjustmentsSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionsAdjustmentsSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
