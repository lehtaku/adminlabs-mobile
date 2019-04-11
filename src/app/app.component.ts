import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthenticationService } from './services/authentication/authentication.service';
import { UserService } from './services/user/user.service';
import { StorageService } from './services/storage/storage.service';
import { User } from './interfaces/user/user';
import { NavigationService} from './services/navigation/navigation.service';
import {Observable} from 'rxjs';

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
      id: 'monitors',
      url: '/user/monitors',
      icon: 'pulse',
    },
    {
      title: 'Settings',
      id: 'settings',
      url: '/user/settings',
      icon: 'settings'
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
    await this.storageService.getUserFromStorage().subscribe((user) => {
          if (user == null) {
            this.authService.authState.next(false);
          } else {
            this.authService.authState.next(true);
          }
        });

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
