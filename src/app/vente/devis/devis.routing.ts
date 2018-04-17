import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListDevisComponent} from "./list-devis/list-devis.component";
import {AddDevisComponent} from "./add-devis/add-devis.component";

// Layouts

export const routes: Routes = [
  {
    path: 'list',
    component: ListDevisComponent
  },{
    path:':id/edit',
    component:AddDevisComponent
  },
  {
    path: 'add',
    component: AddDevisComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevisRouting {
}
