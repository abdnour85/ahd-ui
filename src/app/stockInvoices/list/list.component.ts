import { Component, inject } from '@angular/core';
import { ListResponse } from '../../models/ListResponse';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { StockInvoice } from '../../models/StockInvoice';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/Product';
import { StockInvoiceService } from '../../services/stock-invoice.service';

@Component({
  selector: 'app-stock-invoices-list',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class StockInvoicesListComponent {
  authService = inject(AuthService);
  mservice = inject(mservice);
  stockInvoiceService = inject(StockInvoiceService);
  route = inject(ActivatedRoute)
  user?: any;
  //progressStatus //0: new, 1: sending request, 2: pass, 3: fail
  private progressStatus = {
    refreshToken: 101,
    getStockInvoices: 101
  }
  isLoading() {
    return this.progressStatus.getStockInvoices == 102 || this.progressStatus.refreshToken == 102
  }
  parameters = {
    type: 'i', productId: '', notes: '',
    fromDate: new Date().toISOString().split('T')[0], toDate: new Date().toISOString().split('T')[0],
    pageNumber: 1, pageSize: 1000
  }
  stockInvoices: ListResponse<StockInvoice> = { length: 0, items: [] };
  products: ListResponse<Product> = { length: 0, items: [] };
  type_name = ''

  constructor() {
    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()
  }

  printStockInvoice(id: string) {
    let width = window.innerWidth / 1.5; // desired width of the popup window
    let height = window.innerHeight - 30; // desired height of the popup window
    let left = window.innerWidth / 2 - width / 2;
    let top = window.innerHeight / 2 - height / 2;

    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,dialog:yes,modal:yes,
width=${width},height=${height},left=${left},top=${top}`;

    open(`/reports-stockInvoice?id=${id}`, 'معاينة ملف ', params);
  }

  deleteStockInvoice(stockInvoice: StockInvoice) {
    if (confirm(`حذف ملف  "${stockInvoice.account_name}"؟`))
      this.stockInvoiceService.deleteStockInvoice(stockInvoice.id!).subscribe({
        next: (v: any) => {
          //this.toastr.success('تم حذف بطاقة العمل', 'تمت العملية')
          this.getStockInvoices()
        },
        error: (e) => {
          console.log(e.error)
          alert(e.error.title)
        },
        //complete: () => console.info('getClinics() completed'),
      });
  }

  getStockInvoices() {
    this.progressStatus.getStockInvoices = 102
    this.stockInvoiceService.getStockInvoices(this.parameters.pageNumber, this.parameters.pageSize, 'date', 'desc', '', this.parameters.type,
       this.parameters.fromDate, this.parameters.toDate).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.progressStatus.getStockInvoices = 103
        this.stockInvoices = { length: 0, items: v.items };
      },
      error: (e) => { this.progressStatus.getStockInvoices = e.status; console.log(e.error) },
      //complete: () => console.info('getClients() completed'),
    });
  }

  private getProducts() {
    this.mservice.getProducts({ status: 'a', pageNumber: 1, pageSize: 1000}).subscribe({
      next: (v: any) => {
        //console.log(v);
        if (v.length == 0)
          this.products = { items: [{}], length: 1 };
        else this.products = { items: v, length: v.length }
        this.products.items.unshift({ id: '', name: 'الكل' })
      },
      error: (e) => console.log(e.error),
    });
  }

  view() {
    this.route.queryParams.subscribe(params => {
      this.parameters.type = params['type'];
      this.type_name = this.parameters.type ? "إدخال" : "إخراج";
      this.getStockInvoices();
      this.getProducts()
    });

    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
    });
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
