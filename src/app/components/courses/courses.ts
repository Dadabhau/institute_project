import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import {
  faEdit,
  faTrash,
  faSave,
  faPlus,
  faTruck,
  faEllipsisVertical,
  faTachographDigital,
  faIndianRupeeSign,
  faGraduationCap,
  faTimes,
  faClock,
  faCalendarDays,
  faBuildingColumns,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CoursesService } from '../../core/services/courses/courses.service';
import { Subscription } from 'rxjs';
import { ICourses } from '../../core/models/interfaces/courses.interface';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { InstituteServices } from '../../core/services/Institute/Institute.services';
import { Institute, InstituteResponse } from '../../core/models/interfaces/institute.interface';

@Component({
  selector: 'app-courses',
  imports: [FaIconComponent, DatePipe],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses implements OnInit, OnDestroy {
  faPlus = faPlus;
  faEllipsisVertical = faEllipsisVertical;
  faTachographDigital = faTachographDigital;
  faIndianRupeeSign = faIndianRupeeSign;
  faGraduationCap = faGraduationCap;
  faTimes = faTimes;
  faClock = faClock;
  faCalendarDays = faCalendarDays;
  faBuildingColumns = faBuildingColumns;

  courses: ICourses[] = [];
  institutes: Institute[] = [];

  private coursesService = inject(CoursesService);
  private instituteService = inject(InstituteServices);
  private router = inject(Router);
  private couresesSub = new Subscription();

  ngOnInit(): void {
    this.getAllInstitutes();
    this.getAllCoureses();
  }

  getAllInstitutes() {
    this.instituteService.getAllInstitutes().subscribe({
      next: (res: InstituteResponse) => (this.institutes = res.data),
      error: (err) => console.error('Error loading institutes', err),
    });
  }

  getAllCoureses() {
    this.couresesSub = this.coursesService.getAllCourses().subscribe({
      next: (res) => {
        console.log(res, 'Courses Fetched successfully');
        this.courses = res;
      },
      error: (err) => {
        console.log(err, 'Error fetching coureses');
      },
    });
  }

  getInstituteName(instituteId: number): string {
    const institute = this.institutes.find((i) => i.instituteId === instituteId);
    return institute ? institute.name : 'N/A';
  }

  onEdit(courses: ICourses) {
    this.router.navigate(['/institute-courses', courses.courseId]);
    alert(courses.courseId);
  }

  onDelete(id: number) {}

  ngOnDestroy(): void {
    this.couresesSub.unsubscribe();
  }
}
