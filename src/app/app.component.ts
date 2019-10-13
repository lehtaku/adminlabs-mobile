import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthenticationService } from './services/authentication/authentication.service';
import { UserService } from './services/user/user.service';
import { StorageService } from './services/storage/storage.service';
import { User } from './interfaces/user/user';
import { NavigationService } from './services/navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.scss' ]
})
export class AppComponent {

  // User
  public user$: Observable<User>;

  // DOM
  public appPages = [
    {
      title: 'Website monitoring',
      id: 'website-monitoring',
      icon: 'pulse',
      open: true,
      children: [
        {
          title: 'Monitors',
          id: 'wm-monitors',
          url: '/user/monitors',
          icon: 'pulse',
        },
        {
          title: 'History',
          id: 'wm-history',
          url: '',
          icon: 'pulse',
        },
        {
          title: 'Outages',
          id: 'wm-outages',
          url: '',
          icon: 'pulse',
        },
        {
          title: 'Maintenances',
          id: 'wm-maintenances',
          url: '/user/maintenances',
          icon: 'pulse',
        },
        {
          title: 'Settings',
          id: 'wm-settings',
          url: '/user/settings',
          icon: 'settings',
        },
      ]
    },
    {
      title: 'Settings',
      id: 'settings',
      icon: 'settings',
      children: [
        {
          title: 'Account settings',
          id: 'settings-account',
          url: '',
        },
        {
          title: 'Personal settings',
          id: 'settings-personal',
          url: '',
        },
        {
          title: 'Users',
          id: 'settings-users',
          url: '',
        },
        {
          title: 'API',
          id: 'settings-api',
          url: '',
        },
        {
          title: 'Billing',
          id: 'settings-billing',
          url: '',
        },
      ]
    }
  ];

  constructor(
      private platform: Platform,
      public splashScreen: SplashScreen,
      public statusBar: StatusBar,
      public authService: AuthenticationService,
      private router: Router,
      private userService: UserService,
      private storageService: StorageService,
      private menuCtrl: MenuController,
      private navService: NavigationService
  ) {
    this.platform.ready().then(() => {
      this.initializeApp()
          .then(() => {
            this.splashScreen.hide();
            this.statusBar.backgroundColorByHexString('#2a3a4a');
          });
    });
  }

  async initializeApp() {
    await this.storageService.checkUserStored()
        .then(() => this.authService.authState.next(true))
        .catch(() => this.authService.authState.next(false));

    await this.authService.authState.subscribe((isLogged) => {
      if (isLogged) {
        this.user$ = this.userService.getLoggedUser();
        this.router.navigate(['/user'], {replaceUrl: true})
            .then(() => this.menuCtrl.enable(true));
      } else {
        this.router.navigate(['/login'], {replaceUrl: true})
            .then(() => this.menuCtrl.enable(false));
      }
    });
  }

  setActive(pageId: string) {
    this.navService.activePage.next(pageId);
  }

  checkActive(pageId: string) {
    return pageId === this.navService.activePage.getValue();
  }

}
