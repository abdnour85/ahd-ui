import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { Product, } from '../../models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-add',
  imports: [CommonModule, NgSelectModule, FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class ProductsAddComponent {
  router = inject(Router)
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  mservice = inject(mservice);
    toastr = inject(ToastrService)
  user?: any;
  product: Product = {};

  constructor() {
    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()

  }

  view() {
    this.route.queryParams.subscribe(params => {
      //let id = params['id'];
      //this.getProductById(id, true);
    });
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
    });
  }

  ngOnInit() {
  }

  addProduct() {
    this.mservice.addProduct(this.product).subscribe({
      next: (v: any) => {
        this.toastr.success(`تم إضافة الصنف ${this.product.name}`, 'تمت العملية')
        this.router.navigate(['/products-list'])
      },
      error: (e) => console.log(e.error),
      //complete: () => console.info('getClinics() completed'),
    });
  }

  /*  private getProductById(id: any, getAnimals: boolean) {
     this.mservice.getProductById(id).subscribe({
       next: (v: any) => {
         //console.log(v);
         this.product = v;
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