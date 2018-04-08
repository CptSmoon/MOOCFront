import {Component, OnInit} from '@angular/core';
import {Achat} from '../../shared/new models/achat';
import {AchatService} from '../../shared/services/achat.service';
import {Subscription} from 'rxjs/Subscription';


declare var jQuery: any;
declare var swal: any;

@Component({
  selector: 'app-list-commande',
  templateUrl: './list-achat.component.html',
  styleUrls: ['./list-achat.component.css']
})
export class ListAchatComponent implements OnInit {

  achats: Achat[] = [];
  achat: Achat = new Achat();
  busy: Subscription;

  constructor(private achatService: AchatService) {
  }

  ngOnInit() {
    this.achatService.getAll().subscribe(data => {
      this.achats = data;
    });

  }

  detailsAchat(i) {
    this.achat = this.achats[i];
  }

  deleteAchat(index: number) {
    const baseContext = this;
    swal({
      title: 'Attention !',
      text: 'Êtes-vous sûrs de vouloir supprimer l\'achat définitivement ? ',
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
          baseContext.busy = baseContext.achatService.delete(baseContext.achats[index].achat_id)
            .subscribe(
              (data) => {
                this.achats.splice(index, 1);
                swal('Succeés', 'Commande supprimée avec suucées', 'success');
              }
            );
        }
      });
  }
}
