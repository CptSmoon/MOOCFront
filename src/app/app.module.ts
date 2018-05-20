import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {FullLayoutComponent} from './full-layout/full-layout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {CoursModule} from "./cours/cours.module";
import {CoursService} from "./shared/services/cours.service";


@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    CoursModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    CoursService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
