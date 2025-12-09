import { Component, inject } from '@angular/core';
import { ListResponse } from '../../models/ListResponse';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { Mission, MissionParameters } from '../../models/Mission';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Iindex } from '../../models/Iindex';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-missions-update-task-state',
  imports: [CommonModule, FormsModule, RouterLink, NgbModule],
  templateUrl: './update-task-state.component.html',
  styleUrl: './update-task-state.component.scss'
})
export class MissionsUpdateTaskStateComponent {
  authService = inject(AuthService);
  mservice = inject(mservice);
  toastr = inject(ToastrService)
  user?: any;
  //progressStatus //0: new, 1: sending request, 2: pass, 3: fail
  private progressStatus = {
    refreshToken: 101,
    getMissions: 101
  }
  isLoading() {
    return this.progressStatus.getMissions == 102 || this.progressStatus.refreshToken == 102
  }
  serialNos_text = ''
  missions: ListResponse<Mission> = { length: 0, items: [] };
  workTypes: ListResponse<Iindex> = { length: 0, items: [] };
  taskStates: ListResponse<Iindex> = { length: 0, items: [] };
  updateTaskStates: ListResponse<Iindex> = { length: 0, items: [] };
  updatedState = ''

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
        this.getMissions();
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
          this.getMissions()
        },
        error: (e) => {
          console.log(e.error)
          alert(e.error.title)
        },
        //complete: () => console.info('getClinics() completed'),
      });
  }

  getMissions() {
    let serialNos = this.serialNos_text.split('\n');

     //Optional: Remove empty strings from the array if needed
    serialNos = serialNos.filter(line => line.trim() !== '');

    this.progressStatus.getMissions = 102
    this.mservice.GetMissionsBySerialNos({ serialNos: serialNos }).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.progressStatus.getMissions = 103
        this.missions = { length: v.length, items: v };
        this.missions.items.forEach(mission => {
          mission.checked=true;
        });
      },
      error: (e) => { this.progressStatus.getMissions = e.status; console.log(e.error) },
      //complete: () => console.info('getClients() completed'),
    });
  }

  view() {
   // this.getMissions();
    this.getTaskStates();
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
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
