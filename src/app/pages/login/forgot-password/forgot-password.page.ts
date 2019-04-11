import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../../../services/user/user.service';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  public formSubmitted: boolean;

  constructor(private userService: UserService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.formSubmitted = false;
  }

  resetPwd(form: NgForm) {
    this.formSubmitted = true;
    this.userService.resetPwd(form.value.email)
        .subscribe(resetRes => {
          if (resetRes.success === true) {
            this.alertService.successToast('Password reset successfully!', 2000);
          } else {
            this.resetFailed();
          }
          this.formSubmitted = false;
        }, err => this.resetFailed());
  }

  resetFailed() {
    this.alertService.dangerToast('Something went wrong, try again!', 3000);
    this.formSubmitted = false;
  }

}
