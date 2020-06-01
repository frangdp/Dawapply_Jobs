import { Ofertas } from './../shared/ofertas.class';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import {
  AngularFirestoreModule,
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DbofertasService {

  constructor(private db: AngularFirestore) { }

  async add_oferta(new_oferta: Ofertas) {

    let id_user = JSON.parse(sessionStorage.getItem("User"));
   
    new_oferta.id = this.db.createId();
    console.log(new_oferta.id);
    return this.db.doc('/Users/' + id_user.uid + '/ofertas/' + new_oferta.id).set(new_oferta);
  }

  public get_ofertas(){

    let id_user = JSON.parse(sessionStorage.getItem("User"));
    let xuso=    "YAtl3LX9oUVqq4M3G7Bzi3yhs953";

    // let userlogin:AngularFirestoreCollection=;
    return this.db.collection < Ofertas > ('/Users/' + xuso + '/ofertas');
  }
  public delete_oferta(id_oferta:string){
    let id_user = JSON.parse(sessionStorage.getItem("User"));
    let xuso=    "YAtl3LX9oUVqq4M3G7Bzi3yhs953";

    return this.db.doc('/Users/' + xuso + '/ofertas/' + id_oferta).delete();
  }

  public edit_oferta(edit_oferta:Ofertas){

    let id_user = JSON.parse(sessionStorage.getItem("User"));
    return this.db.doc('/Users/' + id_user.uid + '/ofertas/' + edit_oferta.id).update(edit_oferta);
 
  }
}
