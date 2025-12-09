import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IservicesListComponent } from './iservices-list.component';

describe('IservicesListComponent', () => {
  let component: IservicesListComponent;
  let fixture: ComponentFixture<IservicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IservicesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IservicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
