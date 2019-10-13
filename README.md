<img src="http://www.adminlabs.com/media/adminlabs-logo.png" width="80%" align="center">

***

# AdminLabs Mobile - Status Page & Website Monitoring

Mobile application for [AdminLabs](https://www.adminlabs.com/) services. App interacts with this [API](https://api.adminlabs.com/docs/#account).

Built with  
* [Ionic 4](https://ionicframework.com/)
* [Angular 7](https://angular.io/)

3rd. party dependencies :blue_book:
* [Highcharts](https://www.highcharts.com/)
* [Moment.js](https://momentjs.com/)
* [Crypto.JS](https://www.npmjs.com/package/crypto-js)
* [ngx-avatar](https://www.npmjs.com/package/ngx-avatar)

# Main features
Core features of the application


### :closed_lock_with_key: Authentication

**Login**
 * Save credentials to device local storage, use (SHA-256) hashing
 * Use credentials in all HTTP requests  
  
**Logout**
 * Remove user credentials from local storage


### :chart_with_downwards_trend: Website monitoring

**Monitors page (List monitors)**
 * Monitor name
 * Health (Up/Warning/Down)
 * State (Enabled/Paused)
 * Monitoring URL
 * Link to monitor details page
 * Sort monitors by monitor groups
 * Sort monitors by health or state

**Monitor page (Monitor details)**
 * Monitor name
 * Health
 * Scan interval
 * Last scan
 * Monitoring state (Enabled/Paused) - Toggleable ON/OFF
 * Chart by loadtime (24h/7d/30d) & Steps 24-500
 * Loadtimes (Average/Max/Min)
  
  
### :wrench: Settings

**Notifications**
 * Toggle Up/Down notifications to account
 * Toggle down reminders