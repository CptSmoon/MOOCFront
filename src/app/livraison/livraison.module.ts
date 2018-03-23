import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListLivraisonComponent} from './list-livraison/list-livraison.component';
import {LivraisonRouting} from "./livraison.routing";
import {FormsModule} from "@angular/forms";
import {AddLivraisonComponent} from "./add-livraison/add-livraison.component";

@NgModule({
  imports: [
    CommonModule,
    LivraisonRouting,
    FormsModule
  ],
  declarations: [
    ListLivraisonComponent,
    AddLivraisonComponent
  ]
})
export class LivraisonModule { }
