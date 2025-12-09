import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsMissionsServicesComponent } from './missions-services.component';

describe('ReportsMissionsServicesComponent', () => {
  let component: ReportsMissionsServicesComponent;
  let fixture: ComponentFixture<ReportsMissionsServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsMissionsServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsMissionsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
