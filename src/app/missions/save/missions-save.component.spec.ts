import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsSaveComponent } from './missions-save.component';

describe('MissionsSaveComponent', () => {
  let component: MissionsSaveComponent;
  let fixture: ComponentFixture<MissionsSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionsSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionsSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
