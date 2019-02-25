<img src="http://www.adminlabs.com/media/adminlabs-logo.png" width="80%" align="center">

***

# AdminLabs Mobile - Status Page & Website Monitoring

Mobile application for [AdminLabs](https://www.adminlabs.com/) services. 

Built with :heart: &  
* [Ionic 4](https://ionicframework.com/)
* [Angular 7](https://angular.io/)

3rd. party dependencies :blue_book:
* [Highcharts](https://www.highcharts.com/)
* [Moment.js](https://momentjs.com/)
* [Crypto.JS](https://www.npmjs.com/package/crypto-js)
* [ngx-avatar](https://www.npmjs.com/package/ngx-avatar)

# Main features
Core features of the application


## :closed_lock_with_key: Authentication

**Login**
 * Save credentials to device storage
 * Use credentials in requests  
  
**Logout**
 * Remove user credentials from storage


## :chart_with_downwards_trend: Website monitoring

**Monitors page (List monitors)**
 * Name
 * Health (Up/Warning/Down)
 * State (Enabled/Paused)
 * Monitoring URL
 * Link to monitor details page
 * Sort monitors by monitor groups  

**Monitor page (Monitor details)**
 * Name
 * Health
 * Scan interval
 * Last scan
 * Monitoring state (Enabled/Paused) - Toggleable ON/OFF
 * Chart by loadtime (24h/7d/30d) & Steps 24-500
 * Loadtimes (Average/Max/Min)
  
  
## :wrench: Settings

**Notifications**
 * Up/Down notifications
 * Down reminders
 

## :pencil2: To-Do

**Check**
  * Back-button blink, [Link to issue](https://github.com/ionic-team/ionic/issues/17022)
  
**Important**
  * After login from another user, make previous view empty

**Maybe**
  * All/Up/Down/Paused bar to monitors listing
  * Show remaining funds in sidebar under user

## :bowtie: Future features

  * Push notifications
  * Continious monitoring (even when app shut-off)
  * More settings (LED, vibrate, test notification)
