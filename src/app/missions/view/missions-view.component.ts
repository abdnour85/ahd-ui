import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { ListResponse } from '../../models/ListResponse';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Iindex } from '../../models/Iindex';
import { Mission } from '../../models/Mission';
import { MissionProduct } from '../../models/MissionProduct';
import { MissionService } from '../../models/MissionService';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../models/Product';
import { Iservice } from '../../models/Iservice';
import { createMissionServiceContract, MissionServiceContract } from '../../models/MissionServiceContract';
import { Contractor } from '../../models/User';

@Component({
  selector: 'app-missions-view',
  imports: [CommonModule, NgSelectModule, FormsModule, RouterLink],
  templateUrl: './missions-view.component.html',
  styleUrl: './missions-view.component.scss'
})
export class MissionsViewComponent {
  router = inject(Router)
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  mservice = inject(mservice);
  toastr = inject(ToastrService)

  user?: any;
  mission: Mission = {
    stockInvoice: { type: 'o', items: [] }, contracts: [], stages: [],
  }
  products: ListResponse<Product> = { length: 0, items: [] };
  services: ListResponse<Iservice> = { length: 0, items: [] };
  workTypes: ListResponse<Iindex> = { length: 0, items: [] };
  taskStates: ListResponse<Iindex> = { length: 0, items: [] };
  contractors: ListResponse<Contractor> = { length: 0, items: [] };

