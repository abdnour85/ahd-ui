import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { UserWithPassword } from '../../models/User';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users-add',
  imports: [CommonModule, NgSelectModule, FormsModule],
  templateUrl: './users-add.component.html',
  styleUrl: './users-add.component.scss'
})
export class UsersAddComponent {
  router = inject(Router)
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  mservice = inject(mservice);
  loginUser?: any;
  user: UserWithPassword = {password: '', passwordConfirm: ''}

  constructor() {
    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()

  }

  view() {
    this.route.queryParams.subscribe(params => {
      //let id = params['id'];
      //this.getUserById(id, true);
    });
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.loginUser = r;
    });
  }

  ngOnInit() {
  }

  addUser() {
    this.mservice.addUser(this.user).subscribe({
      next: (v: any) => {
        this.router.navigate(['/users-list'])
      },
      error: (e) => console.log(e.error),
      //complete: () => console.info('getClinics() completed'),
    });
  }

  logout() {
    this.authService.logout();
  }

  refreshToken() {
    this.authService.refreshToken()?.subscribe((r) => {
      console.log(r);
      this.view();
    });
  }
}