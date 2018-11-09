import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-set-coordinates',
  templateUrl: 'set-coordinates.html',
})
export class SetCoordinatesPage implements OnInit {

  latitude: number;
  longitude: number;
  marker: {
    latitude: number;
    longitude: number;
    draggable: true
  };

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams,
              private geolocation: Geolocation,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
  }

  onCancel() {
    this.viewCtrl.dismiss();
  }

  ngOnInit() {
    let receiveLatitude = this.navParams.get('latitude');
    let receiveLongitude = this.navParams.get('longitude');
    if (receiveLatitude) {
      this.latitude = receiveLatitude;
      this.longitude = receiveLongitude;
      this.marker = {
        latitude: receiveLatitude,
        longitude: receiveLongitude,
        draggable: true
      }
    } else {
      this.latitude = 43.610769;
      this.longitude = 3.876716;
    }
  }

  onMapClicked($event) {
    this.marker = {
      latitude: $event.coords.lat,
      longitude: $event.coords.lng,
      draggable: true
    };
  }

  onSave() {
    this.viewCtrl.dismiss({
      latitude: this.marker.latitude,
      longitude: this.marker.longitude
    });
  }

  onLocateMe() {
    let loader = this.loadingCtrl.create({
      content: 'Recherche de votre position...'
    });
    loader.present();
    this.geolocation.getCurrentPosition().then(
      (resp) => {
        loader.dismiss();
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.marker = {
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude,
          draggable: true
        }
      }).catch(
        (error) => {
          loader.dismiss();
          this.toastCtrl.create({
            message: error,
            duration: 3000,
            position: 'bottom'
          }).present();
        }
      )
  }
}
