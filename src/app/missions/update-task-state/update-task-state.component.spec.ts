import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsUpdateTaskStateComponent } from './update-task-state.component';

describe('MissionsUpdateTaskStateComponent', () => {
  let component: MissionsUpdateTaskStateComponent;
  let fixture: ComponentFixture<MissionsUpdateTaskStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionsUpdateTaskStateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionsUpdateTaskStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
