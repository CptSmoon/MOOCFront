import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListSortieComponent} from "./list-sortie/list-sortie.component";
import {AddSortieComponent} from "./add-sortie/add-sortie.component";

// Layouts

export const routes: Routes = [
  {
    path: 'list',
    component: ListSortieComponent
  },
  {
    path: 'add',
    component: AddSortieComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SortieRouting {
}
