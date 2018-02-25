import { Component, OnInit } from '@angular/core';
import {Recipient} from "../../../shared/models/recipient";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-ajouter-recipient',
  templateUrl: './ajouter-recipient.component.html',
  styleUrls: ['./ajouter-recipient.component.css']
})
export class AjouterRecipientComponent implements OnInit {
  recipient : Recipient = null;
  public isEditAction: boolean;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.isEditAction = this.router.url.indexOf('edit') !== -1;
  }

//TODO incorporate l'unite
  ngOnInit() {
    this.recipient = new Recipient();
  }
  addRecipient(){
    console.log(this.recipient);
  }

}
