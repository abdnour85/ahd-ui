import { Component, inject, Renderer2 } from '@angular/core';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { ActivatedRoute } from '@angular/router';
import { Mission } from '../../models/Mission';
import { DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-reports-contractor-contracts',
  imports: [DatePipe, DecimalPipe, NgFor, NgIf],
  templateUrl: './contracts.component.html',
  styleUrl: '../reports.css'
})
export class ReportsContractorContractsComponent {
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  mservice = inject(mservice);
  renderer = inject(Renderer2)
  titleService = inject(Title)

  user?: any;
  missions: Mission[] = []
  flattenMissions: any = []
  parameters : any

  sumOfProperty(array: Array<any>, property: string): number {
    let sum = 0;
    for (const item of array) {
      sum += Number(item[property]);
    }
    return Number(sum.toFixed(2));
  }

  constructor() {
    this.renderer.removeClass(document.body, 'skin-blue');
    this.renderer.removeClass(document.body, 'sidebar-mini');

    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()

  }

  view() {
    this.route.queryParams.subscribe(params => {
      this.parameters=params;
      this.titleService.setTitle(`كشف كروت عمل المقاول ${this.parameters.contractor_name}`);
      this.getContractsByContractor();
    });
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
    });
  }

  private getContractsByContractor() {
    this.mservice.getMissionsContractsByContractor(this.parameters).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.missions = v;
        this.flattenData()
        //this.titleService.setTitle(this.mission.serialNo?.toString()!);
        setTimeout(() => {
          window.print();
        }, 100);
        //if (v.id && getAnimals) this.getAnimals();
      },
      error: (e) => console.log(e.error),
    });
  }

  flattenData() {
    let index = 1;
    this.flattenMissions = [];
    this.missions.forEach(mission => {
      mission.contracts.forEach(item => {
        if (item.contractorId == this.parameters.contractorId)
          this.flattenMissions.push({
            index: index++,
            date: mission.date,
            serialNo: mission.serialNo,
            workType_name: mission.workType_name,
            swatNo: mission.swatNo,
            name: mission.name,
            price: item.price,
            discount: item.deductions,
            total: item.total,
            taskState_name: mission.taskState_name
            //product_name: item.product_name,
            //quantity: item.quantity
          });
      });
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