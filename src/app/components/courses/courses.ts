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

  private coursesService = inject(CoursesService);
  private instituteService = inject(InstituteServices);
  private router = inject(Router);
  private couresesSub = new Subscription();

  ngOnInit(): void {
    this.getAllInstitute();
    this.getAllCoureses();
  }

  getAllInstitute() {
    this.instituteService.getAllInstitutes().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
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

  onEdit(courses: ICourses) {
    this.router.navigate(['institute-courses', courses.courseId]);
  }

  onDelete(id: number) {}

  ngOnDestroy(): void {
    this.couresesSub.unsubscribe();
  }
}
