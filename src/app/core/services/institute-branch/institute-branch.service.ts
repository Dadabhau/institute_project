import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BranchMaster } from '../../models/interfaces/branches.interface';
import { environment } from '../../../../environments/environment';
import { API_ENDPOINTS } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class InstituteBranchService {
  http = inject(HttpClient);

  getAllBranches(): Observable<BranchMaster[]> {
    return this.http.get<BranchMaster[]>(
      `${environment.API_URL}${API_ENDPOINTS.INSTITUTE_BRANCHES.GET_ALL_BRANCHES}`
    );
  }

  createBranch(branchData: any): Observable<BranchMaster> {
    return this.http.post<BranchMaster>(
      `${environment.API_URL}${API_ENDPOINTS.INSTITUTE_BRANCHES.CREATE_NEW_BRANCH}`,
      branchData
    );
  }

  getBranchById(id: string): Observable<BranchMaster> {
    return this.http.get<BranchMaster>(
      `${environment.API_URL}${API_ENDPOINTS.INSTITUTE_BRANCHES.GET_BRANCH_BY_ID}/${id}`
    );
  }

  updateBranch(branchData: any): Observable<BranchMaster> {
    return this.http.put<BranchMaster>(
      `${environment.API_URL}${API_ENDPOINTS.INSTITUTE_BRANCHES.UPDATE_BRANCH}`,
      branchData
    );
  }

  deleteBranch(id: string): Observable<BranchMaster> {
    return this.http.delete<BranchMaster>(
      `${environment.API_URL}${API_ENDPOINTS.INSTITUTE_BRANCHES.DELETE_BRANCH}/${id}`
    );
  }
}
