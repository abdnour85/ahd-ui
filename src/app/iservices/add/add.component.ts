import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { Iservice, } from '../../models/Iservice';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-iservices-add',
  imports: [CommonModule, NgSelectModule, FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class IservicesAddComponent {
  router = inject(Router)
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  mservice = inject(mservice);
    toastr = inject(ToastrService)
  user?: any;
  iservice: Iservice = {};

  constructor() {
    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()

  }

  view() {
    this.route.queryParams.subscribe(params => {
      //let id = params['id'];
      //this.getIserviceById(id, true);
    });
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
    });
  }

  ngOnInit() {
  }

  addIservice() {
    this.mservice.addIservice(this.iservice).subscribe({
      next: (v: any) => {
        this.toastr.success(`تم إضافة خدمة ${this.iservice.name}`, 'تمت العملية')
        this.router.navigate(['/serviceslist'])
      },
      error: (e) => console.log(e.error),
      //complete: () => console.info('getClinics() completed'),
    });
  }

  /*  private getIserviceById(id: any, getAnimals: boolean) {
     this.mservice.getIserviceById(id).subscribe({
       next: (v: any) => {
         //console.log(v);
         this.iservice = v;
         //if (v.id && getAnimals) this.getAnimals();
       },
       error: (e) => console.log(e.error),
     });
   } */

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