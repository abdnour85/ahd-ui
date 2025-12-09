import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsMissionsComponent } from './missions.component';

describe('ReportsMissionsComponent', () => {
  let component: ReportsMissionsComponent;
  let fixture: ComponentFixture<ReportsMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsMissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
