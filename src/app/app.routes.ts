import { Routes } from '@angular/router';
import { AuthLayouts } from './features/layouts/auth-layouts/auth-layouts';
import { Login } from './components/login/login';
import { MainLayouts } from './features/layouts/main-layouts/main-layouts';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayouts,
    children: [{ path: 'login', component: Login }],
  },
  { path: '', component: MainLayouts, children: [{ path: 'dashboard', component: Dashboard }] },
];
