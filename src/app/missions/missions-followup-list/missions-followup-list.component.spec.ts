import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsFollowupListComponent } from './missions-followup-list.component';

describe('MissionsFollowupListComponent', () => {
  let component: MissionsFollowupListComponent;
  let fixture: ComponentFixture<MissionsFollowupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionsFollowupListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionsFollowupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
