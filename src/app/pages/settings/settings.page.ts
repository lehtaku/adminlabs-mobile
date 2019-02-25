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
  public isContentLoaded: boolean;
  public loadingError: boolean;

  constructor(
      private userService: UserService,
      private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loadContent();
  }

  loadContent() {
    this.isContentLoaded = false;
    this.loadingError = false;
    this.updateContent()
        .catch(err => {
          this.loadingError = true;
        }).finally(() => this.isContentLoaded = true);
  }

  async updateContent() {
      this.user = await this.userService.getLoggedUser();
  }

  async settingsChanged() {
    try {
      await this.userService.changeNotificationSettings(this.user.notifications.outages, this.user.notifications.outageReminders);
    } catch (err) {
      this.alertService.presentToast('Failed to save settings, please try again!', 2500);
    }
  }

}
