import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MonitorsPage } from './monitors.page';
import { MonitorGroupsComponent } from '../../../components/popover/monitor-groups/monitor-groups.component';

const routes: Routes = [
  {
    path: '',
    component: MonitorsPage
  },
  {
    path: ':monitorId',
    loadChildren: './monitor/monitor.module#MonitorPageModule'
  }
];

@NgModule({
  entryComponents: [MonitorGroupsComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MonitorsPage, MonitorGroupsComponent]
})
export class MonitorsPageModule {}
