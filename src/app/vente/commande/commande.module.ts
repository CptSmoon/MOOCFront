import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListCommandeComponent} from './list-commande/list-commande.component';
import {AddCommandeComponent} from './add-commande/add-commande.component';
import {SharedModule} from '../../shared/shared.module';
import {CommandeRouting} from './commande.routing';

@NgModule({
  imports: [
    CommonModule,
    CommandeRouting,
    SharedModule
  ],
  declarations: [
    ListCommandeComponent,
    AddCommandeComponent
  ]
})
export class CommandeModule {
}
