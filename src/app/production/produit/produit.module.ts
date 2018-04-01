import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';
import {ProduitRouting} from "./produit.routing";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    ProduitRouting,
    CommonModule,
    SharedModule

  ],
  declarations: [AjoutProduitComponent]
})
export class ProduitModule { }
