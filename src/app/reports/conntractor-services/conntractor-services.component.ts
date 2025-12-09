import { Component, inject, Renderer2 } from '@angular/core';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { ActivatedRoute } from '@angular/router';
import { Mission } from '../../models/Mission';
import { DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Title } from "@angular/platform-browser";
import { FlattenedMissionService } from '../../models/FlattenedMission';

@Component({
  selector: 'app-reports-conntractor-services',
  imports: [DatePipe, DecimalPipe, NgFor, NgIf],
  templateUrl: './conntractor-services.component.html',
  styleUrl: '../reports.css'
})
export class ReportsConntractorServicesComponent {
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  mservice = inject(mservice);
  renderer = inject(Renderer2)
  titleService = inject(Title)

  user?: any;
  missions: Mission[] = []
  flattenMissions: FlattenedMissionService[] = []
  //parameters = { contractorId: '', contractor_name: '', serviceId: '', service_name: '', fromDate: '', toDate: '' }
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
      this.parameters.service_name = params['service_name'];
      this.parameters.contractorId = params['contractorId'];
      this.parameters.serviceId = params['serviceId'];
      this.parameters.fromDate = params['fromDate'];
      this.parameters.toDate = params['toDate'];*/
      this.parameters=params;
      this.titleService.setTitle(`كشف الخدمات المقدمة من المقاول ${this.parameters.contractor_name}`);
      this.getMissionsByContractor();
    });
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
    });
  }

  private getMissionsByContractor() {
    this.mservice.getMissionsServicesByContractor(this.parameters).subscribe({
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
    /* let index = 1;
    this.missions.forEach(mission => {
      mission.contracts.forEach(contract => {
        contract.services.forEach(svc => {
          if ((!this.parameters.contractorId || contract.contractorId == this.parameters.contractorId)
            && (!this.parameters.serviceId || svc.serviceId == this.parameters.serviceId)
          )
            this.flattenMissions.push({
              index: index++,
              date: mission.date,
              contractor_name: contract.contractor_name,
              serialNo: mission.serialNo,
              workType_name: mission.workType_name,
              swatNo: mission.swatNo,
              name: mission.name,
              service_name: svc.service_name,
              quantity: svc.quantity
            });
        })

      });
    }); */

    let index = 0;
    // First collect all items
    const tempMissions: FlattenedMissionService[] = [];
    this.missions.forEach(mission => {
      mission.contracts.forEach(contract => {
        contract.services.forEach(svc => {
          if ((!this.parameters.contractorId || contract.contractorId == this.parameters.contractorId)
            && (!this.parameters.serviceId || svc.serviceId == this.parameters.serviceId)
          )
            tempMissions.push({
              index: index++,
              date: mission.date!,
              contractor_name: contract.contractor_name!,
              serialNo: mission.serialNo!,
              workType_name: mission.workType_name!,
              swatNo: mission.swatNo!,
              name: mission.name!,
              service_name: svc.service_name!,
              quantity: svc.quantity!,
              taskState_name: mission.taskState_name!
            });
        })

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