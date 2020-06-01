import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddOfertasPageRoutingModule } from './add-ofertas-routing.module';

import { AddOfertasPage } from './add-ofertas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddOfertasPageRoutingModule
  ],
  declarations: [AddOfertasPage]
})
export class AddOfertasPageModule {}
