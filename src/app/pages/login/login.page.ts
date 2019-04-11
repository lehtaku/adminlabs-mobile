import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { MenuController } from '@ionic/angular';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { StorageService } from '../../services/storage/storage.service';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  public email: string;
  public pwd: string;
  public formSubmitted: boolean;

  constructor(
      private menuCtrl: MenuController,
      private storage: StorageService,
      private auth: AuthenticationService,
      private alertService: AlertService,
      private router: Router
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.formSubmitted = false;
  }

  login(form: NgForm) {
    this.formSubmitted = true;
    this.auth.login(form.value.email, form.value.pwd)
        .subscribe(() => {
          this.auth.authState.next(true);
          this.formSubmitted = false;
            },
            err => this.loginFailed());
  }

  loginFailed() {
    this.formSubmitted = false;
    this.auth.authState.next(false);
    this.alertService.dangerToast('Login failed, please try again!', 3000);
  }

  forgotPwd(event: any) {
    this.router.navigate(['/login/forgot']);
  }

}
