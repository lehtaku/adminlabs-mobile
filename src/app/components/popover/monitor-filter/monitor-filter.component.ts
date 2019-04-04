import { Component, OnInit, Renderer2 } from '@angular/core';

import { MonitorService } from '../../../services/monitor/monitor.service';
import { MonitorFilter} from '../../../interfaces/monitor/monitor-filter';

@Component({
  selector: 'app-monitor-filter',
  templateUrl: './monitor-filter.component.html',
  styleUrls: ['./monitor-filter.component.scss']
})
export class MonitorFilterComponent implements OnInit {

  public monitorFilter: MonitorFilter;

  constructor(private monitorService: MonitorService) {
  }

  ngOnInit() {
    this.monitorFilter = this.monitorService.monitorFiltering.getValue();
  }

  periodChanged(event: any): void {
    this.setChanges();
  }

  stepsChanged(event: any): void {
    this.setChanges();
  }

  focusLose(event: any) {
    console.log(event);
  }

  setChanges() {
    this.monitorService.monitorFiltering.next(this.monitorFilter);
  }

}
