import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { ListResponse } from '../../models/ListResponse';
import { ContractorWithPassword } from '../../models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { Iindex } from '../../models/Iindex';

@Component({
  selector: 'app-contractors-add',
  imports: [CommonModule, NgSelectModule, FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class ContractorsAddComponent {
  router = inject(Router)
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  mservice = inject(mservice);
  user?: any;
  contractor: ContractorWithPassword = {password: '', passwordConfirm: ''}
  diseases: ListResponse<Iindex> = { length: 0, items: [] };
  needs: ListResponse<Iindex> = { length: 0, items: [] };
  ss=''

  constructor() {
    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()

  }

  view() {
    this.route.queryParams.subscribe(params => {
      //let id = params['id'];
      //this.getContractorById(id, true);
    });
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
    });
  }

  ngOnInit() {
  }

  addContractor() {
    this.mservice.addContractor(this.contractor).subscribe({
      next: (v: any) => {
        this.router.navigate(['/contractors-list'])
      },
      error: (e) => console.log(e.error),
      //complete: () => console.info('getClinics() completed'),
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