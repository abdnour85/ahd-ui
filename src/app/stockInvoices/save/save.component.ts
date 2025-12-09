import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { ListResponse } from '../../models/ListResponse';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StockInvoice, UpdateStockInvoice } from '../../models/StockInvoice';
import { Product } from '../../models/Product';
import { StockInvoiceItem } from '../../models/StockInvoiceItem';
import { StockInvoiceService } from '../../services/stock-invoice.service';

@Component({
  selector: 'app-stock-invoices-save',
  imports: [CommonModule, NgSelectModule, FormsModule, RouterLink],
  templateUrl: './save.component.html',
  styleUrl: './save.component.scss'
})
export class StockInvoicesSaveComponent {
  router = inject(Router)
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  mservice = inject(mservice);
  stockInvoiceService = inject(StockInvoiceService);
  user?: any;
  invoice: StockInvoice = { type: '', items: [] }
  products: ListResponse<Product> = { length: 0, items: [] };
  type_id = ''
  type_name = ''

  constructor() {
    //if (this.authService.isTokenExpired()) this.refreshToken();
    //else this.view()
    this.view()
  }

  view() {
    this.route.queryParams.subscribe(params => {
      let id = params['id'];
      this.getStockInvoiceById(id, true);
    });
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
    });
  }

  ngOnInit() {
    this.getProducts()
  }

  removeItem(i: number) {
    this.invoice.items.splice(i, 1);
  }

  addItem() {
    this.invoice.items.push({id: this.generateTempUuid()})
  }

  nextItemId = 1;

  generateTempUuid(): string {
    const id = this.nextItemId++;
    return `00000000-0000-0000-0000-${id.toString().padStart(12, '0')}`;
  }

  saveInvoice() {
    //todo: convert invoice to UpdateStockInvoice
    this.stockInvoiceService.updateStockInvoice(this.invoice.id!, this.invoice).subscribe({
      next: (v: any) => {
        this.router.navigate(['/stockInvoices-list'], { queryParams: { type: this.type_id } })
        //this.customer = { password: '', passwordConfirm: '', familyMembers: [], diseases: [], needs: [] }
        //alert("تم إرسال الطلب بنجاح")
      },
      error: (e) => {
        alert('حدث خطأ، تاكد من البيانات المدخلة')
        console.log(e.error)
      },
      //complete: () => console.info('getClinics() completed'),
    });
  }
  

  setInvoiceItemProduct(item: StockInvoiceItem) {
    let product = this.products.items.find(i => i.id == item.productId);
    if (product)
      item.inStore = product.quantity;
    if (item.quantity == null) item.quantity = 1;
  }

  private getStockInvoiceById(id: any, getAnimals: boolean) {
    this.stockInvoiceService.getById(id).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.invoice = v;
        this.type_id = this.invoice.type;
        this.type_name = this.invoice.type == "i" ? "إدخال" : "إخراج";
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
          this.products = { items: [{}], length: 1 };
        else this.products = { items: v, length: v.length }
      },
      error: (e) => console.log(e.error),
    });
  }
}