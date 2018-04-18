import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDepenseComponent } from './list-depense/list-depense.component';
import { AddDepenseComponent } from './add-depense/add-depense.component';
import {SharedModule} from "../../shared/shared.module";
import {DepenseRouting} from "./depense.routing";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DepenseRouting
  ],
  declarations: [ ListDepenseComponent, AddDepenseComponent]
})
export class DepenseModule { }
