import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IservicesAddComponent } from './iservices-add.component';

describe('IservicesAddComponent', () => {
  let component: IservicesAddComponent;
  let fixture: ComponentFixture<IservicesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IservicesAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IservicesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
