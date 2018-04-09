import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListFactureComponent} from './list-facture/list-facture.component';
import {FactureRouting} from './facture.routing';
import {FormsModule} from '@angular/forms';
import {AddFactureComponent} from './add-facture/add-facture.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FactureRouting,
    SharedModule
  ],
  declarations: [
    ListFactureComponent,
    AddFactureComponent
  ]
})
export class FactureModule {
}
