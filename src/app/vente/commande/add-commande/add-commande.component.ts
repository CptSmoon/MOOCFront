import {Component, OnInit} from '@angular/core';
import {Commande} from '../../../shared/models/commande';
import {Client} from '../../../shared/models/client';
import {ClientService} from '../../../shared/services/client.service';
import {CommandeService} from '../../../shared/services/commande.service';
import {Subscription} from 'rxjs/Subscription';
import {Ligne_Commande} from '../../../shared/models/ligne_Commande';
import {Produit} from '../../../shared/models/produit';
import {ProduitService} from '../../../shared/services/produit.service';

@Component({
  selector: 'app-add-commande',
  templateUrl: './add-commande.component.html',
  styleUrls: ['./add-commande.component.css']
})
export class AddCommandeComponent implements OnInit {

  commande: Commande = new Commande();
  clients: Client[] = [];
  busy: Subscription;
  lignes_commandes: Ligne_Commande[] = [];
  produits: Produit[] = [];
  produitSelected: Produit = new Produit();

  constructor(private clientService: ClientService,
              private commandeService: CommandeService,
              private produitService: ProduitService) {
  }

  ngOnInit() {
    this.initializeContentTable();
    this.getAllClients();
    this.getAllProduits();
  }

  initializeContentTable() {
    this.lignes_commandes.push(
      new Ligne_Commande()
    );
  }

  getAllClients() {
    this.clientService.getClients()
      .subscribe(
        (data) => {
          if (data.length !== 0)
            this.commande.client = data[0];
          this.clients = data;
        },
        (error) => {

        }
      );
  }

  getAllProduits() {
    this.produitService.getProduits()
      .subscribe(
        (data) => {
          this.produits = data;
        },
        (error) => {

        }
      );
  }

  confirmLigne(index: number) {
    this.lignes_commandes[index].editMode = false;
    this.lignes_commandes.push(new Ligne_Commande());
  }

  editLigne(index: number) {
    this.lignes_commandes[index].editMode = true;
  }


}
