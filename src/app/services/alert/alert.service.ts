import { Injectable } from '@angular/core';

import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController) { }

  async presentToast(msg: string, duration: number) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: duration
    });
    toast.present();
  }

}
