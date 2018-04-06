import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommandeModule} from './commande/commande.module';
import {VenteRouting} from './vente.routing';
import {LivraisonModule} from "./livraison/livraison.module";

@NgModule({
  imports: [
    CommonModule,
    VenteRouting,
    CommandeModule,
    LivraisonModule
  ],
  declarations: []
})
export class VenteModule {
}
