import {Component, OnInit} from '@angular/core';
import {Fournisseur} from '../../shared/new models/fournisseur';
import {FournisseurService} from '../../shared/services/Fournisseur.service';
import {CommandeAchat} from '../../shared/new models/commande_achat';
import {Produit_Base} from '../../shared/new models/produit_base';
import {ProduitBaseService} from '../../shared/services/produit-base.service';
import {Ligne_Commande_Achat} from '../../shared/new models/ligne_commande_achat';
import {CommandeAchatService} from '../../shared/services/commande-achat.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Achat} from '../../shared/new models/achat';
import {Ligne_Achat} from '../../shared/new models/ligne_achat';
import {AchatService} from '../../shared/services/achat.service';
import {Subscription} from 'rxjs/Subscription';
import {UniteService} from "../../shared/services/unite.service";
import {Unite} from "../../shared/new models/unite";
import {Type} from "../../shared/new models/type";
import {ProduitService} from "../../shared/services/produit.service";
import {Taxe} from "../../shared/new models/taxe";
import {ProduitNEwService} from "../../shared/services/produitNEw.service";

declare var jQuery: any;
declare var swal: any;

@Component({
  selector: 'app-ajout-commande',
  templateUrl: './ajout-produit-base.component.html',
  styleUrls: ['./ajout-produit-base.component.css']
})
export class AjoutProduitBaseComponent implements OnInit {
  produit: Produit_Base;
  units: Array<Unite>;
  types: Array<Type>;
  busy: Subscription;
  taxes:Array<Taxe>;
  constructor(private produitBaseService: ProduitBaseService,
              private produitService: ProduitNEwService,
              private router: Router,
              private unitService: UniteService) {
  }

  ngOnInit() {
    this.produit = new Produit_Base();
    this.getAllTaxes();
    this.unitService.getAllUnits().subscribe(data => {
      this.units = data;
      if (this.units && this.units.length) this.produit.unite = this.units[0];
    });
    this.produitBaseService.getTypes().subscribe(data => {
      this.types = data;
      if (this.types && this.types.length) this.produit.type = this.types[0];
    });
  }

  addProduit() {
    this.produit.taxes_ids = jQuery('.taxeSelect').select2('val');
    console.log(JSON.stringify(this.produit))
    this.produitBaseService.add(this.produit).subscribe(response => {
      swal({
        title: 'Ajouté !',
        text: 'Un nouveau produit est ajouté.',
        confirmButtonColor: '#66BB6A',
        type: 'success'
      }).then((isConfirm) => {
        this.router.navigate(['/produit-base/stock']);
      });
    }, error => {
      swal({
        title: 'Erreur !',
        confirmButtonColor: 'red',
        type: 'error'
      });
    });

  }
  private getAllTaxes() {
    let baseContext = this;

    this.busy = this.produitService.getTaxes().subscribe(response => {
      baseContext.taxes = response;
    }), error => {
      console.debug(error);
      };
  }

}
