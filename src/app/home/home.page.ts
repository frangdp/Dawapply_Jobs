import { DbofertasService } from './../services/dbofertas.service';
import { Ofertas } from '../shared/ofertas.class';
import { Component } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { ActionSheetController } from '@ionic/angular';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  district_filter:string='Todos';

  district_array: Array < String >= ["Todos", "València", "Castelló", "VillaFol", "Alacant", "Lugo", "Barcelona", "Tarragona", "Madrid"];


  price_filter:string='Todos';
  price_array: Array < String >= ["Todos", "500-1000", "1000-1500", "1500-2000", "2000-2500"];

  ofertas_array:any;
  oferta:any=null;
  search:string;
  constructor(public NavController:NavController, public alertController: AlertController, public actionSheetController: ActionSheetController, private dboferta:DbofertasService,  private authSvc: AuthService, private router:Router, private afAuth: AngularFireAuth) 
  {
    if(this.oferta==null){

      let consulta_ofertas=this.dboferta.get_ofertas();

      consulta_ofertas.valueChanges().subscribe( res => {
        this.oferta=res;
        this.ofertas_array=this.oferta;
      })

    }else{
      this.ofertas_array=this.oferta;
    }


  }

  onLogout(){
    this.afAuth.auth.signOut();
    sessionStorage.removeItem('User')
    this.router.navigateByUrl('/login');
  }

  async presentActionSheet(x) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Setting',
      buttons: [{
        text: 'More',
        
        handler: () => {
          console.log('Play clicked');
          let navigationExtras: NavigationExtras = {
            queryParams: {
              special: JSON.stringify(x)
              
            }
          };
          this.router.navigate(['more-oferta'], navigationExtras);
        }

      },{
        text: 'Edit',
       
        handler: () => {
          console.log('Play clicked');
          let navigationExtras: NavigationExtras = {
            queryParams: {
              special: JSON.stringify(x)
             
            }
          };
          this.router.navigate(['edit-oferta'], navigationExtras);
        }
      }, {
        text: 'Delete',
        role: 'destructive',
       
        handler: () => {
          console.log('Delete clicked');
          this.delete_oferta(x.id)
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


  async delete_oferta(id_oferta:string) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Oferta <strong>eliminada</strong>!!!',
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
            this.dboferta.delete_oferta(id_oferta);
          }
        }
      ]
    });

    await alert.present();
  }

  OnClickAdd(){

    this.router.navigate(['add-ofertas']);
  }

  search_function(){

    this.ofertas_array=[];

    for (let y of this.oferta) {
      
      if(y.name.toUpperCase().includes((this.search.toUpperCase()))){

      
        this.ofertas_array.push(y);
      }
    }
  }


  filtro_distrito(){
    if(this.district_filter=='Todos'){
      this.ofertas_array=this.oferta;
    }else{
      this.ofertas_array=[];

      for (let y of this.oferta) {
        
        if(y.district.includes(this.district_filter)){
  
        
          this.ofertas_array.push(y);
        }
      }
    }
  }


  filtro_array(){
    if(this.price_filter=='Todos'){
      this.ofertas_array=this.oferta;
    }else{
      this.ofertas_array=[];

      for (let y of this.oferta) {
        
        if(y.salary.includes(this.price_filter)){
  
        
          this.ofertas_array.push(y);
        }
      }
    }
  }


  
}
