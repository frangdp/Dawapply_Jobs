import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
// import {  AngularFirestore} from '@angular/fire/firestore';
import {  AngularFirestoreModule} from '@angular/fire/firestore';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { AngularFireAuthModule} from '@angular/fire/auth';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import * as firebase from 'firebase';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from './../environments/environment'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    //AngularFirestore,
    AngularFireAuthModule,
    AngularFirestoreModule,
    // AngularFireAuth,
    AngularFireDatabaseModule
  
  ],
  
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
