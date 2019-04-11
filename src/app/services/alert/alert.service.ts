import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public toastCtrl: ToastController) { }

  async successToast(msg: string, duration: number) {
    const toast = await this.toastCtrl.create({
      cssClass: 'toast-alert',
      color: 'success',
      message: msg,
      duration: duration
    });
    toast.present();
  }

  async dangerToast(msg: string, duration: number) {
    const toast = await this.toastCtrl.create({
      cssClass: 'toast-alert',
      color: 'danger',
      message: msg,
      duration: duration
    });
    toast.present();
  }

}
