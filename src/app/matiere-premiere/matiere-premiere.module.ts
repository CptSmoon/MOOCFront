import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockMpComponent } from './stock-mp/stock-mp.component';
import {MatierePremiereRouting} from "./matiere-premiere.routing";

@NgModule({
  imports: [
    CommonModule,
    MatierePremiereRouting
  ],
  declarations: [StockMpComponent]
})
export class MatierePremiereModule { }
