import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipientRouting} from "./recipient.routing";
import {ListerRecipientsComponent} from "./lister-recipients/lister-recipients.component";
import {AjouterRecipientComponent} from "./ajouter-recipient/ajouter-recipient.component";
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RecipientRouting,
    FormsModule
  ],
  declarations: [ListerRecipientsComponent, AjouterRecipientComponent ]
})
export class RecipientModule { }
