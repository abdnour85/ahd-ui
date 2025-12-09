import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsMissionComponent } from './mission.component';

describe('ReportsMissionComponent', () => {
  let component: ReportsMissionComponent;
  let fixture: ComponentFixture<ReportsMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsMissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
