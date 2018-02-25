import { Component, OnInit } from '@angular/core';
import {Utils} from "../../../shared/utils";
import {Recipient} from "../../../shared/models/recipient";
import {Subscription} from "rxjs/Subscription";
import {RecipientService} from "../../../shared/services/recipient.service";
declare var jQuery;

@Component({
  selector: 'app-lister-recipients',
  templateUrl: './lister-recipients.component.html',
  styleUrls: ['./lister-recipients.component.css']
})
export class ListerRecipientsComponent implements OnInit {
  recipients: Recipient[] = [];
  busy: Subscription;

  constructor(private recipientService : RecipientService) { }

  ngOnInit() {
    this.getAllRecipients();

    // Utils.initializeDataTables(100, 4, "datatable-basic" );
  }

  private getAllRecipients() {
    // let r: Recipient = new Recipient();
    //
    // r.label = "R1";
    // r.reference = "Ref1";
    // r.recipient_id = 1;
    // r.cout = 12.34;
    // r.volume = 12;
    // r.unite_id = 1;
    // r.quantite_dispo = 13;
    // r.quantite_physique = 15;
    // this.recipients.push(r);
    // let r2: Recipient = new Recipient();
    //
    // r2.label = "R2";
    // r2.reference = "Ref2";
    // r2.recipient_id = 2;
    // r2.cout = 16.4;
    // r2.volume = 15;
    // r2.unite_id = 2;
    // r2.quantite_dispo = 44;
    // r2.quantite_physique = 44;
    // this.recipients.push(r2);


    this.busy = this.recipientService.getRecipients().subscribe(response => {
      this.recipients = response as Array<Recipient>;

      Utils.initializeDataTables(20, 7, "dataTable");


    }), error => {
      console.debug(error);
    };


  }
}
