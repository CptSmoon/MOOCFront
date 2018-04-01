import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjoutCommandeComponent } from './ajout-commande/ajout-commande.component';
import {ProduitBaseRouting} from "./produit-base.routing";
import {SharedModule} from "../shared/shared.module";
import { ListCommandeComponent } from './list-commande/list-commande.component';

@NgModule({
  imports: [
    CommonModule,
    ProduitBaseRouting,
    SharedModule
  ],
  declarations: [AjoutCommandeComponent, ListCommandeComponent]
})
export class ProduitBaseModule { }
