import { Component, OnInit } from '@angular/core';

import { MasterService } from '../../../core/services/master/master.service';
import { MasterResponse, MasterInterface } from '../../../core/models/classes/master.models';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { PaymentIcon } from '../../../shared/components/payment-icon/payment-icon';

import { LoadingComponent } from '../../../shared/components/loading/loading';

@Component({
  selector: 'app-master',
  imports: [FormsModule, PaymentIcon, CommonModule, LoadingComponent],
  templateUrl: './master.html',
  styleUrl: './master.scss',
})
export class Master implements OnInit {
  newMaster: MasterInterface = { masterId: 0, masterFor: '', masterValue: '' };

  mastersData: MasterInterface[] = [];

  error: string = '';

  loading: boolean = false;

  success: string = 'Master added successfully!';

  constructor(private master: MasterService) {}

  ngOnInit() {
    this.master.getAllMasters().subscribe({
      next: (res: MasterResponse) => {
        console.log('Master Data:', res.data);
        this.mastersData = res.data;
      },
      error: (err) => {
        console.error('Error fetching master data:', err);
      },
    });
  }

  trackById(index: number, item: any): number {
    return item.masterId;
  }

  getTooltipText(value: string): string {
    const val = value.toLowerCase();

    if (val.includes('credit') || val.includes('debit')) return 'Card Payment';
    if (val.includes('cash')) return 'Cash Payment';
    if (
      val.includes('upi') ||
      val.includes('g pay') ||
      val.includes('phone') ||
      val.includes('paytm')
    )
      return 'UPI / Mobile Payment';
    if (val.includes('online') || val.includes('neft') || val.includes('bank'))
      return 'Online Transfer';
    if (val.includes('cheque') || val.includes('check')) return 'Cheque Payment';
    return 'Other Payment Mode';
  }

  addMaster(masterForm: NgForm) {
    this.loading = true;
    if (masterForm.valid) {
      this.newMaster = {
        masterId: 0,
        masterFor: masterForm.value.masterFor,
        masterValue: masterForm.value.masterValue,
      };

      this.master.createMaster(this.newMaster).subscribe({
        next: (res) => {
          console.log('Master created successfully:', res);
          this.loading = false;
        },
        error: (err) => {
          console.error('Error creating master:', err);
          this.error = err.error.message || 'An error occurred while creating the master.';
          this.loading = false;
        },
      });
      masterForm.reset();
      console.log('New Master Added:', this.newMaster);
    }
  }
}
