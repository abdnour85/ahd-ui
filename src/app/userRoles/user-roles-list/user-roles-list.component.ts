import { Component, inject } from '@angular/core';
import { ListResponse } from '../../models/ListResponse';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/User';
import { UserRole } from '../../models/UserRole';

@Component({
  selector: 'app-user-roles-list',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-roles-list.component.html',
  styleUrl: './user-roles-list.component.scss'
})
export class UserRolesListComponent {
  authService = inject(AuthService);
  mservice = inject(mservice);
  user_id = ''
  user?: any;
  //progressStatus //0: new, 1: sending request, 2: pass, 3: fail
  private progressStatus = {
    refreshToken: 101,
    getUsers: 101
  }
  isLoading() {
    return this.progressStatus.getUsers == 102 || this.progressStatus.refreshToken == 102
  }
  parameters = {mobile: '', status: '1', telephone: '', name: '', pageNumber: 1, pageSize: 1000}
  users: ListResponse<User> = { length: 0, items: [] };
  userRoles: ListResponse<UserRole> = { length: 0, items: [] };

  constructor() {
    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()
  }

  UpdateCheckedUserRoles() {
    this.mservice.UpdateCheckedUserRoles(this.user_id, this.userRoles.items).subscribe({
      next: (v: any) => {
        //this.router.navigate(['/contractors-list'])
        alert("ok")
        this.getUserRoles()
      },
      error: (e) => console.log(e.error),
      //complete: () => console.info('getClinics() completed'),
    });
  }

  getUsers() {
    this.progressStatus.getUsers = 102
    this.mservice.getUsers(this.parameters).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.progressStatus.getUsers = 103
        this.users = { length: 0, items: v };
      },
      error: (e) => { this.progressStatus.getUsers = e.status; console.log(e.error) },
      //complete: () => console.info('getClients() completed'),
    });
  }

  getUserRoles() {
    if(this.user_id=='') return;
    this.progressStatus.getUsers = 102
    this.mservice.getCheckedUserRoles({user_id: this.user_id}).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.progressStatus.getUsers = 103
        this.userRoles = { length: 0, items: v };
      },
      error: (e) => { this.progressStatus.getUsers = e.status; console.log(e.error) },
      //complete: () => console.info('getClients() completed'),
    });
  }

  view() {
    this.getUsers();
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
    });
  }

  logout() {
    this.authService.logout();
  }

  refreshToken() {
    this.progressStatus.refreshToken = 102
    this.authService.refreshToken()?.subscribe(
      /* (r) => {
      console.log(r);
      this.view();
    } */
      {
        next: (v: any) => {
          //console.log(v);
          this.progressStatus.refreshToken = 103
          console.log(v);
          this.view();
        },
        error: (e) => { this.progressStatus.refreshToken = e.status; console.log(e.error) },
        //complete: () => console.info('getClients() completed'),
      }
    );
  }
}