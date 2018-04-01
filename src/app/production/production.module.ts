import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {ProduitModule} from "./produit/produit.module";
import {ProductionRouting} from "./production.routing";
import { ListProduitComponent } from './list-produit/list-produit.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProduitModule,
    ProductionRouting,

  ],
  declarations: [ListProduitComponent]
})
export class ProductionModule { }
