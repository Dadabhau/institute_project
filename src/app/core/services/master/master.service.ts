import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { MasterResponse, MasterInterface } from '../../models/classes/master.models';
import { API_ENDPOINTS } from '../../constants/api.constants';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MasterService {
  constructor(private http: HttpClient) {}

  getAllMasters(): Observable<MasterResponse> {
    return this.http.get<MasterResponse>(
      `${environment.API_URL}${API_ENDPOINTS.MASTER.GET_ALL_MASTER}`
    );
  }

  // getMasterById(id: string): Observable<Master> {
  //   return this.http.get<Master>(
  //     `${environment.API_URL}${API_ENDPOINTS.MASTER.GET_MASTER_BY_TYPE}/${id}`
  //   );
  // }

  createMaster(master: MasterInterface): Observable<MasterInterface> {
    return this.http.post<MasterInterface>(
      `${environment.API_URL}${API_ENDPOINTS.MASTER.CREATE_NEW_MASTER}`,
      master
    );
  }

  // updateMaster(id: string, master: Master) {
  //   return this.http.put<Master>(
  //     `${environment.API_URL}${API_ENDPOINTS.MASTER.UPDATE_MASTER}/${id}`,
  //     master
  //   );
  // }

  // deleteMaster(id: string) {
  //   return this.http.delete(`${environment.API_URL}${API_ENDPOINTS.MASTER.DELETE_MASTER}/${id}`);
  // }
}
