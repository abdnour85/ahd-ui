import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsContractorProductsComponent } from './products.component';

describe('ReportsContractorProductsComponent', () => {
  let component: ReportsContractorProductsComponent;
  let fixture: ComponentFixture<ReportsContractorProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsContractorProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsContractorProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
