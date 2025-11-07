export interface ToastMessage {
  id?: number;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  delay?: number;
}
