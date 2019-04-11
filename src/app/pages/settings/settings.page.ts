import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/alert/alert.service';
import { User } from '../../interfaces/user/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  // User
  public user: User;

  // DOM
  public canScroll: boolean;
  public loadingError: boolean;

  constructor(
      private userService: UserService,
      private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loadContent();
  }

  loadContent() {
    // Init variables
    this.user = null;
    this.loadingError = false;
    this.canScroll = true;

    // Load user
    this.userService.getLoggedUser().subscribe(user => this.user = user,
        err => this.loadingFailed());
  }

  loadingFailed() {
    this.loadingError = true;
    this.canScroll = false;
  }

  settingsChanged() {
    this.userService.changeNotificationSettings(this.user.notifications.outages, this.user.notifications.outageReminders)
        .subscribe(() => this.alertService.successToast('Setting saved successfully!', 2000),
            err => this.alertService.dangerToast('Failed to save settings, please try again!', 3000));
  }

}
