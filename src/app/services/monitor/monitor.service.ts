import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { ScanHistory } from '../../interfaces/monitor/scan-history';
import { MonitorDetails } from '../../interfaces/monitor/monitor-details';
import { MonitorGroups } from '../../interfaces/monitor/monitor-groups';
import { MonitorHistory } from '../../interfaces/monitor/monitor-history';
import { MonitorFilter } from '../../interfaces/monitor/monitor-filter';
import { Pause } from '../../interfaces/monitor/pause';
import { Maintenances } from '../../interfaces/monitor/maintenances';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  public monitorFiltering: BehaviorSubject<MonitorFilter> = new BehaviorSubject({
    periodSelection: '24h',
    stepSelection: '250'
  });
  public groupSelection: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) {}

  getMonitors(groupId: string): Observable<Array<MonitorDetails>> {
    return this.http.get<Array<MonitorDetails>>(environment.apiBaseUrl + '/monitors', {
      params: {
        'sorting': 'health:desc',
        'groupId': groupId
      }
    });
  }

  getMonitor(monitorId: string): Observable<MonitorDetails> {
    return this.http.get<MonitorDetails>(environment.apiBaseUrl + '/monitors/' + monitorId);
  }

  getMonitorGroups(): Observable<Array<MonitorGroups>> {
    return this.http.get<Array<MonitorGroups>>(environment.apiBaseUrl + '/monitor-groups');
  }

  getMonitorScanHistory(monitorId: string, period: string, steps: string): Observable<ScanHistory> {
    const postData = new HttpParams({})
        .append('period', period)
        .append('steps', steps);
    return this.http.get<ScanHistory>(`${ environment.apiBaseUrl }/monitors/${ monitorId }/load-times`, {
      params: postData
    });
  }

  getMonitorHistory(monitorId: string, year: string, month: string): Observable<MonitorHistory> {
    return this.http.get<MonitorHistory>(`${ environment.apiBaseUrl }/monitors/${ monitorId }/history/${ year }/${ month }`);
  }

  getMaintenances(): Observable<Maintenances> {
    return this.http.get<Maintenances>(environment.apiBaseUrl + '/maintenances');
  }

  pauseMonitor(monitorId: string, newState: any): Observable<Pause> {
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
    return this.http.post<Pause>(`${environment.apiBaseUrl}/monitors/${monitorId}`, postData);
  }

}
