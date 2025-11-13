import { Component, inject } from '@angular/core';
import {
  faSliders,
  faBook,
  faUser,
  faMap,
  faChartBar,
  faCoffee,
  faAlignLeft,
  faCheckSquare,
  faUserPlus,
  faSignInAlt,
  faThLarge,
  faBox,
  faUniversity,
  faCodeBranch,
  faNetworkWired,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [FaIconComponent, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  faSliders = faSliders;
  faUser = faUser;
  faBook = faBook;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  faCheckSquare = faCheckSquare;
  faThLarge = faThLarge;
  faAlignLeft = faAlignLeft;
  faCoffee = faCoffee;
  faChartBar = faChartBar;
  faMap = faMap;
  faBox = faBox;
  faUniversity = faUniversity;
  faCodeBranch = faCodeBranch;

  faNetworkWired = faNetworkWired;

  router = inject(Router);
  route = inject(ActivatedRoute);

  id: string = '0';

  constructor() {
    // Listen to router events to get the current route parameters
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') || '0';
    });
    console.log(this.id, 'COuresr form');
  }
}
