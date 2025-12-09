import { Component } from '@angular/core';
import { PaymentDistributionService } from '../../../services/payment-distribution.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-destributions-populate',
  imports: [FormsModule],
  templateUrl: './populate.component.html',
  styleUrl: './populate.component.scss'
})
export class PaymentDestributionsPopulateComponent {
  parameters = {
    fromDate: '',
    toDate: ''
  };

  isLoading = false;
  message: string | null = null;
  error: string | null = null;

  constructor(private paymentDistributionService: PaymentDistributionService) {
    // Set default dates
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Format as yyyy-MM-dd for <input type="date">
    this.parameters.fromDate = this.formatDate(firstDayOfMonth);
    this.parameters.toDate = this.formatDate(today);
  }

  // Helper method to format date as yyyy-MM-dd
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  populateDistributions() {
    this.message = null;
    this.error = null;

    if (!this.parameters.fromDate || !this.parameters.toDate) {
      this.error = 'Please select both From Date and To Date.';
      return;
    }

    this.isLoading = true;

    this.paymentDistributionService.populateDistributions(
      this.parameters.fromDate,
      this.parameters.toDate
    ).subscribe({
      next: (response) => {
        console.log(response)
        this.message = response.message || 'Payment distributions populated successfully.';
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to populate payment distributions. Please try again.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}