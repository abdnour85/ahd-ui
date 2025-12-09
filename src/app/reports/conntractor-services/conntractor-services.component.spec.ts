import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsConntractorServicesComponent } from './conntractor-services.component';

describe('ReportsConntractorServicesComponent', () => {
  let component: ReportsConntractorServicesComponent;
  let fixture: ComponentFixture<ReportsConntractorServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsConntractorServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsConntractorServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
