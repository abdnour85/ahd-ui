import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantMissionsListComponent } from './missions-list.component';

describe('AccountantMissionsListComponent', () => {
  let component: AccountantMissionsListComponent;
  let fixture: ComponentFixture<AccountantMissionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountantMissionsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountantMissionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
