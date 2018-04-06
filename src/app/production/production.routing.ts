import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// Layouts

export const routes: Routes = [
  {
    path: 'produit',
    loadChildren: "./produit/produit.module#ProduitModule"
  },
  {
    path: 'lot',
    loadChildren: "./lot/lot.module#LotModule"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionRouting {
}
