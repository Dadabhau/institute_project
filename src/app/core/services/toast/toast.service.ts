import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastMessage } from '../../models/interfaces/toast.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  show(toast: ToastMessage) {
    const current = this.toastsSubject.value;
    const id = Date.now();
    this.toastsSubject.next([...current, { id, ...toast }]);

    const delay = toast.delay ?? 3000;
    setTimeout(() => this.remove(id), delay);
  }

  remove(id: number) {
    this.toastsSubject.next(this.toastsSubject.value.filter((t) => t.id !== id));
  }

  clearAll() {
    this.toastsSubject.next([]);
  }
}
