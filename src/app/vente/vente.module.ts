import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VenteRouting} from './vente.routing';
import {LivraisonModule} from './livraison/livraison.module';
import {FactureModule} from './facture/facture.module';
import {CommandeModule} from './commande/commande.module';

@NgModule({
  imports: [
    CommonModule,
    VenteRouting,
    LivraisonModule,
    FactureModule,
    CommandeModule
  ],
  declarations: []
})
export class VenteModule {
}
