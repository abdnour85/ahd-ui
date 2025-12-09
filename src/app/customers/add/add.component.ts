import { Component, inject } from '@angular/core';
import { AppMenuComponent } from '../../_layout/app-menu/app-menu.component';
import { AppHeaderComponent } from '../../_layout/app-header/app-header.component';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { ListResponse } from '../../models/ListResponse';
import { Observable, Subject, catchError, concat, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { Customer, CustomerWithPassword } from '../../models/User';


import { SiteFooterComponent } from '../../_layout/site-footer/site-footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Iindex } from '../../models/Iindex';

@Component({
  selector: 'app-customers-add',
  standalone: true,
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
  imports: [CommonModule, NgSelectModule, FormsModule],
})
export class CustomersAddComponent {
  router = inject(Router)
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  mservice = inject(mservice);
  user?: any;
  customer: CustomerWithPassword = {password: '', passwordConfirm: ''}
  
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
      //this.getCustomerById(id, true);
    });
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
    });
  }

  ngOnInit() {
    this.getDiseases()
    this.getNeeds()
  }

  removeDisease(i:number){
    //this.customer.diseases.splice(i, 1);
  }

  addDisease(){
      //this.customer.diseases.push({})
  }

  removeNeed(i:number){
    //this.customer.needs.splice(i, 1);
  }

  addNeed(){
     // this.customer.needs.push({})
  }

  addCustomer() {
    this.mservice.addCustomer(this.customer).subscribe({
      next: (v: any) => {
        this.router.navigate(['/customers-list'])
      },
      error: (e) => console.log(e.error),
      //complete: () => console.info('getClinics() completed'),
    });
  }

 /*  private getCustomerById(id: any, getAnimals: boolean) {
    this.mservice.getCustomerById(id).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.customer = v;
        //if (v.id && getAnimals) this.getAnimals();
      },
      error: (e) => console.log(e.error),
    });
  } */

  private getDiseases() {
    this.mservice.getIndices({ parent_id: '60000000' }).subscribe({
      next: (v: any) => {
        //console.log(v);
        if (v.length == 0)
          this.diseases = { items: [{}], length: 1 };
        else this.diseases = { items: v, length: v.length }
      },
      error: (e) => console.log(e.error),
    });
  }

  private getNeeds() {
    this.mservice.getIndices({ parent_id: '40000000' }).subscribe({
      next: (v: any) => {
        //console.log(v);
        if (v.length == 0)
          this.needs = { items: [{}], length: 1 };
        else this.needs = { items: v, length: v.length }
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