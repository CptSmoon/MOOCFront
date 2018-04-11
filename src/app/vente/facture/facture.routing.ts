import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListFactureComponent} from "./list-facture/list-facture.component";
import {AddFactureComponent} from "./add-facture/add-facture.component";
import {AddLivraisonComponent} from "../livraison/add-livraison/add-livraison.component";

// Layouts

export const routes: Routes = [
  {
    path: 'list',
    component: ListFactureComponent
  },{
    path:':id/edit',
    component:AddFactureComponent
  },
  {
    path: 'add',
    component: AddFactureComponent
  },{
    path: 'convert',
    component: AddFactureComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactureRouting {
}
