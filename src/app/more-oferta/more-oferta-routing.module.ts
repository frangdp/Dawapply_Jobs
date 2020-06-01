import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreOfertaPage } from './more-oferta.page';

const routes: Routes = [
  {
    path: '',
    component: MoreOfertaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreOfertaPageRoutingModule {}
