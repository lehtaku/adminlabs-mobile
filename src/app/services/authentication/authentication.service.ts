import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AlertController } from '@ionic/angular';

import { BehaviorSubject, concat } from 'rxjs';

import { environment } from '../../../environments/environment';

import { StorageService } from '../storage/storage.service';
import { NavigationService } from '../navigation/navigation.service';
import { User } from '../../interfaces/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public authState: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private alertCtrl: AlertController,
              private storageService: StorageService,
              public navService: NavigationService,
              private http: HttpClient
  ) {}

  login(email: string, pwd: string) {
      const headers: HttpHeaders = new HttpHeaders({
          'email': email,
          'password': pwd
      });
      const getUser$ = this.http.get<User>( environment.apiBaseUrl + '/user', {
        headers: headers
      });
      const saveUser$ = this.storageService.saveUserToStorage(email, pwd);

      return concat(getUser$, saveUser$);
  }

  logout(): void {
    this.storageService.removeUserFromStorage()
        .subscribe(() => {
            this.authState.next(false);
            this.navService.activePage.next('monitors');
        });
  }

  async logoutConfirm() {
    const alert = await this.alertCtrl.create({
        header: 'Log out',
        message: 'Are you sure that you want to log out?',
        buttons: [
            {
                text: 'No',
                role: 'cancel',
                cssClass: 'secondary'
            }, {
                text: 'Yes',
                handler: () => {
                    this.logout();
                }
            }
        ]
    });
    return alert.present();
  }

}
