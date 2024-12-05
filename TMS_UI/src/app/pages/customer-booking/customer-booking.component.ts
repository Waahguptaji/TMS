import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerBookingService } from '../../services/customer-booking.service';
import { HttpClientModule } from '@angular/common/http';
import { CustomerNavbarComponent } from '../../shared/customer-navbar/customer-navbar.component';
import { PaymentModalComponent } from './payment-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-booking',
  standalone: true,
  imports: [
    CommonModule,
    CustomerNavbarComponent,
    HttpClientModule,
    ReactiveFormsModule,
    PaymentModalComponent,
  ],
  templateUrl: './customer-booking.component.html',
  styleUrls: ['./customer-booking.component.scss'],
})
export class CustomerBookingComponent implements OnInit {
  bookingForm!: FormGroup;
  showPaymentModal = false;
  totalAmount = 0;
  minDate: string;

  private readonly RATES = {
    base: 50,
    packaging: {
      standard: 20,
      custom: 30,
      eco: 25,
      fragile: 40,
    },
    delivery: {
      standard: 100,
      express: 200,
      priority: 300,
    },
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerBookingService: CustomerBookingService,
    private snackBar: MatSnackBar
  ) {
    this.minDate = this.getMinDate();
    this.initializeForm();
  }

  private initializeForm(): void {
    this.bookingForm = this.fb.group({
      senderName: ['', Validators.required],
      senderContact: [
        '',
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      senderAddress: ['', Validators.required],
      receiverName: ['', Validators.required],
      receiverContact: [
        '',
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      receiverAddress: ['', Validators.required],
      receiverPin: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      weight: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      packaging: ['standard', Validators.required],
      deliverySpeed: ['standard', Validators.required],
      pickupDate: ['', [Validators.required, this.dateValidator()]],
      pickupTime: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUserInfo();
    this.calculateCosts();
    this.bookingForm.valueChanges.subscribe(() => {
      this.calculateCosts();
    });
  }

  loadUserInfo(): void {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData && userData.customerName) {
      this.bookingForm.patchValue({
        senderName: userData.customerName,
        senderContact: userData.mobileNumber,
        senderAddress: userData.mailingAddress,
      });
    }
  }

  calculateCosts(): void {
    const { packaging, deliverySpeed, weight } = this.bookingForm.value;

    // Calculate base charge with weight factor
    const baseCharge = this.RATES.base + (Number(weight) || 0) * 2;

    // Get packaging charge
    const packagingCharge =
      this.RATES.packaging[packaging as keyof typeof this.RATES.packaging] ||
      this.RATES.packaging.standard;

    // Get delivery charge
    const deliveryCharge =
      this.RATES.delivery[deliverySpeed as keyof typeof this.RATES.delivery] ||
      this.RATES.delivery.standard;

    const totalCost = baseCharge + packagingCharge + deliveryCharge;
    this.totalAmount = totalCost;

    this.updateCostDisplay('baseCharge', baseCharge);
    this.updateCostDisplay('packagingCharge', packagingCharge);
    this.updateCostDisplay('deliveryCharge', deliveryCharge);
    this.updateCostDisplay('totalCost', totalCost);
  }

  private updateCostDisplay(elementId: string, amount: number): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerText = `₹${amount.toFixed(2)}`;
    }
  }

  getMinDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  dateValidator() {
    return (control: any) => {
      const selected = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today ? null : { pastDate: true };
    };
  }

  getExpectedDeliveryDate(pickupDate: string, deliverySpeed: string): string {
    const date = new Date(pickupDate);
    date.setHours(0, 0, 0, 0);

    const deliveryDays = {
      priority: 1,
      express: 2,
      standard: 4,
    };

    date.setDate(
      date.getDate() +
        (deliveryDays[deliverySpeed as keyof typeof deliveryDays] || 4)
    );

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  resetForm(): void {
    this.bookingForm.reset({
      packaging: 'standard',
      deliverySpeed: 'standard',
    });

    // Reset cost displays
    ['baseCharge', 'packagingCharge', 'deliveryCharge', 'totalCost'].forEach(
      (id) => {
        this.updateCostDisplay(id, 0);
      }
    );
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      this.showPaymentModal = true;
    } else {
      this.showErrorMessage('Please fill all required fields correctly.');
    }
  }

  handlePaymentSuccess(): void {
    const formData = this.bookingForm.value;
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    const bookingData = {
      senderName: formData.senderName,
      senderContact: formData.senderContact,
      senderAddress: formData.senderAddress,
      receiverName: formData.receiverName,
      receiverContact: formData.receiverContact,
      receiverAddress: formData.receiverAddress,
      receiverPin: formData.receiverPin,
      weight: formData.weight,
      description: formData.description,
      packaging: formData.packaging,
      deliverySpeed: formData.deliverySpeed,
      pickupDate: formData.pickupDate,
      pickupTime: formData.pickupTime,
      expectedDeliveryDate: this.getExpectedDeliveryDate(
        formData.pickupDate,
        formData.deliverySpeed
      ),
      amount: this.totalAmount,
      userId: userData.userId,
      status: 'In-Transit',
    };

    this.customerBookingService.createBooking(bookingData).subscribe({
      next: (bookingId: string) => {
        this.showPaymentModal = false;
        this.showSuccessMessage(
          `Booking Successful!\nBooking ID: ${bookingId}\nExpected Delivery: ${bookingData.expectedDeliveryDate}`
        );
        this.resetForm();
      },
      error: (error) => {
        console.error('Booking failed:', error);
        this.showErrorMessage('Booking failed. Please try again.');
      },
    });
  }

  handlePaymentCancel(): void {
    this.showPaymentModal = false;
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 7000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }
}
