// src/app/payment-distributions/payment-distributions.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { mservice } from '../../services/mservice.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Mission } from '../../models/Mission';
import { ToastrService } from 'ngx-toastr';
import { MissionServiceContract } from '../../models/MissionServiceContract';
import { PaymentDistribution } from '../../models/PaymentDistribution';
import { populateGroupedPayDests } from '../../utils/populate_grouped_pay_dests';

@Component({
  selector: 'app-mission-payment-distributions',
  imports: [CommonModule, NgSelectModule, FormsModule, RouterLink],
  templateUrl: './payment-distributions.component.html',
  styleUrl: './payment-distributions.component.scss'
})
export class MissionPaymentDistributionsComponent implements OnInit {
  router = inject(Router)
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  mservice = inject(mservice);
  toastr = inject(ToastrService)

  user?: any;
  mission: Mission = {
    contracts: [], stockInvoice: {
      type: '',
      items: []
    },
    stages: []
  }
  // Removed unused properties: products, services, workTypes, taskStates, contractors

  // Cache for grouped payment distributions to avoid redundant calls
  //private _groupedPaymentDistributionsCache: { [contractId: string]: { [key: string]: PaymentDistribution[] } } = {};

  constructor() {
    this.GetUserRoles()
    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()
  }

  ngOnInit() {
    // Removed calls to getProducts(), getServices(), getTaskStates(), getWorkTypes(), getContractors()
  }

  printMission() {
    let width = window.innerWidth / 1.5;
    let height = window.innerHeight - 30;
    let left = window.innerWidth / 2 - width / 2;
    let top = window.innerHeight / 2 - height / 2;

    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,dialog:yes,modal:yes,
width=${width},height=${height},left=${left},top=${top}`;

    open(`/reports-mission?id=${this.mission.id}`, 'معاينة كرت العمل', params);
  }

  view() {
    this.route.queryParams.subscribe(params => {
      let id = params['id'];
      this.getMissionById(id);
    });
    this.authService.getCurrentAuthUser().subscribe((r) => {
      this.user = r;
    });
  }

  

  sumOfProperty(array: Array<any>, property: string): number {
    let sum = 0;
    for (const item of array) {
      sum += Number(item[property]);
    }
    return Number(sum.toFixed(2));
  }

  private getMissionById(id: any) {
    this.mservice.GetMissionPaymentDistributions(id).subscribe({
      next: (v: any) => {
        this.mission = v;
        this.mission.contracts.forEach(contract => {
          contract = populateGroupedPayDests(contract);          
        });
      },
      error: (e) => console.log(e.error),
    });
  }

  userRoles: string[] = []
  GetUserRoles() {
    this.authService.getUserRoles().subscribe({
      next: (v: any) => {
        this.userRoles = v;
      },
      error: (e) => console.log(e.error),
    });
  }

  refreshToken() {
    this.authService.refreshToken()?.subscribe((r) => {
      console.log(r);
      this.view();
    });
  }

  // TrackBy functions for *ngFor optimization
  trackByContractId(index: number, contract: MissionServiceContract): string | undefined {
    return contract.id;
  }

  trackByAdjKey(index: number, adjKey: string): string {
    return adjKey;
  }

  trackByPaymentDistributionId(index: number, distribution: PaymentDistribution): string | undefined {
    return distribution.id;
  }
}