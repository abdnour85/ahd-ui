import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsIndexComponent } from './index.component';

describe('ReportsIndexComponent', () => {
  let component: ReportsIndexComponent;
  let fixture: ComponentFixture<ReportsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
