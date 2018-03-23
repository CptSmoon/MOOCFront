import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListLivraisonComponent} from "./list-livraison/list-livraison.component";
import {AddLivraisonComponent} from "./add-livraison/add-livraison.component";

// Layouts

export const routes: Routes = [
  {
    path: '',
    component: ListLivraisonComponent
  },{
    path: 'add',
    component: AddLivraisonComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivraisonRouting {
}
