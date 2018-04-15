import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmployeComponent } from './list-employe/list-employe.component';
import { AddEmployeComponent } from './add-employe/add-employe.component';
import {RHRouting} from "./rh.routing";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RHRouting,
    SharedModule

  ],
  declarations: [ListEmployeComponent, AddEmployeComponent]
})
export class RhModule { }
