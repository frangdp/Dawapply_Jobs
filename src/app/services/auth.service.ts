import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {User} from '../shared/user.class';
import { auth } from 'firebase';
import { AlertController, NavController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: any= false;
  constructor(private afAuth: AngularFireAuth, public alertController: AlertController) {

    afAuth.authState.subscribe( user => (this.isLogged = user));
   }

   // login

  async onLogin(email:string, password:string) {
    console.log(email)
    console.log(password)
    if(email=="" || password==""){
      alert("Usuario o/y contraseña vacios");
    }else{
    try {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password); 
     } catch (error){
      console.log('Error en el login', error);
    }
  }
}


  // register

  async onRegister(user: User, password:string) {
    if(password==""){
      alert("Usuario o/y contraseña vacios");
    }else{
    try {
     return await this.afAuth.auth.createUserWithEmailAndPassword(user.email, password);

    } catch (error) {
        console.log('Error en el registro', error);
   

        const alert = await this.alertController.create({
          header: 'Tienes una alerta',
          message: 'Los valores ya existen en nuestra base de datos o no tienen una sintaxis correcta',
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
  }


