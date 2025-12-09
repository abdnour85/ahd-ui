import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersSaveComponent } from './save.component';

describe('CustomersSaveComponent', () => {
  let component: CustomersSaveComponent;
  let fixture: ComponentFixture<CustomersSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersSaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomersSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
