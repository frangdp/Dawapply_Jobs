import { DbusersService } from './../services/dbusers.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import  { User } from '../shared/user.class';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user_email:string="";
  user_password:string="";
  user: User={uid:"", email:""}
  constructor(private router:Router, private authSvc:AuthService, public dbuser:DbusersService, public alertController: AlertController) { }

  ngOnInit() {
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
 

  async onLogin(){
    console.log(this.user_email);
    console.log(this.user_password);
    if(this.user_email!="" || this.user_password!=""){
    let user= this.authSvc.onLogin(this.user_email, this.user_password);
  
 
    user.then( (newUserCredential: firebase.auth.UserCredential) => {

     
      this.user.uid=newUserCredential.user.uid;


      // this.user.email=this.user_email;
      // console.log( this.user)
      // this.dbuser.add_user(this.user).then( () => {
      //   console.log("cucucu");
      // })
    
      let UserLogin=this.dbuser.get_user(newUserCredential.user.uid);
         
      
        UserLogin.valueChanges().subscribe(res => {
         
          if(this.user_email!="admin@gmail.com"){ //NORMAL
            sessionStorage.setItem('User', JSON.stringify(res));
            this.router.navigateByUrl('noadmin');
          }else {
            sessionStorage.setItem('User', JSON.stringify(res)); // ADMINISTRADOR
            this.router.navigateByUrl('home');
          }
        });
          
     
    
    }).then(()=>{console.log("correcto");}
,    error=>{
      if(error.message.includes("The password is invalid or the user does not have a password.")){
        this.mostraralert("La contraseña es incorrecta");

      }

      if(error.message.includes("There is no user record corresponding to this identifier. The user may have been deleted.")){
        this.mostraralert("Correo electronico incorrecto");

      }

      if(error.message.includes("email") || error.message.includes("error")){
        this.mostraralert("Estos valores ya existen");

      }

      if(error.message.includes("The email address is badly formatted.")){
      this.mostraralert("La direccion de correo tiene mal formato");
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


       }
      }
  
  

