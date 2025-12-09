import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSaveComponent } from './save.component';

describe('ProductsSaveComponent', () => {
  let component: ProductsSaveComponent;
  let fixture: ComponentFixture<ProductsSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
