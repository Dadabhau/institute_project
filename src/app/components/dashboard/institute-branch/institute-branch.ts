import { Component, inject, OnInit } from '@angular/core';
import {
  faEdit,
  faTrash,
  faSave,
  faTimes,
  faPlus,
  faTruck,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InstituteServices } from '../../../core/services/Institute/Institute.services';
import { InstituteBranchService } from '../../../core/services/institute-branch/institute-branch.service';
import { BranchMaster } from '../../../core/models/interfaces/branches.interface';
import { Institute, InstituteResponse } from '../../../core/models/interfaces/institute.interface';
import { ToastService } from '../../../core/services/toast/toast.service';

@Component({
  selector: 'app-institute-branches',
  imports: [FaIconComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './institute-branch.html',
  styleUrl: './institute-branch.scss',
})
export class InstituteBranches implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faSave = faSave;
  faTimes = faTimes;
  faPlus = faPlus;
  faTruck = faTruck;

  branches: BranchMaster[] = [];
  institutes: Institute[] = [];

  isEditing!: boolean;
  showAddModal!: boolean;
  submitted = false;

  selectedBranchId!: number;
  error!: string;

  branchForm!: FormGroup;

  private fb = inject(FormBuilder);
  private instituteService = inject(InstituteServices);
  private branchService = inject(InstituteBranchService);
  private toast = inject(ToastService);

  ngOnInit(): void {
    this.branchF();
    this.getAllBranches();
    this.getInstitutes();
  }

  branchF() {
    this.branchForm = this.fb.group({
      branchId: [0],
      branchName: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      location: ['', Validators.required],
      instituteId: ['', Validators.required],
      branchContactNo: ['', Validators.required],
      branchEmail: ['', Validators.required],
      branchCode: ['', Validators.required],
    });
  }

  getInstitutes() {
    this.instituteService.getAllInstitutes().subscribe({
      next: (res: InstituteResponse) => (this.institutes = res.data),
      error: (err) => console.error('Error loading institutes', err),
    });
  }

  getAllBranches() {
    this.branchService.getAllBranches().subscribe({
      next: (res) => {
        this.branches = res;
        console.log('Branches fetched!', res);
      },
    });
  }

  getInstituteName(instituteId: number): string {
    const institute = this.institutes.find((i) => i.instituteId === instituteId);
    return institute ? institute.name : 'N/A';
  }

  onSubmit() {
    this.submitted = true;
    debugger;
    if (this.branchForm.invalid) {
      this.branchForm.markAllAsTouched();
      return;
    }
    const formData = this.branchForm.value;

    if (this.isEditing && this.selectedBranchId) {
      // Update existing branch
      formData.branchId = this.selectedBranchId;
      this.branchService.updateBranch(formData).subscribe({
        next: (res) => {
          this.getAllBranches();
          this.closeAddModal();
          this.toast.show({ type: 'success', message: 'Branch updated successfully!' });
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to update Branch.';
          this.closeAddModal();
          this.toast.show({ type: 'error', message: this.error });
        },
      });
    } else {
      // Create new branch
      formData.branchId = 0;
      this.branchService.createBranch(formData).subscribe({
        next: (res) => {
          console.log(res, 'Data added successful!');
          this.branchForm.reset();
          this.getAllBranches();
          this.closeAddModal();
          this.toast.show({ type: 'success', message: 'Branch added successfully!' });
        },
        error: (err) => {
          console.log(err);
          this.error = err.error?.message || 'Failed to add Branch.';
          this.branchForm.reset();
          this.closeAddModal();
          this.toast.show({ type: 'error', message: this.error });
        },
      });
    }
  }
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this institute?')) {
      debugger;
      this.branchService.deleteBranch(id.toString()).subscribe({
        next: (response) => {
          this.getAllBranches();
          console.log('Branch deleted successfully:', response);
          this.toast.show({ type: 'success', message: 'Branch deleted successfully' });
        },
        error: (error) => {
          console.error('Error deleting Branch:', error);
          this.toast.show({ type: 'error', message: 'Error deleting Branch' });
        },
      });
    }
  }

  onEdit(branch: BranchMaster) {
    this.isEditing = true;
    this.showAddModal = true;
    this.selectedBranchId = branch.branchId;
    this.branchForm.patchValue(branch);
  }

  openAddModal(): void {
    this.isEditing = false;
    this.showAddModal = true;
    this.branchForm.reset();
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.isEditing = false;
  }

  onCancel() {
    this.isEditing = false;
  }

  get f() {
    return this.branchForm.controls;
  }
}
