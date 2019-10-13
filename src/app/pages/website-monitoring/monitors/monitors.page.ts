import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController, PopoverController } from '@ionic/angular';

import { MonitorService } from '../../../services/monitor/monitor.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { MonitorGroupsComponent } from '../../../components/popover/monitor-groups/monitor-groups.component';
import { MonitorDetails } from '../../../interfaces/monitor/monitor-details';
import { MonitorGroups } from '../../../interfaces/monitor/monitor-groups';

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
  public canScroll: boolean;
  public groupsEmpty: boolean;
  public loadingError: boolean;
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
    this.monitorsService.groupSelection.subscribe(groupId => {
      this.groupId = groupId;
      this.loadContent();
    });
  }

  loadContent() {
    // Init variables
    this.monitors = null;
    this.canScroll = true;
    this.groupsEmpty = false;
    this.loadingError = false;
    this.stateSegment = 'all';

    // Close group selection popup when loading content
    if (this.groupPopover !== null && this.groupPopover !== undefined) {
      this.groupPopover.dismiss();
    }

    // Get monitor groups
    this.monitorsService.getMonitorGroups().subscribe(groups => this.monitorGroups = groups);

    // Load monitors
    this.monitorsService.getMonitors(this.groupId).subscribe(monitors => {
      this.monitors = monitors;
      this.checkGroupEmpty();
      this.sortMonitorsByState();
    }, err => this.loadingFailed());
  }

  checkGroupEmpty(): void {
    if (this.monitors.length <= 0) {
      this.groupsEmpty = true;
      this.canScroll = false;
    }
  }

  loadingFailed() {
    this.loadingError = true;
    this.canScroll = false;
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

  sortMonitorsByState() {
    this.upMonitors = [];
    this.downMonitors = [];
    this.pausedMonitors = [];
    for (const mon of this.monitors) {
      if (mon.state === 'paused') {
        this.pausedMonitors.push(mon);
      } else if (mon.health === 'ok') {
        this.upMonitors.push(mon);
      } else if (mon.health === 'down') {
        this.downMonitors.push(mon);
      }
    }
  }

  navToMonitor(monitorId: string) {
    this.router.navigate(['/user/monitors/' + monitorId]);
  }

  segmentChanged(event: any) {
    this.stateSegment = event.detail.value;
  }

  showFooter() {
    // If all monitors up and no loading errors
    return !(this.upMonitors.length && !this.downMonitors.length && !this.pausedMonitors.length || this.loadingError || this.groupsEmpty);
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
