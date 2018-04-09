import {Component, OnInit} from '@angular/core';
import {CommandeAchat} from '../../shared/new models/commande_achat';
import {ProduitBaseService} from '../../shared/services/produit-base.service';
import {Produit_Base} from '../../shared/new models/produit_base';
import {Subscription} from 'rxjs/Subscription';
import {Utils} from '../../shared/utils';
import {UniteService} from "../../shared/services/unite.service";
import {Unite} from "../../shared/new models/unite";
import {Type} from "../../shared/new models/type";


declare var jQuery: any;
declare var swal: any;

@Component({
  selector: 'app-list-produit-base',
  templateUrl: './list-produit-base.component.html',
  styleUrls: ['./list-produit-base.component.css']
})
export class ListProduitBaseComponent implements OnInit {

  busy: Subscription;
  pbs: Array<Produit_Base>;
  cmd: CommandeAchat;
  types:Array<Type>;

  constructor(private produitBaseService: ProduitBaseService) {
  }

  ngOnInit() {
    this.busy = this.produitBaseService.getAll().subscribe(data => {
      this.pbs = data;
      Utils.initializeDataTables(20, 7, 'dataTable');
    });
    this.produitBaseService.getTypes().subscribe(data => {
      this.types = data;
    });
  }

  editLigne(index: number) {
    for (let t of this.types){
      if (this.pbs[index].type_id==t.type_id) this.pbs[index].type=t;
    }
    this.pbs[index].editMode = 1;
  }

  confirmLigne(index: number) {
    if (!this.pbs[index].quantite_physique || !this.pbs[index].quantite_disponible) {
      return;
    }

    this.busy = this.produitBaseService.edit(this.pbs[index].produit_base_id, this.pbs[index])
      .subscribe(
        (data) => {
          this.pbs[index].editMode = 0;
          swal('Succées', 'Modificaton du quantité avec succées', 'success');
        },
        (error) => {

        }
      );

  }
}
