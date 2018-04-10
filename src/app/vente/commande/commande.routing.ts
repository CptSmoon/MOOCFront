import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddCommandeComponent} from './add-commande/add-commande.component';
import {ListCommandeComponent} from './list-commande/list-commande.component';

// Layouts

export const routes: Routes = [
  {
    path: 'list',
    component: ListCommandeComponent
  },
  {
    path: ':commandId/edit',
    component: AddCommandeComponent
  },
  {
    path: 'add',
    component: AddCommandeComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandeRouting {
}
