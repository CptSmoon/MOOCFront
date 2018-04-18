import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddDepenseComponent} from "./add-depense/add-depense.component";
import {ListDepenseComponent} from "./list-depense/list-depense.component";

// Layouts

export const routes: Routes = [
  {
    path: 'list',
    component: ListDepenseComponent
  },
  {
    path: 'add',
    component: AddDepenseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepenseRouting {
}
