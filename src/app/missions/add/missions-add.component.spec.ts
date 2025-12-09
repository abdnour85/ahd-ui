import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsAddComponent } from './missions-add.component';

describe('MissionsAddComponent', () => {
  let component: MissionsAddComponent;
  let fixture: ComponentFixture<MissionsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
