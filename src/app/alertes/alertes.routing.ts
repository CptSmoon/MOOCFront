import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AjoutProduitComponent} from "../production/produit/ajout-produit/ajout-produit.component";
import {AlertesProduitsComponent} from "./alertes-produits/alertes-produits.component";
import {AlertesProduitsBasesComponent} from "./alertes-produits-bases/alertes-produits-bases.component";
import {AlertesFacturesComponent} from "./alertes-factures/alertes-factures.component";
import {AlertesLivraisonsComponent} from "./alertes-livraisons/alertes-livraisons.component";

// Layouts
export const routes: Routes = [
  {
    path: 'produits',
    component: AlertesProduitsComponent
  },{
    path: 'produitsBase',
    component: AlertesProduitsBasesComponent
  },{
    path: 'factures',
    component: AlertesFacturesComponent
  },{
    path: 'livraisons',
    component: AlertesLivraisonsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertesRouting {
}
