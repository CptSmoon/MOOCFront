import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommandeModule} from './commande/commande.module';
import {VenteRouting} from './vente.routing';

@NgModule({
  imports: [
    CommonModule,
    VenteRouting,
    CommandeModule
  ],
  declarations: []
})
export class VenteModule {
}
