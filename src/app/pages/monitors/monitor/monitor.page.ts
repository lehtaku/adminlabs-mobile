import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as HighCharts from 'highcharts';
import * as Moment from 'moment';

import { MonitorService } from '../../../services/monitor/monitor.service';
import { AlertService } from '../../../services/alert/alert.service';
import { PopoverController } from '@ionic/angular';
import { MonitorFilterComponent } from '../../../components/popover/monitor-filter/monitor-filter.component';
import { ScanHistory } from '../../../interfaces/monitor/scan-history';
import { MonitorDetails} from '../../../interfaces/monitor/monitor-details';
import { MonitorFilter } from '../../../interfaces/monitor/monitor-filter';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.page.html',
  styleUrls: ['./monitor.page.scss'],
})
export class MonitorPage implements OnInit {

  // Monitor
  private monitorId: string;
  public monitorState: boolean;
  public monitorDetails: MonitorDetails;
  public scanHistory: ScanHistory;
  public monitorFilter: MonitorFilter;

  // Chart
  public lineChart: any;

  // Alert
  public filterPopover: any;
  // DOM
  public loadingError: boolean;
  public isContentLoaded: boolean;
  public isHistoryEmpty: boolean;
  public canScroll: boolean;
  public scrollTimeout: any;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private monitorService: MonitorService,
              private alertService: AlertService,
              private popoverCtrl: PopoverController,
  ) {}

  ngOnInit() {
    this.monitorId = this.activeRoute.snapshot.paramMap.get('monitorId');
    this.monitorService.monitorFiltering.subscribe(monitorFilter => {
      this.monitorFilter = monitorFilter;
      this.loadContent();
    });
  }

  loadContent() {
    if (this.filterPopover !== null && this.filterPopover !== undefined) {
      this.filterPopover.dismiss();
    }
    if (this.lineChart) {
      this.lineChart.destroy();
    }
    this.loadingError = false;
    this.isContentLoaded = false;
    this.updateContent()
        .catch(err => {
          this.loadingError = true;
          this.isContentLoaded = false;
        }).finally(() => this.isContentLoaded = true);
  }

  async updateContent() {
      this.monitorDetails = await this.monitorService.getMonitor(this.monitorId);
      this.monitorState = this.monitorDetails.state === 'enabled'; // Set to true if enabled
      this.scanHistory = await this.monitorService.getMonitorScanHistory(this.monitorId,
          this.monitorFilter.periodSelection, this.monitorFilter.stepSelection);
      if (!Object.entries(this.scanHistory).length) {
        this.isHistoryEmpty = true;
      } else {
        this.createChart()
            .then(() => this.isHistoryEmpty = false);
      }
  }

  async createChart() {
    // Initialize data
    const chartData: Array<any> = [];
    for await (const scanItem of Object.entries(this.scanHistory.loadTimes)) {
      chartData.push({
        x: new Date(Number(scanItem[0]) * 1000),
        y: scanItem[1]
      });
    }
    // Create chart
    this.lineChart = HighCharts.chart({
      rangeSelector: {
        selected: 1
      },
      chart: {
        renderTo: 'monitorChart',
        type: 'line',
        spacingBottom: 20,
      },
      title: {
        text: 'Scans - ' + this.getPeriodName()
      },
      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        title: {
          text: null
        },
      },
      tooltip: {
        crosshairs: {
          color: 'green',
          dashStyle: 'solid'
        },
        hideDelay: 500,
        shared: true,
        followTouchMove: true
      },
      series: [{
        name: 'Load time (ms)',
        turboThreshold: 0,
        data: chartData,
        type: undefined,
      }],
    });
  }

  checkMonitorState() {
    if (this.monitorDetails.state === 'paused') {
      return 'dot-paused';
    } else {
      if (this.monitorDetails.health === 'ok') {
        return 'dot-success';
      } else if (this.monitorDetails.health === 'warning') {
        return 'dot-warning';
      } else {
        return 'dot-danger';
      }
    }
  }

  chartClicked(event: any) {
    this.scrollTimeout = setTimeout(() => this.canScroll = false, 500);
  }

  chartNonClicked(event: any) {
    clearTimeout(this.scrollTimeout);
    this.canScroll = true;
  }

  async pauseMonitor(event: any) {
    try {
       await this.monitorService.pauseMonitor(this.monitorId, event.detail.checked);
    } catch (err) {
      this.monitorPauseFailed(this.monitorState);
    }
  }

  showLastScan() {
    return Moment.unix(this.monitorDetails.lastScan).calendar();
  }

  getPeriodName() {
    if (this.monitorFilter.periodSelection === '30d') {
      return '30 days';
    } else if (this.monitorFilter.periodSelection === '7d') {
      return '7 days';
    } else {
      return '24 hours';
    }
  }

  async createFilterPopover(event: any) {
    this.filterPopover = await this.popoverCtrl.create({
      component: MonitorFilterComponent,
      event: event,
      translucent: true,
    });
    return await this.filterPopover.present();
  }

  async monitorPauseFailed(monitorState: boolean) {
    let errorMess: string;
    if (!monitorState) {
      errorMess = 'pausing';
    } else {
      errorMess = 'resuming';
    }
    this.alertService.presentToast(`An error occurred at ${errorMess} monitor, try again!`, 2500);
  }
}

