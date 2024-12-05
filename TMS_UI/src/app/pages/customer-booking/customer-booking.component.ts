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

@Component({
  selector: 'app-customer-booking',
  standalone: true,
  imports: [
    CommonModule,
    CustomerNavbarComponent,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  templateUrl: './customer-booking.component.html',
  styleUrls: ['./customer-booking.component.scss'],
})
export class CustomerBookingComponent implements OnInit {
  bookingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerBookingService: CustomerBookingService
  ) {
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
      pickupDate: ['', Validators.required],
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
    console.log(userData);
    
    if (userData && userData.customerName) {
      this.bookingForm.patchValue({
        senderName: userData.customerName,
        senderContact: userData.mobileNumber,
        senderAddress: userData.mailingAddress,
      });
    }
  }

  calculateCosts(): void {
    const { weight, packaging, deliverySpeed } = this.bookingForm.value;
    let baseCharge = 50; // Base charge in ₹
    let packagingCharge = 0;
    let deliveryCharge = 0;
    switch (packaging) {
      case 'standard':
        packagingCharge = 20;
        break;
      case 'custom':
        packagingCharge = 30;
        break;
      case 'eco':
        packagingCharge = 25;
        break;
      case 'fragile':
        packagingCharge = 40;
        break;
      default:
        packagingCharge = 20;
    }

  
    switch (deliverySpeed) {
      case 'standard':
        deliveryCharge = 100;
        break;
      case 'express':
        deliveryCharge = 200;
        break;
      case 'priority':
        deliveryCharge = 300;
        break;
      default:
        deliveryCharge = 100;
    }

    const totalCost = baseCharge + packagingCharge + deliveryCharge;

    // Update the cost summary in the form
    // You can bind these to the template using interpolation
    (
      document.getElementById('baseCharge') as HTMLElement
    ).innerText = `₹${baseCharge.toFixed(2)}`;
    (
      document.getElementById('packagingCharge') as HTMLElement
    ).innerText = `₹${packagingCharge.toFixed(2)}`;
    (
      document.getElementById('deliveryCharge') as HTMLElement
    ).innerText = `₹${deliveryCharge.toFixed(2)}`;
    (
      document.getElementById('totalCost') as HTMLElement
    ).innerText = `₹${totalCost.toFixed(2)}`;
  }

  resetForm(): void {
    this.bookingForm.reset({
      packaging: 'standard',
      deliverySpeed: 'standard',
      pickupDate: '',
      pickupTime: '',
    });
    // Reset cost summary
    (document.getElementById('baseCharge') as HTMLElement).innerText = '₹0.00';
    (document.getElementById('packagingCharge') as HTMLElement).innerText =
      '₹0.00';
    (document.getElementById('deliveryCharge') as HTMLElement).innerText =
      '₹0.00';
    (document.getElementById('totalCost') as HTMLElement).innerText = '₹0.00';
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const formData = this.bookingForm.value;
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');

      const bookingData = {
        senderName: formData.senderName,
        senderContact: formData.contactNumber,
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
        userId: userData.userId,
        status: "In-Transit", 
      }
      console.log(bookingData);

      this.customerBookingService.createBooking(bookingData).subscribe({
        next: (response:string) => {
          alert('Parcel booked successfully!');

          alert('Response from server: '+ response);

          this.bookingForm.reset({
            packaging: 'standard',
            deliverySpeed: 'standard',
            pickupDate: '',
            pickupTime: '',
          });
          this.resetForm();
        },
        error: (err) => {
          console.error('Booking failed:', err);
          alert(
            'There was an issue booking your parcel. Please try again later.'
          );
        },
      });
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  logout(): void {
    localStorage.removeItem("isAuthenticated")
    // localStorage.removeItem('username');
    this.router.navigate(['/customer-login']);
  }
}



