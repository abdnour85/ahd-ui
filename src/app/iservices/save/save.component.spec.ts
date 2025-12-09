import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IservicesSaveComponent } from './iservices-save.component';

describe('IservicesSaveComponent', () => {
  let component: IservicesSaveComponent;
  let fixture: ComponentFixture<IservicesSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IservicesSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IservicesSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
