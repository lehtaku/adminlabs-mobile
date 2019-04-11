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
  public chartData: Array<any>;

  // Alert
  public filterPopover: any;

  // DOM
  public canScroll: boolean;
  public historyEmpty: boolean;
  public loadingError: boolean;
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
    // Init variables
    this.monitorDetails = null;
    this.scanHistory = null;
    this.canScroll = true;
    this.loadingError = false;
    this.historyEmpty = false;

    // Close filter selection popup when loading content
    if (this.filterPopover !== null && this.filterPopover !== undefined) {
      this.filterPopover.dismiss();
    }

    this.monitorService.getMonitor(this.monitorId).subscribe(monitorDet => {
      this.monitorDetails = monitorDet;
      this.monitorState = this.monitorDetails.state === 'enabled'; // Set to true if enabled
    }, err => this.loadingFailed());
    this.monitorService.getMonitorScanHistory(this.monitorId, this.monitorFilter.periodSelection, this.monitorFilter.stepSelection)
        .subscribe(history => {
          this.scanHistory = history;
          this.checkHistoryEmpty();
          this.createChartData();
          this.createChart();
        }, err => this.loadingFailed());
  }

  loadingFailed() {
    this.loadingError = true;
    this.canScroll = false;
  }

  checkHistoryEmpty() {
    if (Object.entries(this.scanHistory).length <= 0) {
      this.historyEmpty = true;
    }
  }

  createChartData() {
    this.chartData = [];
    for (const scanItem of Object.entries(this.scanHistory.loadTimes)) {
      this.chartData.push({
        x: new Date(Number(scanItem[0]) * 1000),
        y: scanItem[1]
      });
    }
  }

  createChart() {
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
        data: this.chartData,
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
    this.scrollTimeout = setTimeout(() => this.canScroll = false, 1000);
  }

  chartNonClicked(event: any) {
    clearTimeout(this.scrollTimeout);
    this.canScroll = true;
  }

  pauseMonitor() {
    this.monitorService.pauseMonitor(this.monitorId, this.monitorState)
        .subscribe(() => this.monitorPauseSuccess(),
            err => this.monitorPauseFailed());
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

  async monitorPauseSuccess() {
    let stateMsg: string;
    if (!this.monitorState) {
      stateMsg = 'paused';
    } else {
      stateMsg = 'enabled';
    }
    this.alertService.successToast(`Monitor ${stateMsg} successfully!`, 2000);
  }

  async monitorPauseFailed() {
    this.alertService.dangerToast('Something went wrong, please refresh and try again!', 3000);
  }

}

