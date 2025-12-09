import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { mservice } from '../services/mservice.service';
import { ListResponse } from '../models/ListResponse';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  authService = inject(AuthService);
  mservice = inject(mservice);
  user?: any;

  constructor() {
    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()
  }

  /* getClinics() {
    this.mservice.getClinics({}).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.clinics = {length:0, items: v};
      },
      error: (e) => console.log(e.error),
      //complete: () => console.info('getClients() completed'),
    });
  } */

  view() {
    //this.getClinics();
    /*this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
    });*/
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
