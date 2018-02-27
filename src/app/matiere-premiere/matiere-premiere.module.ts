import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockMpComponent } from './stock-mp/stock-mp.component';
import {MatierePremiereRouting} from "./matiere-premiere.routing";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MatierePremiereRouting,
    FormsModule
  ],
  declarations: [StockMpComponent]
})
export class MatierePremiereModule { }
