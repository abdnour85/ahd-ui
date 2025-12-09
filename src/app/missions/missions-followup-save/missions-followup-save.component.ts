import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { ListResponse } from '../../models/ListResponse';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Iindex } from '../../models/Iindex';
import { Mission } from '../../models/Mission';
import { ToastrService } from 'ngx-toastr';
import { UserRole, Contractor } from '../../models/User';
import { MissionStage } from '../../models/MissionStage';
import { StageStatusService } from '../../services/stage-status.service';

@Component({
  selector: 'app-missions-followup-save',
  imports: [CommonModule, NgSelectModule, FormsModule, RouterLink],
  templateUrl: './missions-followup-save.component.html',
  styleUrl: './missions-followup-save.component.scss'
})
export class MissionsFollowupSaveComponent {
  router = inject(Router)
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  mservice = inject(mservice);
  toastr = inject(ToastrService)
  stageStatusService = inject(StageStatusService)

  user?: any;
  mission: Mission = {
    stockInvoice: { type: 'o', items: [] }, contracts: [], stages: [],
  }
  workTypes: ListResponse<Iindex> = { length: 0, items: [] };
  users: ListResponse<Contractor> = { length: 0, items: [] }
  id = ''
  isEditCardDisabled = false

  printMission() {
    let width = window.innerWidth / 1.5; // desired width of the popup window
    let height = window.innerHeight - 30; // desired height of the popup window
    let left = window.innerWidth / 2 - width / 2;
    let top = window.innerHeight / 2 - height / 2;

    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,dialog:yes,modal:yes,
width=${width},height=${height},left=${left},top=${top}`;

    open(`/reports-mission?id=${this.mission.id}`, 'معاينة كرت العمل', params);
  }

  constructor() {
    this.getCurrentUserRoles()
    if (this.authService.isTokenExpired()) this.refreshToken();
    //else this.view()
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

  }

  view() {
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
      this.getMissionById(this.id);
      this.getWorkTypes();
      this.getUsers();
    });
  }

  ngOnInit() {
  }

  getNextIncompleteStage(stages: MissionStage[]): MissionStage | null {
    // Sort stages by order in ascending order
    const sortedStages = stages.sort((a, b) => a.order! - b.order!);

    // Find the first stage that is not "completed"
    for (const stage of sortedStages) {
      if (stage.status !== 'c') {
        return stage;
      }
    }

    // If all stages are completed, return null
    return null;
  }

  saveMission() {
    const nextStage = this.mission.stages
      .filter(stage => stage.status !== 'c')
      .sort((a, b) => a.order! - b.order!)[0];

    console.log(nextStage)

    //const nextStage = this.getNextIncompleteStage(this.mission.stages)

    if (nextStage == null)
      this.mission.showInFollowups = false
    else
      // nextStage.assignedTo_name=nextStage.assignedToUsers!.find(i => i.id === nextStage.assignedTo_id)!.name;
      // Set the nextStage property
      this.mission.nextStageId = nextStage.id;

    this.mservice.saveFollowupMission(this.mission).subscribe({
      next: (v: any) => {
        this.toastr.success('تم تحديث أمر العمل', 'تمت العملية')
        this.router.navigate(['/missions-followup-list'])
      },
      error: (e) => {
        console.log(e.error)
        alert(e.error.title)
      },
      //complete: () => console.info('getClinics() completed'),
    });
  }

  checkSwat(){
    this.mservice.getMissionsBySwatNo({ swatNo: this.mission.swatNo, pageNumber: 1, pageSize: 1 }).subscribe({
      next: (v: any) => {
        //console.log(v);
        if (v.length > 0)
          this.toastr.warning('يوجد بطاقة عمل سابقة بنفس رقم سوات.', 'تنبيه')
      },
      error: (e) => console.log(e.error),
    });
  }

  private getMissionById(id: any) {
    //console.log(this.user)
    //let user_id: string;
    //let isAdmin = this.hasRole("admin")
    //console.log(this.userRoles, isAdmin)
    /* for (const item of this.user) {
      if (item.includes("nameidentifier")) {
        user_id = item.split(": ")[1];
        break;
      }
    } */
    this.mservice.getMissionById(id).subscribe({
      next: (v: any) => {
        //console.log(v);
        let i = 0
        let l = v.stages.length
        this.mission = v;
        this.mission.stages.sort((a, b) => a.order! - b.order!)

        this.mission.stages.forEach(mstage => {
          mstage.statuses = this.stageStatusService.getStatusesForStage(mstage.stageId!)
          //console.log(mstage.statuses)
          //mstage.checked = (mstage.status == 'c')
          //mstage.disabled = (!isAdmin && !this.hasRole(mstage.stage_followupToRole_id!)) || (i < l -1 && this.mission.stages[i + 1].status != 'w')
          this.getUserRoles(mstage)
          i++
        });
        this.updateStageDisabilities();
        //if (v.id && getAnimals) this.getAnimals();
      },
      error: (e) => console.log(e.error),
    });
  }

  private getUserRoles(mstage: MissionStage) {
    this.mservice.getUserRoles({ role_id: mstage.stage_assignedToRole_id }).subscribe({
      next: (v: any) => {
        //console.log(v);
        let userRoles: UserRole[] = v
        mstage.assignedToUsers = [];
        {
          userRoles.forEach(userRole => {
            mstage.assignedToUsers?.push({ id: userRole.user_id, name: userRole.user_name })
          });
        }
      },
      error: (e) => console.log(e.error),
    });
  }

  private getUsers() {
    this.mservice.getContractors({ status: 'a', pageNumber: 1, pageSize: 1000 }).subscribe({
      next: (v: any) => {
        //console.log(v);
        if (v.length == 0)
          this.users = { items: [], length: 0 };
        else this.users = { items: v, length: v.length }
      },
      error: (e) => console.log(e.error),
    });
  }

  private getWorkTypes() {
    this.mservice.getIndices({ parent_id: '10000000' }).subscribe({
      next: (v: any) => {
        //console.log(v);
        if (v.length == 0)
          this.workTypes = { items: [], length: 0 };
        else this.workTypes = { items: v, length: v.length }
      },
      error: (e) => console.log(e.error),
    });
  }

  /* updateStageDisabilities(): void {
    let stages = this.mission.stages;
    let isAdmin = this.hasRole("admin")
    
    for (let i = 0; i < stages.length; i++) {
      const currentStage = stages[i];
      console.log(`checking stage ${currentStage.stage_name} role...`) 
      console.log(!isAdmin , !this.hasRole(currentStage.stage_followupToRole_id!))
      if (!isAdmin && !this.hasRole(currentStage.stage_followupToRole_id!)) {
        currentStage.disabled=true
        console.log(`stage ${currentStage.stage_name} role mismatch...`)
        continue
      }

      console.log(`updating stage ${currentStage.stage_name} status...`)
  
      if (currentStage.status === 'c') {
        // If the current stage is complete, disable all preceding stages
        for (let j = 0; j < i; j++) {
          stages[j].disabled = true;
        }
      } else if (currentStage.status === 'w') {
        // If the current stage is waiting, enable the previous stage
        if (i > 0) {
          stages[i - 1].disabled = false;
        }
  
        // Disable all subsequent stages
        for (let j = i + 1; j < stages.length; j++) {
          stages[j].disabled = true;
          stages[j].status = 'w'; // Set status to 'w' for subsequent stages
        }
      } else if (currentStage.status === 'i') {
        // If the current stage is in progress, ensure previous stages are enabled
        for (let j = 0; j < i; j++) {
          stages[j].disabled = false;
        }
      }
    }
  } */

  updateStageDisabilities(): void {
    let stages = this.mission.stages;
    let isAdmin = this.hasRole("admin")

    for (let i = 0; i < stages.length; i++) {
      const currentStage = stages[i];
      currentStage.disabled = true;
    }

    let firstWaitingStageIndex = -1;
    let lastCompletedStageIndex = -1;

    // 1. Find the index of the first stage with status 'w'
    for (let i = 0; i < stages.length; i++) {
      if (stages[i].status === 'w' && firstWaitingStageIndex === -1) {
        firstWaitingStageIndex = i;
      }
      if (stages[i].status === 'c') {
        lastCompletedStageIndex = i;
      }
    }

    // 1. Enable the stage preceding the first waiting stage
    if (firstWaitingStageIndex > 0) {
      stages[firstWaitingStageIndex - 1].disabled = false;
    }

    // 2. Enable the first waiting stage after the last completed stage
    if (lastCompletedStageIndex !== -1 && lastCompletedStageIndex < stages.length - 1) {
      if(stages[lastCompletedStageIndex + 1].status === 'w'){
        stages[lastCompletedStageIndex + 1].disabled = false;
      }
    }

    // 3. Enable the last stage if all preceding stages are completed
    let allPrecedingCompleted = true;
    if (stages.length > 1) {
      for (let i = 0; i < stages.length - 1; i++) {
        if (stages[i].status !== 'c') {
          allPrecedingCompleted = false;
          break;
        }
      }
      if (allPrecedingCompleted) {
        stages[stages.length - 1].disabled = false;
      }
    }

    // 4. Enable the first stage if all next stages are waiting
    let allNextWaiting = true;
    for (let i = 1; i < stages.length; i++) {
      if (stages[i].status !== 'w') {
        allNextWaiting = false;
        break;
      }
    }
    if (allNextWaiting) {
      stages[0].disabled = false;
    }

    // 5. check role
    stages.forEach(stage => {
      if (!isAdmin && !this.hasRole(stage.stage_followupToRole_id!)) {
        stage.disabled = true
      }
    });    
  }

  userRoles: string[] = []
  getCurrentUserRoles() {
    this.authService.getUserRoles().subscribe({
      next: (v: any) => {
        this.userRoles = v;
        this.isEditCardDisabled=!this.hasRole('admin')&&!this.hasRole('Card Writing Works');
        this.view()
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
      //this.view();
    });
  }
}