import { Component } from '@angular/core';
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
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

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
}
