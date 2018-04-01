import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipientModule } from './recipient/recipient.module';
import {ProductionRouting} from "./production.routing";
import {RecipientService} from "../shared/services/recipient.service";
import {SharedModule} from "../shared/shared.module";
import { EmballageModule } from './emballage/emballage.module';
import {EmballageService} from "../shared/services/emballage.service";
import { ProduitModule } from './produit/produit.module';
import {ProduitService} from "../shared/services/produit.service";
import {FormuleService} from "../shared/services/formule.service";
import {ProduitBaseService} from "../shared/services/produit_base.service";

@NgModule({
  imports: [
    CommonModule,
    RecipientModule,
    ProductionRouting,
    SharedModule,
    EmballageModule,
    ProduitModule,
    ProduitBaseService
  ],
  declarations: [] ,
  providers: [
    EmballageService,
    RecipientService,
    ProduitService,
    FormuleService,
    ProduitBaseService
  ]
})
export class ProductionModule { }
