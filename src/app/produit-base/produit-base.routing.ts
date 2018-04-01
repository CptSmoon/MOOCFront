import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AjoutCommandeComponent} from "./ajout-commande/ajout-commande.component";

// Layouts

export const routes: Routes = [
  {
    path: 'commande/add',
    component: AjoutCommandeComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitBaseRouting {
}
