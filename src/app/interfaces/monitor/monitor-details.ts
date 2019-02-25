export interface MonitorDetails {
  id: string;
  groupId: string;
  name: string;
  interval: string;
  retryInterval: number;
  scannerLocationId: string;
  outageId: string;
  maintenanceId: string;
  lastScan: number;
  type: string;
  health: string;
  state: string;
  address: string;
}
