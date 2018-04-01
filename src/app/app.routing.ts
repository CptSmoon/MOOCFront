import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullLayoutComponent} from './full-layout/full-layout.component';
import {LoginComponent} from './login/login.component';
import {ClientComponent} from "./client/client.component";
// Layouts

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
        path: 'mp',
        loadChildren: './matiere-premiere/matiere-premiere.module#MatierePremiereModule'
      },
      {
        path: 'vente',
        loadChildren: './vente/vente.module#VenteModule'
      },
      {
        path:'client',
        component:ClientComponent
      },{
        path:'livraison',
        loadChildren:'./livraison/livraison.module#LivraisonModule'
      },{
        path:'facture',
        loadChildren:'./facture/facture.module#FactureModule'
      },{
        path:'produit',
        loadChildren:'./produit-base/produit-base.module#ProduitBaseModule'
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
