import { Component, inject } from '@angular/core';
import { ListResponse } from '../../models/ListResponse';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { Product } from '../../models/Product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, FormsModule, RouterLink, NgbModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ProductsListComponent {
  authService = inject(AuthService);
  mservice = inject(mservice);
  toastr = inject(ToastrService)
  user?: any;
  //progressStatus //0: new, 1: sending request, 2: pass, 3: fail
  private progressStatus = {
    refreshToken: 101,
    getProducts: 101
  }
  isLoading() {
    return this.progressStatus.getProducts == 102 || this.progressStatus.refreshToken == 102
  }
  parameters = { name: '', status: 'a', code: '', pageNumber: 1, pageSize: 20 }
  products: ListResponse<Product> = { length: 0, items: [] };

  constructor() {
    this.getUserRoles()
    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()
  }

  printReport() {
    const url_ = '/reports-products'

    let width = window.innerWidth / 1.5; // desired width of the popup window
    let height = window.innerHeight - 30; // desired height of the popup window
    let left = window.innerWidth / 2 - width / 2;
    let top = window.innerHeight / 2 - height / 2;

    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,dialog:yes,modal:yes,
  width=${width},height=${height},left=${left},top=${top}`;

    const url = this.buildUrl(url_, {});
    window.open(url, '', params)
  }

  private buildUrl(baseUrl: string, queryParams: { [key: string]: string }): string {
    const queryString = Object.keys(queryParams)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join('&');

    return `${baseUrl}?${queryString}`;
  }

  deleteProduct(product: Product) {
    if (confirm(`حذف الصنف ${product.name}؟`))
      this.mservice.deleteProduct(product.id!).subscribe({
        next: (v: any) => {
          this.toastr.success('تم حذف الصنف', 'تمت العملية')
          this.getProducts(false)
        },
        error: (e) => {
          console.log(e.error)
          alert(e.error.title)
        },
        //complete: () => console.info('getClinics() completed'),
      });
  }

  getProducts(resetPageNo: boolean) {
    if (resetPageNo) this.parameters.pageNumber = 1;
    this.progressStatus.getProducts = 102
    this.mservice.getProducts(this.parameters).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.progressStatus.getProducts = 103
        this.products = { length: 0, items: v };
        this.getProductsCount();
      },
      error: (e) => { this.progressStatus.getProducts = e.status; console.log(e.error) },
      //complete: () => console.info('getClients() completed'),
    });
  }

  getProductsCount() {
    this.progressStatus.getProducts = 102
    this.mservice.getProductsCount(this.parameters).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.progressStatus.getProducts = 103
        this.products.length = v;
      },
      error: (e) => { this.progressStatus.getProducts = e.status; console.log(e.error) },
      //complete: () => console.info('getClients() completed'),
    });
  }

  view() {
    //this.getProducts(true);
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
    });
  }

  userRoles: string[] = []
  getUserRoles() {
    this.authService.getUserRoles().subscribe({
      next: (v: any) => {
        this.userRoles = v;
        this.getProducts(true);
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