import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {
  authService = inject(AuthService);
  user_name=''
  constructor() {
    this.getUserRoles()
    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()
  }

  view() {
    this.authService.getCurrentAuthUser().subscribe((u) => {
      let us:any=u
      for (const item of us) {
        if (item.includes("name:")) {
          this.user_name = item.split(": ")[1];
          break;
        }
      }
      
    })
  }

  refresh(): void {
    window.location.reload();
  }

  userRoles: string[] = []
  getUserRoles() {
    this.authService.getUserRoles().subscribe({
      next: (v: any) => {
        this.userRoles = v;
      },
      error: (e) => console.log(e.error),
    });
  }
  hasRole(role: string): boolean {
    return this.userRoles.some(userRole => userRole.toLowerCase() === role.toLowerCase());
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
