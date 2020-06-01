import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
  },
  {
    path: 'noadmin',
    loadChildren: () => import('./noadmin/noadmin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
    
  },
  {
    path: 'add-ofertas',
    loadChildren: () => import('./add-ofertas/add-ofertas.module').then( m => m.AddOfertasPageModule)
  },
  {
    path: 'more-oferta',
    loadChildren: () => import('./more-oferta/more-oferta.module').then( m => m.MoreOfertaPageModule)
  },
  {
    path: 'edit-oferta',
    loadChildren: () => import('./edit-oferta/edit-oferta.module').then( m => m.EditOfertaPageModule)
  },
 


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
