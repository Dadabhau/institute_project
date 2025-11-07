import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faEdit,
  faTrash,
  faSave,
  faTimes,
  faPlus,
  faTruck,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { InstituteServices } from '../../../core/services/Institute/Institute.services';
import { Institute, InstituteResponse } from '../../../core/models/interfaces/institute.interface';
import { CommonModule } from '@angular/common';
import { min, Subscription } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastService } from '../../../core/services/toast/toast.service';

@Component({
  selector: 'app-institutes',
  imports: [FaIconComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './institutes.html',
  styleUrls: ['./institutes.scss'],
})
export class Institutes implements OnInit, OnDestroy {
  faEdit = faEdit;
  faTrash = faTrash;
  faSave = faSave;
  faTimes = faTimes;
  faPlus = faPlus;
  faTruck = faTruck;

  error!: string;

  institutes: Institute[] = [];

  instituteForm!: FormGroup;
  selectedInstituteId!: number;

  isEditing: boolean = false;

  showAddModal = false;
  currentDate = new Date().toISOString();

  getInstitutesList!: Subscription;
  constructor(
    private fb: FormBuilder,
    private instituteService: InstituteServices,
    private toast: ToastService
  ) {}

  initForm() {
    this.instituteForm = this.fb.group({
      instituteId: [0],
      name: ['', [Validators.required, Validators.minLength(3)]],
      ownerName: ['', Validators.required],
      conatctNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      emailId: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      location: ['', Validators.required],
      gstNo: ['', Validators.required],
      createdDate: [new Date().toISOString()],
    });
  }

  ngOnInit() {
    this.loadInstitutes();
    this.initForm();
  }

  loadInstitutes() {
    this.getInstitutesList = this.instituteService.getAllInstitutes().subscribe({
      next: (response: InstituteResponse) => {
        this.institutes = response.data;

        console.log('Institutes loaded:', this.institutes);
      },
      error: (error) => {
        console.error('Error loading institutes:', error);
        this.error = error.error?.message || 'Failed to add master.';
      },
    });
  }

  // Add and edit institute
  onSubmit() {
    if (this.instituteForm.invalid) {
      this.instituteForm.markAllAsTouched();
      return;
    }
    const formData = this.instituteForm.value;

    if (this.isEditing && this.selectedInstituteId) {
      // Update existing institute
      formData.instituteId = this.selectedInstituteId;
      this.instituteService.updateInstitute(String(this.selectedInstituteId), formData).subscribe({
        next: (res) => {
          this.loadInstitutes();
          this.closeAddModal();
          console.log(res, 'Data added successful!');
          this.toast.show({ type: 'success', message: 'Institute saved successfully!' });
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to update Institute.';
          this.closeAddModal();
          this.toast.show({
            type: 'error',
            message: this.error,
          });
          console.log(this.error);
        },
      });
    } else {
      // Create new institute
      formData.instituteId = 0;
      formData.createdDate = new Date().toISOString();
      console.log(formData.createdDate);
      this.instituteService.createInstitute(formData).subscribe({
        next: (res) => {
          console.log(res, 'Data added successful!');
          this.loadInstitutes();
          this.closeAddModal();
          this.toast.show({ type: 'success', message: 'Institute added successfully!' });
        },
        error: (error) => {
          this.error = error.error?.message || 'Failed to add Institute.';
          this.closeAddModal();
          this.toast.show({ type: 'error', message: 'Failed to add Institute' });
          console.log(this.error);
        },
      });
    }
  }

  // Delete institute
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this institute?')) {
      this.instituteService.deleteInstitute(id.toString()).subscribe({
        next: (response: InstituteResponse) => {
          console.log('Institute deleted successfully:', response);
          this.toast.show({ type: 'success', message: 'Institute deleted successfully' });
        },
        error: (error) => {
          console.error('Error deleting institute:', error);
          this.toast.show({ type: 'error', message: 'Error deleting institute' });
        },
      });
    }
  }

  onEdit(institute: Institute) {
    this.isEditing = true;
    this.showAddModal = true;
    this.selectedInstituteId = institute.instituteId;
    this.instituteForm.patchValue(institute);
  }

  openAddModal(): void {
    this.isEditing = false;
    this.showAddModal = true;
    this.instituteForm.reset();
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.isEditing = false;
  }

  onCancel() {
    this.isEditing = false;
  }

  get f() {
    return this.instituteForm.controls;
  }

  ngOnDestroy(): void {
    this.getInstitutesList.unsubscribe();
  }
}
