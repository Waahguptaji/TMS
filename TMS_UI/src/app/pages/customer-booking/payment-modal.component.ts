import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay" *ngIf="show">
      <div class="modal-content">
        <div class="payment-header">
          <h2>Complete Payment</h2>
          <div class="amount">₹{{ amount.toFixed(2) }}</div>
        </div>

        <div class="payment-methods">
          <div
            class="method"
            [class.active]="selectedMethod === 'credit'"
            (click)="selectedMethod = 'credit'"
          >
            <i class="fas fa-credit-card"></i>
            <span>Credit Card</span>
          </div>
          <div
            class="method"
            [class.active]="selectedMethod === 'debit'"
            (click)="selectedMethod = 'debit'"
          >
            <i class="fas fa-credit-card"></i>
            <span>Debit Card</span>
          </div>
        </div>

        <form (ngSubmit)="handlePayment()" [class.processing]="isProcessing">
          <div class="card-container">
            <div class="card-wrapper">
              <div class="card-brands">
                <img
                  src="assets/visa.svg"
                  [class.active]="cardType === 'visa'"
                />
                <img
                  src="assets/mastercard.svg"
                  [class.active]="cardType === 'mastercard'"
                />
                <img
                  src="assets/rupay.svg"
                  [class.active]="cardType === 'rupay'"
                />
              </div>
              <div class="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  [(ngModel)]="cardNumber"
                  name="cardNumber"
                  (input)="formatCardNumber($event)"
                  placeholder="4242 4242 4242 4242"
                  [class.error]="cardNumberError"
                  required
                />
                <span class="error-message" *ngIf="cardNumberError">
                  Please enter a valid card number
                </span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  [(ngModel)]="expiryDate"
                  name="expiryDate"
                  (input)="formatExpiryDate($event)"
                  placeholder="MM/YY"
                  [class.error]="expiryError"
                  required
                />
                <span class="error-message" *ngIf="expiryError">
                  Invalid expiry date
                </span>
              </div>

              <div class="form-group cvv-group">
                <label>CVV</label>
                <input
                  type="password"
                  [(ngModel)]="cvv"
                  name="cvv"
                  maxlength="3"
                  placeholder="123"
                  [class.error]="cvvError"
                  required
                />
                <i
                  class="fas fa-question-circle cvv-help"
                  title="3-digit security code"
                ></i>
                <span class="error-message" *ngIf="cvvError">
                  Invalid CVV
                </span>
              </div>
            </div>
          </div>

          <div class="button-group">
            <button
              type="button"
              class="btn btn-secondary"
              (click)="onCancel()"
              [disabled]="isProcessing"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              [disabled]="isProcessing || !isFormValid()"
            >
              <span *ngIf="!isProcessing">Pay ₹{{ amount.toFixed(2) }}</span>
              <div class="loader" *ngIf="isProcessing"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        backdrop-filter: blur(5px);
      }

      .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 16px;
        width: 100%;
        max-width: 480px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }

      .payment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;

        h2 {
          font-size: 1.5rem;
          color: var(--text);
          margin: 0;
        }

        .amount {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--primary);
        }
      }

      .payment-methods {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;

        .method {
          flex: 1;
          padding: 1rem;
          border: 2px solid var(--border);
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            border-color: var(--primary);
          }

          &.active {
            border-color: var(--primary);
            background: rgba(var(--primary), 0.05);
          }

          i {
            font-size: 1.25rem;
            color: var(--primary);
          }
        }
      }

      .card-container {
        background: var(--surface);
        padding: 1.5rem;
        border-radius: 12px;
        margin-bottom: 1.5rem;
      }

      .card-brands {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;

        img {
          height: 24px;
          opacity: 0.5;
          transition: opacity 0.3s;

          &.active {
            opacity: 1;
          }
        }
      }

      .form-group {
        margin-bottom: 1.5rem;

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          color: var(--text-light);
        }

        input {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid var(--border);
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;

          &:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(var(--primary), 0.1);
            outline: none;
          }

          &.error {
            border-color: var(--error);
          }
        }
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      .cvv-group {
        position: relative;

        .cvv-help {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-light);
          cursor: help;
        }
      }

      .error-message {
        color: var(--error);
        font-size: 0.75rem;
        margin-top: 0.25rem;
      }

      .button-group {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;

        button {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.3s ease;

          &.btn-primary {
            background: var(--primary);
            color: white;
            min-width: 140px;

            &:hover:not(:disabled) {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(var(--primary), 0.2);
            }
          }

          &.btn-secondary {
            background: transparent;
            color: var(--text);
            border: 2px solid var(--border);

            &:hover:not(:disabled) {
              background: var(--surface);
            }
          }

          &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
        }
      }

      .loader {
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s linear infinite;
        margin: 0 auto;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      .processing {
        opacity: 0.7;
        pointer-events: none;
      }
    `,
  ],
})
export class PaymentModalComponent {
  @Input() show = false;
  @Input() amount = 0;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSuccess = new EventEmitter<void>();

  selectedMethod = 'credit';
  cardNumber = '';
  expiryDate = '';
  cvv = '';
  isProcessing = false;
  cardType = '';

  cardNumberError = false;
  expiryError = false;
  cvvError = false;

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);

    // Add spaces every 4 digits
    const parts = value.match(/.{1,4}/g);
    if (parts) event.target.value = parts.join(' ');

    // Detect card type
    if (value.startsWith('4')) this.cardType = 'visa';
    else if (value.startsWith('5')) this.cardType = 'mastercard';
    else if (value.startsWith('6')) this.cardType = 'rupay';
    else this.cardType = '';

    this.cardNumber = value;
    this.validateCardNumber();
  }

  formatExpiryDate(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);

    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }

    event.target.value = value;
    this.expiryDate = value;
    this.validateExpiry();
  }

  validateCardNumber() {
    this.cardNumberError = this.cardNumber.length !== 16;
  }

  validateExpiry() {
    const value = this.expiryDate.replace('/', '');
    if (value.length !== 4) {
      this.expiryError = true;
      return;
    }

    const month = parseInt(value.slice(0, 2));
    const year = parseInt(value.slice(2));
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    this.expiryError =
      month < 1 ||
      month > 12 ||
      year < currentYear ||
      (year === currentYear && month < currentMonth);
  }

  validateCVV() {
    this.cvvError = this.cvv.length !== 3;
  }

  isFormValid(): boolean {
    return (
      !this.cardNumberError &&
      !this.expiryError &&
      !this.cvvError &&
      this.cardNumber.length === 16 &&
      this.expiryDate.length === 5 &&
      this.cvv.length === 3
    );
  }

  handlePayment() {
    if (!this.isFormValid()) return;

    this.isProcessing = true;
    // Simulate payment processing
    setTimeout(() => {
      this.isProcessing = false;
      this.onSuccess.emit();
    }, 1500);
  }

  onCancel() {
    this.onClose.emit();
  }
}
