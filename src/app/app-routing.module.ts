import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/authentication/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'user',
    canActivate: [AuthGuardService],
    loadChildren: './user-routing.module#UserRoutingModule'
  },
  { path: 'forgot-password', loadChildren: './pages/login/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'maintenances', loadChildren: './pages/website-monitoring/maintenances/maintenances.module#MaintenancesPageModule' },
  { path: 'history', loadChildren: './pages/website-monitoring/history/history.module#HistoryPageModule' },
  { path: 'outages', loadChildren: './pages/website-monitoring/outages/outages.module#OutagesPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
