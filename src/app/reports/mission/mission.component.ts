import { Component, inject, Renderer2 } from '@angular/core';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { ActivatedRoute } from '@angular/router';
import { Mission } from '../../models/Mission';
import { DatePipe, DecimalPipe, NgFor } from '@angular/common';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-reports-mission',
  imports: [DatePipe, DecimalPipe, NgFor],
  templateUrl: './mission.component.html',
  styleUrl: '../reports.css'
})
export class ReportsMissionComponent {
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  mservice = inject(mservice);
  renderer= inject(Renderer2)
  titleService = inject(Title)

  user?: any;
  mission: Mission = {
    stockInvoice: { type: 'o', items: [] }, contracts: [], stages: [],
  }

  constructor() {    
    this.renderer.removeClass(document.body, 'skin-blue');
    this.renderer.removeClass(document.body, 'sidebar-mini');

    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()

  }

  view() {
    this.route.queryParams.subscribe(params => {
      let id = params['id'];
      this.getMissionById(id);
    });
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
    });
  }

  private getMissionById(id: any) {
    this.mservice.getMissionById(id).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.mission = v;
        this.titleService.setTitle(this.mission.serialNo?.toString()!);
        setTimeout(() => {
          window.print();
        }, 100);
        //if (v.id && getAnimals) this.getAnimals();
      },
      error: (e) => console.log(e.error),
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