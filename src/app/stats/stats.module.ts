import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsAchatComponent } from './stats-achat/stats-achat.component';
import { StatsVenteComponent } from './stats-vente/stats-vente.component';
import {SharedModule} from "../shared/shared.module";
import {StatsRouting} from "./stats.routing";

@NgModule({
  imports: [
    CommonModule,
    StatsRouting,
    SharedModule
  ],
  declarations: [StatsAchatComponent, StatsVenteComponent]
})
export class StatsModule { }
