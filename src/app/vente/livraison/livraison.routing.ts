import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddLivraisonComponent} from './add-livraison/add-livraison.component';
import {ListLivraisonComponent} from "./list-livraison/list-livraison.component";

// Layouts

export const routes: Routes = [
  {
    path: 'list',
    component: ListLivraisonComponent
  },
  {
    path: 'add',
    component: AddLivraisonComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivraisonRouting {
}
