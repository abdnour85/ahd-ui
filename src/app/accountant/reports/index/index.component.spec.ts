import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountantReportsIndexComponent } from './index.component';


describe('AccountantReportsIndexComponent', () => {
  let component: AccountantReportsIndexComponent;
  let fixture: ComponentFixture<AccountantReportsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountantReportsIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountantReportsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
