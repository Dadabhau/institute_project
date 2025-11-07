import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { MasterService } from '../../../core/services/master/master.service';
import { MasterResponse, MasterInterface } from '../../../core/models/classes/master.models';
import { PaymentIcon } from '../../../shared/components/payment-icon/payment-icon';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { LoadingComponent } from '../../../shared/components/loading/loading';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-master',
  imports: [CommonModule, FormsModule, PaymentIcon, LoadingComponent, FaIconComponent],
  templateUrl: './master.html',
  styleUrls: ['./master.scss'],
})
export class Master implements OnInit {
  mastersData: MasterInterface[] = [];
  filteredMasters: MasterInterface[] = [];
  newMaster: MasterInterface = { masterId: 0, masterFor: '', masterValue: '' };
  editMode: boolean = false;

  error: string = '';
  success: string = '';
  loading: boolean = false;

  faEdit = faEdit;
  faTrash = faTrash;

  // filter text
  filterText: string = '';

  constructor(private master: MasterService) {}

  ngOnInit() {
    this.getMasters();
  }

  getMasters() {
    this.loading = true;
    this.master.getAllMasters().subscribe({
      next: (res: MasterResponse) => {
        this.mastersData = res.data;
        this.filteredMasters = [...this.mastersData];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch master data.';
        this.loading = false;
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
    if (!masterForm.valid) return;
    this.loading = true;

    if (this.editMode) {
      // Update existing master
      this.master.updateMaster(this.newMaster).subscribe({
        next: () => {
          this.success = 'Master updated successfully!';
          this.error = '';
          this.editMode = false;
          this.getMasters();
          masterForm.reset();
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to update master.';
          this.loading = false;
        },
      });
    } else {
      // Add new master
      this.master.createMaster(this.newMaster).subscribe({
        next: () => {
          this.success = 'Master added successfully!';
          this.error = '';
          this.getMasters();
          masterForm.reset();
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to add master.';
          this.loading = false;
        },
      });
    }
  }

  editMaster(master: MasterInterface) {
    this.newMaster = { ...master };
    this.editMode = true;
    this.success = '';
    this.error = '';
  }

  deleteMaster(masterId: number) {
    if (!confirm('Are you sure you want to delete this record?')) return;

    this.loading = true;
    this.master.deleteMaster(masterId).subscribe({
      next: () => {
        this.success = 'Master deleted successfully!';
        this.getMasters();
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to delete master.';
        this.loading = false;
      },
    });
  }

  filterMasters() {
    const text = this.filterText.toLowerCase();
    this.filteredMasters = this.mastersData.filter((m) => m.masterFor.toLowerCase().includes(text));
  }

  resetForm(masterForm: NgForm) {
    masterForm.reset();
    this.newMaster = { masterId: 0, masterFor: '', masterValue: '' };
    this.editMode = false;
    this.success = '';
    this.error = '';
  }
}
