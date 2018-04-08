import {Component, OnInit} from '@angular/core';
import {CommandeAchatService} from '../../shared/services/commande-achat.service';
import {CommandeAchat} from '../../shared/new models/commande_achat';
import {Utils} from '../../shared/utils';
import {Subscription} from 'rxjs/Subscription';


declare var jQuery: any;
declare var swal: any;

@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.css']
})
export class ListCommandeComponent implements OnInit {

  commandes: Array<CommandeAchat>;
  cmd: CommandeAchat;
  busy: Subscription;

  constructor(private commandeAchatService: CommandeAchatService) {
  }

  ngOnInit() {
    this.busy = this.commandeAchatService.getAll().subscribe(data => {
      this.commandes = data;
    });

  }

  detailsCmd(i) {
    this.cmd = this.commandes[i];
  }

  deleteCommandeAchat(index) {
    const baseContext = this;
    swal({
      title: 'Attention !',
      text: 'Êtes-vous sûrs de vouloir supprimer cette commande définitivement ? ',
      icon: 'warning',
      dangerMode: true,
      buttons: {
        cancel: {
          text: 'Non annuler',
          value: null,
          visible: true
        },
        confirm: {
          text: 'Oui Supprimer',
          vaule: true,
          visible: true
        }
      }

    })
      .then((willDelete) => {
        if (willDelete) {
          baseContext.busy = baseContext.commandeAchatService.delete(baseContext.commandes[index].commande_achat_id)
            .subscribe(
              (data) => {
                this.commandes.splice(index, 1);
                swal('Succeés', 'Commande supprimée avec suucées', 'success');
              }
            );
        }
      });

  }
}
