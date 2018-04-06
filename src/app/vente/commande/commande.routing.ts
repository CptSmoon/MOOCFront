import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListCommandeComponent} from './list-commande/list-commande.component';
import {AddCommandeComponent} from './add-commande/add-commande.component';

// Layouts

export const routes: Routes = [
  {
    path: 'list',
    component: ListCommandeComponent
  },
  {
    path: 'add',
    component: AddCommandeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandeRouting {
}
