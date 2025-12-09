import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsFollowupSaveComponent } from './missions-followup-save.component';

describe('MissionsFollowupSaveComponent', () => {
  let component: MissionsFollowupSaveComponent;
  let fixture: ComponentFixture<MissionsFollowupSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionsFollowupSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionsFollowupSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
