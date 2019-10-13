import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'monitors',
    pathMatch: 'full'
  },
  {
    path: 'monitors',
    loadChildren: './pages/website-monitoring/monitors/monitors.module#MonitorsPageModule'
  },
  {
    path: 'maintenances',
    loadChildren: './pages/website-monitoring/maintenances/maintenances.module#MaintenancesPageModule'
  },
  {
    path: 'settings',
    loadChildren: './pages/website-monitoring/settings/settings.module#SettingsPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
