import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LivraisonRouting} from './livraison.routing';
import {SharedModule} from '../../shared/shared.module';
import { AddLivraisonComponent } from './add-livraison/add-livraison.component';
import {ListLivraisonComponent} from "./list-livraison/list-livraison.component";

@NgModule({
  imports: [
    LivraisonRouting,
    SharedModule,
    CommonModule
  ],
  declarations: [ListLivraisonComponent,
                  AddLivraisonComponent]
})
export class LivraisonModule {
}
