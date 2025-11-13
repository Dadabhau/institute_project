export interface LoginUser {
  userName: string;
  password: string;
}
export interface User {
  userId: number;
  userName: string;
  password?: string;
  role: 'SuperAdmin' | 'InstituteAdmin' | string;
  instituteId: number;
  studentId: null;
  branchId: null;
}
export interface LoginResponse {
  message: string;
  data: User;
  token: string;
}
