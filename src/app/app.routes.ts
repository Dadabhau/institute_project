import { Routes } from '@angular/router';
import { AuthLayouts } from './features/layouts/auth-layouts/auth-layouts';
import { Login } from './components/login/login';
import { MainLayouts } from './features/layouts/main-layouts/main-layouts';
import { DashboardLayout } from './components/dashboard/dashboard-layout/dashboard-layout';
import { Master } from './components/dashboard/master/master';
import { Dashboard } from './components/dashboard/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayouts,
    children: [{ path: 'login', component: Login }],
  },
  {
    path: '',
    component: MainLayouts,
    children: [
      {
        path: 'dashboard',
        component: DashboardLayout,
        children: [
          { path: '', component: Dashboard },
          { path: 'master', component: Master },
        ],
      },
    ],
  },
];
