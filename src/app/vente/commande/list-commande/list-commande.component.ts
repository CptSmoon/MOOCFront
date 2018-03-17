import {Component, OnInit} from '@angular/core';
import {Produit} from '../../../shared/models/produit';
import {Subscription} from 'rxjs/Subscription';
import {Commande} from '../../../shared/models/commande';
import {CommandeService} from '../../../shared/services/commande.service';
import {Utils} from '../../../shared/utils';

@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.css']
})
export class ListCommandeComponent implements OnInit {


  busy: Subscription;
  commandes: Commande[] = [];

  constructor(private commandeService: CommandeService) {
  }

  ngOnInit() {

    this.getAllCommande();
  }

  getAllCommande() {
    this.busy = this.commandeService.getCommandes()
      .subscribe(
        (data) => {
          this.commandes = data;
          Utils.initializeDataTables(50, 5, 'dataTable');
        },
        (error) => {

        }
      );
  }

}
