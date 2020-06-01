import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreOfertaPageRoutingModule } from './more-oferta-routing.module';

import { MoreOfertaPage } from './more-oferta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreOfertaPageRoutingModule
  ],
  declarations: [MoreOfertaPage]
})
export class MoreOfertaPageModule {}
