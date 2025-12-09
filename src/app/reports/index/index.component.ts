import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListResponse } from '../../models/ListResponse';
import { Contractor } from '../../models/User';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { mservice } from '../../services/mservice.service';
import { Product } from '../../models/Product';
import { Iindex } from '../../models/Iindex';
import { Iservice } from '../../models/Iservice';

@Component({
  selector: 'app-reports-index',
  imports: [CommonModule, FormsModule, NgbModule],
  providers: [DatePipe],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class ReportsIndexComponent {
  router = inject(Router)
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  mservice = inject(mservice);
  toastr = inject(ToastrService)
  datePipe = inject(DatePipe)
  user?: any;

  today = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
  monthFirstDay = this.datePipe.transform(new Date(), 'yyyy-MM-01')!

  contractors: ListResponse<Contractor> = { length: 0, items: [] };
  products: ListResponse<Product> = { length: 0, items: [] };
  services: ListResponse<Iservice> = { length: 0, items: [] };
  taskStates: ListResponse<Iindex> = { length: 0, items: [] };
  workTypes: ListResponse<Iindex> = { length: 0, items: [] };
  contractorProducts_parameters = { contractorId: '', productId: '', fromDate: this.monthFirstDay, toDate: this.today, contractor_name: '', product_name: '', taskStateId: '', taskState_name: 'الكل' }
  contractorServices_parameters = { contractorId: '', serviceId: '', fromDate: this.monthFirstDay, toDate: this.today, contractor_name: '', service_name: '', taskStateId: '', taskState_name: 'الكل' }
  missions_parameters = { contractorId: '', workTypeId: '', workType_name: 'الكل', taskStateId: '', taskState_name: 'الكل', fromDate: this.monthFirstDay, toDate: this.today, contractor_name: '' }

  printContractorProductsReport() {
    //const url_ = this.contractorProducts_parameters.contractorId == '' ? '/reports-stock-invoice-items' : '/reports-contractorProducts'
    const url_ = '/reports-contractorProducts'

    /*if (this.contractorProducts_parameters.contractorId == '') {
      this.toastr.error('يرجى اختيار المقاول', 'خطأ');
      return
    }*/
    let width = window.innerWidth / 1.5; // desired width of the popup window
    let height = window.innerHeight - 30; // desired height of the popup window
    let left = window.innerWidth / 2 - width / 2;
    let top = window.innerHeight / 2 - height / 2;

    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,dialog:yes,modal:yes,
  width=${width},height=${height},left=${left},top=${top}`;

    this.contractorProducts_parameters.contractor_name = this.contractorProducts_parameters.contractorId ? this.contractors.items.filter(o => o.id == this.contractorProducts_parameters.contractorId)[0].name! : 'الكل'
    this.contractorProducts_parameters.product_name = this.contractorProducts_parameters.productId ? this.products.items.filter(o => o.id == this.contractorProducts_parameters.productId)[0].name! : 'الكل';
    this.contractorProducts_parameters.taskState_name = this.contractorProducts_parameters.taskStateId ? this.taskStates.items.filter(o => o.id == this.contractorProducts_parameters.taskStateId)[0].name! : 'الكل'

    const url = this.buildUrl(url_, this.contractorProducts_parameters);
    window.open(url, ' كشف إخراج مواد للمقاول', params)
  }
  printContractorServicesReport() {
    //const url_ = this.contractorServices_parameters.contractorId == '' ? '/reports-stock-invoice-items' : '/reports-contractorServices'
    const url_ = '/reports-contractorServices'

    /*if (this.contractorServices_parameters.contractorId == '') {
      this.toastr.error('يرجى اختيار المقاول', 'خطأ');
      return
    }*/
    let width = window.innerWidth / 1.5; // desired width of the popup window
    let height = window.innerHeight - 30; // desired height of the popup window
    let left = window.innerWidth / 2 - width / 2;
    let top = window.innerHeight / 2 - height / 2;

    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,dialog:yes,modal:yes,
  width=${width},height=${height},left=${left},top=${top}`;

    this.contractorServices_parameters.contractor_name = this.contractorServices_parameters.contractorId ? this.contractors.items.filter(o => o.id == this.contractorServices_parameters.contractorId)[0].name! : 'الكل'
    this.contractorServices_parameters.service_name = this.contractorServices_parameters.serviceId ? this.services.items.filter(o => o.id == this.contractorServices_parameters.serviceId)[0].name! : 'الكل';  
    this.contractorServices_parameters.taskState_name = this.contractorServices_parameters.taskStateId ? this.taskStates.items.filter(o => o.id == this.contractorServices_parameters.taskStateId)[0].name! : 'الكل'

    const url = this.buildUrl(url_, this.contractorServices_parameters);
    window.open(url, ' كشف الخدمات المقدمة', params)
  }
  printContractorContractsReport() {
    const url_ = this.missions_parameters.contractorId == '' ? '/reports-missions' : '/reports-contractorContracts'
    let width = window.innerWidth / 1.5; // desired width of the popup window
    let height = window.innerHeight - 30; // desired height of the popup window
    let left = window.innerWidth / 2 - width / 2;
    let top = window.innerHeight / 2 - height / 2;

    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,dialog:yes,modal:yes,
  width=${width},height=${height},left=${left},top=${top}`;

    this.missions_parameters.contractor_name = this.missions_parameters.contractorId ? this.contractors.items.filter(o => o.id == this.missions_parameters.contractorId)[0].name! : 'الكل'
    this.missions_parameters.taskState_name = this.missions_parameters.taskStateId ? this.taskStates.items.filter(o => o.id == this.missions_parameters.taskStateId)[0].name! : 'الكل'
    this.missions_parameters.workType_name = this.missions_parameters.workTypeId ? this.workTypes.items.filter(o => o.id == this.missions_parameters.workTypeId)[0].name! : 'الكل'

    const url = this.buildUrl(url_, this.missions_parameters);
    window.open(url, ' كشف كروت عمل المقاول', params)
  }

  private buildUrl(baseUrl: string, queryParams: { [key: string]: string }): string {
    const queryString = Object.keys(queryParams)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join('&');

    return `${baseUrl}?${queryString}`;
  }

  constructor() {
    this.getUserRoles()
    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()

  }

  view() {
    this.route.queryParams.subscribe(params => {
    });
    this.authService.getCurrentAuthUser().subscribe((r) => {
      this.user = r;
    });
  }

  ngOnInit() {
    this.getContractors();
    this.getProducts();
    this.getServices();
    this.getTaskStates();
    this.getWorkTypes();
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

  private getProducts() {
    this.mservice.getProducts({ status: 'a', pageNumber: 1, pageSize: 1000 }).subscribe({
      next: (v: any) => {
        //console.log(v);
        if (v.length == 0)
          this.products = { items: [], length: 0 };
        else this.products = { items: v, length: v.length }
      },
      error: (e) => console.log(e.error),
    });
  }

  private getServices() {
    this.mservice.getServices({ status: 'a', pageNumber: 1, pageSize: 1000 }).subscribe({
      next: (v: any) => {
        //console.log(v);
        if (v.length == 0)
          this.services = { items: [], length: 0 };
        else this.services = { items: v, length: v.length }
      },
      error: (e) => console.log(e.error),
    });
  }

  private getContractors() {
    this.mservice.GetUsersByRole({ role_id: '10b4fef-1401-4605-9830-ac9e2ccd0f59' }).subscribe({
      next: (v: any) => {
        //console.log(v);
        if (v.length == 0)
          this.contractors = { items: [], length: 0 };
        else this.contractors = { items: v, length: v.length }
      },
      error: (e) => console.log(e.error),
    });
  }

  private getTaskStates() {
    this.mservice.getIndices({ parent_id: '50000000' }).subscribe({
      next: (v: any) => {
        //console.log(v);
        if (v.length == 0) {
          this.taskStates = { items: [], length: 0 };
        }
        else {
          this.taskStates = { items: v, length: v.length }
        }
      },
      error: (e) => console.log(e.error),
    });
  }

  userRoles: string[] = []
  getUserRoles() {
    this.authService.getUserRoles().subscribe({
      next: (v: any) => {
        this.userRoles = v;
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
      this.view();
    });
  }
}
