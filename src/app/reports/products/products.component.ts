import { Component, inject, Renderer2 } from '@angular/core';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { ActivatedRoute } from '@angular/router';
import { Mission } from '../../models/Mission';
import { DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Title } from "@angular/platform-browser";
import { FlattenedMissionProduct } from '../../models/FlattenedMission';
import { Product } from '../../models/Product';


@Component({
  selector: 'app-reports-contractor-products',
  imports: [DatePipe, DecimalPipe, NgFor, NgIf],
  templateUrl: './products.component.html',
  styleUrl: '../reports.css'
})
export class ReportsProductsComponent {
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  mservice = inject(mservice);
  renderer = inject(Renderer2)
  titleService = inject(Title)

  user?: any;
  products: Product[] = []
  //parameters = { contractorId: '', contractor_name: '', productId: '', product_name: '', fromDate: '', toDate: '' }
  parameters={ status:'a', pageNumber: 1, pageSize: 2000}
  today=new Date()

  sumOfProperty(array: Array<any>, property: string): number {
    let sum = 0;
    for (const item of array) {
      sum += Number(item[property]);
    }
    return Number(sum.toFixed(2));
  }

  constructor() {
    this.renderer.removeClass(document.body, 'skin-blue');
    this.renderer.removeClass(document.body, 'sidebar-mini');

    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()

  }

  view() {
    this.route.queryParams.subscribe(params => {
      /*this.parameters.contractor_name = params['contractor_name'];
      this.parameters.product_name = params['product_name'];
      this.parameters.contractorId = params['contractorId'];
      this.parameters.productId = params['productId'];
      this.parameters.fromDate = params['fromDate'];
      this.parameters.toDate = params['toDate'];*/
      //this.parameters=params;
      this.titleService.setTitle(`كشف مواد المخزن `);
      this.getProducts();
    });
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
    });
  }

  private getProducts() {
    this.mservice.getProducts(this.parameters).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.products = v;
        //this.titleService.setTitle(this.mission.serialNo?.toString()!);
        setTimeout(() => {
          window.print();
        }, 100);
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