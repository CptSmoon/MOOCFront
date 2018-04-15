import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddEmployeComponent} from "./add-employe/add-employe.component";
import {ListEmployeComponent} from "./list-employe/list-employe.component";
import {AddFactureComponent} from "../vente/facture/add-facture/add-facture.component";

// Layouts

export const routes: Routes = [
  {
    path:':id/edit',
    component:AddEmployeComponent
  },
  {
    path: 'add',
    component:AddEmployeComponent
  },
  {
    path: 'list',
    component:ListEmployeComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RHRouting {
}
