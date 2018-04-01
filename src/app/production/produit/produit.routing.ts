
// Layouts


import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AjoutProduitComponent} from "./ajout-produit/ajout-produit.component";
import {ListProduitComponent} from "./list-produit/list-produit.component";

export const routes: Routes = [

  {
    path: 'ajout',
    component: AjoutProduitComponent
  } ,{
    path: 'list',
    component: ListProduitComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitRouting {
}
