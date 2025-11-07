import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { API_ENDPOINTS } from '../../constants/api.constants';
import { Observable } from 'rxjs';
import { PackageResponse } from '../../models/interfaces/packages.interface';

@Injectable({ providedIn: 'root' })
export class PackagesService {
  http = inject(HttpClient);

  getAllPackages(): Observable<PackageResponse> {
    return this.http.get<PackageResponse>(
      `${environment.API_URL}${API_ENDPOINTS.PACKAGES.GET_ALL_PACKAGES}`
    );
  }

  createPackage(packageData: any): Observable<PackageResponse> {
    return this.http.post<PackageResponse>(
      `${environment.API_URL}${API_ENDPOINTS.PACKAGES.CREATE_NEW_PACKAGE}`,
      packageData
    );
  }

  getPackageById(id: string): Observable<PackageResponse> {
    return this.http.get<PackageResponse>(
      `${environment.API_URL}${API_ENDPOINTS.PACKAGES.GET_PACKAGE_BY_ID}/${id}`
    );
  }

  updatePackage(id: string, packageData: any): Observable<PackageResponse> {
    return this.http.put<PackageResponse>(
      `${environment.API_URL}${API_ENDPOINTS.PACKAGES.UPDATE_PACKAGE}/${id}`,
      packageData
    );
  }

  deletePackage(id: string): Observable<PackageResponse> {
    return this.http.delete<PackageResponse>(
      `${environment.API_URL}${API_ENDPOINTS.PACKAGES.DELETE_PACKAGE}/${id}`
    );
  }
}
