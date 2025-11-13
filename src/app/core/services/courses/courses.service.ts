import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICourses } from '../../models/interfaces/courses.interface';
import { environment } from '../../../../environments/environment';
import { API_ENDPOINTS } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private http = inject(HttpClient);

  getAllCourses(): Observable<ICourses[]> {
    return this.http.get<ICourses[]>(
      `${environment.API_URL}${API_ENDPOINTS.COURSES.GET_ALL_COURSES}`
    );
  }

  createCourse(couresData: any): Observable<ICourses> {
    return this.http.post<ICourses>(
      `${environment.API_URL}${API_ENDPOINTS.COURSES.CREATE_NEW_COURSE}`,
      couresData
    );
  }

  getCouresId(id: string): Observable<ICourses> {
    return this.http.get<ICourses>(
      `${environment.API_URL}${API_ENDPOINTS.COURSES.GET_COURSE_BY_ID}/${id}`
    );
  }

  updateCoures(couresData: any): Observable<ICourses> {
    return this.http.put<ICourses>(
      `${environment.API_URL}${API_ENDPOINTS.COURSES.UPDATE_COURSE}`,
      couresData
    );
  }

  deleteCoures(id: string): Observable<ICourses> {
    return this.http.delete<ICourses>(
      `${environment.API_URL}${API_ENDPOINTS.COURSES.DELETE_COURSE}/${id}`
    );
  }

  getCourseByInstitute(id: string): Observable<ICourses> {
    return this.http.delete<ICourses>(
      `${environment.API_URL}${API_ENDPOINTS.COURSES.GET_COURSE_BY_INSTITUTE}/${id}`
    );
  }
}
