import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AjoutCommandeComponent} from './ajout-commande/ajout-commande.component';
import {ListCommandeComponent} from './list-commande/list-commande.component';
import {ListAchatComponent} from './list-achat/list-achat.component';
import {ListProduitBaseComponent} from './list-produit-base/list-produit-base.component';

// Layouts

export const routes: Routes = [
  {
    path: ':mode/add',
    component: AjoutCommandeComponent
  },
  {
    path: 'commande/list',
    component: ListCommandeComponent
  },
  {
    path: ':mode/:achatId/edit-achat',
    component: AjoutCommandeComponent
  },
  {
    path: ':mode/:id/edit-command',
    component: AjoutCommandeComponent
  },
  {
    path: ':mode/add',
    component: AjoutCommandeComponent
  },
  {
    path: 'achat/list',
    component: ListAchatComponent
  },
  {
    path: ':mode/:id',
    component: AjoutCommandeComponent
  },
  {
    path: 'stock',
    component: ListProduitBaseComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitBaseRouting {
}
