import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastMessage } from '../../../core/models/interfaces/toast.interface';
import { ToastService } from '../../../core/services/toast/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrls: ['./toast.scss'],
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  removeToast(id: number) {
    this.toastService.remove(id);
  }

  getToastClass(type: string): string {
    switch (type) {
      case 'success':
        return 'bg-success text-white';
      case 'error':
        return 'bg-danger text-white';
      case 'warning':
        return 'bg-warning text-dark';
      case 'info':
        return 'bg-info text-dark';
      default:
        return 'bg-secondary text-white';
    }
  }
}
