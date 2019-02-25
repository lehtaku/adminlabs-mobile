import { Component, OnInit } from '@angular/core';
import { MonitorService } from '../../../services/monitor/monitor.service';
import { MonitorGroups } from '../../../interfaces/monitor/monitor-groups';
import {NavParams} from '@ionic/angular';

@Component({
  selector: 'app-monitor-groups',
  templateUrl: './monitor-groups.component.html',
  styleUrls: ['./monitor-groups.component.scss']
})
export class MonitorGroupsComponent implements OnInit {

  // Monitors
  public groupSelection: string;
  public monitorGroups: Array<MonitorGroups>;

  constructor(private monitorService: MonitorService,
              private navParams: NavParams) {
  }

  ngOnInit() {
    this.monitorGroups = this.navParams.get('monitorGroups');
    this.groupSelection = this.monitorService.groupSelection.getValue();
  }

  groupChanged(event: any) {
    this.monitorService.groupSelection.next(event);
  }

}
