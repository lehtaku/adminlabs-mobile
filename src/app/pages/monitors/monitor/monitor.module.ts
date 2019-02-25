import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MonitorPage } from './monitor.page';
import { MonitorFilterComponent } from '../../../components/popover/monitor-filter/monitor-filter.component';

const routes: Routes = [
  {
    path: '',
    component: MonitorPage
  }
];

@NgModule({
  entryComponents: [MonitorFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MonitorPage, MonitorFilterComponent]
})
export class MonitorPageModule {}
