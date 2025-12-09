import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { ListResponse } from '../../models/ListResponse';
import { Customer } from '../../models/User';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Iindex } from '../../models/Iindex';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [CommonModule, NgSelectModule, FormsModule, RouterLink],
  templateUrl: './save.component.html',
  styleUrl: './save.component.scss'
})
export class CustomersSaveComponent {
  router = inject(Router)
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  mservice = inject(mservice);
  user?: any;
  customer: Customer = {  }
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
      this.getCustomerById(id, true);
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

  removeDisease(i: number) {
    //this.customer.diseases.splice(i, 1);
  }

  addDisease() {
    //this.customer.diseases.push({})
  }

  removeNeed(i: number) {
    //this.customer.needs.splice(i, 1);
  }

  addNeed() {
    //this.customer.needs.push({})
  }

  saveCustomer() {
    this.mservice.saveCustomer(this.customer).subscribe({
      next: (v: any) => {
        this.router.navigate(['/customers-list'])
      },
      error: (e) => console.log(e.error),
      //complete: () => console.info('getClinics() completed'),
    });
  }

  private getCustomerById(id: any, getAnimals: boolean) {
    this.mservice.getCustomerById(id).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.customer = v;
        //if (v.id && getAnimals) this.getAnimals();
      },
      error: (e) => console.log(e.error),
    });
  }

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