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
import {ProductionModule} from "./production/production.module";
import {HttpClientModule} from "@angular/common/http";
import {MatierePremiereModule} from "./matiere-premiere/matiere-premiere.module";
import {MPService} from "./shared/services/mp.service";
import {UniteService} from "./shared/services/unite.service";


@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ProductionModule,
    HttpClientModule,
    MatierePremiereModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    StorageService,
    MPService,
    UniteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
