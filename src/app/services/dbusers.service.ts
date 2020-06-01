import { Injectable } from '@angular/core';

import {User} from '../shared/user.class';
import {
  AngularFirestoreModule,
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class DbusersService {

  new_user:User={uid:"", email:""}
  constructor(public db:AngularFirestore) { }

  add_user(user:User){

    this.new_user=user;
    console.log(user);
    //user.uid=this.db.createId();
    return this.db.doc('Users/'+this.new_user.uid).set(this.new_user);
  }

  get_user(uid:string){
    return this.db.doc<User>('Users/'+uid);
     
  }
}
