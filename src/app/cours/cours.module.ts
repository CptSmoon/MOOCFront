import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCoursComponent } from './list-cours/list-cours.component';
import { AddCoursComponent } from './add-cours/add-cours.component';
import {CoursRouting} from "./cours.routing";
import {SharedModule} from "../shared/shared.module";
import { DetailsCoursComponent } from './details-cours/details-cours.component';

@NgModule({
  imports: [
    CommonModule,
    CoursRouting,
    SharedModule
  ],
  declarations: [ListCoursComponent, AddCoursComponent, DetailsCoursComponent]
})
export class CoursModule { }
