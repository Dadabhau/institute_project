import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  faCreditCard,
  faMoneyBillWave,
  faMobileAlt,
  faQuestionCircle,
  faGlobe,
  faFileInvoiceDollar,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-payment-icon',
  imports: [NgStyle, FaIconComponent],
  templateUrl: './payment-icon.html',
  styleUrls: ['./payment-icon.scss'],
})
export class PaymentIcon {
  @Input() value: string = ''; // e.g., "Credit Card"

  // FontAwesome icons
  faCreditCard = faCreditCard;
  faMoney = faMoneyBillWave;
  faMobile = faMobileAlt;
  faOther = faQuestionCircle;
  faGlobe = faGlobe;
  faCheque = faFileInvoiceDollar;

  iconColor = '';
  tooltipText = '';

  get icon() {
    const val = this.value.toLowerCase();

    if (val.includes('credit') || val.includes('debit') || val.includes('card')) {
      this.iconColor = '#007bff'; // blue
      this.tooltipText = 'Card Payment';
      return this.faCreditCard;
    }

    if (val.includes('cash')) {
      this.iconColor = '#28a745'; // green
      this.tooltipText = 'Cash Payment';
      return this.faMoney;
    }

    if (
      val.includes('phone') ||
      val.includes('g pay') ||
      val.includes('google') ||
      val.includes('paytm') ||
      val.includes('upi')
    ) {
      this.iconColor = '#ff9800'; // orange
      this.tooltipText = 'UPI / Mobile Payment';
      return this.faMobile;
    }

    if (
      val.includes('online') ||
      val.includes('neft') ||
      val.includes('imps') ||
      val.includes('netbanking') ||
      val.includes('bank')
    ) {
      this.iconColor = '#009688'; // teal
      this.tooltipText = 'Online Transfer';
      return this.faGlobe;
    }

    if (val.includes('cheque') || val.includes('check')) {
      this.iconColor = '#6f42c1'; // purple
      this.tooltipText = 'Cheque Payment';
      return this.faCheque;
    }

    this.iconColor = '#6c757d'; // gray
    this.tooltipText = 'Other Payment Mode';
    return this.faOther;
  }
}
