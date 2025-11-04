import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { API_ENDPOINTS } from '../../constants/api.constants';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  getDashboardData(id: number) {
    return this.http.get(
      `${environment.API_URL}${API_ENDPOINTS.DASHBOARD.GET_DASHBOARD_DATA}/${id}`
    );
  }
}
