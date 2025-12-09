
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

@Component({
  selector: 'app-missions-add',
  imports: [CommonModule, NgSelectModule, FormsModule, RouterLink],
  templateUrl: './missions-add.component.html',
  styleUrl: './missions-add.component.scss'
})
export class MissionsAddComponent {
  router = inject(Router)
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  mservice = inject(mservice);
  toastr = inject(ToastrService)

  user?: any;
  mission: Mission = {
    date: new Date().toISOString().split('T')[0], stockInvoice: { type: 'o', items: [] }, contracts: [], stages: [], price: 0, deductions: 0, taskStateId: '',
  }
  workTypes: ListResponse<Iindex> = { length: 0, items: [] };

  constructor() {
    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()

  }

  view() {
    this.route.queryParams.subscribe(params => {
      //let id = params['id'];
      //this.getMissionById(id, true);
    });
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
    });
  }

  ngOnInit() {
    this.getWorkTypes();
  }

  addMission() {
    this.mservice.getMissionsBySwatNo({ swatNo: this.mission.swatNo, pageNumber: 1, pageSize: 1 }).subscribe({
      next: (v: any) => {
        //console.log(v);
        if (v.length == 0)
          this.addMission2()
        else {
          if (confirm('يوجد بطاقة عمل سابقة بنفس رقم سوات، إكمال العملية؟'))
            this.addMission2()
        }
      },
      error: (e) => console.log(e.error),
    });
  }

  private addMission2() {
    this.mservice.addMission(this.mission).subscribe({
      next: (v: any) => {
        this.toastr.success('تم إضافة أمر عمل', 'تمت العملية')
        console.log(v)
        //this.router.navigate(['/missions-list'])
        this.router.navigate(['/missions-followup-save'], {queryParams: {id: v.id}})
      },
      error: (e) => {
        if (e.error.status == 400 && e.error.errors) {
          this.toastr.error(
            this.mservice.formatErrorMessage(e.error),
            'خطأ',
            { disableTimeOut: true, closeButton: true, enableHtml: true });
          //this.mservice.alertError(e.error)
        }
        else alert(e.error)
        console.log(e.error)
      },
      //complete: () => console.info('getClinics() completed'),
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