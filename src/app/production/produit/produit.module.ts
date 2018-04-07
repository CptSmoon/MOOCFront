import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';
import {ProduitRouting} from "./produit.routing";
import {SharedModule} from "../../shared/shared.module";
import {ListProduitComponent} from "./list-produit/list-produit.component";

@NgModule({
  imports: [
    ProduitRouting,
    CommonModule,
    SharedModule

  ],
  declarations: [AjoutProduitComponent,ListProduitComponent]
})
export class ProduitModule { }
