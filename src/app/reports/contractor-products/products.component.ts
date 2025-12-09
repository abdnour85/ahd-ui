import { Component, inject, Renderer2 } from '@angular/core';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { ActivatedRoute } from '@angular/router';
import { Mission } from '../../models/Mission';
import { DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Title } from "@angular/platform-browser";
import { FlattenedMissionProduct } from '../../models/FlattenedMission';

@Component({
  selector: 'app-reports-contractor-products',
  imports: [DatePipe, DecimalPipe, NgFor, NgIf],
  templateUrl: './products.component.html',
  styleUrl: '../reports.css'
})
export class ReportsContractorProductsComponent {
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  mservice = inject(mservice);
  renderer = inject(Renderer2)
  titleService = inject(Title)

  user?: any;
  missions: Mission[] = []
  flattenMissions: FlattenedMissionProduct[] = []
  //parameters = { contractorId: '', contractor_name: '', productId: '', product_name: '', fromDate: '', toDate: '' }
  parameters:any

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
      /*this.parameters.contractor_name = params['contractor_name'];
      this.parameters.product_name = params['product_name'];
      this.parameters.contractorId = params['contractorId'];
      this.parameters.productId = params['productId'];
      this.parameters.fromDate = params['fromDate'];
      this.parameters.toDate = params['toDate'];*/
      this.parameters=params;
      this.titleService.setTitle(`كشف إخراج مواد للمقاول ${this.parameters.contractor_name}`);
      this.getMissionsByContractor();
    });
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
    });
  }

  private getMissionsByContractor() {
    this.mservice.getMissionsStockByContractor(this.parameters).subscribe({
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
    /*let index = 1;
    this.missions.forEach(mission => {
      mission.stockInvoice.items.forEach(item => {
        if (!this.parameters.productId || item.productId == this.parameters.productId)
          this.flattenMissions.push({
            index: index++,

            date: mission.date,
            serialNo: mission.serialNo,
            workType_name: mission.workType_name,
            swatNo: mission.swatNo,
            name: mission.name,
            product_name: item.product_name,
            quantity: item.quantity
          });
      });
    });*/

    let index = 0;
    // First collect all items
    const tempMissions: FlattenedMissionProduct[] = [];
    this.missions.forEach(mission => {
      mission.stockInvoice.items.forEach(item => {
        if (!this.parameters.productId || item.productId == this.parameters.productId) {
          tempMissions.push({
            index: index++,
            date: mission.date!,
            serialNo: mission.serialNo!,
            workType_name: mission.workType_name!,
            swatNo: mission.swatNo!,
            name: mission.name!,
            product_name: item.product_name!,
            quantity: item.quantity!,
            taskState_name: mission.taskState_name!
          });
        }
      });
    });

    // Sort by date
    tempMissions.sort((a, b) => a.date.localeCompare(b.date));

    // Reassign indexes in sorted order and push to flattenMissions
    this.flattenMissions = tempMissions.map((item, newIndex) => ({
      ...item,
      index: newIndex + 1
    }));
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