import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AjoutLotComponent} from "./ajout-lot/ajout-lot.component";
import {ListLotComponent} from "./list-lot/list-lot.component";

// Layouts

export const routes: Routes = [
  {
    path: 'ajout',
    component: AjoutLotComponent
  },{
    path: 'list',
    component: ListLotComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LotRouting {
}
