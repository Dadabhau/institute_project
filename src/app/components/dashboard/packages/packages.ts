import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash, faSave, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { PackagesService } from '../../../core/services/packages/packages.service';
import { Package } from '../../../core/models/interfaces/packages.interface';
import {
  FormsModule,
  NgForm,
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-packages',
  imports: [FormsModule, NgIf, FaIconComponent, NgFor, NgClass, ReactiveFormsModule],
  templateUrl: './packages.html',
  styleUrls: ['./packages.scss'],
})
export class Packages implements OnInit {
  packages: Package[] = [];
  filteredPackages: Package[] = [];
  filterText: string = '';

  packageForm!: FormGroup;

  loading = false;
  success = '';
  error = '';

  addNewPackage = {
    packageId: 0,
    packageName: '',
    oneTimeTotalCost: 0,
    emiTotalCost: '',
    maxBranches: 0,
    maxStudents: 0,
    isSmsAlert: false,
  };

  editModeId: number | null = null;
  editedPackage: Package | null = null;

  showAddModal = false;
  newPackage: Package = this.getEmptyPackage();

  faEdit = faEdit;
  faTrash = faTrash;
  faSave = faSave;
  faTimes = faTimes;
  faPlus = faPlus;

  activeMessage: { id: number; type: 'loading' | 'success' | 'error'; text: string } | null = null;

  constructor(private fb: FormBuilder, private packagesService: PackagesService) {}

  initForm() {
    this.packageForm = this.fb.group({
      packageId: [0],
      packageName: ['', Validators.required],
      oneTimeTotalCost: [0, Validators.required],
      emiTotalCost: ['', Validators.required],
      maxBranches: [0, Validators.required],
      maxStudents: [0, Validators.required],
      isSmsAlert: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPackages();
  }

  private getEmptyPackage(): Package {
    return {
      packageId: 0,
      packageName: '',
      oneTimeTotalCost: 0,
      emiTotalCost: '0',
      maxBranches: 0,
      maxStudents: 0,
      isSmsAlert: false,
    };
  }

  loadPackages(): void {
    this.loading = true;
    this.packagesService.getAllPackages().subscribe({
      next: (res) => {
        this.packages = res.data || [];
        this.filteredPackages = [...this.packages];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load packages.';
        this.loading = false;
      },
    });
  }

  onSubmit() {}

  filterPackages(): void {
    const text = this.filterText.toLowerCase();
    this.filteredPackages = this.packages.filter((p) => p.packageName.toLowerCase().includes(text));
  }

  startEdit(pkg: Package): void {
    // Clear any previous message
    this.activeMessage = null;
    this.editModeId = pkg.packageId;
    this.editedPackage = { ...pkg };
  }

  cancelEdit(): void {
    this.editModeId = null;
    this.editedPackage = null;
    this.activeMessage = null;
  }

  savePackage(pkg: Package): void {
    if (!this.editedPackage) return;

    this.activeMessage = { id: pkg.packageId, type: 'loading', text: 'Saving...' };
    const updatedData = { ...this.editedPackage };

    this.packagesService.updatePackage(pkg.packageId.toString(), updatedData).subscribe({
      next: () => {
        this.activeMessage = {
          id: pkg.packageId,
          type: 'success',
          text: 'Record updated successfully!',
        };

        const index = this.packages.findIndex((p) => p.packageId === pkg.packageId);
        if (index !== -1) this.packages[index] = { ...updatedData };

        this.filterPackages();

        // hide after 3s
        setTimeout(() => {
          this.activeMessage = null;
          this.cancelEdit();
          this.loadPackages();
        }, 3000);
      },
      error: () => {
        this.activeMessage = { id: pkg.packageId, type: 'error', text: 'Failed to update record!' };
        setTimeout(() => (this.activeMessage = null), 3000);
      },
    });
  }

  deletePackage(id: number): void {
    if (!confirm('Are you sure you want to delete this package?')) return;

    this.loading = true;
    this.packagesService.deletePackage(id.toString()).subscribe({
      next: () => {
        this.success = 'Package deleted successfully!';
        this.loadPackages();
      },
      error: () => {
        this.error = 'Failed to delete package.';
        this.loading = false;
      },
    });
  }

  openAddModal(): void {
    this.newPackage = this.getEmptyPackage();
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }
  saveNewPackage(form: NgForm): void {
    debugger;
    if (form.invalid) {
      this.error = 'Please fill out all required fields correctly.';
      return;
    }

    this.loading = true;
    this.packagesService.createPackage(this.addNewPackage).subscribe({
      next: () => {
        this.success = 'New Package added successfully!';

        setTimeout(() => {
          this.closeAddModal();
          this.loadPackages();
        }, 2000);
      },
      error: () => {
        this.error = 'Failed to create package.';
        this.loading = false;
      },
    });
  }

  trackById(index: number, item: Package): number {
    return item.packageId;
  }

  get f() {
    return this.packageForm.controls;
  }
}
