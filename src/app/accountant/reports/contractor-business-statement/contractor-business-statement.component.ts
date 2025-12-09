import { Component, inject, Renderer2 } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { mservice } from '../../../services/mservice.service';
import { ActivatedRoute } from '@angular/router';
import { Mission } from '../../../models/Mission';
import { DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Title } from "@angular/platform-browser";
import { PaymentDistribution } from '../../../models/PaymentDistribution';

@Component({
  selector: 'app-contractor-business-statement',
  imports: [DatePipe, DecimalPipe, NgFor, NgIf],
  templateUrl: './contractor-business-statement.component.html',
  styleUrl: '../../../reports/reports.css'
})
export class ContractorBusinessStatementComponent {
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  mservice = inject(mservice);
  renderer = inject(Renderer2)
  titleService = inject(Title)

  user?: any;
  items: PaymentDistribution[] = []
  filteredItems: PaymentDistribution[] = []
  //flattenMissions: any = []  
  parameters: any

  sumOfProperty(array: Array<any>, property: string): number {
    let sum = 0;
    for (const item of array) {
      sum += Number(item[property]);
    }
    return Number(sum.toFixed(2));
  }

 /**
 * Groups an array of objects by (contractId, price) and calculates the 
 * sum of price by counting each unique group's price only once.
 * This correctly handles cases where a single transaction price is duplicated 
 * across records (e.g., split by user) but should only be counted one time.
 *
 * @param {Array<Object>} data The array of objects to process.
 * @returns {number} The single grand total sum of unique prices.
 */
 calculateGrandTotalGroupedPrice(data:PaymentDistribution[]): number {
  // Use a Map to store and track unique (contractId, price) combinations.
  const uniquePricesMap = new Map();

  for (const item of data) {
    // 1. Create a unique key using only contractId and price
    const key = `${item.contractId}-${item.price}`;

    // 2. Only add the price to the map if the key has not been seen before.
    // This ensures that for the two records in your sample (which share the same 
    // contractId and price), the price of -84.22 is only recorded once.
    if (!uniquePricesMap.has(key)) {
      uniquePricesMap.set(key, item.price);
    }
  }

  // 3. Sum the unique prices recorded in the map
  let grandTotal = 0;
  for (const price of uniquePricesMap.values()) {
    grandTotal += price;
  }

  // 4. Return the final single number
  return grandTotal;
}

  constructor() {
    this.renderer.removeClass(document.body, 'skin-blue');
    this.renderer.removeClass(document.body, 'sidebar-mini');

    if (this.authService.isTokenExpired()) this.refreshToken();
    else this.view()

  }

  view() {
    this.route.queryParams.subscribe(params => {
      this.parameters = params;
      this.titleService.setTitle(`كشف حساب أعمال مقاول ${this.parameters.contractor_name}`);
      this.getPaymentDistributionsByContractorAndDate();
    });
    this.authService.getCurrentAuthUser().subscribe((r) => {
      //console.log(r);
      this.user = r;
    });
  }

  private getPaymentDistributionsByContractorAndDate() {
    this.mservice.getPaymentDistributionsByContractorAndDate(this.parameters).subscribe({
      next: (v: any) => {
        //console.log(v);
        this.items = v;
        this.applyFilters();
        //this.titleService.setTitle(this.mission.serialNo?.toString()!);
        setTimeout(() => {
          window.print();
        }, 100);
        //if (v.id && getAnimals) this.getAnimals();
      },
      error: (e) => console.log(e.error),
    });
  }
  applyFilters(): void {
    let tempItems = [...this.items]; // Create a shallow copy to avoid modifying the original array

    // If none of the includes are true, maybe show all or nothing?
    // For this example, if no filter is specified, we'll show nothing initially.
    // Adjust this logic based on your default behavior.
    if (!this.parameters.includeContracts && !this.parameters.includeAdditions && !this.parameters.includeDeductions) {
      this.filteredItems = [];
      return;
    }

    // Apply filters based on parameters
    this.filteredItems = tempItems.filter(item => {
      const isContract = item.adjustmentId === null;
      const isAddition = item.adjustmentId !== null && item.type === 'Addition';
      const isDeduction = item.adjustmentId !== null && item.type === 'Deduction';
      item.price = (item.adjustmentId == null ? item.price : item.type == 'Addition' ? item.adjustmentAmount! : -1 * item.adjustmentAmount!)

      if (this.parameters.includeContracts === 'true' && isContract) {
        return true;
      }
      if (this.parameters.includeAdditions === 'true' && isAddition) {
        return true;
      }
      if (this.parameters.includeDeductions === 'true' && isDeduction) {
        return true;
      }
      return false; // If an item doesn't match any enabled filter, exclude it
    });

    console.log(this.filteredItems);
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