import { Component, OnInit } from '@angular/core';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from '../../../core/services/dashboard/dashboard.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { User } from '../../../core/models/interfaces/login.interface';

@Component({
  selector: 'app-dashboard',
  imports: [FaIconComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  faTruck = faTruck;

  user!: User;
  constructor(private dashboardService: DashboardService) {}
  ngOnInit(): void {
    const storedUser = localStorage.getItem('auth_user');
    this.user = storedUser ? JSON.parse(storedUser) : null;
    console.log(this.user);
  }

  // getDashboardData(id: number) {
  //   // debugger;
  //   this.dashboardService.getDashboardData(id).subscribe({
  //     next: (res) => {
  //       this.instituteData = res;
  //       console.log('Dashboard Data:', this.instituteData);
  //     },
  //     error: (err) => {
  //       console.error('Error fetching dashboard data:', err);
  //     },
  //   });
  // }
}
