import { DbofertasService } from '../services/dbofertas.service';
import { Ofertas } from '../shared/ofertas.class';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-oferta',
  templateUrl: './edit-oferta.page.html',
  styleUrls: ['./edit-oferta.page.scss'],
})
export class EditOfertaPage implements OnInit {

  name_oferta:string="";
  description_oferta:string="";
  range_salary:string='null';
  district_oferta:string="";
  district_array: Array < String >= ["Todos", "València", "Castelló", "VillaFol", "Alacant", "Lugo", "Barcelona", "Tarragona", "Madrid"];
  
  objeto:any;
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
  constructor(private Router:Router, private route:ActivatedRoute, private DbofertasService:DbofertasService, public alertController: AlertController) { 


    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
       
        this.objeto = JSON.parse(params.special);
        
        this.new_oferta.id=this.objeto.id;
        this.name_oferta=this.objeto.name;
        this.description_oferta=this.objeto.description;
        this.range_salary=this.objeto.salary;
        this.district_oferta=this.objeto.district;
      
        
      }
    });
  }

  ngOnInit() {
  }


 async OncClickEdit(){

    if(this.name_oferta!='' && this.district_oferta!=""){
      this.new_oferta.name=this.name_oferta;
      this.new_oferta.district=this.district_oferta;
      this.new_oferta.description=this.description_oferta;


      if(this.range_salary!='null'){
        this.new_oferta.salary=this.range_salary
      }else{
        this.new_oferta.salary=null
      }


      console.log(this.new_oferta);

      this.DbofertasService.edit_oferta(this.new_oferta).finally( () =>{
        this.Router.navigate(['home']);
      });
    }else{
      console.log("entra");
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: 'Distrito o/y Nombre sin rellenar',
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

  }
