import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListDevisComponent} from './list-devis/list-devis.component';
import {DevisRouting} from './devis.routing';
import {FormsModule} from '@angular/forms';
import {AddDevisComponent} from './add-devis/add-devis.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DevisRouting,
    SharedModule
  ],
  declarations: [
    ListDevisComponent,
    AddDevisComponent
  ]
})
export class DevisModule {
}
