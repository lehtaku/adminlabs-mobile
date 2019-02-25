export interface MonitorHistory {
  'report-date': string;
  'active-time': number;
  'downtime-total': number;
  'downtime-maintenance-noticed': number;
  'outages-total': number;
  'outages-maintenance-noticed': number;
  'service-level': number;
  'service-level-maintenance-noticed': string;
  'scan-counter': number;
}
