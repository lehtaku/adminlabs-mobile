export interface MonitorDetails {
  id: string;
  groupId: string;
  name: string;
  interval: string;
  retryInterval: number;
  scannerLocationId: string;
  outage: Outage;
  maintenance: Maintenance;
  lastScan: number;
  type: string;
  health: string;
  state: string;
  address: string;
}

interface Outage {
  id: string;
  started: number;
  ended?: number;
  comments?: string;
}

interface Maintenance {
  id: string;
  start: number;
  end: number;
  title: string;
  description: string;
  ignoreOutages: boolean;
  comments: any;
}

