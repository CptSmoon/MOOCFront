import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AjoutCommandeComponent} from "./ajout-commande/ajout-commande.component";
import {ListCommandeComponent} from "./list-commande/list-commande.component";

// Layouts

export const routes: Routes = [
  {
    path: ':mode/add',
    component: AjoutCommandeComponent
  },
  {
    path: 'commande/list',
    component: ListCommandeComponent
  },{
    path: ':mode/add',
    component: AjoutCommandeComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitBaseRouting {
}
