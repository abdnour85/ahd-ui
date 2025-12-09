import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesListComponent } from './user-roles-list.component';

describe('UserRolesListComponent', () => {
  let component: UserRolesListComponent;
  let fixture: ComponentFixture<UserRolesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRolesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRolesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
