import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListFactureComponent} from './list-facture/list-facture.component';
import {FactureRouting} from "./facture.routing";
import {FormsModule} from "@angular/forms";
import {AddFactureComponent} from "./add-facture/add-facture.component";

@NgModule({
  imports: [
    CommonModule,
    FactureRouting,
    FormsModule
  ],
  declarations: [
    ListFactureComponent,
    AddFactureComponent
  ]
})
export class FactureModule { }