  printMission() {
    let width = window.innerWidth / 1.5; // desired width of the popup window
    let height = window.innerHeight - 30; // desired height of the popup window
    let left = window.innerWidth / 2 - width / 2;
    let top = window.innerHeight / 2 - height / 2;

    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,dialog:yes,modal:yes,
width=${width},height=${height},left=${left},top=${top}`;

    open(`/reports-mission?id=${this.mission.id}`, 'معاينة كرت العمل', params);
  }

  constructor() {    
    this.GetUserRoles()
    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()

  }

  view() {
    this.route.queryParams.subscribe(params => {
      let id = params['id'];
      this.getMissionById(id);
    });
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
    });
  }

  ngOnInit() {
    this.getProducts()
    this.getServices()
    this.getTaskStates();
    this.getWorkTypes();
    this.getContractors();
  }

  sumOfProperty(array: Array<any>, property: string): number {
    let sum = 0;
    for (const item of array) {
      sum += Number(item[property]);
    }
    return Number(sum.toFixed(2));
  }

  setMissionProduct(item: MissionProduct) {
    let product = this.products.items.find(i => i.id == item.productId);
    if (product)
      item.inStore = product.quantity;
    if (item.quantity == null) item.quantity = 1;
  }

  addProduct() {
    this.mission.stockInvoice.items.push({})
  }

  removeContract(i: number) {
    let contract = this.mission.contracts[i]
    if (contract.id) {
      if (confirm(`حذف مقاولة "${contract.contractor_name}" بالتأكيد؟`))
        this.mservice.deleteMissionServiceContract(contract.id).subscribe({
          next: (v: any) => {
            this.toastr.success('تم حذف المقاولة', 'تمت العملية')
            this.mission.contracts.splice(i, 1);
            this.setMissionTotal();
          },
          error: (e) => {
            console.log(e.error)
            alert(e.error.title)
          },
          //complete: () => console.info('getClinics() completed'),
        });
    }
    else {
      this.mission.contracts.splice(i, 1);
      this.setMissionTotal();
    }
  }

  removeMissionService(contract: MissionServiceContract, i: number) {
    let service = contract.services[i]
    if (service.id) {
      if (confirm(`حذف الخدمة "${service.service_name}" بالتأكيد؟`))
        this.mservice.deleteMissionService(service.id).subscribe({
          next: (v: any) => {
            this.toastr.success('تم حذف الخدمة', 'تمت العملية')
            contract.services.splice(i, 1);
            this.setContractTotal(contract);
          },
          error: (e) => {
            console.log(e.error)
            alert(e.error.title)
          },
          //complete: () => console.info('getClinics() completed'),
        });
    }
    else {
      contract.services.splice(i, 1);
      this.setContractTotal(contract);
    }
  }

  removeMissionProduct(i: number) {
    let product = this.mission.stockInvoice.items[i]
    if (product.id) {
      this.mservice.deleteMissionProduct(product.id).subscribe({
        next: (v: any) => {
          this.toastr.success('تم حذف العهدة', 'تمت العملية')
          this.mission.stockInvoice.items.splice(i, 1);
        },
        error: (e) => {
          console.log(e.error)
          alert(e.error.title)
        },
        //complete: () => console.info('getClinics() completed'),
      });
    }
    else {
      this.mission.stockInvoice.items.splice(i, 1);
    }
  }

  /*
  deleteMission(id: string){
    this.mservice.deleteMission(id).subscribe({
      next: (v: any) => {
        this.toastr.success('تم حذف بطاقة العمل', 'تمت العملية')
        this.getMissions()
      },
      error: (e) => {
        console.log(e.error)
        alert(e.error.title)
      },
      //complete: () => console.info('getClinics() completed'),
    });
  }
  */

  addContract() {
    this.mission.contracts.push(createMissionServiceContract({
      price: 0, additions: 0, deductions: 0, total: 0, services: [{}]
    }))
  }

  /* removeService(contract: MissionServiceContract, i: number) {
    let service = contract.services[i]
    if (service.id) alert('تحت الإنشاء')
    else {
      contract.services.splice(i, 1);
      this.setContractTotal(contract)
    }
  } */

  addService(contract: MissionServiceContract) {
    contract.services.push({})
  }

  setContractService(item: MissionService, contract: MissionServiceContract, setUnitPrice: boolean) {
    if (setUnitPrice) {
      let service = this.services.items.find(i => i.id == item.serviceId);
      if (service) {
        item.unitPrice = service.price;
      }
    }
    if (!item.quantity) item.quantity = 1;
    if (item.unitPrice) item.price = Number((item.quantity * item.unitPrice).toFixed(2));
    this.setContractTotal(contract);
  }

  setContractTotal(contract: MissionServiceContract) {
    contract.price = this.sumOfProperty(contract.services, 'price');
    if (!contract.additions) contract.additions = 0;
    if (!contract.deductions) contract.deductions = 0;
    contract.total = Number((contract.price + contract.additions - contract.deductions).toFixed(2));
    this.setMissionTotal()
  }

  setMissionTotal() {
    let mission = this.mission;
    this.mission.price = this.sumOfProperty(this.mission.contracts, 'price');
    this.mission.deductions = this.sumOfProperty(this.mission.contracts, 'discount');
    if (!mission.price) mission.price = 0;
    if (!mission.deductions) mission.deductions = 0;
    mission.total = Number((mission.price - mission.deductions).toFixed(2));
  }

  /*saveMission() {
    this.mservice.saveMission(this.mission).subscribe({
      next: (v: any) => {
        this.toastr.success('تم تحديث بطاقة العمل', 'تمت العملية')
        this.router.navigate(['/missions-list'])
      },
      error: (e) => {
        console.log(e.error)
        alert(e.error.title)
      },
      //complete: () => console.info('getClinics() completed'),
    });
  }*/

  private getMissionById(id: any) {
    this.mservice.getMissionById(id).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.mission = v;
        //if (v.id && getAnimals) this.getAnimals();
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
    this.mservice.getServices({ pageNumber: 1, pageSize: 1000 }).subscribe({
      next: (v: any) => {
        //console.log(v);
        if (v.length == 0)
          this.services = { items: [], length: 0 };
        else this.services = { items: v, length: v.length }
      },
      error: (e) => console.log(e.error),
    });
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

  private getTaskStates() {
    this.mservice.getIndices({ parent_id: '50000000' }).subscribe({
      next: (v: any) => {
        //console.log(v);
        if (v.length == 0)
          this.taskStates = { items: [], length: 0 };
        else this.taskStates = { items: v, length: v.length }
      },
      error: (e) => console.log(e.error),
    });
  }

  private getContractors() {
    this.mservice.GetUsersByRole({role_id: '10b4fef-1401-4605-9830-ac9e2ccd0f59'}).subscribe({
      next: (v: any) => {
        //console.log(v);
        if (v.length == 0)
          this.contractors = { items: [], length: 0 };
        else this.contractors = { items: v, length: v.length }
      },
      error: (e) => console.log(e.error),
    });
  }


  userRoles: string[] = []
  hasRole(role: string): boolean {
    return this.userRoles.some(userRole => userRole.toLowerCase() === role.toLowerCase());
  }

  GetUserRoles() {
    this.authService.getUserRoles().subscribe({
      next: (v: any) => {
        this.userRoles = v;
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