import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-course-form',
  imports: [ReactiveFormsModule],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss',
})
export class CourseForm implements OnInit {
  private fb = inject(FormBuilder);

  couresForm!: FormGroup;

  router = inject(Router);
  route = inject(ActivatedRoute);

  id: string = '0';

  constructor() {
    // Listen to router events to get the current route parameters
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') || '0';
    });
    console.log(this.id, 'COuresr form components');
  }

  ngOnInit(): void {}

  // Intiate Form
  couresF() {
    this.couresForm = this.fb.group({
      courseId: [0],
      courseName: ['', Validators.required],
      courseCost: [0, Validators.required],
      creratedDate: ['', Validators.required],
      isActive: [true, Validators.required],
      duration: ['', Validators.required],
      instituteId: [0, Validators.required],
      courseDescription: ['', Validators.required],
    });
  }

  // Get Form controls
  get f() {
    return this.couresForm.controls;
  }
}
