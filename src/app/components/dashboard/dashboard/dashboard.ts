import { Component } from '@angular/core';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from '../../../core/services/dashboard/dashboard.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-dashboard',
  imports: [FaIconComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  faTruck = faTruck;
  constructor(private dashboardService: DashboardService) {}

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
