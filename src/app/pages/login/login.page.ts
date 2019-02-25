import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { AlertController, MenuController } from '@ionic/angular';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  public email: string;
  public pwd: string;
  public loginLoading: boolean;

  constructor(
      private menuCtrl: MenuController,
      private auth: AuthenticationService,
      private alertCtrl: AlertController,
      private router: Router
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.loginLoading = false;
  }

  login() {
    this.loginLoading = true;
    this.auth.login(this.email, this.pwd)
        .then(() => this.loginLoading = false)
        .catch(() => {
          this.loginLoading = false;
          this.failedAlert();
        });
  }

  forgotPwd(event: any) {
    this.router.navigate(['/login/forgot']);
  }

  async failedAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Wrong credentials',
      message: 'Wrong username and password combination',
      buttons: ['OK']
    });
    alert.present();
  }

}
