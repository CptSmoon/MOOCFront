import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// Layouts

export const routes: Routes = [
  {
    path: 'commande',
    loadChildren: './commande/commande.module#CommandeModule'
  }, {
    path: 'livraison',
    loadChildren: './livraison/livraison.module#LivraisonModule'
  }, {
    path: 'sortie',
    loadChildren: './sortie/sortie.module#SortieModule'
  }, {
    path: 'facture',
    loadChildren: './facture/facture.module#FactureModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VenteRouting {
}
