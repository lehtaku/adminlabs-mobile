import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../services/user/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  public email: string;
  public formLoading: boolean;

  constructor(private userService: UserService,
              private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  resetPwd() {
    this.formLoading = false;
    this.userService.resetPwd(this.email)
        .then(() => this.successAlert())
        .catch(() => this.failedAlert())
        .finally(() => this.formLoading = false);
  }

  async successAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Success',
      message: 'Check your email to reset your password.',
      buttons: ['OK']
    });
    alert.present();
  }

  async failedAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Something went wrong',
      message: 'Please try again.',
      buttons: ['OK']
    });
    alert.present();
  }

}
