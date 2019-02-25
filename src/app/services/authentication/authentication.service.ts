import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertController, Platform} from '@ionic/angular';

import { UserService } from '../user/user.service';
import { StorageService } from '../storage/storage.service';
import { NavigationService } from '../navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public authState: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private platform: Platform,
              private userService: UserService,
              private storageService: StorageService,
              public alertCtrl: AlertController,
              public navService: NavigationService
  ) {}

  login (email: string, pwd: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getNonLoggedUser(email, pwd)
          .then(response => {
              if (response.status === 200) {
              this.storageService.saveUserToStorage(email, pwd)
                  .then(() => {
                      this.authState.next(true);
                      resolve(true);
                  });
              }
          }).catch(err => reject(false));
    });
  }

  logout(): void {
    this.storageService.removeUserFromStorage()
        .then(() => this.authState.next(false));
    this.navService.activePage.next('monitors');
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
