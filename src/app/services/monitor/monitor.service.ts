import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { UserService } from '../user/user.service';
import { environment } from '../../../environments/environment';

import { ScanHistory } from '../../interfaces/monitor/scan-history';
import { MonitorDetails } from '../../interfaces/monitor/monitor-details';
import { MonitorGroups } from '../../interfaces/monitor/monitor-groups';
import { MonitorHistory } from '../../interfaces/monitor/monitor-history';
import { MonitorFilter } from '../../interfaces/monitor/monitor-filter';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  public monitorFiltering: BehaviorSubject<MonitorFilter> = new BehaviorSubject({
    periodSelection: '24h',
    stepSelection: '250'
  });
  public groupSelection: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  async getMonitors() {
    const headers = await this.userService.getUserHeaders();
    return this.http.get<Array<MonitorDetails>>(environment.apiBaseUrl + '/monitors', {
      headers: headers,
      params: {
        'sorting': 'health:desc'
      }
    }).toPromise();
  }

  async getMonitorsByGroup(groupId: string) {
    const headers = await this.userService.getUserHeaders();
    return this.http.get<Array<MonitorDetails>>(environment.apiBaseUrl + '/monitors', {
      headers: headers,
      params: {
        'sorting': 'health:desc',
        'groupId': groupId
      }
    }).toPromise();
  }

  async getMonitor(monitorId: string) {
    const headers = await this.userService.getUserHeaders();
    return this.http.get<MonitorDetails>(environment.apiBaseUrl + '/monitors/' + monitorId, {
      headers: headers
    }).toPromise();
  }

  async getMonitorGroups() {
    const headers = await this.userService.getUserHeaders();
    return this.http.get<Array<MonitorGroups>>(environment.apiBaseUrl + '/monitor-groups', {
      headers: headers
    }).toPromise();
  }

  async getMonitorScanHistory(monitorId: string, period: string, steps: string) {
    const headers = await this.userService.getUserHeaders();
    const postData = new HttpParams()
        .append('period', period)
        .append('steps', steps);
    return this.http.get<ScanHistory>(`${ environment.apiBaseUrl }/monitors/${ monitorId }/load-times`, {
      headers: headers,
      params: postData
    }).toPromise();
  }

  async getMonitorHistory(monitorId: string, year: string, month: string) {
    const headers = await this.userService.getUserHeaders();
    return this.http.get<MonitorHistory>(`${ environment.apiBaseUrl }/monitors/${ monitorId }/history/${ year }/${ month }`, {
      headers: headers
    }).toPromise();
  }

  async pauseMonitor(monitorId: string, newState: any) {
    const headers = await this.userService.getUserHeaders();
    let postData: object;
    if (newState) {
      postData = {
        'state': 'enabled'
      };
    } else  {
      postData = {
        'state': 'paused'
      };
    }
    return this.http.post(`${environment.apiBaseUrl}/monitors/${monitorId}`, postData, {
      headers: headers
    }).toPromise();
  }

}
