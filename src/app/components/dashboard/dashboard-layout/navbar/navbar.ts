import { Component } from '@angular/core';
import {
  faThLarge,
  faBell,
  faUser,
  faCog,
  faSignOutAlt,
  faChartPie,
  faClipboardList,
  faHome,
  faUserPlus,
  faSignInAlt,
  faInfoCircle,
  faEnvelope,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Auth } from '../../../../core/services/auth/auth';
@Component({
  selector: 'app-navbar',
  imports: [FaIconComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  faThLarge = faThLarge;
  faBell = faBell;
  faUser = faUser;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;
  faChartPie = faChartPie;
  faClipboardList = faClipboardList;
  faHome = faHome;
  faUserPlus = faUserPlus;
  faSignInAlt = faSignInAlt;
  faInfoCircle = faInfoCircle;
  faEnvelope = faEnvelope;
  faQuestionCircle = faQuestionCircle;

  constructor(private auth: Auth) {}
  logout() {
    this.auth.logout();
  }
}
