import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockMpComponent } from './stock-mp/stock-mp.component';
import {MatierePremiereRouting} from "./matiere-premiere.routing";
import {FormsModule} from "@angular/forms";
import {AchatMpComponent} from "./achat-mp/achat-mp.component";
import {AjoutAchatMpComponent} from "./ajout-achat-mp/ajout-achat-mp.component";
import { ConsommationMpComponent } from './consommation-mp/consommation-mp.component';

@NgModule({
  imports: [
    CommonModule,
    MatierePremiereRouting,
    FormsModule
  ],
  declarations: [
    StockMpComponent,
    AchatMpComponent,
    AjoutAchatMpComponent,
    ConsommationMpComponent
  ]
})
export class MatierePremiereModule { }
