import {NgModule} from '@angular/core';
import {BusyModule} from 'angular2-busy';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MomentModule} from 'angular2-moment';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BusyModule,
    MomentModule,

  ],
  exports: [
    CommonModule,
    FormsModule,
    BusyModule,
    MomentModule
  ],
  declarations: [
  ],
  providers: []
})
export class SharedModule {

}
