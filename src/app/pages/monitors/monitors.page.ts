import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController, PopoverController } from '@ionic/angular';

import { MonitorService } from '../../services/monitor/monitor.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { MonitorGroupsComponent } from '../../components/popover/monitor-groups/monitor-groups.component';
import { MonitorDetails } from '../../interfaces/monitor/monitor-details';
import { MonitorGroups } from '../../interfaces/monitor/monitor-groups';

@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.page.html',
  styleUrls: ['./monitors.page.scss']
})
export class MonitorsPage implements OnInit {

  // Monitors
  public monitors: Array<MonitorDetails>;
  public upMonitors: Array<MonitorDetails>;
  public downMonitors: Array<MonitorDetails>;
  public pausedMonitors: Array<MonitorDetails>;
  public monitorGroups: Array<MonitorGroups>;
  public groupId: string;

  // Alert
  public groupPopover: any;

  // DOM
  public isContentLoaded: boolean;
  public loadingError: boolean;
  public emptyRes: boolean;
  public stateSegment: string;

  constructor(
      private auth: AuthenticationService,
      private monitorsService: MonitorService,
      private router: Router,
      private popoverCtrl: PopoverController,
      private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(true);
    this.stateSegment = 'all';
    this.monitorsService.groupSelection.subscribe(groupId => {
      this.groupId = groupId;
      this.loadContent();
    });
  }

  loadContent() {
    if (this.groupPopover !== null && this.groupPopover !== undefined) {
      this.groupPopover.dismiss();
    }
    this.emptyRes = false;
    this.isContentLoaded = false;
    this.loadingError = false;
    this.updateContent()
        .then(() => {
          if (!this.monitors.length) {
            this.emptyRes = true;
          }
        }).catch(err => {
          this.isContentLoaded = false;
          this.loadingError = true;
        }).finally(() => this.isContentLoaded = true);
  }

  async updateContent() {
      this.monitorGroups = await this.monitorsService.getMonitorGroups();
      if (this.groupId === '') {
        this.monitors = await this.monitorsService.getMonitors();
      } else {
        this.monitors = await this.monitorsService.getMonitorsByGroup(this.groupId);
      }
      await this.sortMonitorsByState();
  }

  navToMonitor(monitorId: string) {
    this.router.navigate(['/user/monitors/' + monitorId]);
  }

  async showGroups(event: any) {
    this.groupPopover = await this.popoverCtrl.create({
      component: MonitorGroupsComponent,
      componentProps: {
        monitorGroups: this.monitorGroups
      },
      event: event,
      translucent: true,
    });
    return await this.groupPopover.present();
  }

  async sortMonitorsByState() {
    this.upMonitors = [];
    this.downMonitors = [];
    this.pausedMonitors = [];
    for await (const monitor of this.monitors) {
      if (monitor.state === 'paused') {
        this.pausedMonitors.push(monitor);
      } else if (monitor.health === 'ok') {
        this.upMonitors.push(monitor);
      } else if (monitor.health === 'down') {
        this.downMonitors.push(monitor);
      }
    }
  }

  segmentChanged(event: any) {
    this.stateSegment = event.detail.value;
  }

  allMonitorsUp() {
    return !(this.upMonitors.length && !this.downMonitors.length && !this.pausedMonitors.length);
  }

  checkMonitorState(monitor: MonitorDetails) {
    if (monitor.state === 'paused') {
      return 'dot-paused';
    } else {
      if (monitor.health === 'ok') {
        return 'dot-success';
      } else if (monitor.health === 'warning') {
        return 'dot-warning';
      } else {
        return 'dot-danger';
      }
    }
  }

}
