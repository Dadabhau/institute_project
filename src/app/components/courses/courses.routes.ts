import { Route } from '@angular/router';
import { Courses } from './courses';
import { CourseForm } from './course-form/course-form';

export const INSTITUTE_ROUTES: Route[] = [
  { path: '', component: Courses, title: 'Courses Page' },
  {
    path: ':id',
    component: CourseForm,
    title: 'Course Add page',
  },
];
