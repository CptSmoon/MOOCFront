import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjoutLotComponent } from './ajout-lot/ajout-lot.component';
import {SharedModule} from "../../shared/shared.module";
import {ProduitRouting} from "../produit/produit.routing";
import {LotRouting} from "./lot.routing";
import { ListLotComponent } from './list-lot/list-lot.component';

@NgModule({
  imports: [
    LotRouting,
    CommonModule,
    SharedModule
  ],
  declarations: [AjoutLotComponent, ListLotComponent]
})
export class LotModule { }
