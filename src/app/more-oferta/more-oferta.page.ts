import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-more-oferta',
  templateUrl: './more-oferta.page.html',
  styleUrls: ['./more-oferta.page.scss'],
})
export class MoreOfertaPage implements OnInit {
  mapRef = null;

  oferta:any;
  mostrar_mapa:boolean=false;
  constructor(private route: ActivatedRoute, private loadingCtrl:LoadingController, private geolocation:Geolocation,  private router: Router) 

    {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
       
        this.oferta = JSON.parse(params.special);
        console.log(this.oferta);
      
        if(this.oferta.maps!=undefined && this.oferta.maps!=null){
          this.mostrar_mapa=true;
          this.loadMap();
        }
      }
    });
  }

  ngOnInit() {
  }
  async loadMap() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    const myLatLng = await this.getLocation();
    const mapEle: HTMLElement = document.getElementById('map');
    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15
    });
    google.maps.event
    .addListenerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
     
      console.log(myLatLng.lat+" "+myLatLng.lng)
      this.addMaker(myLatLng.lat, myLatLng.lng);
    });
  }

  private addMaker(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      title: 'Hello World!'
    });
  }

  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    rta.coords.latitude;
    rta.coords.longitude;
    return {
      lat: this.oferta.maps.lat,
      lng: this.oferta.maps.lng
    };
  }
}
