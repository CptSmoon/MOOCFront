import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProduitRouting} from "./produit.routing";
import {ListerProduitsComponent} from "./lister-produits/lister-produits.component";
import { AjouterProduitComponent } from './ajouter-produit/ajouter-produit.component';
import {SharedModule} from "../../shared/shared.module";
import {ProduitBaseService} from "../../shared/services/produit-base.service";

@NgModule({
  imports: [
    CommonModule,
    ProduitRouting,
    SharedModule,
    ProduitBaseService

  ],
  declarations: [AjouterProduitComponent,    ListerProduitsComponent
  ],
  providers:[
    ProduitBaseService
  ]
})
export class ProduitModule { }
