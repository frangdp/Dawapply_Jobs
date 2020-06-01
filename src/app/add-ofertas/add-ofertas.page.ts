import { Router } from '@angular/router';
import { DbofertasService } from '../services/dbofertas.service';
import { Ofertas } from '../shared/ofertas.class';
import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { AlertController, NavController } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;

@Component({
  selector: 'app-add-ofertas',
  templateUrl: './add-ofertas.page.html',
  styleUrls: ['./add-ofertas.page.scss'],
})
export class AddOfertasPage implements OnInit {
  lat:number;
  lng:number;
  input_ubicacion:boolean=false;
  name_oferta:string="";
  description_oferta:string="";
  range_salary:string='null';
  district_oferta:string="";
  district_array: Array < String >= ["Todos", "València", "Castelló", "VillaFol", "Alacant", "Lugo", "Barcelona", "Tarragona", "Madrid"];
  mapRef = null;


  new_oferta:Ofertas={
    id:"",
    name: '',
    description: '',
    salary: null,
    district: '',
    maps:{
      lat:null,
      lng:null
    }
  }
  constructor(private loadingCtrl:LoadingController, private geolocation:Geolocation, private DbofertasService:DbofertasService, private router: Router, public alertController: AlertController) { }

  ngOnInit() {
    this.loadMap()
  }

 

  async OncClickAdd(){

    if(this.name_oferta!='' && this.district_oferta!=""){
      this.new_oferta.name=this.name_oferta;
      this.new_oferta.district=this.district_oferta;
      this.new_oferta.description= this.description_oferta;
      if(this.input_ubicacion){
        this.new_oferta.maps.lat=this.lat;
        this.new_oferta.maps.lng=this.lng;
      }
      if(this.range_salary!='null'){
        this.new_oferta.salary=this.range_salary;
      }else{
        this.new_oferta.salary=null;
      }


      console.log(this.new_oferta);

      this.DbofertasService.add_oferta(this.new_oferta);
      this.router.navigateByUrl('home')
    }else{
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: 'Hay campos incompletos',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay');
            }
          }
        ]
      });
      await alert.present();

  
    }

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
    this.lat=rta.coords.latitude;
    this.lng= rta.coords.longitude;
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }
}
