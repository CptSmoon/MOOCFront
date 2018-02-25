import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipientModule } from './recipient/recipient.module';
import {ProductionRouting} from "./production.routing";
import {RecipientService} from "../shared/services/recipient.service";

@NgModule({
  imports: [
    CommonModule,
    RecipientModule,
    ProductionRouting
  ],
  declarations: [] ,
  providers: [
    RecipientService
  ]
})
export class ProductionModule { }
