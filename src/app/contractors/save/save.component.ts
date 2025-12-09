import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { ListResponse } from '../../models/ListResponse';
import { Contractor } from '../../models/User';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Iindex } from '../../models/Iindex';

@Component({
  selector: 'app-contractors-save',
  imports: [CommonModule, NgSelectModule, FormsModule, RouterLink],
  templateUrl: './save.component.html',
  styleUrl: './save.component.scss'
})
export class ContractorsSaveComponent {
  router = inject(Router)
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  mservice = inject(mservice);
  user?: any;
  contractor: Contractor = {  }
  
  diseases: ListResponse<Iindex> = { length: 0, items: [] };
  needs: ListResponse<Iindex> = { length: 0, items: [] };
  ss = ''

  constructor() {
    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()

  }

  view() {
    this.route.queryParams.subscribe(params => {
      let id = params['id'];
      this.getContractorById(id, true);
    });
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
    });
  }

  ngOnInit() {
  }

  saveContractor() {
    this.mservice.saveContractor(this.contractor).subscribe({
      next: (v: any) => {
        this.router.navigate(['/contractors-list'])
      },
      error: (e) => console.log(e.error),
      //complete: () => console.info('getClinics() completed'),
    });
  }

  private getContractorById(id: any, getAnimals: boolean) {
    this.mservice.getContractorById(id).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.contractor = v;
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