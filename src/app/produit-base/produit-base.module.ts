import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjoutCommandeComponent } from './ajout-commande/ajout-commande.component';
import {ProduitBaseRouting} from "./produit-base.routing";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ProduitBaseRouting,
    SharedModule
  ],
  declarations: [AjoutCommandeComponent]
})
export class ProduitBaseModule { }
