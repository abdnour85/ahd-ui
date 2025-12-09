import { Component, inject } from '@angular/core';
import { ListResponse } from '../../models/ListResponse';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Contractor } from '../../models/User';

@Component({
  selector: 'app-contractors-list',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ContractorsListComponent {
  authService = inject(AuthService);
  mservice = inject(mservice);
  user?: any;
  //progressStatus //0: new, 1: sending request, 2: pass, 3: fail
  private progressStatus = {
    refreshToken: 101,
    getContractors: 101
  }
  isLoading() {
    return this.progressStatus.getContractors == 102 || this.progressStatus.refreshToken == 102
  }
  parameters = {mobile: '', status: '1', telephone: '', name: '', page: 1, pageSize: 1000}
  contractors: ListResponse<Contractor> = { length: 0, items: [] };

  constructor() {
    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()
  }

  deleteContractor(contractor: Contractor){

  }

  getContractors() {
    this.progressStatus.getContractors = 102
    this.mservice.getContractors({}).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.progressStatus.getContractors = 103
        this.contractors = { length: 0, items: v };
      },
      error: (e) => { this.progressStatus.getContractors = e.status; console.log(e.error) },
      //complete: () => console.info('getClients() completed'),
    });
  }

  view() {
    this.getContractors();
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

