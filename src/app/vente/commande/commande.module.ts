import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListCommandeComponent} from './list-commande/list-commande.component';
import {CommandeRouting} from './commande.routing';
import {SharedModule} from '../../shared/shared.module';
import { AddCommandeComponent } from './add-commande/add-commande.component';

@NgModule({
  imports: [
    CommandeRouting,
    SharedModule,
    CommonModule
  ],
  declarations: [ListCommandeComponent,
                  AddCommandeComponent]
})
export class CommandeModule {
}
