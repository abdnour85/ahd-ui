import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { ListResponse } from '../../models/ListResponse';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StockInvoice, validateStockInvoice } from '../../models/StockInvoice';
import { UserRole } from '../../models/UserRole';
import { NgxMaskDirective } from 'ngx-mask';
import { StockInvoiceItem } from '../../models/StockInvoiceItem';
import { Product } from '../../models/Product';
import { ToastrService } from 'ngx-toastr';
import { StockInvoiceService } from '../../services/stock-invoice.service';

@Component({
  selector: 'app-stock-invoices-add',
  imports: [CommonModule, NgSelectModule, FormsModule, NgxMaskDirective, RouterLink],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class StockInvoicesAddComponent {
    router = inject(Router)
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  mservice = inject(mservice);
  stockInvoiceService = inject(StockInvoiceService);
  today = this.invertDateString(new Date().toISOString().split('T')[0])
  dates = { invoice: this.today }
  user?: any;
  invoice: StockInvoice = { type: '', items: [], date: '' }
  userRoles: ListResponse<UserRole> = { length: 0, items: [] };
  products: ListResponse<Product> = { length: 0, items: [] };
  toastr = inject(ToastrService)
  type_name = ''

  constructor() {
    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()

  }

  view() {
    this.route.queryParams.subscribe(params => {
      this.invoice.type = params['type'];
      this.type_name = this.invoice.type == "i" ? "إدخال" : "إخراج";
      //this.getCustomerById(id, true);
      this.getUserRoles()
      this.getProducts()
    });
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
    });
  }

  ngOnInit() {
  }

  setInvoiceItemProduct(item: StockInvoiceItem) {
    let product = this.products.items.find(i => i.id == item.productId);
    if (product)
      item.inStore = product.quantity;
    if (item.quantity == null) item.quantity = 1;
  }

  convertDateString(dateString: string): string {
    // Extract year, month, and day from the input string
    const year = dateString.slice(4);
    const month = dateString.slice(2, 4);
    const day = dateString.slice(0, 2);

    // Construct the new date string in the desired format (YYYY-MM-DD)
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  invertDateString(dateString: string): string {

    const [year, month, day] = dateString.split('-');

    // Months are 0-indexed in JavaScript Date objects, so we subtract 1.
    // While we *could* use the Date object, it adds unnecessary overhead for a simple string manipulation task. Direct string manipulation is more efficient here.
    return `${day}${month}${year}`;
  }

  removeItem(i: number) {
    this.invoice.items.splice(i, 1);
  }

  addItem() {
    this.invoice.items.push({})
  }

  addInvoice() {
    let invoice = this.invoice;    
    invoice.date = this.convertDateString(this.dates.invoice)
    let validationErrors = validateStockInvoice(this.invoice)
    if (validationErrors.length > 0) {
      alert("جميع حقول النموذج مطلوبة\n" + validationErrors.join("\n"));
      return;
    }

    this.stockInvoiceService.createStockInvoice(this.invoice).subscribe({
      next: (v: any) => {
        let itype = invoice.type;
        //this.router.navigate(['/customers-list'])
        invoice.items = []
        invoice.notes = ''
        this.toastr.success('تم إضافة سند إدخال', 'تمت العملية')
        //alert("تم إرسال الطلب بنجاح")
      },
      error: (e) => {
        alert('حدث خطأ، تاكد من البيانات المدخلة')
        console.log(e.error)
      },
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

  private getUserRoles() {
    this.mservice.getUserRoles({ role_id: '10c21f1b5-b4e4-43a1-817a-6e7a62ead93f' }).subscribe({
      next: (v: any) => {
        //console.log(v);
        if (v.length == 0)
          this.userRoles = { items: [{}], length: 1 };
        else {
          this.userRoles = { items: v, length: v.length }
          this.invoice.accountId = this.userRoles.items[0].user_id;
        }
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