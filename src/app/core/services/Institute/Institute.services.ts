import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { API_ENDPOINTS } from '../../constants/api.constants';
import { Observable } from 'rxjs';
import { InstituteResponse } from '../../models/interfaces/institute.interface';

@Injectable({
  providedIn: 'root',
})
export class InstituteServices {
  private http = inject(HttpClient);

  getAllInstitutes(): Observable<InstituteResponse> {
    return this.http.get<InstituteResponse>(
      `${environment.API_URL}${API_ENDPOINTS.INSTITUTE.GET_ALL_INSTITUTES}`
    );
  }

  createInstitute(instituteData: any): Observable<InstituteResponse> {
    return this.http.post<InstituteResponse>(
      `${environment.API_URL}${API_ENDPOINTS.INSTITUTE.CREATE_NEW_INSTITUTE}`,
      instituteData
    );
  }
  getInstituteById(id: string): Observable<InstituteResponse> {
    return this.http.get<InstituteResponse>(
      `${environment.API_URL}${API_ENDPOINTS.INSTITUTE.GET_INSTITUTE_BY_ID}/${id}`
    );
  }
  updateInstitute(id: string, instituteData: any): Observable<InstituteResponse> {
    return this.http.put<InstituteResponse>(
      `${environment.API_URL}${API_ENDPOINTS.INSTITUTE.UPDATE_INSTITUTE}/${id}`,
      instituteData
    );
  }
  deleteInstitute(id: string): Observable<InstituteResponse> {
    return this.http.delete<InstituteResponse>(
      `${environment.API_URL}${API_ENDPOINTS.INSTITUTE.DELETE_INSTITUTE}/${id}`
    );
  }
}
