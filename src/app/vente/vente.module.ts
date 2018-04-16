import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VenteRouting} from './vente.routing';
import {LivraisonModule} from './livraison/livraison.module';
import {FactureModule} from './facture/facture.module';
import {CommandeModule} from './commande/commande.module';
import {DevisModule} from "./devis/devis.module";

@NgModule({
  imports: [
    CommonModule,
    VenteRouting,
    LivraisonModule,
    FactureModule,
    CommandeModule,
    DevisModule
  ],
  declarations: []
})
export class VenteModule {
}
