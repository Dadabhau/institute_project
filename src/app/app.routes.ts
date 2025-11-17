import { Routes } from '@angular/router';
import { AuthLayouts } from './features/layouts/auth-layouts/auth-layouts';
import { authGuard, roleGuard } from './core/services/auth/auth-guard';
import { Login } from './components/login/login';
import { MainLayouts } from './features/layouts/main-layouts/main-layouts';
import { DashboardLayout } from './components/dashboard/dashboard-layout/dashboard-layout';
import { Master } from './components/dashboard/master/master';
import { Dashboard } from './components/dashboard/dashboard/dashboard';
import { Packages } from './components/dashboard/packages/packages';
import { Institutes } from './components/dashboard/Institutes/institutes';
import { InstituteBranches } from './components/dashboard/institute-branch/institute-branch';
import { Unauthorized } from './components/dashboard/unauthorized/unauthorized';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: Home, title: 'Home Page' },
  {
    path: '',
    component: AuthLayouts,
    children: [{ path: 'login', component: Login, title: 'Login Page' }],
  },
  {
    path: '',
    component: MainLayouts,
    children: [
      {
        path: 'dashboard',
        component: DashboardLayout,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['SuperAdmin', 'InstituteAdmin'] },
        children: [
          { path: '', component: Dashboard, title: 'Dashboard' },
          { path: 'master', component: Master, title: 'Master' },
          { path: 'packages', component: Packages, title: 'Packages' },
          { path: 'institutes', component: Institutes, title: 'Institute' },
          { path: 'institute-branches', component: InstituteBranches, title: 'Institute Branches' },
          {
            path: 'institute-courses',
            loadChildren: () =>
              import('../app/components/courses/courses.routes').then((m) => m.INSTITUTE_ROUTES),
          },
          { path: 'unauthorized', component: Unauthorized, title: 'Unauthorized' },
        ],
      },
    ],
  },
];
