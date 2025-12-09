import { Component, inject } from '@angular/core';
import { ListResponse } from '../../models/ListResponse';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { Mission, MissionParameters } from '../../models/Mission';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Iindex } from '../../models/Iindex';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-missions-list',
  imports: [CommonModule, FormsModule, RouterLink, NgbModule],
  templateUrl: './missions-list.component.html',
  styleUrl: './missions-list.component.scss'
})
export class MissionsListComponent {
  authService = inject(AuthService);
  mservice = inject(mservice);
  toastr = inject(ToastrService)
  user?: any;
  route = inject(ActivatedRoute)
  //progressStatus //0: new, 1: sending request, 2: pass, 3: fail
  private progressStatus = {
    refreshToken: 101,
    getMissions: 101
  }
  isLoading() {
    return this.progressStatus.getMissions == 102 || this.progressStatus.refreshToken == 102
  }
  parameters: MissionParameters = { workTypeId: '0', taskStateId: '0', pageNumber: 1, pageSize: 20 }
  missions: ListResponse<Mission> = { length: 0, items: [] };
  workTypes: ListResponse<Iindex> = { length: 0, items: [] };
  taskStates: ListResponse<Iindex> = { length: 0, items: [] };
  updateTaskStates: ListResponse<Iindex> = { length: 0, items: [] };
  updatedState = ''
  localStorage_parameters = 'missions_list_parameters'

  printMission(id: string) {
    let width = window.innerWidth / 1.5; // desired width of the popup window
    let height = window.innerHeight - 30; // desired height of the popup window
    let left = window.innerWidth / 2 - width / 2;
    let top = window.innerHeight / 2 - height / 2;

    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,dialog:yes,modal:yes,
width=${width},height=${height},left=${left},top=${top}`;

    open(`/reports-mission?id=${id}`, 'معاينة كرت العمل', params);
  }

  constructor() {
    this.GetUserRoles()
    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()
  }

  checkedMissions: Mission[] = [];
  showActionsCombo: boolean = false;

  ngDoCheck() { // Use ngDoCheck to react to changes in the products array
    this.updateCheckedMissions();
  }

  updateCheckedMissions() {
    this.checkedMissions = this.missions.items.filter(mission => mission.checked);
    this.showActionsCombo = this.checkedMissions.length > 0;
  }

  saveCheckedMissions() {
    this.checkedMissions.forEach(mission => {
      mission.taskStateId = this.updatedState;
    });
    this.mservice.saveMissions(this.checkedMissions).subscribe({
      next: (v: any) => {
        this.toastr.success('تم تحديث البطاقات المحددة', 'تمت العملية')
        this.getMissions(true);
      },
      error: (e) => {
        console.log(e.error)
        alert(e.error.title)
      },
      //complete: () => console.info('getClinics() completed'),
    });
  }

  deleteMission(id: string) {
    if (confirm('حذف بطاقة العمل؟'))
      this.mservice.deleteMission(id).subscribe({
        next: (v: any) => {
          this.toastr.success('تم حذف بطاقة العمل', 'تمت العملية')
          this.getMissions(false)
        },
        error: (e) => {
          console.log(e.error)
          alert(e.error.title)
        },
        //complete: () => console.info('getClinics() completed'),
      });
  }

  getMissions(resetPageNo: boolean) {
    if (resetPageNo) this.parameters.pageNumber = 1;
    localStorage.setItem(this.localStorage_parameters, JSON.stringify(this.parameters));
    this.progressStatus.getMissions = 102
    this.mservice.getMissions(this.parameters).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.progressStatus.getMissions = 103
        this.missions = { length: 0, items: v };
        this.getMissionsCount();
      },
      error: (e) => { this.progressStatus.getMissions = e.status; console.log(e.error) },
      //complete: () => console.info('getClients() completed'),
    });
  }

  getMissionsCount() {
    this.progressStatus.getMissions = 102
    this.mservice.getMissionsCount(this.parameters).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.progressStatus.getMissions = 103
        this.missions.length = v;
      },
      error: (e) => { this.progressStatus.getMissions = e.status; console.log(e.error) },
      //complete: () => console.info('getClients() completed'),
    });
  }

  view() {
    this.route.queryParams.subscribe(params => {
      if (params['r']) localStorage.removeItem(this.localStorage_parameters);
      if (localStorage.getItem(this.localStorage_parameters) != null) {
        //console.log(`${this.localStorage_parameters} exists`);
        this.parameters = JSON.parse(localStorage.getItem(this.localStorage_parameters)!);
      }
    });

    this.getMissions(true);
    this.getWorkTypes();
    this.getTaskStates();
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
    });
  }

  private getWorkTypes() {
    this.mservice.getIndices({ parent_id: '10000000' }).subscribe({
      next: (v: any) => {
        //console.log(v);
        if (v.length == 0)
          this.workTypes = { items: [], length: 0 };
        else this.workTypes = { items: v, length: v.length }
        this.workTypes.items.unshift({ id: '0', name: 'الكل' })
      },
      error: (e) => console.log(e.error),
    });
  }

  private getTaskStates() {
    this.mservice.getIndices({ parent_id: '50000000' }).subscribe({
      next: (v: any) => {
        //console.log(v);
        if (v.length == 0) {
          this.taskStates = { items: [], length: 0 };
          this.updateTaskStates = { items: [], length: 0 };
        }
        else {
          this.taskStates = { items: v, length: v.length }
          this.updateTaskStates = { items: v.slice(), length: v.length }
        }
        this.taskStates.items.unshift({ id: '0', name: 'الكل' })
      },
      error: (e) => console.log(e.error),
    });
  }

  userRoles: string[] = []
  GetUserRoles() {
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
