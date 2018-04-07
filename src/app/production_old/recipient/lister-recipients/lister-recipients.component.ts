import { Component, OnInit } from '@angular/core';
import {Utils} from "../../../shared/utils";
import {Recipient} from "../../../shared/models/recipient";
import {Subscription} from "rxjs/Subscription";
import {RecipientService} from "../../../shared/services/recipient.service";
import {Router} from "@angular/router";
import {UniteService} from "../../../shared/services/unite.service";
import {Unite} from "../../../shared/models/unite";
declare var jQuery;
declare let swal: any;

@Component({
  selector: 'app-lister-recipients',
  templateUrl: './lister-recipients.component.html',
  styleUrls: ['./lister-recipients.component.css']
})
export class ListerRecipientsComponent implements OnInit {
  recipients: Recipient[] = [];
  busy: Subscription;
  unites: Array<Unite>;
  private selectedUnite: Unite;
  private selectedUniteIndex: number;
  constructor(
    private recipientService : RecipientService,
    private uniteService : UniteService
              ,private router: Router) { }

  ngOnInit() {
    this.getAllRecipients();
    this.getAllUnites();

  }

  private getAllRecipients() {
    this.busy = this.recipientService.getRecipients().subscribe(response => {
      this.recipients = response as Array<Recipient>;
      Utils.initializeDataTables(20, 5, "dataTable");


    }), error => {
      console.debug(error);
    };

  }
  private deleteRecipient(recipient_id,i){

    let baseContext = this;

    swal({
      title: "Attention !",
      text: "Êtes-vous sûrs de vouloir supprimer ce récipient définitivement ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF5350",
      confirmButtonText: "Oui, supprimer!",
      cancelButtonText: "Non, annuler.",
      closeOnConfirm: true,
      closeOnCancel: true
    }).then((isConfirm) => {
      baseContext.busy = this.recipientService.deleteRecipient(recipient_id).subscribe(response => {
        Utils.initializeDataTables(20, 5, "dataTable");

        swal({
          title: "Supprimé !",
          text: "Le récipient est supprimé.",
          confirmButtonColor: "#66BB6A",
          type: "success"
        }).then((isConfirm)=>{  baseContext.recipients.splice(i, 1);});
      }, error => {
        swal({
          title: "Erreur !",
          text: JSON.stringify(error.error.errors),
          confirmButtonColor: "red",
          type: "error"
        });
        console.debug(error);

      })
    });
  }


  confirmLigne(index: number) {
  let rec = this.recipients[index];
    if (!rec.label || !rec.reference||
      !rec.cout || !rec.volume||
      !rec.unite_id ) {
      return;
    }
    if (rec.editMode == 1) {
      rec.unite = this.selectedUnite;
      rec.unite_id =  this.selectedUnite.unite_id;
      this.busy = this.recipientService.editRecipient(rec)
        .subscribe(response => { rec = response;
        }), error => {
        console.debug(error);
      };
      rec.editMode = 0;

    } else {
      rec.editMode = 0;
    }
  }

  editLigne(index: number) {
    this.confirmAllLigne(this.recipients.length - 1);
    this.selectedUnite=this.recipients[index].unite;
    this.recipients[index].editMode = 1;
    this.initializeSelectProduct(index);
  }
  //
  // deleteLigne(index: number) {
  //   this.recipients.pop();
  //   this.recipients.splice(index, 1);
  //   this.initializeContentTable(this.recipients[0], this.recipients.length);
  //   this.initializeSelectProduct(this.recipients.length - 1);
  // }


  private confirmAllLigne(length) {
    for (let i = 0; i < length; i++) {
      this.confirmLigne(i);
    }
  }


  private initializeSelectProduct(index) {
    const baseContext = this;
    setTimeout(function () {
      const selectProduct = jQuery('.select-product-' + index);
      selectProduct.select2();
      selectProduct.on('change', function () {
        baseContext.changeProductValue(index, +jQuery(this).val());
      });
      selectProduct.val(baseContext.recipients[index].position).trigger('change');
    }, 20);
  }

  private changeProductValue(indexLignesortie: number, indexProduct) {
    this.recipients[indexLignesortie] = this.recipients[indexProduct];
    this.recipients[indexLignesortie].recipient_id = this.recipients[indexProduct].recipient_id;
    this.recipients[indexLignesortie].position = indexProduct;
  }

  private getAllUnites() {
    this.uniteService.getAllUnits().subscribe(data => this.unites = data);

  }
  onChangeObj(event){
    this.selectedUnite=this.unites[event.target.value];
  }


}
