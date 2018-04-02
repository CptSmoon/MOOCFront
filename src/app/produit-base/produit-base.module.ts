import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjoutCommandeComponent } from './ajout-commande/ajout-commande.component';
import {ProduitBaseRouting} from "./produit-base.routing";
import {SharedModule} from "../shared/shared.module";
import { ListCommandeComponent } from './list-commande/list-commande.component';
import {ListAchatComponent} from "./list-achat/list-achat.component";

@NgModule({
  imports: [
    CommonModule,
    ProduitBaseRouting,
    SharedModule
  ],
  declarations: [
    AjoutCommandeComponent,
    ListCommandeComponent,
    ListAchatComponent,
  ]
})
export class ProduitBaseModule { }
