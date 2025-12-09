import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { Product } from '../../models/Product';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-save',
  imports: [CommonModule, NgSelectModule, FormsModule, RouterLink],
  templateUrl: './save.component.html',
  styleUrl: './save.component.scss'
})
export class ProductsSaveComponent {
  router = inject(Router)
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  mservice = inject(mservice);
  user?: any;
  product: Product = {  }

  constructor() {
    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()

  }

  view() {
    this.route.queryParams.subscribe(params => {
      let id = params['id'];
      this.getProductById(id, true);
    });
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
    });
  }

  ngOnInit() {
  }

  saveProduct() {
    this.mservice.saveProduct(this.product).subscribe({
      next: (v: any) => {
        this.router.navigate(['/products-list'])
      },
      error: (e) => console.log(e.error),
      //complete: () => console.info('getClinics() completed'),
    });
  }

  private getProductById(id: any, getAnimals: boolean) {
    this.mservice.getProductById(id).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.product = v;
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