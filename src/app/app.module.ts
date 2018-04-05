///<reference path="shared/services/produitNEw.service.ts"/>
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {FullLayoutComponent} from './full-layout/full-layout.component';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app.routing';
import {StorageService} from './shared/services/storage.service';
import {HttpClientModule} from '@angular/common/http';
import {MatierePremiereModule} from './matiere-premiere/matiere-premiere.module';
import {MPService} from './shared/services/mp.service';
import {UniteService} from './shared/services/unite.service';
import {AchatMPService} from './shared/services/achatmp.service';
import {Fournisseur} from './shared/models/fournisseur';
import {FournisseurService} from './shared/services/Fournisseur.service';
import {LotService} from './shared/services/lot.service';
import {VenteModule} from './vente/vente.module';
import {CommandeService} from './shared/services/commande.service';
import {ClientService} from './shared/services/client.service';
import {ConsommationMPService} from "./shared/services/consommationmp.service";
import {ClientComponent} from "./client/client.component";
import {RegionService} from "./shared/services/region.service";
import {LivraisonModule} from "./livraison/livraison.module";
import {LivraisonService} from "./shared/services/livraison.service";
import {AdminService} from "./shared/services/admin.service";
import {PdfService} from "./shared/services/pdf.service";
import {FactureModule} from "./facture/facture.module";
import {FactureService} from "./shared/services/facture.service";
import {ProductionModule} from "./production/production.module";
import {ProduitService} from "./shared/services/produit.service";
import {ProduitNEwService} from "./shared/services/produitNEw.service";
import {ProduitBaseModule} from "./produit-base/produit-base.module";
import {CommandeAchatService} from "./shared/services/commande-achat.service";
import {AchatService} from "./shared/services/achat.service";
import {ProduitBaseService} from "./shared/services/produit-base.service";
import {LotModule} from "./production/lot/lot.module";
import {LotNEwService} from "./shared/services/lotNEw.service";
import {ListProduitBaseComponent} from "./produit-base/list-produit-base/list-produit-base.component";


@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    LoginComponent,
    ClientComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    // ProductionModule_old,
    ProductionModule,
    LotModule,
    HttpClientModule,
    MatierePremiereModule,
    VenteModule,
    LivraisonModule,
    FactureModule,
    ProduitBaseModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    StorageService,
    MPService,
    AdminService,
    ProduitService,
    ProduitNEwService,
    UniteService,
    AchatMPService,
    ConsommationMPService,
    FournisseurService,
    LotService,
    LotNEwService,
    CommandeService,
    ClientService,
    RegionService,
    LivraisonService,
    PdfService,
    FactureService,
    CommandeAchatService,
    AchatService,
    ProduitBaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
