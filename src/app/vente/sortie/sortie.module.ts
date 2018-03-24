import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSortieComponent } from './list-sortie/list-sortie.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {SortieRouting} from "./sortie.routing";
import {SortieService} from "../../shared/services/sortie.service";
import { AddSortieComponent } from './add-sortie/add-sortie.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    SortieRouting
  ],
  declarations: [ListSortieComponent, AddSortieComponent],
  providers : [SortieService]
})
export class SortieModule { }
