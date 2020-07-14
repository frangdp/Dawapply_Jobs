import { DbusersService } from './../services/dbusers.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import { User} from '../shared/user.class';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User ={uid:"", email:""}

  password:string;
  valor:boolean=false;

  constructor(private dbuser:DbusersService, private authSvc: AuthService, private router: Router, public alertController: AlertController) { }

  ngOnInit() {
  }


  
 cambio(){
  
  if(this.valor==true){
    this.valor=false;
  }else if(this.valor==false){
    this.valor=true;
  }
     console.log("cambiado");
     console.log(this.valor);
  
}


  async mostraralert(fran:string){
    const alert = await this.alertController.create({
      header: 'Tienes una alerta',
      message: fran,
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
 

  async onRegister() {

    if(this.user.email!="" && this.password!=""){
      this.authSvc.onRegister(this.user, this.password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        this.user.uid=newUserCredential.user.uid;
        this.dbuser.add_user( this.user)
        this.router.navigateByUrl('login');
      
         
    }).then(()=>{console.log("correcto");}
    ,    error=>{
      if(error.message.includes("The email")){
        this.mostraralert("La contraseña es incorrecta");
        console.log("aqui si que entra");
      }

  
        });
     
}else{
        const alert = await this.alertController.create({
          header: 'Tienes una alerta',
          message: 'Usuario o contraseña vacios',
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

    // if (user) {
    //   console.log("ok");
    //   this.router.navigateByUrl('/');
      
    // }
  }
}