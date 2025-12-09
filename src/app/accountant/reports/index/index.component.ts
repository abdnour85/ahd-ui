import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListResponse } from '../../../models/ListResponse';
import { Contractor, Employee, User } from '../../../models/User';
import { AuthService } from '../../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { mservice } from '../../../services/mservice.service';
import { Product } from '../../../models/Product';
import { Iindex } from '../../../models/Iindex';
import { Iservice } from '../../../models/Iservice';

@Component({
  selector: 'app-accountant-reports-index',
  imports: [CommonModule, FormsModule, NgbModule],
  providers: [DatePipe],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class AccountantReportsIndexComponent {
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
  employees: ListResponse<Employee> = { length: 0, items: [] };
  products: ListResponse<Product> = { length: 0, items: [] };
  services: ListResponse<Iservice> = { length: 0, items: [] };
  taskStates: ListResponse<Iindex> = { length: 0, items: [] };
  workTypes: ListResponse<Iindex> = { length: 0, items: [] };
  users: ListResponse<User> = { length: 0, items: [] };
  contractorBusinessStatement_parameters = {
    employeeId: '', contractorId: '', fromDate: this.monthFirstDay, toDate: this.today, contractor_name: '',
    includeContracts: 'true', includeAdditions: '', includeDeductions: '', employee_name: '',
    userId: '', user_name: '',
  }

  printContractorBusinessStatement() {
    //const url_ = this.contractorProducts_parameters.contractorId == '' ? '/reports-stock-invoice-items' : '/reports-contractorProducts'
    const url_ = '/reports-contractor-business-statement'

    /*if (this.contractorBusinessStatement_parameters.contractorId == '') {
      this.toastr.error('يرجى اختيار المقاول', 'خطأ');
      return
    }*/
    let width = window.innerWidth / 1.5; // desired width of the popup window
    let height = window.innerHeight - 30; // desired height of the popup window
    let left = window.innerWidth / 2 - width / 2;
    let top = window.innerHeight / 2 - height / 2;

    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,dialog:yes,modal:yes,
  width=${width},height=${height},left=${left},top=${top}`;

    this.contractorBusinessStatement_parameters.contractor_name = this.contractorBusinessStatement_parameters.contractorId ? this.contractors.items.filter(o => o.id == this.contractorBusinessStatement_parameters.contractorId)[0].name! : 'الكل'
    this.contractorBusinessStatement_parameters.user_name = this.contractorBusinessStatement_parameters.userId ? this.users.items.filter(o => o.id == this.contractorBusinessStatement_parameters.userId)[0].name! : 'الكل'

    const url = this.buildUrl(url_, this.contractorBusinessStatement_parameters);
    window.open(url, 'كشف حساب أعمال ', params)
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
    this.getUsers();
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

  private getEmployees() {
    this.mservice.GetUsersByRole({ role_id: '10d22170-f104-42f9-90cf-2e87b7a26304' }).subscribe({
      next: (v: any) => {
        //console.log(v);
        if (v.length == 0)
          this.employees = { items: [], length: 0 };
        else this.employees = { items: v, length: v.length }
      },
      error: (e) => console.log(e.error),
    });
  }

    getUsers() {
    //this.progressStatus.getUsers = 102
    this.mservice.getUsers({pageNumber: 1, pageSize: 1000}).subscribe({
      next: (v: any) => {
        //console.log(v);
        //this.progressStatus.getUsers = 103
        this.users = { length: 0, items: v };
      },
      error: (e) => { /*this.progressStatus.getUsers = e.status;*/ console.log(e.error) },
      //complete: () => console.info('getClients() completed'),
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