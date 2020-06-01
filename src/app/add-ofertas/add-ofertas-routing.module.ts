import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddOfertasPage } from './add-ofertas.page';

const routes: Routes = [
  {
    path: '',
    component: AddOfertasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddOfertasPageRoutingModule {}
