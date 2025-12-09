import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsViewComponent } from './missions-view.component';

describe('MissionsViewComponent', () => {
  let component: MissionsViewComponent;
  let fixture: ComponentFixture<MissionsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
