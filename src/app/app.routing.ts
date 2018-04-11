import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullLayoutComponent} from './full-layout/full-layout.component';
import {LoginComponent} from './login/login.component';


export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      {
        path: 'production',
        loadChildren: './production/production.module#ProductionModule'
      },
      {
        path: 'vente',
        loadChildren: './vente/vente.module#VenteModule'
      }, {
        path: 'produit-base',
        loadChildren: './produit-base/produit-base.module#ProduitBaseModule'
      }, {
        path: 'alertes',
        loadChildren: './alertes/alertes.module#AlertesModule'
      }
    ],
    /*canActivate: [
     CanActivateViaAuthGuard
     ]*/
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
