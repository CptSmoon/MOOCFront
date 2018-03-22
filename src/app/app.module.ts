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
import {ProductionModule} from './production/production.module';
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
import {ClientComponent} from "./client/client.component";
import {RegionService} from "./shared/services/region.service";


@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    LoginComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ProductionModule,
    HttpClientModule,
    MatierePremiereModule,
    VenteModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    StorageService,
    MPService,
    UniteService,
    AchatMPService,
    FournisseurService,
    LotService,
    CommandeService,
    ClientService,
    RegionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
