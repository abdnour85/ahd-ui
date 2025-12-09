import { Component, inject } from '@angular/core';
import { ListResponse } from '../../models/ListResponse';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { Iservice } from '../../models/Iservice';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-iservices-list',
  imports: [CommonModule, FormsModule, RouterLink, NgbModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class IservicesListComponent {
  authService = inject(AuthService);
  mservice = inject(mservice);
  toastr = inject(ToastrService)
  user?: any;
  //progressStatus //0: new, 1: sending request, 2: pass, 3: fail
  private progressStatus = {
    refreshToken: 101,
    getIservices: 101
  }
  isLoading() {
    return this.progressStatus.getIservices == 102 || this.progressStatus.refreshToken == 102
  }
  parameters = { name: '', status: 'a', code: '', pageNumber: 1, pageSize: 20 }
  iservices: ListResponse<Iservice> = { length: 0, items: [] };

  constructor() {
    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()
  }

  deleteIservice(iservice: Iservice) {
    if (confirm(`حذف الصنف ${iservice.name}؟`))
      this.mservice.deleteIservice(iservice.id!).subscribe({
        next: (v: any) => {
          this.toastr.success('تم حذف الصنف', 'تمت العملية')
          this.getIservices(false)
        },
        error: (e) => {
          console.log(e.error)
          alert(e.error.title)
        },
        //complete: () => console.info('getClinics() completed'),
      });
  }

  getIservices(resetPageNo: boolean) {
    if (resetPageNo) this.parameters.pageNumber = 1;
    this.progressStatus.getIservices = 102
    this.mservice.getIservices(this.parameters).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.progressStatus.getIservices = 103
        this.iservices = { length: 0, items: v };
        this.getIservicesCount();
      },
      error: (e) => { this.progressStatus.getIservices = e.status; console.log(e.error) },
      //complete: () => console.info('getClients() completed'),
    });
  }

  getIservicesCount() {
    this.progressStatus.getIservices = 102
    this.mservice.getIservicesCount(this.parameters).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.progressStatus.getIservices = 103
        this.iservices.length = v;
      },
      error: (e) => { this.progressStatus.getIservices = e.status; console.log(e.error) },
      //complete: () => console.info('getClients() completed'),
    });
  }

  view() {
    this.getIservices(true);
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
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