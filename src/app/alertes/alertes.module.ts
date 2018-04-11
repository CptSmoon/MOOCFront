import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertesProduitsComponent } from './alertes-produits/alertes-produits.component';
import {SharedModule} from "../shared/shared.module";
import {AlertesRouting} from "./alertes.routing";
import { AlertesProduitsBasesComponent } from './alertes-produits-bases/alertes-produits-bases.component';
import { AlertesFacturesComponent } from './alertes-factures/alertes-factures.component';

@NgModule({
  imports: [
    AlertesRouting,
    CommonModule,
    SharedModule,
  ],
  declarations: [AlertesProduitsComponent, AlertesProduitsBasesComponent, AlertesFacturesComponent]
})
export class AlertesModule { }
