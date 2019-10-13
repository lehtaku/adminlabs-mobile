import { Component, OnInit } from '@angular/core';

import { MonitorService } from '../../../services/monitor/monitor.service';

@Component({
  selector: 'app-maintenances',
  templateUrl: './maintenances.page.html',
  styleUrls: ['./maintenances.page.scss'],
})
export class MaintenancesPage implements OnInit {

  // DOM
  public canScroll: boolean;

  public maintenances = [
    {
      title: 'Service break',
      icon: 'hammer',
      start: 'Apr 13, 2019 13:30',
      end: 'Apr 13, 2019 15:30',
      description: 'Sed posuere consectetur est at lobortis. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
    },
    {
      title: 'Homepage service break',
      icon: 'calendar',
      start: 'Apr 13, 2019 13:30',
      end: 'Apr 13, 2019 15:30',
      description: 'Sed posuere consectetur est at lobortis. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
    },
    {
      title: 'Server maintenance',
      icon: 'calendar',
      start: 'Apr 13, 2019 13:30',
      end: 'Apr 13, 2019 15:30',
      description: 'Sed posuere consectetur est at lobortis. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
    },
    {
      title: 'System updates',
      icon: 'hammer',
      start: 'Apr 13, 2019 13:30',
      end: 'Apr 13, 2019 15:30',
      description: 'Sed posuere consectetur est at lobortis. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
    },
  ];

  constructor(private monitorService: MonitorService) { }

  ngOnInit() {
    this.loadContent();
  }

  loadContent() {
    this.canScroll = true;
  }

}
